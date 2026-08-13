import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { homeVideos, getYouTubeShortUrl, getYouTubeThumbnail } from '../js/data/videoData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INDEX_PATH = path.join(__dirname, '../index.html');

const START_MARKER = '<!-- VIDEO-SCHEMA:START -->';
const END_MARKER = '<!-- VIDEO-SCHEMA:END -->';

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
                contentUrl: getYouTubeShortUrl(video.id),
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
