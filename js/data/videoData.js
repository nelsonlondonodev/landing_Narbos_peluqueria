/**
 * @typedef {Object} VideoItem
 * @property {string} id - ID del video de YouTube.
 * @property {string} title - Título del video.
 * @property {string} description - Descripción del video para SEO y accesibilidad.
 * @property {string} uploadDate - Fecha de publicación en formato ISO string.
 * @property {string} thumbnailUrl - URL completa de la imagen miniatura.
 */

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
        uploadDate: "2026-05-05T08:00:00-05:00",
        thumbnailUrl: getYouTubeThumbnail('sz-uA1RgpVs', 'maxresdefault')
    },
    {
        id: 'MC-SPNzjk0E',
        title: "Transformación de Estilo y Color en Chía",
        description: "Descubre el proceso de transformación de estilo y color en Narbo's Salón Spa. Resultados vibrantes y profesionales con técnicas de vanguardia.",
        uploadDate: "2026-05-13T08:00:00-05:00",
        thumbnailUrl: getYouTubeThumbnail('MC-SPNzjk0E', 'hqdefault')
    },
    {
        id: 'ImN8W2AXEJI',
        title: "Corte de Cabello y Estilo de Vanguardia en Chía",
        description: "Descubre el proceso de un corte y peinado de vanguardia en Narbo's Salón Spa. Estilo sofisticado y profesional en Chía.",
        uploadDate: "2026-06-17T08:00:00-05:00",
        thumbnailUrl: getYouTubeThumbnail('ImN8W2AXEJI', 'hqdefault')
    },
    {
        id: 'vwvZ05OGZDU',
        title: "Tratamiento Capilar y Estilo Profesional en Chía",
        description: "Descubre la aplicación de tratamientos capilares profesionales y estilismo en Narbo's Salón Spa. Resultados espectaculares y cuidado capilar en Chía.",
        uploadDate: "2026-07-04T08:00:00-05:00",
        thumbnailUrl: getYouTubeThumbnail('vwvZ05OGZDU', 'maxresdefault')
    },
    {
        id: 'T11HZ98B1h4',
        title: "Tendencias de Estilo y Belleza en Chía",
        description: "Descubre las últimas tendencias y técnicas de belleza en Narbo's Salón Spa. Estilo y cuidado capilar profesional en Chía.",
        uploadDate: "2026-07-04T08:30:00-05:00",
        thumbnailUrl: getYouTubeThumbnail('T11HZ98B1h4', 'hqdefault')
    },
    {
        id: 'VCnNQODdxy0',
        title: "Diseño de Balayage e Iluminación Espectacular en Chía",
        description: "Descubre el proceso de un diseño de balayage e iluminación profesional en Narbo's Salón Spa. Resultados naturales, rubios vibrantes y salud capilar en Chía.",
        uploadDate: "2026-07-25T08:00:00-05:00",
        thumbnailUrl: getYouTubeThumbnail('VCnNQODdxy0', 'hqdefault')
    }
];
