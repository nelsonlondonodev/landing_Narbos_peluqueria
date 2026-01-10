/**
 * GalleryController
 * Manages gallery filtering and GLightbox integration.
 */
export class GalleryController {
    constructor() {
        this.initGallery();
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
            const lightbox = GLightbox({ 
                selector: ".glightbox",
                touchNavigation: true,
                loop: true,
                autoplayVideos: true
            });
            
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
}
