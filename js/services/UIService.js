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
        const delay = element.getAttribute("data-animation-delay");

        element.classList.add("is-visible");

        if (animationName) {
            element.classList.add("animate__animated", `animate__${animationName}`);
        }
        
        if (delay) {
            element.style.animationDelay = delay;
        }

        observer.unobserve(element);
    }
}
