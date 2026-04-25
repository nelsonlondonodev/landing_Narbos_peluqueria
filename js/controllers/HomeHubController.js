import { getHomeModalsHTML } from '../components/HomeModals.js';
import { ServiceCard } from '../components/ServiceCard.js';
import { servicesData } from '../data/servicesData.js';

/**
 * HomeHubController
 * Controlador exclusivo para la lógica dinámica de la página principal (Home).
 */
export class HomeHubController {
    constructor(app) {
        this.app = app;
    }

    /**
     * Inicializa todos los componentes de la página de inicio.
     */
    init() {
        this.mountHomeModals();
        this.mountHomeServices();
        this.initInteractiveComponents();
    }

    /**
     * Monta el contenedor de los modales dinámicos específicos del Home.
     */
    mountHomeModals() {
        const modalsRoot = document.getElementById('modals-root');
        if (modalsRoot && modalsRoot.children.length === 0) {
            modalsRoot.innerHTML = getHomeModalsHTML();
        }
    }

    /**
     * Monta las tarjetas de servicio dinámicamente en el Grid de la portada.
     */
    mountHomeServices() {
        const grid = document.getElementById('services-grid');
        if (!grid || grid.children.length > 0 || !servicesData) return;

        grid.innerHTML = '';
        servicesData.forEach(data => {
            const processedData = {
                ...data,
                link: this.app.resolvePath(data.link),
                image: this.app.resolvePath(data.image)
            };
            grid.appendChild(new ServiceCard(processedData).render());
        });
    }

    /**
     * Carga diferida de componentes no críticos.
     */
    initInteractiveComponents() {
        // Slider de Marcas
        this.app.observeAndInit('#home-brands-root', async () => {
            const { BrandsSection } = await import('../components/BrandsSection.js');
            const { allBrands } = await import('../data/brandsData.js');
            new BrandsSection('home-brands-root', allBrands).render();
        });

        // Inicialización en tiempo de inactividad para componentes de UI secundarios
        const initSecondary = async () => {
            const [ { ModalController }, { ShareButton } ] = await Promise.all([
                import('./ModalController.js'),
                import('../components/ShareButton.js')
            ]);
            new ModalController();
            new ShareButton();
        };

        if (window.requestIdleCallback) {
            requestIdleCallback(initSecondary, { timeout: 2000 });
        } else {
            setTimeout(initSecondary, 2000);
        }
    }
}

