
/**
 * Genera el HTML para un Bento Grid Item.
 * @param {Object} item - Datos del item.
 * @param {number} index - Índice del item para generación de IDs estables.
 * @param {Object} options - Opciones de configuración.
 * @param {boolean} [options.isolateItems] - Si es true, aísla cada item en su propia galería.
 * @returns {string} HTML string del item.
 */
// Constantes de Layout
const LAYOUT_CLASSES = {
    'featured-video': 'col-span-1 row-span-2 md:col-span-2 md:row-span-2', 
    'vertical': 'col-span-1 row-span-2 md:col-span-1 md:row-span-2', 
    'horizontal': 'col-span-2 md:col-span-2', 
    'square': 'col-span-1',
    'logo-filler': 'col-span-2 md:col-span-1' 
};

/**
 * Devuelve la clase de Layout correspondiente.
 */
function getSpanClass(layout) {
    return LAYOUT_CLASSES[layout] || LAYOUT_CLASSES['square'];
}

/**
 * Devuelve las dimensiones lógicas (ancho y alto en celdas) de un layout.
 */
function getLayoutDimensions(layout) {
    let w = 1, h = 1;
    if (layout === 'featured-video' || layout === 'horizontal') w = 2;
    if (layout === 'featured-video' || layout === 'vertical') h = 2;
    return { w, h };
}

/**
 * Genera el ID único para la galería agrupando por sub-imágenes u opciones.
 */
function getGalleryId(item, index, options) {
    const hasSubImages = !!(item.subImages && item.subImages.length > 0);
    const cleanTitle = (item.title || 'item').replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
    
    const uniqueId = `gallery-${cleanTitle}-${index}`;
    const sharedId = 'bento-gallery';

    return (options.isolateItems || hasSubImages) ? uniqueId : sharedId;
}

/**
 * Genera el HTML interno dependiendo del tipo de recurso (Video, Logo o Imagen).
 */
function getMediaContentHTML(item) {
    if (item.type === 'video') {
        const videoHTML = `<video autoplay controls playsinline class='w-full h-full object-cover'><source src='${item.src}' type='video/mp4'></video>`;
        return `
            <div class="video-container relative w-full h-full cursor-pointer group/video" onclick="this.innerHTML = '${videoHTML}'">
                <img src="${item.poster}" alt="${item.alt}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
                <div class="absolute inset-0 flex items-center justify-center bg-black/20 group-hover/video:bg-black/30 transition-colors">
                    <div class="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/40 group-hover/video:scale-110 transition-transform duration-300">
                        <svg class="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    </div>
                </div>
            </div>
        `;
    } 
    
    if (item.type === 'logo-card') {
        return `
            <div class="w-full h-full bg-stone-900 flex items-center justify-center p-8 group-hover:bg-stone-800 transition-colors duration-500">
                <img src="${item.src}" alt="${item.alt}" class="w-2/3 h-2/3 object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300">
            </div>
        `;
    }

    return `<img src="${item.src}" alt="${item.alt}" loading="lazy" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">`;
}

/**
 * Genera los links ocultos de sub-imágenes para ser enlazados por el lightbox.
 */
function getHiddenSubImagesHTML(item, galleryId) {
    if (!item.subImages || item.subImages.length === 0) return '';
    return item.subImages.map(subItem => `
        <a href="javascript:void(0);" data-href="${subItem.src}" class="glightbox hidden" data-gallery="${galleryId}" data-type="image" aria-label="${subItem.alt || ''}"></a>
    `).join('');
}

/**
 * Genera los textos flotantes (título y subtítulo) sobre el componente de la cuadrícula.
 */
function getOverlayHTML(item) {
    if (!item.title && !item.subtitle) return '';

    const titleHTML = item.title ? `<p class="text-white font-serif font-bold text-sm md:text-xl translate-y-4 group-hover:translate-y-0 transition-transform duration-300">${item.title}</p>` : '';
    const subtitleHTML = item.subtitle ? `<p class="text-gray-200 text-xs md:text-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">${item.subtitle}</p>` : '';

    return `
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 md:p-6">
            <div>
                ${titleHTML}
                ${subtitleHTML}
            </div>
        </div>
    `;
}

/**
 * Genera el HTML unitario de un card para el Bento. Ensambla todas sus partes.
 */
function getGridItemHTML(item, index, options = {}, extraStretchClass = '') {
    const spanClass = getSpanClass(item.layout);
    const galleryId = getGalleryId(item, index, options);
    
    // Armado de componentes internos
    const mediaHTML = getMediaContentHTML(item);
    const overlayHTML = getOverlayHTML(item);
    const hiddenLinksHTML = getHiddenSubImagesHTML(item, galleryId);
    
    const triggerDataType = item.type === 'video' ? 'video' : 'image';

    return `
        <div class="${spanClass}${extraStretchClass} relative group overflow-hidden rounded-2xl shadow-lg">
            ${mediaHTML}
            ${overlayHTML}
            <!-- Lightbox Trigger -->
            <a href="javascript:void(0);" data-href="${item.src}" class="glightbox absolute inset-0 z-10" data-gallery="${galleryId}" data-type="${triggerDataType}" aria-label="${item.alt}"></a>
            ${hiddenLinksHTML}
        </div>
    `;
}

/**
 * Simula el comportamiento del CSS Grid y devuelve un objeto matemático del layout.
 * Determina cuántas columnas reales se usan (optimalCols).
 */
function getGridMath(items) {
    const grid = [];
    let maxColUsed = -1;

    items.forEach((item, index) => {
        const { w, h } = getLayoutDimensions(item.layout);
        let r = 0;
        let placed = false;
        
        while (!placed) {
            if (!grid[r]) grid[r] = [false, false, false, false];
            
            for (let c = 0; c <= 4 - w; c++) {
                let empty = true;
                for (let i = 0; i < h; i++) {
                    if (!grid[r+i]) grid[r+i] = [false, false, false, false];
                    for (let j = 0; j < w; j++) {
                        if (grid[r+i][c+j]) { empty = false; break; }
                    }
                    if (!empty) break;
                }
                
                if (empty) {
                    for (let i = 0; i < h; i++) {
                        for (let j = 0; j < w; j++) { 
                            grid[r+i][c+j] = true; 
                        }
                    }
                    if (c + w - 1 > maxColUsed) { maxColUsed = c + w - 1; }
                    placed = true;
                    break;
                }
            }
            if (!placed) r++;
        }
    });
    
    const optimalCols = maxColUsed + 1 < 1 ? 4 : maxColUsed + 1;
    return { optimalCols };
}

/**
 * Función principal que orquesta y retorna todo el layout Bento
 */
export function getBentoGridHTML(items, options = {}) {
    if (!items || items.length === 0) return '';

    const { optimalCols } = getGridMath(items);

    const gridItemsHTML = items.map((item, index) => {
        let spanClass = getSpanClass(item.layout);
        let galleryId = getGalleryId(item, index, options);
        let mediaHTML = getMediaContentHTML(item);
        let overlayHTML = getOverlayHTML(item);
        let hiddenLinksHTML = getHiddenSubImagesHTML(item, galleryId);
        let triggerDataType = item.type === 'video' ? 'video' : 'image';
        
        return `
            <div class="${spanClass} relative group overflow-hidden rounded-2xl shadow-lg">
                ${mediaHTML}
                ${overlayHTML}
                <a href="javascript:void(0);" data-href="${item.src}" class="glightbox absolute inset-0 z-10" data-gallery="${galleryId}" data-type="${triggerDataType}" aria-label="${item.alt}"></a>
                ${hiddenLinksHTML}
            </div>
        `;
    }).join('');

    const gridColsOptions = {
        1: 'md:grid-cols-1',
        2: 'md:grid-cols-2',
        3: 'md:grid-cols-3',
        4: 'md:grid-cols-4'
    };
    
    const dynamicGridClass = gridColsOptions[optimalCols] || 'md:grid-cols-4';

    return `
        <div class="grid grid-cols-2 ${dynamicGridClass} gap-3 md:gap-4 auto-rows-[180px] md:auto-rows-[250px] grid-flow-row-dense" data-animation="fadeInUp" data-animation-delay="0.2s">
            ${gridItemsHTML}
        </div>
    `;
}
