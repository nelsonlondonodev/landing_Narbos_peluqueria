
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
        'featured-video': 'col-span-1 row-span-2 md:col-span-2 md:row-span-2', 
        'vertical': 'col-span-1 row-span-2 md:col-span-1 md:row-span-2', 
        'horizontal': 'col-span-2 md:col-span-2', 
        'square': 'col-span-1' 
    };

    const spanClass = layoutClasses[item.layout] || layoutClasses['square'];

    let mediaHTML = '';
    
    if (item.type === 'video') {
        mediaHTML = `
            <video poster="${item.poster}" muted loop playsinline class="lazy-video w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
                <source data-src="${item.src}" type="video/mp4">
                Tu navegador no soporta videos HTML5.
            </video>
        `;
    } else if (item.type === 'logo-card') {
        // Special type for filling space with branding
        mediaHTML = `
            <div class="w-full h-full bg-stone-900 flex items-center justify-center p-8 group-hover:bg-stone-800 transition-colors duration-500">
                <img src="${item.src}" alt="${item.alt}" class="w-2/3 h-2/3 object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300">
            </div>
        `;
    } else {
        mediaHTML = `
            <img src="${item.src}" alt="${item.alt}" loading="lazy" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
        `;
    }

    // Lógica para Galerías Anidadas (Antes/Después)
    // Si hay subImages, creamos un ID único para aislar este carrusel del resto del grid.
    // Si no, usamos 'bento-gallery' para que sea navegable junto con los demás items.
    const hasSubImages = item.subImages && item.subImages.length > 0;
    const galleryId = hasSubImages 
        ? `gallery-${item.title.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}-${Math.floor(Math.random() * 1000)}` 
        : 'bento-gallery';

    let hiddenLinksHTML = '';
    if (hasSubImages) {
        hiddenLinksHTML = item.subImages.map(subItem => `
            <a href="javascript:void(0);" data-href="${subItem.src}" class="glightbox hidden" data-gallery="${galleryId}" data-type="image" aria-label="${subItem.alt || ''}"></a>
        `).join('');
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
             <!-- Lightbox Trigger -->
            <a href="javascript:void(0);" data-href="${item.src}" class="glightbox absolute inset-0 z-10" data-gallery="${galleryId}" data-type="${item.type === 'video' ? 'video' : 'image'}" aria-label="${item.alt}"></a>
            ${hiddenLinksHTML}
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
