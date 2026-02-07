/**
 * Controlador de Galería.
 * Maneja el filtrado de imágenes y la integración con GLightbox.
 */
export class GalleryController {
    constructor() {
        this.init();
    }

    init() {
        this.DOM = {
            filtersContainer: document.getElementById("gallery-filters"),
            items: document.querySelectorAll(".gallery-item"),
            filterButtons: document.querySelectorAll(".filter-btn")
        };

        if (!this.DOM.filtersContainer || this.DOM.items.length === 0) return;

        this.setupFilters();
        this.setupLightbox();
    }

    /**
     * Configura la lógica de filtrado de categorías.
     */
    setupFilters() {
        const defaultFilterBtn = document.querySelector('.filter-btn[data-filter="todos"]');
        if (defaultFilterBtn) {
            this.toggleActiveFilter(defaultFilterBtn);
        }

        this.DOM.filtersContainer.addEventListener("click", (e) => {
            const clickedButton = e.target.closest(".filter-btn");
            if (!clickedButton) return;

            const filterValue = clickedButton.getAttribute("data-filter");
            this.toggleActiveFilter(clickedButton);
            this.applyFilter(filterValue);
            this.reloadLightbox();
        });
    }

    toggleActiveFilter(activeButton) {
        this.DOM.filterButtons.forEach((btn) => btn.classList.remove("filter-btn-active"));
        activeButton.classList.add("filter-btn-active");
    }

    applyFilter(filterValue) {
        this.DOM.items.forEach((item) => {
            const itemCategory = item.getAttribute("data-category");
            const shouldShow = filterValue === "todos" || filterValue === itemCategory;
            item.style.display = shouldShow ? "" : "none";
        });
    }

    /**
     * Inicializa GLightbox si la librería está disponible.
     */
    setupLightbox() {
        if (typeof GLightbox === "undefined") return;

        this.lightbox = GLightbox({ 
            selector: ".glightbox",
            touchNavigation: true,
            loop: true,
            autoplayVideos: true
        });

        this.setupAccessibilityEvents();
    }

    reloadLightbox() {
        if (this.lightbox) {
            this.lightbox.reload();
        }
    }

    /**
     * Maneja la accesibilidad (inert attribute) al abrir/cerrar el lightbox.
     */
    setupAccessibilityEvents() {
        if (!this.lightbox) return;

        const appWrapper = document.getElementById("app-wrapper");

        this.lightbox.on('open', () => {
            // ROBUST FIX: 
            // 1. Remove focus from the trigger element immediately to prevent "aria-hidden" conflict.
            if (document.activeElement instanceof HTMLElement) {
                document.activeElement.blur();
            }

            // 2. Apply inert to the main app wrapper to hide background content from screen readers.
            if (appWrapper) {
                // Use a minimal delay (0) just to allow the blur to process, but rely on logic, not race conditions.
                requestAnimationFrame(() => {
                    appWrapper.setAttribute('inert', '');
                    appWrapper.removeAttribute('aria-hidden'); // Ensure no stale attributes
                });
            }
        });

        this.lightbox.on('close', () => {
            if (appWrapper) appWrapper.removeAttribute('inert');
        });
    }
}
