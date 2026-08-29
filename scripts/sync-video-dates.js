import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { siteConfig } from '../js/config.js';
import { homeVideos } from '../js/data/videoData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CATALOG_PATH = path.join(__dirname, '../js/data/videoData.js');

// El canal sale de `siteConfig`, que ya lo declara para el enlace del footer: un
// segundo registro con el mismo ID es justo lo que se desincroniza.
const CHANNEL_URL = siteConfig.socialLinks.find(s => s.name === 'YouTube')?.url ?? '';
const CHANNEL_ID = CHANNEL_URL.match(/\/channel\/(UC[\w-]{22})/)?.[1];

// El feed Atom del canal, sin clave ni cuota, trae los 15 vídeos más recientes con su
// `<published>` exacto. Es la única fuente pública de la HORA de publicación: la página
// del vídeo solo muestra el día, y de ahí salieron los tres desfases que ha habido
// —redondeos a las 08:00, dos días de más en `ImN8W2AXEJI` y la fecha sola de
// `tuJcoHSWLDM`, que Search Console marcó como datetime inválido y sin zona horaria—.
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

// Bogotá no ha tenido horario de verano desde 1993, así que el desplazamiento es fijo.
const BOGOTA_OFFSET_HOURS = -5;

/**
 * Pasa el instante UTC del feed a la hora local del salón, con su offset explícito.
 *
 * El offset no es decorativo: `uploadDate` sin zona horaria es lo que Search Console
 * avisa, y una fecha sola además ni siquiera es un `DateTime` válido para Google.
 *
 * @param {string} isoUtc - `<published>` del feed, en `+00:00`.
 * @returns {string} ISO 8601 completo en `-05:00`.
 */
function toBogotaIso(isoUtc) {
    const shifted = new Date(Date.parse(isoUtc) + BOGOTA_OFFSET_HOURS * 3600 * 1000);
    return `${shifted.toISOString().slice(0, 19)}-05:00`;
}

/**
 * Extrae las fechas del feed entrada por entrada.
 *
 * Se recorre por `<entry>` a propósito: el `<feed>` lleva su propio `<published>` —el
 * del canal— antes de la primera entrada, así que emparejar dos listas sueltas de
 * `videoId` y `published` desplaza todas las fechas un puesto.
 *
 * @param {string} xml
 * @returns {Map<string, string>} id de vídeo → instante ISO en UTC.
 */
function parseFeed(xml) {
    const fechas = new Map();

    for (const [entry] of xml.matchAll(/<entry>[\s\S]*?<\/entry>/g)) {
        const id = entry.match(/<yt:videoId>([\w-]+)<\/yt:videoId>/)?.[1];
        const published = entry.match(/<published>([^<]+)<\/published>/)?.[1];
        if (id && published) fechas.set(id, published);
    }

    return fechas;
}

/**
 * Reescribe la `uploadDate` de un vídeo dentro del catálogo.
 *
 * Sustitución quirúrgica sobre el texto en vez de regenerar el fichero: `videoData.js`
 * se mantiene a mano y lleva comentarios que explican cada elección de miniatura.
 * Serializar el array los borraría.
 *
 * @returns {string|null} El fichero actualizado, o null si no encuentra dónde escribir.
 */
function reemplazarFecha(contenido, videoId, fecha) {
    const anclaje = contenido.indexOf(`id: '${videoId}'`);
    if (anclaje === -1) return null;

    // El siguiente objeto del array acota la búsqueda: sin este tope, un vídeo al que
    // le faltara la propiedad se llevaría por delante la fecha del vídeo de abajo.
    const siguiente = contenido.indexOf('id: \'', anclaje + 1);
    const limite = siguiente === -1 ? contenido.length : siguiente;

    const campo = /uploadDate: "([^"]*)"/g;
    campo.lastIndex = anclaje;
    const encontrado = campo.exec(contenido);
    if (!encontrado || encontrado.index > limite) return null;

    return contenido.slice(0, encontrado.index) +
        `uploadDate: "${fecha}"` +
        contenido.slice(encontrado.index + encontrado[0].length);
}

async function syncVideoDates() {
    console.log('🚀 Sincronizando fechas de publicación con el feed del canal...');

    if (!CHANNEL_ID) {
        console.warn('⚠️ No se pudo leer el ID del canal de YouTube en siteConfig.socialLinks.');
        console.warn('   Se conservan las fechas del catálogo. La guarda del SSG sigue validándolas.');
        return;
    }

    let fechas;
    try {
        const response = await fetch(FEED_URL);
        if (!response.ok) throw new Error(`el feed respondió con código ${response.status}`);
        fechas = parseFeed(await response.text());
    } catch (error) {
        // No se aborta: las fechas del repo ya están en el formato correcto y no caducan.
        // Quien impide publicar una fecha mal formada es `checkUploadDates` en el SSG.
        console.warn(`⚠️ No se pudo consultar el feed (${error.message}). Se conservan las fechas del catálogo.`);
        return;
    }

    if (fechas.size === 0) {
        console.warn('⚠️ El feed no trajo ninguna entrada. Se conservan las fechas del catálogo.');
        return;
    }

    let contenido = fs.readFileSync(CATALOG_PATH, 'utf8');
    const cambios = [];
    const ausentes = [];

    for (const video of homeVideos) {
        const publicado = fechas.get(video.id);

        if (!publicado) {
            // El feed solo alcanza 15 vídeos: los más antiguos acaban cayéndose. Se dejan
            // como están —ya son correctos— en vez de vaciarlos.
            ausentes.push(video.id);
            continue;
        }

        const fecha = toBogotaIso(publicado);
        if (fecha === video.uploadDate) continue;

        const actualizado = reemplazarFecha(contenido, video.id, fecha);
        if (!actualizado) {
            console.error(`❌ No se encontró la \`uploadDate\` de ${video.id} en videoData.js.`);
            process.exit(1);
        }

        contenido = actualizado;
        cambios.push(`${video.id}: ${video.uploadDate} → ${fecha}`);
    }

    if (ausentes.length > 0) {
        console.log(`ℹ️ Fuera de las 15 entradas del feed, sin tocar: ${ausentes.join(', ')}.`);
    }

    if (cambios.length === 0) {
        console.log(`✅ Fechas ya al día (${homeVideos.length} vídeos). Sin cambios.`);
        return;
    }

    fs.writeFileSync(CATALOG_PATH, contenido, 'utf8');
    console.log(`💾 videoData.js actualizado (${cambios.length}):`);
    cambios.forEach(cambio => console.log(`   • ${cambio}`));
}

syncVideoDates();
