import { ServiceCard } from '../components/ServiceCard.js';
import { getBentoGridHTML } from '../components/BentoGrid.js';
import { barberServices } from '../data/barberServices.js';
import { pagesData } from '../data/pagesData.js';

/**
 * BarberHubController
 * Gestiona de forma anatómica la lógica del Hub de Barbería.
 */
export class BarberHubController {
    constructor(app) {
        this.app = app;
        this.pageKey = 'barberia';
        this.config = pagesData[this.pageKey];
    }

    /**
     * Inicializa todos los componentes de la página de Barbería.
     */
    init() {
        if (!this.config) return;

        this.renderServicesGrid();
        this.renderGallery();
        // Las decoraciones y el Hero ya son gestionados por App.js de forma global
    }

    /**
     * Renderiza el grid de servicios de barbería.
     */
    renderServicesGrid() {
        const grid = document.getElementById('barber-services-grid');
        if (!grid) return;

        grid.innerHTML = '';
        const fragment = document.createDocumentFragment();

        barberServices.forEach(service => {
            const cardElement = this.createServiceCard(service);
            fragment.appendChild(cardElement);
        });

        grid.appendChild(fragment);
    }

    /**
     * Crea una instancia anatómica de ServiceCard.
     * @private
     */
    createServiceCard(service) {
        const processedData = {
            ...service,
            image: this.app.resolvePath(service.image),
            link: this.app.resolvePath(service.link)
        };

        return new ServiceCard(processedData).render();
    }

    /**
     * Renderiza la galería Bento exclusiva de Barbería.
     */
    renderGallery() {
        const container = document.getElementById('bento-gallery-root');
        if (!container || !this.config.gallery) return;

        const processedItems = this.processGalleryItems(this.config.gallery);
        container.innerHTML = getBentoGridHTML(processedItems, this.config.galleryOptions || {});
    }

    /**
     * Procesa los items de la galería ajustando las rutas.
     * @private
     */
    processGalleryItems(items) {
        return items.map(item => ({
            ...item,
            src: this.app.resolvePath(item.src),
            poster: item.poster ? this.app.resolvePath(item.poster) : undefined
        }));
    }
}
