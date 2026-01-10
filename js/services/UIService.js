export class UIService {
    constructor() {
        this.init();
    }

    init() {
        this.initHeroAnimation();
        this.initScrollAnimations();
    }

    initHeroAnimation() {
        const heroTitle = document.getElementById("hero-title");
        const heroSubtitle = document.getElementById("hero-subtitle");

        if (heroTitle && heroSubtitle) {
            setTimeout(() => {
                heroTitle.classList.add("is-visible");
            }, 100);
            setTimeout(() => {
                heroSubtitle.classList.add("is-visible");
            }, 400);
        }
    }

    initScrollAnimations() {
        const animatedElements = document.querySelectorAll("[data-animation]");
        if (animatedElements.length === 0) return;

        const observer = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const element = entry.target;
                        const animation = element.getAttribute("data-animation");
                        const delay = element.getAttribute("data-animation-delay");

                        element.classList.add("is-visible");

                        if (animation) {
                            element.classList.add("animate__animated", `animate__${animation}`);
                        }
                        
                        if (delay) {
                            element.style.animationDelay = delay;
                        }

                        observer.unobserve(element);
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
}
