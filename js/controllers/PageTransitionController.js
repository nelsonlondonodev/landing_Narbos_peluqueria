/**
 * Controlador de Transiciones de Página.
 * Maneja la animación suave de entrada y salida entre navegaciones.
 * Implementa una estrategia híbrida:
 * 1. Native View Transitions (donde esté soportado).
 * 2. Fallback CSS Fade-In/Out para navegadores estándar.
 */
export class PageTransitionController {
    constructor() {
        this.links = document.querySelectorAll('a[href^="/"], a[href^="./"], a[href^="../"]');
        this.init();
    }

    init() {
        // 1. Animación de Entrada (Al cargar la página)
        this.handleEnterAnimation();

        // 2. Interceptar clics para Animación de Salida
        this.setupExitAnimations();

        // 3. Manejo de bfcache (Browser Back/Forward Cache)
        window.addEventListener('pageshow', (event) => {
            if (event.persisted) {
                this.isExiting = false;
                document.body.classList.remove('page-is-exiting');
                document.body.classList.add('page-is-loaded');
            }
        });

        // 4. Bloqueo de doble navegación
        this.isExiting = false;
    }

    handleEnterAnimation() {
        // LCP Optimization: Body is visible by default. 
    }

    setupExitAnimations() {
        document.body.addEventListener('click', (e) => {
            if (this.isExiting) return;

            const link = e.target.closest('a');
            if (!link) return;

            const href = link.getAttribute('href');
            if (!href) return;

            // Condiciones para ignorar navegación controlada:
            if (link.target === '_blank' || 
                href.startsWith('#') || 
                href.startsWith('javascript:') || 
                href.startsWith('mailto:') || 
                href.startsWith('tel:') || 
                e.ctrlKey || e.metaKey || e.shiftKey) {
                return;
            }
            
            // Verificar si es un enlace interno real
            try {
                const targetUrl = new URL(link.href, window.location.origin);
                if (targetUrl.origin !== window.location.origin) return; // Enlace externo

                // Ejecutar transición de salida
                this.isExiting = true;
                e.preventDefault();
                this.animateExit(targetUrl.href);
            } catch (err) {
                // Si falla el parseo de URL, dejamos que el navegador maneje el clic normalmente
            }
        });
    }

    animateExit(url) {
        document.body.classList.add('page-is-exiting');

        // Tiempo de seguridad para la navegación
        const timeout = setTimeout(() => {
            window.location.href = url;
        }, 300);

        // Si la navegación tarda demasiado (por red), aseguramos el cambio
        setTimeout(() => {
            if (window.location.href !== url) {
               window.location.href = url;
            }
        }, 500); 
    }
}
