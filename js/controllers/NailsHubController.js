import { ServiceCard } from '../components/ServiceCard.js';
import { getBentoGridHTML } from '../components/BentoGrid.js';
import { pagesData } from '../data/pagesData.js';
import { nailsServices } from '../data/nailsServices.js';
import { ServiceModal } from '../components/ServiceModal.js';
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

    renderServicesGrid() {
        const gridContainer = document.getElementById('nail-services-grid');
        if (!gridContainer) return;

        gridContainer.innerHTML = '';
        
        // Modal instance
        const serviceModal = new ServiceModal(nailsServices);

        const excludeString = gridContainer.dataset.excludeIds;
        const filteredServices = this.filterServices(nailsServices, excludeString);
        
        filteredServices.forEach(service => {
            const cardElement = this.createServiceCard(service, serviceModal);
            gridContainer.appendChild(cardElement);
        });
    }

    filterServices(services, excludeString) {
        if (!excludeString) return services;
        const excludeIds = excludeString.split(',').map(Number);
        return services.filter(s => !excludeIds.includes(s.id));
    }

    createServiceCard(service, modalInstance) {
        const resolvedImage = this.app.resolvePath(service.image);
        let linkOrHash = '#';
        if (service.link) {
             linkOrHash = this.app.resolvePath(service.link);
        }

        const cardElement = new ServiceCard({
            title: service.title,
            description: service.summary || service.description,
            image: resolvedImage,
            price: service.price,
            link: linkOrHash,
            variant: 'standard',
            modalId: service.link ? null : 'service-modal'
        }).render();

        this.attachClickBehavior(cardElement, service, modalInstance);
        return cardElement;
    }

    attachClickBehavior(element, service, modalInstance) {
        if (service.link && !this.isCurrentPage(service.link)) {
            // Normal navigation link, works natively
        } else {
            // Trigger Modal
            element.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                modalInstance.open(service.id);
            });
            element.style.cursor = 'pointer';
            if (service.link) {
                 element.removeAttribute('href'); // Visual consistency so it feels like a modal trigger
            }
        }
    }

    isCurrentPage(linkRoute) {
        const currentPath = window.location.pathname;
        return currentPath.includes(linkRoute);
    }

    renderGallery() {
        const galleryRoot = document.getElementById('nails-gallery-root') || document.getElementById('bento-gallery-root');
        if (!galleryRoot || !this.config || !this.config.gallery) return;

        const processedItems = this.config.gallery.map(item => ({
             ...item,
             src: this.app.resolvePath(item.src),
             poster: item.poster ? this.app.resolvePath(item.poster) : undefined
        }));

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
