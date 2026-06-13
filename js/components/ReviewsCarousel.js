import googleReviews from '../data/google-reviews.js';

/**
 * Componente Carrusel de Reseñas.
 * Maneja la lógica del slider de testimonios: autoplay, navegación, render dinámico y alturas adaptativas.
 */
export class ReviewsCarousel {
    constructor() {
        this.DOM = {
            wrapper: document.getElementById("reviews-slider-wrapper"),
            prevBtn: document.getElementById("prev-review"),
            nextBtn: document.getElementById("next-review"),
            slider: document.getElementById("reviews-slider"),
            averageRating: document.getElementById("reviews-average-rating"),
            totalCount: document.getElementById("reviews-total-count"),
            slides: []
        };

        this.state = {
            currentIndex: 0,
            autoPlayInterval: null,
            autoPlayDelay: 7000
        };

        this.init();
    }

    /**
     * Inicializa el componente.
     */
    init() {
        if (!this.DOM.wrapper || !this.DOM.slider) return;

        this.hydrateHeader();
        this.renderSlides();
        
        if (this.DOM.slides.length === 0) return;

        this.bindEvents();
        this.updateView(this.state.currentIndex);
        this.startAutoPlay();
    }

    /**
     * Hidrata la cabecera del carrusel con la puntuación y cantidad de opiniones reales.
     */
    hydrateHeader() {
        if (this.DOM.averageRating && googleReviews.rating) {
            this.DOM.averageRating.textContent = googleReviews.rating.toFixed(1);
        }
        if (this.DOM.totalCount && googleReviews.userRatingCount) {
            this.DOM.totalCount.textContent = `(${googleReviews.userRatingCount} opiniones en Google)`;
        }
    }

    renderSlides() {
        const reviews = googleReviews.reviews || [];
        if (reviews.length === 0) {
            // Usar los que ya existan en el DOM (fallback progresivo para SEO e indexación)
            this.DOM.slides = this.DOM.slider.querySelectorAll(".review-slide");
            return;
        }

        const slidesHTML = reviews.map((review, i) => this.createSlideTemplate(review, i)).join('');
        this.DOM.slider.innerHTML = slidesHTML;
        this.DOM.slides = this.DOM.slider.querySelectorAll(".review-slide");
    }

    /**
     * Crea la plantilla HTML para un slide individual.
     * @param {Object} review 
     * @param {number} index 
     * @returns {string} HTML string
     */
    createSlideTemplate(review, index) {
        const isFirst = index === 0;
        const positionClass = isFirst ? 'relative' : 'absolute inset-0';
        const opacityClass = isFirst ? 'opacity-100' : 'opacity-0';
        const visibilityStyle = isFirst ? '' : 'style="visibility: hidden;"';
        
        // Sanitizar y dar formato a los saltos de línea
        const formattedText = review.text ? review.text.replace(/\n/g, '<br>') : '';

        return `
            <div class="review-slide ${positionClass} w-full ${opacityClass} transition-all duration-500 ease-in-out flex flex-col justify-center" ${visibilityStyle}>
                <p class="text-xl md:text-2xl font-serif italic text-brand-gray-dark mb-6 leading-relaxed">
                    "${formattedText}"
                </p>
                <div class="font-bold text-brand-green text-base">${review.author}</div>
                <a href="https://maps.app.goo.gl/h3sVPXeiKamdy9KH9" target="_blank" class="text-xs text-brand-gray-dark/50 mt-1 hover:text-brand-green transition-colors underline decoration-dotted decoration-1 underline-offset-2 inline-block" title="Ver reseña en Google Maps">
                    Cliente de Google Maps • Reseña verificada (${review.relativeTime})
                </a>
            </div>
        `;
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
     */
    handleNavigation(e, direction) {
        e.preventDefault();
        e.stopPropagation();
        
        if (direction === 'prev') this.prev();
        else this.next();

        this.stopAutoPlay();
    }

    /**
     * Actualiza la visibilidad de los slides alternando también el tipo de posicionamiento.
     * El slide activo se hace 'relative' para determinar el alto dinámico del carrusel,
     * previniendo colapsos de altura y adaptándose de forma elástica a testimonios largos.
     */
    updateView(index) {
        this.DOM.slides.forEach((slide, i) => {
            const isActive = i === index;
            slide.style.opacity = isActive ? '1' : '0';
            slide.style.visibility = isActive ? 'visible' : 'hidden';
            slide.style.zIndex = isActive ? '1' : '0';
            slide.style.position = isActive ? 'relative' : 'absolute';
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
