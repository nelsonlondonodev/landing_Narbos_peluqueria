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
        const servicesGrid = document.getElementById('services-grid');
        if (servicesGrid && servicesData) {
            servicesGrid.innerHTML = '';
            servicesData.forEach(data => {
                const processedData = {
                    ...data,
                    link: this.app.resolvePath(data.link),
                    image: this.app.resolvePath(data.image)
                };
                const card = new ServiceCard(processedData);
                servicesGrid.appendChild(card.render());
            });
        }
    }

    /**
     * Carga de manera diferida (Lazy Hydration) los componentes pesados del Home.
     */
    initInteractiveComponents() {
        // Slider infinito de Marcas exclusivas del Home
        this.app.observeAndInit('#home-brands-root', async () => {
            const { BrandsSection } = await import('../components/BrandsSection.js');
            const { allBrands } = await import('../data/brandsData.js');
            new BrandsSection('home-brands-root', allBrands).render();
        });

        // Controlador de modales de inicio
        setTimeout(async () => {
            const { ModalController } = await import('./ModalController.js');
            new ModalController();
        }, 1000); 
        
        // Botón Compartir exclusivo de la vista inicial
        setTimeout(async () => {
             const { ShareButton } = await import('../components/ShareButton.js');
             new ShareButton();
        }, 2000);
    }
}
