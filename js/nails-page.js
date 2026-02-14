import { App } from './App.js';
import { Breadcrumbs } from './components/Breadcrumbs.js';
import { FloatingDecorations } from './components/FloatingDecorations.js';
import { BrandsSection } from './components/BrandsSection.js';
import { getBentoGridHTML } from './components/BentoGrid.js';
import { ServiceCard } from './components/ServiceCard.js';
import { ServiceModal } from './components/ServiceModal.js'; // Import Modal Component
import { nailBrands } from './data/brandsData.js';
import { pagesData } from './data/pagesData.js';
import { nailsServices } from './data/nailsServices.js';

/**
 * Nails Page Logic
 * Custom logic for the Nails & Spa section.
 * Refactored for clean code and scalability.
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
    initNailServicesGrid();
}

/* -------------------------------------------------------------------------- */
/*                           COMPONENT INITIALIZERS                           */
/* -------------------------------------------------------------------------- */

function initGallery() {
    const galleryRoot = document.getElementById('nails-gallery-root');
    // Early return if not found
    if (!galleryRoot) return;

    const pageKey = getPageKeyFromPath(window.location.pathname);
    const galleryData = pagesData[pageKey]?.gallery;

    if (galleryData) {
        renderGallery(galleryRoot, galleryData);
        initLightbox();
    } else {
        console.warn(`Gallery data not found for page key: ${pageKey}`);
    }
}

function getPageKeyFromPath(path) {
    if (path.includes('unas-acrilicas-gel')) return 'unas-acrilicas-gel';
    if (path.includes('manicure-pedicure')) return 'manicure-pedicure';
    return 'unas-spa'; // Default
}

function renderGallery(root, data) {
    const titleHTML = `
        <div class="text-center mb-12" data-animation="fadeInUp">
            <h2 class="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">Nuestros Trabajos</h2>
            <p class="text-lg text-gray-700 max-w-2xl mx-auto">Descubre la perfección en cada detalle.</p>
        </div>
    `;
    root.innerHTML = titleHTML + getBentoGridHTML(data);
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
        // Retry logic for deferred scripts
        setTimeout(initLightbox, 100);
    }
}

function initBrandsCarousel() {
    new BrandsSection('nail-brands-root', nailBrands).render();
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
        { label: 'Inicio', link: '../../' }
    ];

    const isIndex = currentPath.endsWith('/unas-spa/') || currentPath.endsWith('/unas-spa/index.html');
    
    // Level 2: Hub
    items.push({ 
        label: 'Uñas y Spa', 
        link: isIndex ? '#' : '../../servicios/unas-spa/' 
    });

    // Level 3: Subpages
    if (currentPath.includes('unas-acrilicas-gel')) {
        items.push({ label: 'Acrílicas y Gel', link: '#' });
    } else if (currentPath.includes('manicure-pedicure')) {
        items.push({ label: 'Manicure y Pedicure', link: '#' });
    }

    breadcrumbsRoot.innerHTML = new Breadcrumbs(items).render();
}

/* -------------------------------------------------------------------------- */
/*                                GRID & MODAL                                */
/* -------------------------------------------------------------------------- */

function initNailServicesGrid() {
    const gridContainer = document.getElementById('nail-services-grid');
    if (!gridContainer) return;

    gridContainer.innerHTML = '';
    
    // Initialize Modal Logic via Component
    const serviceModal = new ServiceModal(nailsServices);

    const excludeString = gridContainer.dataset.excludeIds;
    const filteredServices = filterServices(nailsServices, excludeString);
    
    filteredServices.forEach(service => {
        const cardElement = createServiceCard(service, serviceModal);
        gridContainer.appendChild(cardElement);
    });
}

function filterServices(services, excludeString) {
    if (!excludeString) return services;
    const excludeIds = excludeString.split(',').map(Number);
    return services.filter(s => !excludeIds.includes(s.id));
}

function createServiceCard(service, modalInstance) {
    const cardElement = new ServiceCard({
        title: service.title,
        description: service.summary || service.description,
        image: service.image,
        price: service.price,
        link: service.link || '#',
        variant: 'standard',
        modalId: service.link ? null : 'service-modal'
    }).render();

    attachClickBehavior(cardElement, service, modalInstance);
    return cardElement;
}

function attachClickBehavior(element, service, modalInstance) {
    if (service.link && !isCurrentPage(service.link)) {
        // Normal navigation behavior (anchor tag works natively)
        // No custom listener needed
    } else {
        // Trigger Modal: either explicitly (no link) or prevention (same page)
        element.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            modalInstance.open(service.id);
        });
        
        element.style.cursor = 'pointer';
        if (service.link) {
             element.removeAttribute('href'); // Visual consistency
        }
    }
}

function isCurrentPage(link) {
    const currentPath = window.location.pathname;
    // Simple robust check
    return currentPath.includes(link);
}


