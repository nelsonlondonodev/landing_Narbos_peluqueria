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

        // Hover events to pause autoplay
        this.sliderWrapper.addEventListener("mouseenter", () => this.stopAutoPlay());
        this.sliderWrapper.addEventListener("mouseleave", () => this.startAutoPlay());

        // Responsive Height Management
        this.unifySlideHeights();
        window.addEventListener("resize", () => this.unifySlideHeights());

        // Initial State
        this.showReview(this.currentIndex);
        this.startAutoPlay();


    }

    unifySlideHeights() {
        if (window.matchMedia("(min-width: 768px)").matches) {
            // Desktop view: set all slides to the height of the tallest one
            let maxHeight = 0;
            
            // Reset to auto to measure natural height
            this.reviewSlides.forEach((slide) => {
                slide.style.height = "auto";
                if (slide.offsetHeight > maxHeight) {
                    maxHeight = slide.offsetHeight;
                }
            });

            // Apply max height
            this.reviewSlides.forEach((slide) => {
                slide.style.minHeight = `${maxHeight}px`;
            });
        } else {
            // Mobile view: let height be natural
            this.reviewSlides.forEach((slide) => {
                slide.style.minHeight = "auto";
                slide.style.height = "auto";
            });
        }
    }

    showReview(index) {
        this.reviewSlides.forEach((slide, i) => {
            slide.style.display = i === index ? "block" : "none";
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
