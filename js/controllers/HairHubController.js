import { ServiceCard } from '../components/ServiceCard.js';
import { getBentoGridHTML } from '../components/BentoGrid.js';
import { pagesData } from '../data/pagesData.js';
import { hairSalonServices } from '../data/hairSalonServices.js';
import { hairCutStyles } from '../data/hairCutStyles.js';
import { colorStyles } from '../data/colorStyles.js';
import { tintStyles } from '../data/tintStyles.js';
import { treatmentStyles } from '../data/treatmentStyles.js';

/**
 * HairHubController
 * Gestiona de forma anatómica la lógica del Hub de Peluquería y sus subpáginas de servicios.
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
     * Renderiza el grid de servicios específico según la página actual.
     */
    renderServicesGrid() {
        const grid = document.getElementById('hair-services-grid');
        if (!grid) return;

        grid.innerHTML = '';
        const fragment = document.createDocumentFragment();
        const services = this.getServicesForCurrentPage();

        services.forEach(data => {
            const processedData = {
                ...data,
                image: this.app.resolvePath(data.image),
                link: this.app.resolvePath(data.link)
            };
            const cardElement = new ServiceCard(processedData).render();
            this.setupHairServiceLightbox(cardElement, processedData);
            fragment.appendChild(cardElement);
            this.setupHairServiceGallery(grid, processedData);
        });

        grid.appendChild(fragment);
    }

    /**
     * Retorna los datos de servicios correspondientes a la página secundaria actual.
     * @private
     */
    getServicesForCurrentPage() {
        switch (this.pageKey) {
            case 'cortes-de-pelo': return hairCutStyles;
            case 'balayage-mechas': return colorStyles;
            case 'color-tinturas-cabello': return tintStyles;
            case 'tratamientos-capilares': return treatmentStyles;
            default: return hairSalonServices; // Para la página 'peluqueria' (Hub Principal)
        }
    }

    /**
     * Configura el componente GLightbox directamente en la tarjeta de servicio si aplica.
     * @private
     */
    setupHairServiceLightbox(cardElement, data) {
         if (cardElement.tagName !== 'A' || !this.pageKey) return;
         
         const prefixes = {
             'cortes-de-pelo': 'gallery-',
             'balayage-mechas': 'gallery-color-',
             'color-tinturas-cabello': 'gallery-tint-',
             'tratamientos-capilares': 'gallery-treatment-'
         };
         const prefix = prefixes[this.pageKey];
         if (!prefix) return;

         cardElement.classList.add('glightbox');
         const uniqueGalleryId = prefix + data.title.replace(/\s+/g, '-').toLowerCase();
         cardElement.setAttribute('data-gallery', uniqueGalleryId);
         cardElement.setAttribute('data-title', data.title);
         cardElement.href = 'javascript:void(0);';
         cardElement.setAttribute('data-href', encodeURI(this.app.resolvePath(data.image)));
    }

    /**
     * Renderiza links ocultos para habilitar una galería lightbox anidada para cada servicio.
     * @private
     */
    setupHairServiceGallery(container, data) {
        if (!data.galleryImages || !this.pageKey) return;
        
        const prefixes = { 
            'cortes-de-pelo': 'gallery-', 
            'balayage-mechas': 'gallery-color-',
            'color-tinturas-cabello': 'gallery-tint-',
            'tratamientos-capilares': 'gallery-treatment-'
        };
        const prefix = prefixes[this.pageKey] || 'gallery-default-';
        const uniqueGalleryId = prefix + data.title.replace(/\s+/g, '-').toLowerCase();

        data.galleryImages.forEach((item) => {
            const imgUrlRaw = typeof item === 'string' ? item : item.src;
            const imgUrl = encodeURI(this.app.resolvePath(imgUrlRaw));
            
            const hiddenLink = document.createElement('a');
            hiddenLink.href = 'javascript:void(0);'; 
            hiddenLink.setAttribute('data-href', imgUrl);
            hiddenLink.className = 'glightbox hidden'; 
            hiddenLink.setAttribute('data-gallery', uniqueGalleryId);
            hiddenLink.style.display = 'none';
            container.appendChild(hiddenLink);
        });
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
        return items.map(item => ({
            ...item,
            src: this.app.resolvePath(item.src),
            poster: item.poster ? this.app.resolvePath(item.poster) : undefined
        }));
    }
}
