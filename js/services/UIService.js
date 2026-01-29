/**
 * Servicio de UI.
 * Maneja animaciones globales, efectos de entrada y scroll.
 */
export class UIService {
    constructor() {
        this.init();
    }

    init() {
        this.initHeroAnimation();
        this.initScrollAnimations();
    }

    /**
     * Inicia las animaciones de entrada del Hero (título y subtítulo).
     */
    initHeroAnimation() {
        const heroTitle = document.getElementById("hero-title");
        const heroSubtitle = document.getElementById("hero-subtitle");

        if (heroTitle) {
            setTimeout(() => heroTitle.classList.add("is-visible"), 100);
        }
        
        if (heroSubtitle) {
            setTimeout(() => heroSubtitle.classList.add("is-visible"), 400);
        }
    }

    /**
     * Configura el IntersectionObserver para animar elementos al hacer scroll.
     */
    initScrollAnimations() {
        const animatedElements = document.querySelectorAll("[data-animation]");
        if (animatedElements.length === 0) return;

        const observer = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        this.animateElement(entry.target, observer);
                    }
                });
            },
            { threshold: 0.1 }
        );

        animatedElements.forEach((element) => {
            element.classList.add("animation-hidden");
            observer.observe(element);
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
