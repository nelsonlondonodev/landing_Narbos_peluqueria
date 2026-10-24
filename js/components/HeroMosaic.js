/**
 * @typedef {Object} HeroMosaicData
 * @property {string} image - Foto a tamaño de escritorio, ya resuelta para la página.
 * @property {string} [imageMobile] - Variante ligera para pantallas de hasta 768 px.
 * @property {string} alt - Texto alternativo de la foto.
 * @property {number} width - Ancho intrínseco de `image`.
 * @property {number} height - Alto intrínseco de `image`.
 */

/**
 * Teselas del mosaico, en % del mosaico: posición, tamaño y retardo de entrada. La
 * primera es la más grande y la única con alt y prioridad: es la candidata a LCP.
 * El encuadre de la foto lo pone `.hero-tile img` en `css/input.css`.
 */
const TILES = Object.freeze([
    { x: 26, y: 8, w: 40, h: 56, delay: '0.05s' },
    { x: 69, y: 0, w: 31, h: 42, delay: '0.15s' },
    { x: 26, y: 67, w: 40, h: 31, delay: '0.25s' },
    { x: 69, y: 45, w: 31, h: 36, delay: '0.3s' },
    { x: 0, y: 24, w: 23, h: 30, delay: '0.35s' },
    { x: 0, y: 57, w: 23, h: 22, delay: '0.45s' }
]);

/**
 * Teselas del hero de la home: la misma foto recortada por CSS en cada una, así que
 * todas comparten una única descarga. Lo usan el SSG, que lo deja en el HTML publicado,
 * y `HomeHubController`, en desarrollo.
 * @param {HeroMosaicData} data
 * @returns {string} HTML de las teselas, para el contenedor `.hero-mosaic`.
 */
export function getHeroMosaicHTML({ image, imageMobile, alt, width, height }) {
    const source = imageMobile ? `<source media="(max-width: 768px)" srcset="${imageMobile}">` : '';

    return TILES.map(({ x, y, w, h, delay }, index) => {
        const isMain = index === 0;
        const imgAttrs = isMain ? `alt="${alt}" fetchpriority="high"` : 'alt=""';
        // Las variables van en `style` y no como clases `[--x:26]`: Tailwind solo genera
        // las clases que encuentra escritas tal cual, y aquí los números se interpolan.
        return `
            <div class="hero-tile" style="--x:${x};--y:${y};--w:${w};--h:${h};--d:${delay}"${isMain ? '' : ' aria-hidden="true"'}>
                <picture>
                    ${source}
                    <img src="${image}" ${imgAttrs} loading="eager" decoding="async" width="${width}" height="${height}">
                </picture>
            </div>`;
    }).join('');
}
