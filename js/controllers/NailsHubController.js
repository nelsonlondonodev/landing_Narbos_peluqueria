import { getBentoGridHTML } from '../components/BentoGrid.js';
import { pagesData } from '../data/pagesData.js';
import { nailsCardsFor } from '../data/nailsServices.js';
import { appendServiceCards } from '../utils/serviceCards.js';
import { BrandsSection } from '../components/BrandsSection.js';
import { nailBrands } from '../data/brandsData.js';

export class NailsHubController {
    constructor(app, pageKey) {
        this.app = app;
        this.pageKey = pageKey;
        this.config = pagesData[this.pageKey];
    }

    init() {
        this.renderServicesGrid();
        this.renderGallery();
        this.renderBrands();
    }

    renderBrands() {
        if (document.getElementById('nail-brands-root')) {
            new BrandsSection('nail-brands-root', nailBrands).render();
        }
    }

    /** Pinta el grid en desarrollo; con el build ya llega pintado por el SSG. */
    renderServicesGrid() {
        const grid = document.getElementById('nail-services-grid');
        if (!grid || grid.children.length > 0) return;

        appendServiceCards(grid, nailsCardsFor(this.pageKey));
    }

    renderGallery() {
        const galleryRoot = document.getElementById('nails-gallery-root') || document.getElementById('bento-gallery-root');
        if (!galleryRoot || !this.config || !this.config.gallery) return;

        const processedItems = this.config.gallery.map(item => this.app.resolveDeep(item));

        const titleHTML = `
            <div class="text-center mb-12" data-animation="fadeInUp">
                <h2 class="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">Nuestros Trabajos</h2>
                <p class="text-lg text-gray-700 max-w-2xl mx-auto">Descubre la perfección en cada detalle.</p>
            </div>
        `;
        galleryRoot.innerHTML = titleHTML + getBentoGridHTML(processedItems, this.config.galleryOptions || {});
        this.initLightbox();
    }

    initLightbox() {
        if (typeof GLightbox !== 'undefined') {
            GLightbox({
                selector: '.glightbox',
                touchNavigation: true,
                loop: true,
                zoomable: true,
                openEffect: 'zoom',
                closeEffect: 'zoom'
            });
        }
    }
}
