import { App } from './App.js';

import { BrandsSection } from './components/BrandsSection.js';
import { getBentoGridHTML } from './components/BentoGrid.js';
import { getVideoSectionHTML } from './components/VideoSection.js';
import { removeExpiredBadges } from './utils/newBadge.js';
import { ServiceCard } from './components/ServiceCard.js';
import { renderCartaServicios } from './components/CartaServicios.js';
import { hairBrands, smoothingBrands } from './data/brandsData.js';
import { pagesData } from './data/pagesData.js';
import { hairCartaFor, hairServicesFor, hairSubpageFor } from './data/hairPageServices.js';

/**
 * Hair Page Logic
 * Custom logic for the Hair Salon section.
 * Refactored to use modular components and unified data source.
 */

document.addEventListener('DOMContentLoaded', () => {
    // App initialization is now handled globally by main.js to ensure consistency
    /*
    if (!window.narbosApp) {
        const app = new App();
        window.narbosApp = app;
        app.init();
    }
    */

    initPageComponents();
});

function initPageComponents() {

    initBrandsCarousel();
    initVideoSection();
    removeExpiredBadges();
    initGallery();
    initHairServicesGrid();
    initHairCarta();
}

/* -------------------------------------------------------------------------- */
/*                           COMPONENT INITIALIZERS                           */
/* -------------------------------------------------------------------------- */

/**
 * Resuelve la clave de `pagesData` correspondiente a la página actual.
 */
function getPageKey() {
    return hairSubpageFor(window.location.pathname) ?? 'peluqueria';
}

/**
 * Pinta la sección de video en desarrollo.
 *
 * En producción la inyecta el SSG, porque el rastreador tiene que ver el marcado que
 * respalda el `VideoObject`. Aquí solo se cubre el caso de trabajar contra el código
 * fuente sin pasar por el build, y por eso se comprueba que el contenedor esté vacío:
 * sobre `dist` no debe volver a pintar nada.
 */
function initVideoSection() {
    const root = document.getElementById('video-section-root');
    if (!root || root.children.length > 0) return;

    const videoData = pagesData[getPageKey()]?.video;
    if (!videoData) return;

    root.innerHTML = getVideoSectionHTML(window.narbosApp.resolveDeep(videoData));
}

function initGallery() {
    const galleryRoot = document.getElementById('hair-gallery-root'); // Updated ID
    if (!galleryRoot) return;

    const pageKey = getPageKey();
    const galleryData = pagesData[pageKey]?.gallery;

    if (galleryData) {
        const titleHTML = `
            <div class="text-center mb-12" data-animation="fadeInUp">
                <h2 class="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">Nuestros Trabajos</h2>
                <p class="text-lg text-gray-700 max-w-2xl mx-auto">Resultados reales en cabellos reales.</p>
            </div>
        `;
        const processedGallery = galleryData.map(item => window.narbosApp.resolveDeep(item));

        galleryRoot.innerHTML = titleHTML + getBentoGridHTML(processedGallery);
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
        const isSmoothingPage = getPageKey() === 'tratamientos-capilares';
        const brandsToRender = isSmoothingPage ? smoothingBrands : hairBrands;
        new BrandsSection(brandsId, brandsToRender).render();
    }
}



/* -------------------------------------------------------------------------- */
/*                                    GRID                                    */
/* -------------------------------------------------------------------------- */

function initHairCarta() {
    const root = document.getElementById('hair-carta-root');
    const carta = hairCartaFor(getPageKey());
    if (root && carta && !root.children.length) root.innerHTML = renderCartaServicios(carta);
}

function initHairServicesGrid() {
    const gridContainer = document.getElementById('hair-services-grid');
    // Con el build ya llega pintado por el SSG.
    if (!gridContainer || gridContainer.querySelector('[id^="service-card-"]')) return;

    hairServicesFor(getPageKey()).forEach(service => {
        gridContainer.appendChild(new ServiceCard({
            ...service,
            image: window.narbosApp.resolvePath(service.image),
            link: service.link && window.narbosApp.resolvePath(service.link),
            variant: service.variant || 'standard'
        }).render());
    });
}
