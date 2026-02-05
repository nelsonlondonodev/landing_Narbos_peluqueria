/**
 * Componente Carrusel de Reseñas.
 * Maneja la lógica del slider de testimonios: autolay, navegación y alturas responsivas.
 */
export class ReviewsCarousel {
    constructor() {
        this.DOM = {
            wrapper: document.getElementById("reviews-slider-wrapper"),
            slides: document.querySelectorAll(".review-slide"),
            prevBtn: document.getElementById("prev-review"),
            nextBtn: document.getElementById("next-review"),
            slider: document.getElementById("reviews-slider")
        };

        this.state = {
            currentIndex: 0,
            autoPlayInterval: null,
            autoPlayDelay: 7000
        };

        this.init();
    }

    /**
     * Inicializa el componente si los elementos existen.
     */
    init() {
        if (!this.DOM.wrapper || this.DOM.slides.length === 0) return;

        this.setupStyles();
        this.bindEvents();
        this.updateView(this.state.currentIndex);
        this.startAutoPlay();
    }

    /**
     * Configura los estilos necesarios para el funcionamiento (CSS Grid Stack).
     */
    setupStyles() {
        if (!this.DOM.slider) return;

        this.DOM.slides.forEach(slide => {
            slide.style.display = ''; // Limpiar inline styles previos
            // Styles now handled in CSS for CLS prevention
        });
    }

    /**
     * Asigna los manejadores de eventos.
     */
    bindEvents() {
        if (this.DOM.prevBtn) {
            this.DOM.prevBtn.addEventListener("click", (e) => this.handleNavigation(e, 'prev'));
        }
        if (this.DOM.nextBtn) {
            this.DOM.nextBtn.addEventListener("click", (e) => this.handleNavigation(e, 'next'));
        }
    }

    /**
     * Maneja la navegación manual.
     * @param {Event} e 
     * @param {'prev'|'next'} direction 
     */
    handleNavigation(e, direction) {
        e.preventDefault();
        e.stopPropagation();
        
        if (direction === 'prev') this.prev();
        else this.next();

        this.stopAutoPlay();
    }

    /**
     * Actualiza la visibilidad de los slides.
     * @param {number} index 
     */
    updateView(index) {
        this.DOM.slides.forEach((slide, i) => {
            const isActive = i === index;
            slide.style.opacity = isActive ? '1' : '0';
            slide.style.visibility = isActive ? 'visible' : 'hidden';
            slide.style.zIndex = isActive ? '1' : '0';
        });
    }

    next() {
        this.state.currentIndex = (this.state.currentIndex + 1) % this.DOM.slides.length;
        this.updateView(this.state.currentIndex);
    }

    prev() {
        this.state.currentIndex = (this.state.currentIndex - 1 + this.DOM.slides.length) % this.DOM.slides.length;
        this.updateView(this.state.currentIndex);
    }

    startAutoPlay() {
        this.stopAutoPlay();
        this.state.autoPlayInterval = setInterval(() => this.next(), this.state.autoPlayDelay);
    }

    stopAutoPlay() {
        if (this.state.autoPlayInterval) {
            clearInterval(this.state.autoPlayInterval);
            this.state.autoPlayInterval = null;
        }
    }
}
