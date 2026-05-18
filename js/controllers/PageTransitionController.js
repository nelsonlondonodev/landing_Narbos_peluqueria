import { resolveRoute } from '../config.js';

/**
 * Controlador de Transiciones de Página.
 * Maneja la animación suave de entrada y salida entre navegaciones.
 */
export class PageTransitionController {
    static NAVIGABLE_EXTENSIONS = ['.html', '/', ''];

    constructor() {
        this.isExiting = false;
        this.init();
    }

    init() {
        this.setupExitAnimations();
        this._handleBrowserCache();
    }

    setupExitAnimations() {
        document.body.addEventListener('click', (e) => {
            if (this.isExiting) return;

            const link = e.target.closest('a');
            if (!link) return;

            const href = link.getAttribute('href');
            if (this._isLinkNavigable(link, href, e)) {
                this._handleInternalNavigation(link.href, e);
            }
        });
    }

    _isLinkNavigable(link, href, e) {
        if (!href) return false;
        
        const isSpecialProtocol = ['#', 'javascript:', 'mailto:', 'tel:'].some(p => href.startsWith(p));
        const isExternalOrModifier = link.target === '_blank' || e.ctrlKey || e.metaKey || e.shiftKey;
        
        // Whitelist de extensiones para evitar interceptar descargas (PDF, etc)
        const url = new URL(link.href);
        const ext = url.pathname.substring(url.pathname.lastIndexOf('.'));
        const isNavigable = PageTransitionController.NAVIGABLE_EXTENSIONS.some(e => 
            url.pathname.endsWith(e) || (e === '/' && url.pathname.endsWith('/'))
        );

        return !isSpecialProtocol && !isExternalOrModifier && isNavigable;
    }

    _handleInternalNavigation(url, e) {
        try {
            const targetUrl = new URL(url, window.location.origin);
            if (targetUrl.origin !== window.location.origin) return;

            // --- Enrutamiento Inteligente en Tiempo de Ejecución (Runtime Routing) ---
            // Si estamos fuera del dominio de producción, adaptamos la URL añadiendo .html en caliente.
            const isProductionDomain = ['narbossalon.com', 'www.narbossalon.com'].includes(window.location.hostname);
            const isLocal = ['localhost', '127.0.0.1'].some(h => window.location.hostname.includes(h));
            const isGitHubPages = window.location.hostname.includes('github.io');
            const isLocalFile = window.location.protocol.startsWith('file:');

            const needsHtml = !isProductionDomain || isLocal || isGitHubPages || isLocalFile;
            
            if (needsHtml) {
                let pathname = targetUrl.pathname;
                if (pathname.endsWith('/')) {
                    pathname += 'index.html';
                } else {
                    const lastSegment = pathname.substring(pathname.lastIndexOf('/') + 1);
                    if (lastSegment && !lastSegment.includes('.')) {
                        pathname += '.html';
                    }
                }
                targetUrl.pathname = pathname;
            }

            this.isExiting = true;
            e.preventDefault();
            this._performExitAnimation(targetUrl.href);
        } catch (err) {}
    }

    _performExitAnimation(url) {
        document.body.classList.add('page-is-exiting');

        // Sincronizado con CSS Transition
        setTimeout(() => {
            window.location.href = url;
        }, 300);

        // Fail-safe
        setTimeout(() => {
            if (window.location.href !== url) window.location.href = url;
        }, 800); 
    }

    _handleBrowserCache() {
        window.addEventListener('pageshow', (event) => {
            if (event.persisted) {
                this.isExiting = false;
                document.body.classList.remove('page-is-exiting');
            }
        });
    }
}

