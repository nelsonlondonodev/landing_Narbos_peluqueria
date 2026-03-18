/**
 * Servicio de UI.
 * Maneja animaciones globales, efectos de entrada y scroll.
 */
export class UIService {
    constructor() {
        // Prevención de scroll automático del navegador al recargar
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }
        this.init();
    }

    init() {
        this.handleInitialScroll();
        this.initHeroAnimation();
        this.initScrollAnimations();
        this.enableSmoothScroll();
    }

    /**
     * Garantiza que la página inicie en el tope al recargar,
     * evitando que el H1 quede oculto tras el navbar.
     */
    handleInitialScroll() {
        if (!window.location.hash) {
            window.scrollTo(0, 0);
        }
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
                threshold: 0.05,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        // PHASE 1: Batch Read — Collect geometry without triggering writes
        const viewportHeight = window.innerHeight;
        const elementsWithVisibility = Array.from(animatedElements).map(el => ({
            el,
            isAboveFold: el.getBoundingClientRect().top < viewportHeight
        }));

        // PHASE 2: Batch Write — Apply classes/observe without interleaving reads
        elementsWithVisibility.forEach(({ el, isAboveFold }) => {
            if (isAboveFold) {
                this.animateElement(el, observer);
            } else {
                el.classList.add("animation-hidden");
                observer.observe(el);
            }
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
