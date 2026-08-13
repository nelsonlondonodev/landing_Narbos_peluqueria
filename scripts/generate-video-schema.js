import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { homeVideos, getVideoUrl, getYouTubeThumbnail } from '../js/data/videoData.js';
import { pagesData } from '../js/data/pagesData.js';
import { getHtmlFiles } from './utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROJECT_ROOT = path.join(__dirname, '../');
const INDEX_PATH = path.join(__dirname, '../index.html');

const START_MARKER = '<!-- VIDEO-SCHEMA:START -->';
const END_MARKER = '<!-- VIDEO-SCHEMA:END -->';

// El marcador de página lleva dentro la clave de `pagesData`, para no tener que
// deducirla de la ruta ni mantener un segundo registro en paralelo.
const PAGE_START_RE = /<!-- VIDEO-OBJECT:([a-z0-9-]+) -->/;
const PAGE_END_MARKER = '<!-- /VIDEO-OBJECT -->';

/**
 * Construye el `VideoObject` de un video del catálogo.
 * @param {import('../js/data/videoData.js').VideoItem} video
 */
function buildVideoObject(video) {
    return {
        '@context': 'https://schema.org',
        '@type': 'VideoObject',
        name: video.title,
        description: video.description,
        thumbnailUrl: [
            getYouTubeThumbnail(video.id, 'hqdefault'),
            getYouTubeThumbnail(video.id, 'maxresdefault')
        ],
        uploadDate: video.uploadDate,
        contentUrl: getVideoUrl(video),
        embedUrl: `https://www.youtube.com/embed/${video.id}`
    };
}

/**
 * Escribe el `VideoObject` de cada ficha de servicio entre sus marcadores.
 *
 * Escritos a mano derivaban del catálogo sin que nadie se enterara: así fue como las
 * `uploadDate` acabaron redondeadas a las 08:00 y la de `ImN8W2AXEJI` con dos días de
 * desfase. La página declara qué video muestra en `pagesData[clave].video.id`, y el
 * resto —nombre, descripción, fecha— sale de `videoData.js`, que es el único sitio
 * donde se mantiene.
 *
 * @returns {{escritos: number, problemas: string[]}}
 */
function generatePageVideoObjects() {
    const problemas = [];
    const declaradasEnHtml = new Set();
    let escritos = 0;

    for (const relPath of getHtmlFiles(PROJECT_ROOT)) {
        const filePath = path.join(PROJECT_ROOT, relPath);
        const original = fs.readFileSync(filePath, 'utf8');

        const match = original.match(PAGE_START_RE);
        if (!match) continue;

        const [startMarker, pageKey] = match;
        const startIndex = original.indexOf(startMarker);
        const endIndex = original.indexOf(PAGE_END_MARKER, startIndex);

        if (endIndex === -1) {
            problemas.push(`${relPath}: falta el cierre ${PAGE_END_MARKER}.`);
            continue;
        }

        declaradasEnHtml.add(pageKey);

        const videoId = pagesData[pageKey]?.video?.id;
        if (!videoId) {
            problemas.push(`${relPath}: marcador VIDEO-OBJECT:${pageKey} pero '${pageKey}' no declara \`video\` en pagesData.`);
            continue;
        }

        const video = homeVideos.find(v => v.id === videoId);
        if (!video) {
            problemas.push(`${relPath}: '${pageKey}' apunta al video ${videoId}, que no está en videoData.js.`);
            continue;
        }

        const indent = ' '.repeat(4);
        const block = [
            startMarker,
            `${indent}<script type="application/ld+json">`,
            JSON.stringify(buildVideoObject(video), null, 6).replace(/^/gm, indent),
            `${indent}</script>`,
            `${indent}${PAGE_END_MARKER}`
        ].join('\n');

        const updated = original.slice(0, startIndex) + block + original.slice(endIndex + PAGE_END_MARKER.length);
        if (updated !== original) {
            fs.writeFileSync(filePath, updated, 'utf8');
            escritos++;
        }
    }

    // El sentido contrario: una página con `video` en pagesData pinta la sección pero se
    // quedaría sin marcado si nadie puso el marcador.
    for (const [pageKey, page] of Object.entries(pagesData)) {
        if (page.video && !declaradasEnHtml.has(pageKey)) {
            problemas.push(`'${pageKey}' declara \`video\` en pagesData pero ningún HTML lleva <!-- VIDEO-OBJECT:${pageKey} -->.`);
        }
    }

    return { escritos, problemas };
}

/**
 * La home no declara un `VideoObject` suelto porque no muestra un vídeo, sino una
 * galería: elegir uno de los siete obligaba a repetirlo en la ficha de servicio que
 * también lo muestra, y esa duplicación cruzada hacía competir dos URLs por el mismo
 * rich result. Un `ItemList` describe la galería entera y deja el `VideoObject` único
 * para cada página de servicio.
 *
 * Se genera en el build desde `videoData.js` por el mismo motivo que el
 * `aggregateRating`: si se mantiene a mano, el marcado se desincroniza del contenido
 * en cuanto se publica un vídeo nuevo y nadie se entera.
 *
 * @returns {Object} El grafo ItemList listo para serializar.
 */
function buildItemList() {
    // `YouTubeGallery` invierte el array al pintar, así que el más reciente encabeza la
    // parrilla. El ItemList replica ese orden para que `position` case con lo que se ve.
    const ordered = [...homeVideos].reverse();

    return {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: "Transformaciones en video de Narbo's Salón Spa",
        description: 'Galería de transformaciones reales de color, corte y bienestar realizadas en Narbo\'s Salón Spa en Chía.',
        numberOfItems: ordered.length,
        itemListElement: ordered.map((video, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
                '@type': 'VideoObject',
                name: video.title,
                description: video.description,
                thumbnailUrl: [
                    getYouTubeThumbnail(video.id, 'hqdefault'),
                    getYouTubeThumbnail(video.id, 'maxresdefault')
                ],
                uploadDate: video.uploadDate,
                contentUrl: getVideoUrl(video),
                embedUrl: `https://www.youtube.com/embed/${video.id}`
            }
        }))
    };
}

function generateVideoSchema() {
    console.log('🚀 Generando ItemList de vídeos para la home...');

    const original = fs.readFileSync(INDEX_PATH, 'utf8');

    const startIndex = original.indexOf(START_MARKER);
    const endIndex = original.indexOf(END_MARKER);

    if (startIndex === -1 || endIndex === -1) {
        console.error(`\n❌ No se encontraron los marcadores ${START_MARKER} / ${END_MARKER} en index.html.`);
        console.error('   Sin ellos el ItemList no se puede inyectar y la home se quedaría sin marcado de vídeo.');
        process.exit(1);
    }

    const itemList = buildItemList();
    const block = [
        START_MARKER,
        '    <script type="application/ld+json">',
        JSON.stringify(itemList, null, 6).replace(/^/gm, '    '),
        '    </script>',
        `    ${END_MARKER}`
    ].join('\n');

    const updated =
        original.slice(0, startIndex) +
        block +
        original.slice(endIndex + END_MARKER.length);

    if (updated === original) {
        console.log(`✅ ItemList ya al día (${itemList.numberOfItems} vídeos). Sin cambios.`);
        return;
    }

    fs.writeFileSync(INDEX_PATH, updated, 'utf8');
    console.log(`💾 ItemList actualizado en index.html (${itemList.numberOfItems} vídeos, encabeza «${itemList.itemListElement[0].item.name}»).`);
}

generateVideoSchema();

const { escritos, problemas } = generatePageVideoObjects();

if (problemas.length > 0) {
    console.error('\n❌ VideoObject de página mal cableados:');
    problemas.forEach(p => console.error(`   • ${p}`));
    console.error('\n   El build se aborta: una ficha de servicio con la sección visible y sin');
    console.error('   marcado (o al revés) es justo la desincronización que esto viene a evitar.');
    process.exit(1);
}

console.log(escritos > 0
    ? `💾 VideoObject regenerado en ${escritos} página(s) de servicio.`
    : '✅ VideoObject de las páginas de servicio ya al día. Sin cambios.');
