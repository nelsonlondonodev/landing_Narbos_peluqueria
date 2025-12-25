/**
 * ReviewsCarousel Component
 * Handles the testimonials slider logic: auto-play, navigation, and responsive heights.
 */
export class ReviewsCarousel {
    constructor() {
        this.sliderWrapper = document.getElementById("reviews-slider-wrapper");
        this.reviewSlides = document.querySelectorAll(".review-slide");
        this.prevBtn = document.getElementById("prev-review");
        this.nextBtn = document.getElementById("next-review");

        this.currentIndex = 0;
        this.autoPlayInterval = null;
        this.autoPlayDelay = 7000;

        this.init();
    }

    init() {
        if (!this.sliderWrapper || this.reviewSlides.length === 0 || !this.prevBtn || !this.nextBtn) {
            // Component not present on this page
            return;
        }

        // Event Listeners for Navigation
        this.prevBtn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.prev();
            this.stopAutoPlay();
        });

        this.nextBtn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.next();
            this.stopAutoPlay();
        });

        // Apply CSS Grid Stack pattern for auto-height
        // This forces the container to take the height of the tallest slide automatically via CSS
        this.sliderWrapper.querySelector('#reviews-slider').style.display = 'grid';
        this.sliderWrapper.querySelector('#reviews-slider').style.gridTemplateAreas = '"stack"';
        
        this.reviewSlides.forEach(slide => {
            // Remove inline display:none that might be present in HTML
            slide.style.display = ''; 
            
            slide.style.gridArea = 'stack';
            slide.style.transition = 'opacity 0.5s ease-in-out';
            // Ensure slides overlap correctly
            slide.style.width = '100%'; 
        });

        // Initial State
        this.showReview(this.currentIndex);
        this.startAutoPlay();
    }

    // Removed unifySlideHeights as CSS Grid handles it natively now

    showReview(index) {
        this.reviewSlides.forEach((slide, i) => {
            if (i === index) {
                slide.style.opacity = '1';
                slide.style.visibility = 'visible';
                slide.style.zIndex = '1';
            } else {
                slide.style.opacity = '0';
                slide.style.visibility = 'hidden';
                slide.style.zIndex = '0';
            }
        });
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.reviewSlides.length;
        this.showReview(this.currentIndex);
    }

    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.reviewSlides.length) % this.reviewSlides.length;
        this.showReview(this.currentIndex);
    }

    startAutoPlay() {
        this.stopAutoPlay(); // Ensure no duplicate intervals
        this.autoPlayInterval = setInterval(() => this.next(), this.autoPlayDelay);
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
}
