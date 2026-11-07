import { App } from './App.js';

import { BrandsSection } from './components/BrandsSection.js';
import { getBentoGridHTML } from './components/BentoGrid.js';
import { nailBrands } from './data/brandsData.js';
import { pagesData } from './data/pagesData.js';
import { nailsCardsFor } from './data/nailsServices.js';
import { appendServiceCards } from './utils/serviceCards.js';

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
        // Hydration check for gallery
        if (galleryRoot.children.length > 0) return;

        const processedGallery = galleryData.map(item => window.narbosApp.resolveDeep(item));

        renderGallery(galleryRoot, processedGallery);
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



/* -------------------------------------------------------------------------- */
/*                                    GRID                                    */
/* -------------------------------------------------------------------------- */

/**
 * Pinta el grid en desarrollo; con el build ya llega pintado por el SSG.
 */
function initNailServicesGrid() {
    const grid = document.getElementById('nail-services-grid');
    if (!grid || grid.children.length > 0) return;

    appendServiceCards(grid, nailsCardsFor(getPageKeyFromPath(window.location.pathname)));
}
