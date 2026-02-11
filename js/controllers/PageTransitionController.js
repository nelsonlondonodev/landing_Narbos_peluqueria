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
        // Necesario para que Safari/iOS no muestre la página con opacidad 0 al volver atrás.
        window.addEventListener('pageshow', (event) => {
            if (event.persisted) {
                document.body.classList.remove('page-is-exiting');
                document.body.classList.add('page-is-loaded');
            }
        });
    }

    handleEnterAnimation() {
        // LCP Optimization: Body is visible by default. 
        // No manual fade-in required here to prevent render blocking.
    }

    setupExitAnimations() {
        document.body.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            
            // Condiciones para ignorar navegación controlada:
            if (!link) return;
            if (link.target === '_blank') return; // Abre en nueva pestaña
            if (link.getAttribute('href').startsWith('#')) return; // Es un ancla interna
            if (link.getAttribute('href').startsWith('mailto:')) return;
            if (link.getAttribute('href').startsWith('tel:')) return;
            if (e.ctrlKey || e.metaKey) return; // Ctrl+Click
            
            // Verificar si es un enlace interno real
            const targetUrl = new URL(link.href, window.location.origin);
            if (targetUrl.origin !== window.location.origin) return; // Enlace externo

            // Ejecutar transición de salida
            e.preventDefault();
            this.animateExit(targetUrl.href);
        });
    }

    animateExit(url) {
        document.body.classList.add('page-is-exiting');

        // Esperar a que termine la duración de la transición CSS (definida en styles)
        // Usamos un timeout ligeramente más corto que la transición CSS para evitar pantallas blancas.
        setTimeout(() => {
            window.location.href = url;
        }, 300); // 300ms coincide con la duración CSS propuesta
    }
}
