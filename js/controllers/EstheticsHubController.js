import { getBentoGridHTML } from '../components/BentoGrid.js';
import { estheticsCardsFor, estheticsServices } from '../data/estheticsServices.js';
import { pagesData } from '../data/pagesData.js';
import { appendServiceCards } from '../utils/serviceCards.js';

/**
 * EstheticsHubController
 * Controlador anatómico y modular para el Hub de Estética y sus subpáginas.
 */
export class EstheticsHubController {
    constructor(app, pageKey) {
        this.app = app;
        this.pageKey = pageKey;
        this.config = pagesData[this.pageKey];
    }

    /**
     * Inicializa todos los componentes de Estética.
     */
    init() {
        this.renderServicesGrid();
        this.renderGallery();
    }

    /**
     * Pinta el grid en desarrollo; con el build ya llega pintado por el SSG.
     */
    renderServicesGrid() {
        const grid = document.getElementById('aesthetics-services-static');
        if (!grid || grid.children.length > 0) return;

        appendServiceCards(grid, this.pageKey === 'estetica' ? estheticsServices : estheticsCardsFor(this.pageKey));
    }

    /**
     * Renderiza la galería Bento exclusiva de Estética.
     */
    renderGallery() {
        const container = document.getElementById('bento-gallery-root');
        if (!container || !this.config || !this.config.gallery) return;

        const processedItems = this.config.gallery.map(item => this.app.resolveDeep(item));
        container.innerHTML = getBentoGridHTML(processedItems, this.config.galleryOptions || {});
    }
}
