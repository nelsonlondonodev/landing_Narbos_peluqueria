import { App } from './App.js';
import { ServiceCard } from './components/ServiceCard.js';
import { getBentoGridHTML } from './components/BentoGrid.js';
import { pagesData } from './data/pagesData.js';
import { makeupServices } from './data/makeupServices.js';

document.addEventListener('DOMContentLoaded', () => {
    initCoreApp();
    initPageComponents();
});

/**
 * Inicializa la aplicación principal (Navbar, Footer, etc.) si no existe
 */
function initCoreApp() {
    if (!window.narbosApp) {
        const app = new App();
        window.narbosApp = app;
        app.init();
    }
}

/**
 * Inicializa los componentes individuales de la página
 */
function initPageComponents() {
    initMakeupServicesGrid();
    initGallery();
}

/* -------------------------------------------------------------------------- */
/*                                    GRID                                    */
/* -------------------------------------------------------------------------- */

/**
 * Pinta el grid de servicios en desarrollo; con el build ya llega pintado por el SSG.
 */
function initMakeupServicesGrid() {
    const gridContainer = document.getElementById('makeup-services-grid');
    if (!gridContainer || gridContainer.children.length > 0) return;

    makeupServices.forEach(service => {
        gridContainer.appendChild(new ServiceCard({
            ...service,
            image: window.narbosApp.resolvePath(service.image),
            variant: service.variant || 'standard'
        }).render());
    });
}

/**
 * Inicializa la galería Bento inyectando el HTML generado
 */
function initGallery() {
    const galleryRoot = document.getElementById('makeup-gallery-root');
    if (!galleryRoot) return;

    const galleryData = pagesData['maquillaje']?.gallery;
    if (galleryData) {
        // Hydration check for gallery
        if (galleryRoot.children.length > 0) return;

        const processedGallery = galleryData.map(item => window.narbosApp.resolveDeep(item));

        galleryRoot.innerHTML = getBentoGridHTML(processedGallery);
        
        if (typeof GLightbox !== 'undefined') {
            GLightbox({ selector: '.glightbox', touchNavigation: true, loop: true });
        }
    }
}
