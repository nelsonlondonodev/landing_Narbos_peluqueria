import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargar variables de entorno desde .env si existe en la raíz
const envPath = path.join(__dirname, '../.env');
if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
        const parts = line.split('=');
        if (parts.length >= 2) {
            const key = parts[0].trim();
            let val = parts.slice(1).join('=').trim();
            if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
            if (val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1);
            process.env[key] = val;
        }
    });
}

// CONFIGURACIÓN DE NARBO'S SALÓN SPA
const PLACE_ID = 'ChIJtwq7egB5QI4RuteHxCidG7g';
const OUTPUT_FILE = path.join(__dirname, '../js/data/google-reviews.js');

/**
 * Retorna las opiniones estáticas de fallback (locales).
 * @returns {Array<Object>}
 */
function getFallbackReviews() {
    return [
        {
            author: "Andrea Morales",
            rating: 5,
            text: "Excelente servicio y atención. Me hice un balayage y el resultado fue espectacular, mi cabello quedó súper brillante y con un color hermoso. Sin duda la mejor peluquería en Chía.",
            relativeTime: "Hace un mes",
            verified: true
        },
        {
            author: "Carlos Restrepo",
            rating: 5,
            text: "Llevo meses viniendo a la barbería y el servicio es impecable. El ritual de toalla caliente y el arreglo de barba son de otro nivel. Súper recomendado.",
            relativeTime: "Hace 2 meses",
            verified: true
        },
        {
            author: "Liliana Gómez",
            rating: 5,
            text: "Mi lugar favorito para consentirme. El manicure spa y los masajes relajantes son maravillosos. El equipo es súper profesional y las instalaciones en el Edificio Quantum son muy cómodas y seguras.",
            relativeTime: "Hace 3 semanas",
            verified: true
        }
    ];
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
    const url = `https://places.googleapis.com/v1/places/${placeId}?fields=rating,userRatingCount,reviews&key=${apiKey}`;
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
 * Orquestador principal para la sincronización de reseñas de Google Business Profile.
 */
async function syncReviews() {
    console.log('🚀 Sincronizando opiniones con Google Business Profile...');

    let reviewsData = {
        lastSync: new Date().toISOString(),
        source: 'Static Fallback (Local)',
        rating: 5.0,
        userRatingCount: 292,
        reviews: getFallbackReviews()
    };

    const apiKey = process.env.GOOGLE_MAPS_API_KEY;

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
        console.log('ℹ️ No se detectó GOOGLE_MAPS_API_KEY en el entorno. Usando fallback estático.');
    }

    try {
        saveReviewsToFile(OUTPUT_FILE, reviewsData);
    } catch (writeError) {
        console.error('❌ Error al escribir el archivo de opiniones:', writeError.message);
    }
}

syncReviews();
