/**
 * @typedef {Object} VideoItem
 * @property {string} id - ID del video de YouTube.
 * @property {string} title - Título del video.
 * @property {string} description - Descripción del video para SEO y accesibilidad.
 * @property {string} uploadDate - Fecha de publicación en formato ISO string.
 * @property {string} thumbnailUrl - URL completa de la imagen miniatura.
 * @property {'vertical'|'horizontal'} [orientation='vertical'] - Forma del video original.
 *   No todo lo que se publica es un short. Señal fiable para clasificarlos: los shorts
 *   tienen miniatura `oar2`, los apaisados devuelven 404. Determina la proporción de la
 *   tarjeta en `VideoSection` y la URL canónica del video.
 */

/**
 * Genera la URL canónica de un video.
 *
 * Un apaisado servido bajo `/shorts/` redirige y funciona, pero declara en el JSON-LD
 * un formato que el video no tiene.
 *
 * @param {VideoItem} video
 * @returns {string} URL de YouTube.
 */
export function getVideoUrl(video) {
    return video.orientation === 'horizontal'
        ? `https://www.youtube.com/watch?v=${video.id}`
        : getYouTubeShortUrl(video.id);
}

/**
 * Busca un video del catálogo por su ID.
 * @param {string} videoId
 * @returns {VideoItem|undefined}
 */
export function getVideoById(videoId) {
    return homeVideos.find(v => v.id === videoId);
}

/**
 * Genera la URL de la miniatura oficial de un video de YouTube.
 * @param {string} videoId - ID del video de YouTube.
 * @param {'hqdefault'|'maxresdefault'|'sddefault'} [quality='hqdefault'] - Calidad de la miniatura.
 * @returns {string} URL de la miniatura.
 */
export function getYouTubeThumbnail(videoId, quality = 'hqdefault') {
    return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
}

/**
 * Genera la URL directa a un YouTube Short.
 * @param {string} videoId - ID del video.
 * @returns {string} URL del YouTube Short.
 */
export function getYouTubeShortUrl(videoId) {
    return `https://youtube.com/shorts/${videoId}`;
}

/**
 * Almacén unificado de datos de video para la galería principal.
 * @type {Array<VideoItem>}
 */
export const homeVideos = [
    {
        id: 'sz-uA1RgpVs',
        title: "Transformación de Color y Balayage en Chía",
        description: "Mira el proceso real de una transformación de color y técnica de balayage en nuestro salón en Chía. Resultados profesionales y cuidado capilar integral.",
        uploadDate: "2026-05-05T05:01:24-05:00",
        thumbnailUrl: getYouTubeThumbnail('sz-uA1RgpVs', 'maxresdefault')
    },
    {
        id: 'MC-SPNzjk0E',
        title: "Transformación de Estilo y Color en Chía",
        description: "Descubre el proceso de transformación de estilo y color en Narbo's Salón Spa. Resultados vibrantes y profesionales con técnicas de vanguardia.",
        uploadDate: "2026-05-13T02:00:27-05:00",
        thumbnailUrl: getYouTubeThumbnail('MC-SPNzjk0E', 'hqdefault')
    },
    {
        id: 'ImN8W2AXEJI',
        orientation: 'horizontal',   // nativo apaisado, no es un short (oar2 -> 404)
        title: "Corte de Cabello y Estilo de Vanguardia en Chía",
        description: "Descubre el proceso de un corte y peinado de vanguardia en Narbo's Salón Spa. Estilo sofisticado y profesional en Chía.",
        uploadDate: "2026-06-15T00:59:11-05:00",
        thumbnailUrl: getYouTubeThumbnail('ImN8W2AXEJI', 'hqdefault')
    },
    {
        id: 'vwvZ05OGZDU',
        orientation: 'horizontal',   // nativo apaisado, no es un short (oar2 -> 404)
        title: "Tratamiento Capilar y Estilo Profesional en Chía",
        description: "Descubre la aplicación de tratamientos capilares profesionales y estilismo en Narbo's Salón Spa. Resultados espectaculares y cuidado capilar en Chía.",
        uploadDate: "2026-07-04T01:15:06-05:00",
        thumbnailUrl: getYouTubeThumbnail('vwvZ05OGZDU', 'maxresdefault')
    },
    {
        id: 'T11HZ98B1h4',
        title: "Tendencias de Estilo y Belleza en Chía",
        description: "Descubre las últimas tendencias y técnicas de belleza en Narbo's Salón Spa. Estilo y cuidado capilar profesional en Chía.",
        uploadDate: "2026-07-04T01:37:24-05:00",
        thumbnailUrl: getYouTubeThumbnail('T11HZ98B1h4', 'hqdefault')
    },
    {
        id: 'VCnNQODdxy0',
        title: "Diseño de Balayage e Iluminación Espectacular en Chía",
        description: "Descubre el proceso de un diseño de balayage e iluminación profesional en Narbo's Salón Spa. Resultados naturales, rubios vibrantes y salud capilar en Chía.",
        uploadDate: "2026-07-25T00:30:14-05:00",
        thumbnailUrl: getYouTubeThumbnail('VCnNQODdxy0', 'hqdefault')
    },
    {
        id: '_33Xsn18z8s',
        title: "Transformación Increíble: Balayage y Ondas en Chía",
        description: "Mira la transformación completa de un balayage con ondas suaves en Narbo's Salón Spa. Rubios luminosos, movimiento natural y acabado profesional en Chía.",
        uploadDate: "2026-08-11T00:53:21-05:00",
        // YouTube entrega este short pillarboxed, sin el relleno desenfocado que puso en
        // otros. En la tarjeta 16:9 conviene hqdefault (4:3): object-cover recorta arriba
        // y abajo, así el contenido ocupa ~56 % del ancho en vez del ~33 % de maxresdefault,
        // que al ser 16:9 exacto entra sin recortar y deja las barras negras a la vista.
        // La variante vertical sin barras (oar2) no sirve: es el «antes», con el pelo oscuro.
        thumbnailUrl: getYouTubeThumbnail('_33Xsn18z8s', 'hqdefault')
    },
    {
        id: 'nDH5jTYxaU8',
        title: "Antes y Después: El Poder del Diseño de Color en Chía",
        description: "Mira el antes y el después de un diseño de color en Narbo's Salón Spa. De la raíz oscura a un rubio dorado con movimiento, cuidando la salud del cabello en Chía.",
        uploadDate: "2026-08-13T00:44:46-05:00",
        // Al revés que `_33Xsn18z8s`: aquí YouTube sí aplicó relleno desenfocado en vez de
        // barras negras duras, así que `maxresdefault` sirve para las dos tarjetas. En la
        // parrilla 16:9 de la home entra sin recortar; en la tarjeta vertical 9:16 el
        // recorte lateral de object-cover cae sobre el frame real (x 438-843 de 1280) y
        // deja el «después» limpio, sin desenfoque a los lados.
        // La variante vertical `oar2` no sirve, igual que la vez anterior: es el «antes».
        thumbnailUrl: getYouTubeThumbnail('nDH5jTYxaU8', 'maxresdefault')
    }
];
