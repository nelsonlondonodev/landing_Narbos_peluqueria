
/**
 * Genera el HTML para un Bento Grid Item.
 * @param {Object} item - Datos del item.
 * @param {number} index - Índice del item para generación de IDs estables.
 * @param {Object} options - Opciones de configuración.
 * @param {boolean} [options.isolateItems] - Si es true, aísla cada item en su propia galería.
 * @returns {string} HTML string del item.
 */
function getGridItemHTML(item, index, options = {}) {
    const layoutClasses = {
        'featured-video': 'col-span-1 row-span-2 md:col-span-2 md:row-span-2', 
        'vertical': 'col-span-1 row-span-2 md:col-span-1 md:row-span-2', 
        'horizontal': 'col-span-2 md:col-span-2', 
        'square': 'col-span-1',
        'logo-filler': 'col-span-2 md:col-span-1' 
    };

    const spanClass = layoutClasses[item.layout] || layoutClasses['square'];

    let mediaHTML = '';
    
    if (item.type === 'video') {
        mediaHTML = `
            <div class="video-container relative w-full h-full cursor-pointer group/video" onclick="this.innerHTML = '<video autoplay controls playsinline class=\'w-full h-full object-cover\'><source src=\'${item.src}\' type=\'video/mp4\'></video>'">
                <img src="${item.poster}" alt="${item.alt}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
                <div class="absolute inset-0 flex items-center justify-center bg-black/20 group-hover/video:bg-black/30 transition-colors">
                    <div class="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/40 group-hover/video:scale-110 transition-transform duration-300">
                        <svg class="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    </div>
                </div>
            </div>
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

    // Lógica de ID de Galería (Refactorizado para limpieza y flexibilidad)
    const hasSubImages = item.subImages && item.subImages.length > 0;
    
    // Determinismo: Usar índice en lugar de random para IDs estables
    const cleanTitle = (item.title || 'item').replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
    const uniqueId = `gallery-${cleanTitle}-${index}`;
    const sharedId = 'bento-gallery';

    // Aislamiento: Si la opción isolateItems está activa o el item tiene sub-imágenes (caso de estudio), se aísla.
    const useUniqueId = options.isolateItems || hasSubImages;
    const galleryId = useUniqueId ? uniqueId : sharedId;

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
 * Simula el comportamiento del CSS Grid para determinar cuántas columnas reales se usan.
 * Evita el problema estético de áreas vacías a la derecha en grids que no suman 4 columnas.
 */
function calculateOptimalColumns(items) {
    const layoutDimensions = items.map(item => {
        let w = 1, h = 1;
        if (item.layout === 'featured-video' || item.layout === 'horizontal') w = 2;
        if (item.layout === 'featured-video' || item.layout === 'vertical') h = 2;
        return { w, h };
    });

    const grid = [];
    let maxColUsed = -1;

    for (let k = 0; k < layoutDimensions.length; k++) {
        let { w, h } = layoutDimensions[k];
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
                    if (c + w - 1 > maxColUsed) {
                        maxColUsed = c + w - 1;
                    }
                    placed = true;
                    break;
                }
            }
            if (!placed) r++;
        }
    }
    
    const optimalCols = maxColUsed + 1;
    return optimalCols < 1 ? 4 : optimalCols;
}

/**
 * Genera todo el grid Bento.
 * @param {Array} items - Lista de items.
 * @param {Object} options - Opciones de configuración.
 * @returns {string} HTML del grid completo.
 */
export function getBentoGridHTML(items, options = {}) {
    if (!items || items.length === 0) return '';

    const gridItemsHTML = items.map((item, index) => getGridItemHTML(item, index, options)).join('');

    const optimalCols = calculateOptimalColumns(items);
    
    // Mapeo seguro para que el compilador JIT de Tailwind CSS extraiga las clases
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
