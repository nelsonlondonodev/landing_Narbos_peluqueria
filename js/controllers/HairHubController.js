import { ServiceCard } from '../components/ServiceCard.js';
import { getBentoGridHTML } from '../components/BentoGrid.js';
import { pagesData } from '../data/pagesData.js';
import { hairSalonServices } from '../data/hairSalonServices.js';

/**
 * HairHubController
 * Gestiona el Hub de Peluquería. Las subpáginas no cargan `service-page.js`: las
 * lleva `hair-page.js`, con el registro de `hairPageServices.js`.
 */
export class HairHubController {
    constructor(app, pageKey) {
        this.app = app;
        this.pageKey = pageKey;
        this.config = pagesData[this.pageKey];
    }

    /**
     * Inicializa todos los componentes de la página de Peluquería.
     */
    init() {
        this.renderServicesGrid();
        this.renderGallery();
    }

    /**
     * Renderiza el grid de servicios del hub.
     */
    renderServicesGrid() {
        const grid = document.getElementById('hair-services-grid');
        if (!grid) return;

        grid.innerHTML = '';
        const fragment = document.createDocumentFragment();

        hairSalonServices.forEach(data => {
            const processedData = {
                ...data,
                image: this.app.resolvePath(data.image),
                link: this.app.resolvePath(data.link)
            };
            fragment.appendChild(new ServiceCard(processedData).render());
        });

        grid.appendChild(fragment);
    }

    /**
     * Renderiza el componente Bento Grid específico de la página de peluquería si existe.
     */
    renderGallery() {
        const container = document.getElementById('bento-gallery-root');
        if (!container || !this.config || !this.config.gallery) return;

        const processedItems = this.processGalleryItems(this.config.gallery);
        container.innerHTML = getBentoGridHTML(processedItems, this.config.galleryOptions || {});
    }

    /**
     * Procesa las rutas relativas de la galería antes de darlas al componente.
     * @private
     */
    processGalleryItems(items) {
        return items.map(item => this.app.resolveDeep(item));
    }
}
