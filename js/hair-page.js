import { App } from './App.js';
import { Breadcrumbs } from './components/Breadcrumbs.js';
import { FloatingDecorations } from './components/FloatingDecorations.js';
import { BrandsSection } from './components/BrandsSection.js';
import { getBentoGridHTML } from './components/BentoGrid.js';
import { ServiceCard } from './components/ServiceCard.js';
import { ServiceModal } from './components/ServiceModal.js';
import { hairBrands } from './data/brandsData.js';
import { pagesData } from './data/pagesData.js';
import { hairPageServices } from './data/hairPageServices.js';

/**
 * Hair Page Logic
 * Custom logic for the Hair Salon section.
 * Refactored to use modular components and unified data source.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Explicitly initialize Core App (Navbar, Footer, etc)
    if (!window.narbosApp) {
        const app = new App();
        window.narbosApp = app;
        app.init();
    }

    initPageComponents();
});

function initPageComponents() {
    initBreadcrumbs();
    initFloatingDecorations();
    initBrandsCarousel();
    initGallery();
    initHairServicesGrid();
}

/* -------------------------------------------------------------------------- */
/*                           COMPONENT INITIALIZERS                           */
/* -------------------------------------------------------------------------- */

function initGallery() {
    const galleryRoot = document.getElementById('hair-gallery-root'); // Updated ID
    if (!galleryRoot) return;

    // Determine current page key for Gallery Data
    const path = window.location.pathname;
    let pageKey = 'peluqueria'; // Default Hub
    
    if (path.includes('cortes-de-pelo')) pageKey = 'cortes-de-pelo';
    if (path.includes('balayage-mechas')) pageKey = 'balayage-mechas'; // Check pagesData key matches
    if (path.includes('color-tinturas')) pageKey = 'color-tinturas-cabello';
    if (path.includes('tratamientos')) pageKey = 'tratamientos-capilares';

    const galleryData = pagesData[pageKey]?.gallery;

    if (galleryData) {
        const titleHTML = `
            <div class="text-center mb-12" data-animation="fadeInUp">
                <h2 class="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">Nuestros Trabajos</h2>
                <p class="text-lg text-gray-700 max-w-2xl mx-auto">Resultados reales en cabellos reales.</p>
            </div>
        `;
        galleryRoot.innerHTML = titleHTML + getBentoGridHTML(galleryData);
        initLightbox();
    } else {
        console.warn(`Gallery data not found for page key: ${pageKey}`);
    }
}

function initLightbox() {
    if (typeof GLightbox !== 'undefined') {
        GLightbox({
            selector: '.glightbox',
            touchNavigation: true,
            loop: true,
            zoomable: true,
            openEffect: 'zoom',
            closeEffect: 'zoom'
        });
    } else {
        setTimeout(initLightbox, 100);
    }
}

function initBrandsCarousel() {
    const brandsId = 'hair-brands-root';
    if (document.getElementById(brandsId)) {
        // Use the imported hairBrands from data/brandsData.js
        new BrandsSection(brandsId, hairBrands).render();
    }
}

function initFloatingDecorations() {
    new FloatingDecorations({
        basePath: '../../',
        enableAnimation: false, 
        customConfig: [
             {
                parent: 'inicio',
                img: 'ui/decorations/hoja-seca-3d.webp',
                speed: 0,
                wrapperClasses: '-right-6 top-0 md:-right-12 md:-top-4 z-10',
                imgClasses: 'w-32 md:w-56 rotate-12 opacity-80'
            },
            {
                parent: 'inicio',
                img: 'ui/decorations/hoja-verde-3d.webp',
                speed: 0,
                wrapperClasses: '-left-8 bottom-0 md:-left-4 md:-bottom-12 z-10',
                imgClasses: 'w-28 md:w-48 -rotate-12 opacity-80'
            }
        ]
    });
}

function initBreadcrumbs() {
    const breadcrumbsRoot = document.getElementById('breadcrumbs-root');
    if (!breadcrumbsRoot) return;

    const currentPath = window.location.pathname;
    const items = [
        { label: 'Inicio', link: '../../index.html' }
    ];

    const isIndex = currentPath.endsWith('/peluqueria/') || currentPath.endsWith('/peluqueria/index.html');
    
    // Level 2: Hub
    items.push({ 
        label: 'Peluquería', 
        link: isIndex ? '#' : '../../servicios/peluqueria/index.html' 
    });

    // Level 3: Subpages
    if (currentPath.includes('cortes-de-pelo')) items.push({ label: 'Cortes', link: '#' });
    if (currentPath.includes('balayage-mechas')) items.push({ label: 'Balayage', link: '#' });
    if (currentPath.includes('color-tinturas')) items.push({ label: 'Color', link: '#' });
    if (currentPath.includes('tratamientos')) items.push({ label: 'Tratamientos', link: '#' });

    breadcrumbsRoot.innerHTML = new Breadcrumbs(items).render();
}

/* -------------------------------------------------------------------------- */
/*                                GRID & MODAL                                */
/* -------------------------------------------------------------------------- */

function initHairServicesGrid() {
    const gridContainer = document.getElementById('hair-services-grid');
    if (!gridContainer) return;

    gridContainer.innerHTML = '';

    const serviceModal = new ServiceModal(hairPageServices);
    const filteredServices = getFilteredServices();

    renderServiceCards(gridContainer, filteredServices, serviceModal);
}

function getFilteredServices() {
    const path = window.location.pathname;
    
    if (path.includes('cortes-de-pelo')) {
        return hairPageServices.filter(s => s.category === 'cortes');
    }
    
    // Unificación de categorías Color y Balayage para ambas páginas relacionadas
    if (path.includes('balayage-mechas') || path.includes('color-tinturas')) {
        return hairPageServices.filter(s => s.category === 'color' || s.category === 'balayage');
    }
    
    if (path.includes('tratamientos')) {
        return hairPageServices.filter(s => s.category === 'tratamientos');
    }

    // Default: Hub
    return hairPageServices.filter(s => s.category === 'hub');
}

function renderServiceCards(container, services, modalInstance) {
    if (!services || services.length === 0) return;

    services.forEach(service => {
        const cardElement = createServiceCard(service, modalInstance);
        container.appendChild(cardElement);
    });
}

function createServiceCard(service, modalInstance) {
    // If service has 'modal: true', it triggers modal. If it has 'link', it navigates.
    const isModal = !!service.modal;

    const cardElement = new ServiceCard({
        title: service.title,
        description: service.description, // already simple or markdown
        image: service.image,
        price: service.price,
        link: service.link || '#',
        variant: service.variant || 'standard',
        modalId: isModal ? 'service-modal' : null
    }).render();

    if (isModal) {
        cardElement.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            modalInstance.open(service.id);
        });
        cardElement.style.cursor = 'pointer';
        cardElement.removeAttribute('href');
    }

    return cardElement;
}
