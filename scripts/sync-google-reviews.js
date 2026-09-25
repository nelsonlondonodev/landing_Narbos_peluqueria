import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { PLACE_ID } from '../js/data/place-config.js';
import { loadEnv } from './load-env.js';
import { assertSyncedInCI } from './assert-synced.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

loadEnv();

// CONFIGURACIÓN DE NARBO'S SALÓN SPA
const OUTPUT_FILE = path.join(__dirname, '../js/data/google-reviews.js');

/**
 * Lo que se publica si Google no responde: la última sincronización buena, no reseñas
 * de muestra. Las que había aquí no existían en la ficha y el SSG las acabaría pintando
 * en el HTML como si fueran de clientes reales. Sin try: el archivo está en git, y si
 * faltara, un conteo inventado en el JSON-LD sería peor que un build roto.
 * @returns {Promise<{rating: number, userRatingCount: number, reviews: Array<Object>}>}
 */
async function getLastSyncedData() {
    const { default: previous } = await import(pathToFileURL(OUTPUT_FILE).href);
    return {
        rating: previous.rating,
        userRatingCount: previous.userRatingCount,
        reviews: previous.reviews
    };
}

/**
 * Mapea una opinión individual de la API de Google Places al formato del frontend.
 * @param {Object} review 
 * @returns {Object}
 */
function mapGoogleReview(review) {
    return {
        author: review.authorAttribution?.displayName || 'Cliente de Google',
        rating: review.rating || 5,
        text: review.text?.text || '',
        relativeTime: review.relativePublishTimeDescription || 'Reciente',
        verified: true
    };
}

/**
 * Realiza la llamada HTTP a la API de Google Places.
 * @param {string} placeId 
 * @param {string} apiKey 
 * @returns {Promise<Object>}
 */
async function fetchGoogleReviews(placeId, apiKey) {
    console.log('📡 Realizando consulta HTTP a Google Places API (Reviews)...');
    const url = `https://places.googleapis.com/v1/places/${placeId}?languageCode=es&fields=rating,userRatingCount,reviews&key=${apiKey}`;
    const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error(`Google API respondió con código ${response.status}`);
    }

    return await response.json();
}

/**
 * Escribe los datos de las opiniones estructurados en el archivo JavaScript local.
 * @param {string} filePath 
 * @param {Object} data 
 */
function saveReviewsToFile(filePath, data) {
    const fileContent = `/**
 * AUTO-GENERATED FILE - DO NOT EDIT MANUALLY
 * Última sincronización con Google Business Profile: ${data.lastSync}
 */
const googleReviews = ${JSON.stringify(data, null, 4)};

export default googleReviews;
`;

    fs.writeFileSync(filePath, fileContent, 'utf8');
    console.log(`💾 Archivo ${path.relative(process.cwd(), filePath)} escrito correctamente.`);
}

/**
 * Páginas cuyo aggregateRating describe al negocio completo.
 *
 * La ficha de maquillaje estaba fuera de esta lista porque se dio por hecho que llevaba
 * una calificación propia del servicio. No la lleva: su `BeautySalon` declara el mismo
 * `@id` .../#organization que el resto del sitio, o sea el negocio entero, pero con 4.9
 * y 124 opiniones frente a las 5.0 y 339 reales. Un `@id` con dos calificaciones
 * distintas es una contradicción sobre la misma entidad, y ahora además la desmentiría
 * el badge visible del hero. Entra en la lista para que el sync la cuadre.
 */
const AGGREGATE_RATING_PAGES = ['../index.html', '../nosotros.html', '../servicios/maquillaje/index.html'];

/**
 * Propaga la calificación y el total de opiniones al JSON-LD y al texto visible.
 * El carrusel ya actualiza el conteo en runtime, pero los rastreadores leen el
 * marcado estático: sin esto el rich snippet se queda con el valor del último build manual.
 * @param {Object} data
 */
function syncAggregateRatingMarkup(data) {
    const rating = Number(data.rating).toFixed(1);
    const count = String(data.userRatingCount);

    AGGREGATE_RATING_PAGES.forEach(relativePath => {
        const filePath = path.join(__dirname, relativePath);
        if (!fs.existsSync(filePath)) return;

        const original = fs.readFileSync(filePath, 'utf8');
        const updated = original
            .replace(/("reviewCount":\s*)"\d+"/g, `$1"${count}"`)
            .replace(/("ratingValue":\s*)"[\d.]+"/g, `$1"${rating}"`)
            .replace(/\(\d+\s+opiniones en Google\)/g, `(${count} opiniones en Google)`)
            .replace(/(data-google-rating[^>]*>)[\d.]+/g, `$1${rating}`);

        if (updated !== original) {
            fs.writeFileSync(filePath, updated, 'utf8');
            console.log(`🔗 aggregateRating actualizado en ${path.basename(filePath)} (${rating} / ${count}).`);
        }
    });
}

/**
 * Orquestador principal para la sincronización de reseñas de Google Business Profile.
 */
async function syncReviews() {
    console.log('🚀 Sincronizando opiniones con Google Business Profile...');

    let reviewsData = {
        lastSync: new Date().toISOString(),
        source: 'Static Fallback (Local)',
        ...(await getLastSyncedData())
    };

    // Clave BUILD: este script corre en Node (sin referrer), no sirve la clave web.
    const apiKey = process.env.GOOGLE_MAPS_API_KEY_BUILD;

    if (apiKey) {
        try {
            const data = await fetchGoogleReviews(PLACE_ID, apiKey);
            
            if (data.reviews && data.reviews.length > 0) {
                reviewsData = {
                    lastSync: new Date().toISOString(),
                    source: 'Google Places API (Sincronizado)',
                    rating: data.rating || 5.0,
                    userRatingCount: data.userRatingCount || 292,
                    reviews: data.reviews.map(mapGoogleReview)
                };
                console.log(`✅ ${reviewsData.reviews.length} opiniones obtenidas de Google exitosamente (Calificación: ${reviewsData.rating}, Total: ${reviewsData.userRatingCount}).`);
            } else {
                console.warn('⚠️ La API de Google no retornó opiniones. Usando fallback.');
            }
        } catch (error) {
            console.error('❌ Error al consultar la API de Google (Reviews), aplicando fallback seguro:', error.message);
        }
    } else {
        console.log('ℹ️ No se detectó GOOGLE_MAPS_API_KEY_BUILD en el entorno. Usando fallback estático.');
    }

    assertSyncedInCI(reviewsData, 'Opiniones');

    try {
        saveReviewsToFile(OUTPUT_FILE, reviewsData);
        syncAggregateRatingMarkup(reviewsData);
    } catch (writeError) {
        console.error('❌ Error al escribir el archivo de opiniones:', writeError.message);
    }
}

syncReviews();
