import { getVideoById, getYouTubeThumbnail } from '../data/videoData.js';

/**
 * @typedef {Object} VideoSectionData
 * @property {string} id - ID del video de YouTube.
 * @property {string} headingId - ID del `h2`, referenciado por `aria-labelledby`.
 * @property {string} heading - Titular de la sección. Admite HTML (se usa para resaltar).
 * @property {string} body - Párrafo descriptivo que acompaña al video.
 * @property {string} ctaLabel - Texto del botón de acción.
 * @property {string} ctaHref - Destino del botón.
 * @property {string} alt - Texto alternativo de la miniatura.
 * @property {string} ariaLabel - Etiqueta accesible del disparador del modal.
 * @property {'hqdefault'|'maxresdefault'|'sddefault'} [thumbnailQuality='maxresdefault']
 *   Calidad de la miniatura. La tarjeta recorta con `object-cover`, así que en los
 *   verticales la elección depende de cómo haya rellenado YouTube cada short: ver el
 *   comentario de cada entrada en `videoData.js`.
 */

/**
 * Proporción y ancho de la tarjeta según la orientación del video.
 *
 * No todo lo que se publica es un short: `ImN8W2AXEJI` y `vwvZ05OGZDU` son apaisados
 * nativos, y en una tarjeta 9:16 `object-cover` se comería los lados de la composición.
 * La orientación se lee del catálogo, no de la página, porque es un hecho del video.
 *
 * El vertical se limita a `max-w-xs` para que no domine la columna; el apaisado ocupa el
 * ancho disponible, que a 16:9 es lo que necesita para no quedar diminuto.
 */
const ORIENTATION_STYLES = {
    vertical: { aspect: 'aspect-[9/16]', width: 'max-w-xs' },
    horizontal: { aspect: 'aspect-video', width: 'max-w-2xl' }
};

/**
 * Sección de video de una página de servicio.
 *
 * Los videos viven aquí y no en el `BentoGrid` a propósito. El bento es un lightbox de
 * fotos con una rama especial para `type: 'youtube'` en `getMediaContentHTML` y otra
 * distinta en `getTriggerLinkHTML`; además un `featured-video` ocupa 4 celdas de casos
 * de éxito y encaja mal un 9:16 en una caja cuadrada. Con sección propia el
 * `VideoObject` del JSON-LD describe algo prominente, con titular y texto alrededor.
 *
 * La miniatura es un `<img>` y el iframe solo se crea al abrir el modal: un `<iframe>`
 * de YouTube incrustado de entrada arrastra ~700-900 KB del reproductor aunque nadie
 * le dé al play.
 *
 * @param {VideoSectionData} data
 * @returns {string} HTML de la sección.
 */
export function getVideoSectionHTML(data) {
    const quality = data.thumbnailQuality || 'maxresdefault';
    const thumbnail = getYouTubeThumbnail(data.id, quality);
    const orientation = getVideoById(data.id)?.orientation;
    const { aspect, width } = ORIENTATION_STYLES[orientation] || ORIENTATION_STYLES.vertical;

    return `
        <section class="py-16 md:py-24 bg-white" aria-labelledby="${data.headingId}">
            <div class="container mx-auto px-6 max-w-screen-xl grid md:grid-cols-2 gap-12 items-center">
                <div class="text-left" data-animation="fadeInUp">
                    <h2 id="${data.headingId}" class="text-3xl md:text-4xl font-serif font-bold text-brand-gray-dark mb-4">
                        ${data.heading}
                    </h2>
                    <p class="text-brand-gray-dark/80 mb-8 text-lg">
                        ${data.body}
                    </p>
                    <a href="${data.ctaHref}" target="_blank" rel="noopener noreferrer" class="inline-flex justify-center items-center rounded-lg bg-brand-green px-6 py-3.5 text-base font-semibold text-white shadow-lg hover:bg-[#5a634b] hover:shadow-xl hover:-translate-y-0.5 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green">
                        ${data.ctaLabel}
                    </a>
                </div>
                <div class="flex justify-center" data-animation="fadeInUp">
                    <div class="relative overflow-hidden ${width} w-full bg-white rounded-xl shadow-2xl p-2">
                        <!-- No es <a> ni <button>, así que necesita role/tabindex; el teclado lo
                             maneja initYouTubeModals, que escucha Enter y Espacio. -->
                        <div class="video-card youtube-modal-trigger relative ${aspect} bg-black rounded-lg overflow-hidden group cursor-pointer"
                             data-video-id="${data.id}" role="button" tabindex="0"
                             aria-label="${data.ariaLabel}">

                            <img src="${thumbnail}"
                                 alt="${data.alt}"
                                 loading="lazy" decoding="async"
                                 class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100">

                            <!-- Botón de reproducción -->
                            <div class="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/0 transition-colors duration-300">
                                <div class="w-16 h-16 bg-brand-green/90 text-white rounded-full flex items-center justify-center shadow-2xl transform transition-all duration-300 group-hover:scale-125 group-hover:bg-brand-green ring-4 ring-white/20">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
}
