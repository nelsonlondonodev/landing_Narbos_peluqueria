/**
 * UIService
 * Centralizes generic UI interactions and animations.
 */
export class UIService {
    constructor() {
        this.init();
    }

    init() {
        this.initHeaderScroll();
        this.initHeroAnimation();
        this.initScrollSpy();
        this.initGallery();
        this.initModals();
        this.initVideoPlayer();
        this.initScrollAnimations();
        
    }

    initHeaderScroll() {
        const header = document.querySelector("header");
        if (!header) return;

        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                header.classList.add("header-scrolled");
            } else {
                header.classList.remove("header-scrolled");
            }
        });
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

    initScrollSpy() {
        const sections = document.querySelectorAll("main section[id], footer[id]");
        const navLinks = document.querySelectorAll("header nav .hidden a");

        if (sections.length === 0 || navLinks.length === 0) return;

        const onScroll = () => {
            const scrollPosition = window.scrollY + 150;
            sections.forEach((section) => {
                if (
                    scrollPosition >= section.offsetTop &&
                    scrollPosition < section.offsetTop + section.offsetHeight
                ) {
                    navLinks.forEach((link) => {
                        link.classList.remove("nav-link-active");
                    });
                    const correspondingLink = document.querySelector(
                        `header nav .hidden a[href*="${section.id}"]`
                    );
                    if (correspondingLink) {
                        correspondingLink.classList.add("nav-link-active");
                    }
                }
            });
        };
        window.addEventListener("scroll", onScroll);
    }

    initGallery() {
        const galleryFilters = document.getElementById("gallery-filters");
        const galleryItems = document.querySelectorAll(".gallery-item");

        if (!galleryFilters || galleryItems.length === 0) return;

        const filterButtons = document.querySelectorAll(".filter-btn");
        const defaultFilterBtn = document.querySelector('.filter-btn[data-filter="todos"]');
        
        if (defaultFilterBtn) {
            filterButtons.forEach((btn) => btn.classList.remove("filter-btn-active"));
            defaultFilterBtn.classList.add("filter-btn-active");
        }

        galleryFilters.addEventListener("click", (e) => {
            const clickedButton = e.target.closest(".filter-btn");
            if (clickedButton) {
                const filterValue = clickedButton.getAttribute("data-filter");
                filterButtons.forEach((btn) => btn.classList.remove("filter-btn-active"));
                clickedButton.classList.add("filter-btn-active");

                galleryItems.forEach((item) => {
                    const itemCategory = item.getAttribute("data-category");
                    item.style.display = (filterValue === "todos" || filterValue === itemCategory) ? "" : "none";
                });

                if (typeof lightbox !== "undefined" && lightbox) {
                    lightbox.reload();
                }
            }
        });

        // Initialize GLightbox only if available globally
        if (typeof GLightbox !== "undefined") {
            const lightbox = GLightbox({ selector: ".glightbox" });
            
            // Accessibility fix
            const mainContent = document.querySelector("main");
            const header = document.querySelector("header");
            const footer = document.querySelector("footer");

            lightbox.on('open', () => {
                if (mainContent) { mainContent.setAttribute('inert', ''); mainContent.removeAttribute('aria-hidden'); }
                if (header) { header.setAttribute('inert', ''); header.removeAttribute('aria-hidden'); }
                if (footer) { footer.setAttribute('inert', ''); footer.removeAttribute('aria-hidden'); }
            });

            lightbox.on('close', () => {
                if (mainContent) mainContent.removeAttribute('inert');
                if (header) header.removeAttribute('inert');
                if (footer) footer.removeAttribute('inert');
            });
        }
    }

    initModals() {
        const openModalTriggers = document.querySelectorAll("[data-modal-target]");
        if (openModalTriggers.length === 0) return;

        const openModal = (modal) => {
            if (modal) {
                modal.classList.remove("hidden");
                document.body.style.overflow = "hidden";
            }
        };

        const closeModal = (modal) => {
            if (modal) {
                modal.classList.add("hidden");
                document.body.style.overflow = "";
            }
        };

        openModalTriggers.forEach((trigger) => {
            trigger.addEventListener("click", () => {
                const modal = document.getElementById(trigger.dataset.modalTarget);
                openModal(modal);
            });

            // Keyboard Accessibility Support
            trigger.addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    const modal = document.getElementById(trigger.dataset.modalTarget);
                    openModal(modal);
                }
            });
        });

        document.querySelectorAll('[id$="-modal"]').forEach((modal) => {
            const closeButton = modal.querySelector("[data-modal-close]");
            if (closeButton) {
                closeButton.addEventListener("click", () => closeModal(modal));
            }
            modal.addEventListener("click", (e) => {
                if (e.target === modal) closeModal(modal);
            });
        });

        window.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                const openModal = document.querySelector('[id$="-modal"]:not(.hidden)');
                closeModal(openModal);
            }
        });
    }

    initVideoPlayer() {
        const videoContainer = document.getElementById("video-container");
        if (!videoContainer) return;

        const promoVideo = document.getElementById("promo-video");
        const videoPlayButton = document.getElementById("video-play-button");

        if (!promoVideo || !videoPlayButton) return;

        videoContainer.addEventListener("click", () => {
            if (promoVideo.paused) {
                promoVideo.play();
            } else {
                promoVideo.pause();
            }
        });

        promoVideo.addEventListener("play", () => {
            videoPlayButton.classList.add("hidden");
        });

        promoVideo.addEventListener("pause", () => {
            videoPlayButton.classList.remove("hidden");
        });

        promoVideo.addEventListener("ended", () => {
            videoPlayButton.classList.remove("hidden");
        });
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
