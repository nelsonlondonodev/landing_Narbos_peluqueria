/**
 * Servicio de UI.
 * Maneja animaciones globales, efectos de entrada y scroll.
 */
export class UIService {
    constructor() {
        // Habilitar la restauración automática del scroll nativo del navegador
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'auto';
        }
        this.init();
    }

    init() {
        this.initHeroAnimation();
        this.initScrollAnimations();
        this.enableSmoothScroll();
    }

    /**
     * Habilita el scroll fluido después de que la página se haya posicionado,
     * evitando interferencias con el salto inicial de recarga.
     */
    enableSmoothScroll() {
        setTimeout(() => {
            document.documentElement.classList.add('smooth-scroll');
        }, 500);
    }

    /**
     * Inicia las animaciones de entrada del Hero (título y subtítulo).
     * @deprecated Ahora se maneja vía CSS puro en input.css para optimizar LCP.
     */
    initHeroAnimation() {
        // Mantenemos el método para compatibilidad pero delegamos a CSS
        // console.log("[UIService] Hero animation handled via CSS.");
    }

    /**
     * Configura el IntersectionObserver para animar elementos al hacer scroll.
     * Optimizado: Eliminamos cálculos manuales (getBoundingClientRect) para evitar Layout Thrashing.
     */
    initScrollAnimations() {
        const animatedElements = document.querySelectorAll("[data-animation]");
        if (animatedElements.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        this.animateElement(entry.target, observer);
                    }
                });
            },
            {
                threshold: 0.01, // 1% de intersección para que elementos gigantes se animen de inmediato
                rootMargin: '0px 0px -50px 0px'
            }
        );

        // Observar todos los elementos. Los que ya están en el viewport se dispararán inmediatamente.
        animatedElements.forEach(el => {
            el.classList.add("animation-hidden"); // Ocultar por defecto para animar entrada
            observer.observe(el);
        });
    }

    /**
     * Aplica las clases de animación a un elemento y deja de observarlo.
     * @param {HTMLElement} element 
     * @param {IntersectionObserver} observer 
     */
    animateElement(element, observer) {
        const animationName = element.getAttribute("data-animation");
        const rawDelay = element.getAttribute("data-animation-delay");
        
        // Clean Code: Delegamos la lógica de delay responsivo a una función pura
        const delay = this._getResponsiveDelay(rawDelay);

        this._applyAnimation(element, animationName, delay);
        observer.unobserve(element);
    }

    /**
     * Determina el delay óptimo basándose en el ancho de pantalla.
     * En móviles y tablets (layout vertical), eliminamos los delays escalonados 
     * para que la interacción sea inmediata y fluida (snappy), evitando la sensación de "pausa".
     * @param {string} delay - El delay original configurado
     * @returns {string} El delay optimizado
     */
    _getResponsiveDelay(delay) {
        // En desktop (lg:grid-cols-4), el layout es horizontal -> Mantener delay para efecto "ola".
        // En móvil/tablet (<1024px), el layout es vertical/dos columnas -> Delay 0s para inmediatez.
        const isDesktop = window.innerWidth >= 1024; 
        return isDesktop ? delay : '0s';
    }

    /**
     * Aplica las clases de animación y estilos al elemento.
     * @private
     */
    _applyAnimation(element, name, delay) {
        element.classList.add("is-visible");

        if (name) {
            element.classList.add("animate__animated", `animate__${name}`);
        }
        
        if (delay) {
            element.style.animationDelay = delay;
        }
    }
}
