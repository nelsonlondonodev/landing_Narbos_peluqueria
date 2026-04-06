import { App } from './App.js';
import { Breadcrumbs } from './components/Breadcrumbs.js';
import { ServiceCard } from './components/ServiceCard.js';
import { ServiceModal } from './components/ServiceModal.js';
import { makeupServices } from './data/makeupServices.js';

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
    initMakeupServicesGrid();
}

function initBreadcrumbs() {
    const breadcrumbsRoot = document.getElementById('breadcrumbs-root');
    if (!breadcrumbsRoot) return;

    const items = [
        { label: 'Inicio', link: '../../' },
        { label: 'Maquillaje', link: '#' }
    ];
    breadcrumbsRoot.innerHTML = new Breadcrumbs(items).render();
}

function initMakeupServicesGrid() {
    const gridContainer = document.getElementById('makeup-services-grid');
    if (!gridContainer) return;
    gridContainer.innerHTML = '';

    const serviceModal = new ServiceModal(makeupServices);
    const services = makeupServices.filter(s => s.category === 'hub');

    services.forEach(service => {
        const cardElement = new ServiceCard({
            title: service.title,
            description: service.description,
            image: service.image,
            price: service.price,
            link: service.link || '#',
            variant: service.variant || 'standard',
            modalId: service.modal ? 'service-modal' : null
        }).render();

        if (service.modal) {
            cardElement.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                serviceModal.open(service.id);
            });
            cardElement.style.cursor = 'pointer';
            cardElement.removeAttribute('href');
        }
        gridContainer.appendChild(cardElement);
    });
}
