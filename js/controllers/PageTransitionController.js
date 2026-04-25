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

