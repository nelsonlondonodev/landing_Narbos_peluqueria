/**
 * Abre el buscador interno desde la lupa del navbar o con `Ctrl/⌘ K` y `/`.
 *
 * Es lo único del buscador que viaja con la página. El componente y su índice se piden
 * al primer indicio de que alguien va a buscar —pasar el ratón o el dedo por la lupa—,
 * así que no suman nada a la carga inicial y, cuando llega el clic, suelen estar ya.
 */
export class SearchController {
    /**
     * @param {string} appRoot - Raíz absoluta del sitio, para los enlaces de resultados.
     */
    constructor(appRoot) {
        this.appRoot = appRoot;
        /** @type {Promise<import('../components/SiteSearch.js').SiteSearch>|null} */
        this.loading = null;
        /** @type {import('../components/SiteSearch.js').SiteSearch|null} */
        this.search = null;
    }

    init() {
        document.addEventListener('click', (e) => {
            if (!/** @type {HTMLElement} */ (e.target).closest('[data-search-open]')) return;
            e.preventDefault();
            this.open();
        });

        const prefetch = (/** @type {Event} */ e) => {
            if (/** @type {HTMLElement} */ (e.target).closest?.('[data-search-open]')) this.load();
        };
        document.addEventListener('pointerover', prefetch, { passive: true });
        document.addEventListener('touchstart', prefetch, { passive: true });
        document.addEventListener('focusin', prefetch);

        document.addEventListener('keydown', (e) => {
            const isShortcut = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k';
            const isSlash = e.key === '/' && !isTypingTarget(e.target);
            if (!isShortcut && !isSlash) return;
            e.preventDefault();
            this.open();
        });
    }

    load() {
        this.loading ??= import('../components/SiteSearch.js')
            .then(({ SiteSearch }) => {
                this.search = new SiteSearch(this.appRoot);
                return this.search;
            })
            .catch(error => {
                // Sin reintento, el siguiente clic se quedaría esperando la promesa fallida.
                this.loading = null;
                throw error;
            });
        return this.loading;
    }

    async open() {
        // Ya cargado, se abre en el mismo gesto: iOS solo saca el teclado si el foco
        // llega dentro del evento del toque, no después de un `await`.
        if (this.search) return this.search.open();
        try {
            (await this.load()).open();
        } catch (error) {
            console.error('[SearchController] No se pudo cargar el buscador:', error);
        }
    }
}

/**
 * @param {EventTarget|null} target
 * @returns {boolean}
 */
function isTypingTarget(target) {
    if (!(target instanceof HTMLElement)) return false;
    return target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName);
}
