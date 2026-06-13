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
        this.initMapLazyLoad();
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

        // Galería de Videos de YouTube
        this.app.observeAndInit('#video-gallery-root', async () => {
            const { YouTubeGallery } = await import('../components/YouTubeGallery.js');
            const { homeVideos } = await import('../data/videoData.js');
            new YouTubeGallery('video-gallery-root', homeVideos).render();
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

    /**
     * Inicializa el escuchador para la carga diferida del mapa interactivo de la Home.
     */
    initMapLazyLoad() {
        const button = document.getElementById('load-map-home-btn');
        if (!button) return;

        button.addEventListener('click', () => {
            this.loadGoogleMap();
        });
    }

    /**
     * Crea e inserta el iframe de Google Maps en la sección del mapa de la Home.
     */
    loadGoogleMap() {
        const container = document.getElementById('map-home-container');
        const placeholder = document.getElementById('map-home-placeholder');
        if (!container || !placeholder) return;

        const iframe = document.createElement('iframe');
        iframe.src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3975.3509389748656!2d-74.039479227166!3d4.880758995095013!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e4079007a3b0ab7%3A0xb81b9628c4e7ebba!2zUGVsdXF1ZXLDrWEgfCBOYXJib-KAmXMgc2Fsw7NuIHNwYSB8IENoaWE!5e0!3m2!1ses-419!2ses!4v1773042307626!5m2!1ses-419!2ses";
        iframe.title = "Ubicación de Narbo's Salón Spa en Google Maps";
        iframe.className = "absolute inset-0 w-full h-full border-0 animate__animated animate__fadeIn";
        iframe.allowFullscreen = "";
        iframe.referrerPolicy = "no-referrer-when-downgrade";

        placeholder.style.opacity = '0';
        setTimeout(() => {
            placeholder.remove();
            container.appendChild(iframe);
        }, 500);
    }
}

