import { resolveRoute } from '../config.js';

/**
 * Controlador de Transiciones de Página.
 * Maneja la animación suave de entrada y salida entre navegaciones.
 * Refactorizado bajo principios de Clean Code: Pequeño, específico y robusto.
 */
export class PageTransitionController {
    constructor() {
        this.isExiting = false;
        this.init();
    }

    init() {
        // Interceptar clics para Animación de Salida mediante delegación
        this.setupExitAnimations();
        // Manejo de caché del navegador (Back/Forward)
        this._handleBrowserCache();
    }

    /**
     * Configura el listener global de clics para detectar navegaciones.
     */
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

    /**
     * Verifica si el enlace es candidato para una transición de salida.
     * @private
     */
    _isLinkNavigable(link, href, e) {
        if (!href) return false;
        
        const isSpecialProtocol = href.startsWith('#') || 
                                 href.startsWith('javascript:') || 
                                 href.startsWith('mailto:') || 
                                 href.startsWith('tel:');
        
        const isExternalOrModifier = link.target === '_blank' || 
                                    e.ctrlKey || e.metaKey || e.shiftKey;

        return !isSpecialProtocol && !isExternalOrModifier;
    }

    /**
     * Valida el origen y ejecuta la transición si es un enlace interno.
     * @private
     */
    _handleInternalNavigation(url, e) {
        try {
            const targetUrl = new URL(url, window.location.origin);
            if (targetUrl.origin !== window.location.origin) return;

            // La URL ya es absoluta y correcta gracias al navegador y al SSG.
            // No necesitamos re-procesarla con resolveRoute para evitar duplicidad de carpetas.
            const finalUrl = targetUrl.href;

            this.isExiting = true;
            e.preventDefault();
            this._performExitAnimation(finalUrl);
        } catch (err) {
            // Ante cualquier error de parsing, dejamos que el navegador actúe de forma nativa
        }
    }

    /**
     * Ejecuta la secuencia visual de salida y redirige.
     * @private
     */
    _performExitAnimation(url) {
        document.body.classList.add('page-is-exiting');

        // Redirección cronometrada con la duración de la CSS Transition (300ms)
        setTimeout(() => {
            window.location.href = url;
        }, 300);

        // Fail-safe: Si la navegación no ocurre (ej. red lenta), forzar cambio a los 600ms
        setTimeout(() => {
            if (window.location.href !== url) {
               window.location.href = url;
            }
        }, 600); 
    }

    /**
     * Asegura que el estado visual sea correcto al volver atrás en el navegador.
     * @private
     */
    _handleBrowserCache() {
        window.addEventListener('pageshow', (event) => {
            if (event.persisted) {
                this.isExiting = false;
                document.body.classList.remove('page-is-exiting');
            }
        });
    }
}
