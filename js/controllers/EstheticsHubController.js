import { ServiceCard } from '../components/ServiceCard.js';
import { getBentoGridHTML } from '../components/BentoGrid.js';
import { estheticsServices } from '../data/estheticsServices.js';
import { pagesData } from '../data/pagesData.js';
import { ServiceModal } from '../components/ServiceModal.js';

/**
 * EstheticsHubController
 * Controlador anatómico y modular para el Hub de Estética y sus subpáginas.
 */
export class EstheticsHubController {
    constructor(app, pageKey) {
        this.app = app;
        this.pageKey = pageKey;
        this.config = pagesData[this.pageKey];
        
        // Configuración de páginas que requieren filtrado específico
        this.subPagesMap = {
            'spa-facial-integral': 'spa-facial-integral',
            'masajes-relajantes': 'masajes-relajantes',
            'cejas-y-pestanas': 'cejas-y-pestanas',
            'depilacion-corporal': 'depilacion-corporal',
            'limpieza-facial': 'limpieza-facial'
        };
    }

    /**
     * Inicializa todos los componentes de Estética.
     */
    init() {
        this.renderServicesGrid();
        this.renderGallery();
    }

    /**
     * Renderiza el grid de servicios con filtrado inteligente por contexto.
     */
    renderServicesGrid() {
        const grid = document.getElementById('aesthetics-services-static');
        if (!grid) return;

        const { services, modalInstance } = this.getProcessedServices();
        
        // Si el grid ya tiene contenido (inyectado por SSG o de forma nativa), evitar destruir el DOM (LCP/TBT Fix)
        if (grid.children.length > 0) {
            if (modalInstance) {
                // Recuperar y asociar lógica a las tarjetas que ya fueron renderizadas en HTML
                const cards = grid.querySelectorAll('[id^="service-card-"]');
                cards.forEach(card => {
                    const serviceId = card.getAttribute('data-modal-target');
                    if (serviceId) {
                        this.attachModalLogic(card, modalInstance, serviceId);
                    }
                });
            }
            return;
        }

        grid.innerHTML = '';
        const fragment = document.createDocumentFragment();

        services.forEach(data => {
            const cardElement = this.createServiceCard(data, modalInstance);
            fragment.appendChild(cardElement);
        });

        grid.appendChild(fragment);
    }

    /**
     * Obtiene y procesa los servicios según la página actual.
     * @private
     */
    getProcessedServices() {
        let displayServices = estheticsServices;
        let serviceModal = null;

        const subPageFragment = this.subPagesMap[this.pageKey];
        
        if (subPageFragment) {
            // Filtrado atómico por URL/Fragmento
            displayServices = estheticsServices.filter(s => s.link.includes(subPageFragment));
            
            // Garantizar IDs únicos para los modales de detalles
            displayServices.forEach(s => {
                if (!s.id) s.id = s.title.replace(/\s+/g, '-').toLowerCase();
            });

            serviceModal = new ServiceModal(estheticsServices);
        }

        return { services: displayServices, modalInstance: serviceModal };
    }

    /**
     * Crea un elemento ServiceCard configurado.
     * @private
     */
    createServiceCard(data, modalInstance) {
        const processedData = {
            ...data,
            image: this.app.resolvePath(data.image),
            // Si hay modal, desactivamos navegación directa para usar interactividad avanzada
            link: modalInstance ? '#' : this.app.resolvePath(data.link),
            id: data.id 
        };

        const cardElement = new ServiceCard(processedData).render();

        if (modalInstance) {
            this.attachModalLogic(cardElement, modalInstance, data.id);
        }

        return cardElement;
    }

    /**
     * Conecta la lógica del modal a la tarjeta de servicio.
     * @private
     */
    attachModalLogic(cardElement, modalInstance, serviceId) {
        const linkEl = cardElement.querySelector('a') || cardElement;
        if(linkEl.tagName === 'A') linkEl.removeAttribute('href');
        
        cardElement.style.cursor = 'pointer';
        cardElement.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            modalInstance.open(serviceId);
        });
    }

    /**
     * Renderiza la galería Bento exclusiva de Estética.
     */
    renderGallery() {
        const container = document.getElementById('bento-gallery-root');
        if (!container || !this.config || !this.config.gallery) return;

        const processedItems = this.config.gallery.map(item => ({
            ...item,
            src: this.app.resolvePath(item.src),
            poster: item.poster ? this.app.resolvePath(item.poster) : undefined
        }));

        container.innerHTML = getBentoGridHTML(processedItems, this.config.galleryOptions || {});
    }
}
