
/**
 * Genera el HTML para un Bento Grid Item.
 * @param {Object} item - Datos del item.
 * @param {string} item.type - 'video' | 'image'
 * @param {string} item.layout - 'featured-video' | 'vertical' | 'horizontal' | 'square'
 * @param {string} item.src - Ruta del archivo
 * @param {string} [item.poster] - Poster para videos
 * @param {string} item.alt - Texto alternativo
 * @param {string} item.title - Título superpuesto
 * @param {string} [item.subtitle] - Subtítulo superpuesto
 * @returns {string} HTML string del item.
 */
function getGridItemHTML(item) {
    const layoutClasses = {
        'featured-video': 'col-span-1 row-span-2 md:col-span-2 md:row-span-2', // Vertical en móvil, Grande en desktop
        'vertical': 'col-span-1 row-span-2 md:col-span-1 md:row-span-2', // Vertical siempre
        'horizontal': 'col-span-2 md:col-span-2', // Ancho siempre
        'square': 'col-span-1' // Cuadrado normal
    };

    const spanClass = layoutClasses[item.layout] || layoutClasses['square'];
    // Ajuste de ratio para que no se deforme en square/horizontal
    // Aunque auto-rows lo controla bastante bien con object-cover.

    let mediaHTML = '';
    
    // Lazy loading attributes
    // Usamos clases standard 'lazy-video' o loading="lazy" para imágenes
    
    if (item.type === 'video') {
        mediaHTML = `
            <video poster="${item.poster}" muted loop playsinline class="lazy-video w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
                <source data-src="${item.src}" type="video/mp4">
                Tu navegador no soporta videos HTML5.
            </video>
        `;
    } else {
        mediaHTML = `
            <img src="${item.src}" alt="${item.alt}" loading="lazy" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
        `;
    }

    return `
        <div class="${spanClass} relative group overflow-hidden rounded-2xl shadow-lg">
            ${mediaHTML}
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 md:p-6">
                <div>
                    ${item.title ? `<p class="text-white font-serif font-bold text-sm md:text-xl translate-y-4 group-hover:translate-y-0 transition-transform duration-300">${item.title}</p>` : ''}
                    ${item.subtitle ? `<p class="text-gray-200 text-xs md:text-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">${item.subtitle}</p>` : ''}
                </div>
            </div>
             <!-- Lightbox Trigger (Invisible full cover link) -->
            <a href="${item.src}" class="glightbox absolute inset-0 z-10" data-gallery="bento-gallery" data-type="${item.type === 'video' ? 'video' : 'image'}" aria-label="${item.alt}"></a>
        </div>
    `;
}

/**
 * Genera todo el grid Bento.
 * @param {Array} items - Lista de items.
 * @returns {string} HTML del grid completo.
 */
export function getBentoGridHTML(items) {
    if (!items || items.length === 0) return '';

    const gridItemsHTML = items.map(item => getGridItemHTML(item)).join('');

    return `
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[180px] md:auto-rows-[250px]" data-animation="fadeInUp" data-animation-delay="0.2s">
            ${gridItemsHTML}
        </div>
    `;
}
