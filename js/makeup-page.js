import { App } from './App.js';
import { Breadcrumbs } from './components/Breadcrumbs.js';
import { ServiceCard } from './components/ServiceCard.js';
import { ServiceModal } from './components/ServiceModal.js';
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
    initBreadcrumbs();
    initMakeupServicesGrid();
    initGallery();
}

/**
 * Configura y renderiza los Breadcrumbs
 */
function initBreadcrumbs() {
    const breadcrumbsRoot = document.getElementById('breadcrumbs-root');
    if (!breadcrumbsRoot) return;

    const items = [
        { label: 'Inicio', link: '../../' },
        { label: 'Maquillaje', link: '#' }
    ];
    breadcrumbsRoot.innerHTML = new Breadcrumbs(items).render();
}

/* -------------------------------------------------------------------------- */
/*                                GRID & MODAL                                */
/* -------------------------------------------------------------------------- */

/**
 * Configura el contenedor principal del Grid de servicios
 */
function initMakeupServicesGrid() {
    const gridContainer = document.getElementById('makeup-services-grid');
    if (!gridContainer) return;
    
    // INTELLIGENT HYDRATION: Si el SSG ya inyectó contenido, no lo sobreescribimos.
    if (gridContainer.children.length > 0) {
        console.log("✅ [MakeupPage] Contenido del SSG detectado. Manteniendo hidratación estática.");
        return;
    }

    gridContainer.innerHTML = '';

    const serviceModal = new ServiceModal(makeupServices);
    const hubServices = getHubServices();

    renderServiceCards(gridContainer, hubServices, serviceModal);
}

/**
 * Obtiene los servicios filtrados para la pantalla principal (Hub)
 * @returns {Array} Servicios de categoría 'hub'
 */
function getHubServices() {
    return makeupServices.filter(s => s.category === 'hub');
}

/**
 * Renderiza múltiples tarjetas en un contenedor dado
 * @param {HTMLElement} container - Contenedor DOM
 * @param {Array} services - Lista de servicios a renderizar
 * @param {ServiceModal} modalInstance - Instancia del modal para inyección
 */
function renderServiceCards(container, services, modalInstance) {
    if (!services || services.length === 0) return;

    services.forEach(service => {
        const cardElement = createServiceCard(service, modalInstance);
        container.appendChild(cardElement);
    });
}

/**
 * Crea el elemento DOM individual de una tarjeta de servicio
 * @param {Object} service - Objeto de datos del servicio
 * @param {ServiceModal} modalInstance - Instancia del modal
 * @returns {HTMLElement} Elemento DOM construido
 */
function createServiceCard(service, modalInstance) {
    const isModal = !!service.modal;

    const cardElement = new ServiceCard({
        title: service.title,
        description: service.description,
        image: window.narbosApp.resolvePath(service.image),
        price: service.price,
        link: window.narbosApp.resolvePath(service.link || '#'),
        variant: service.variant || 'standard',
        modalId: isModal ? 'service-modal' : null
    }).render();

    if (isModal) attachModalEvent(cardElement, service.id, modalInstance);

    return cardElement;
}

/**
 * Agrega el listener de eventos para abrir el modal
 * @param {HTMLElement} cardElement - Elemento que recibe el clic
 * @param {number} serviceId - Id del servicio atado al modal
 * @param {ServiceModal} modalInstance - Gestor del modal
 */
function attachModalEvent(cardElement, serviceId, modalInstance) {
    cardElement.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        modalInstance.open(serviceId);
    });
    cardElement.style.cursor = 'pointer';
    cardElement.removeAttribute('href');
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

        const processedGallery = galleryData.map(item => ({
            ...item,
            src: window.narbosApp.resolvePath(item.src)
        }));

        galleryRoot.innerHTML = getBentoGridHTML(processedGallery);
        
        if (typeof GLightbox !== 'undefined') {
            GLightbox({ selector: '.glightbox', touchNavigation: true, loop: true });
        }
    }
}
