import { App } from './App.js';
import { ServiceCard } from './components/ServiceCard.js';
import { Breadcrumbs } from './components/Breadcrumbs.js';
import { getBentoGridHTML } from './components/BentoGrid.js';
import { getHeroHTML } from './components/HeroSection.js';

import { pagesData } from './data/pagesData.js';
import { FloatingDecorations } from './components/FloatingDecorations.js';

import { BrandsSection } from './components/BrandsSection.js'; 
import { hairBrands } from './data/brandsData.js'; 
import { barberServices } from './data/barberServices.js';
import { estheticsServices } from './data/estheticsServices.js'; 
import { ServiceModal } from './components/ServiceModal.js'; 
import { BarberHubController } from './controllers/BarberHubController.js';
import { EstheticsHubController } from './controllers/EstheticsHubController.js';
import { HairHubController } from './controllers/HairHubController.js';
import { NailsHubController } from './controllers/NailsHubController.js';

/**
 * Gestor de la Página de Servicios.
 * Coordina la inicialización específica para páginas internas (Peluquería, Barbería, etc.).
 * Refactorizado para delegar la lógica a controladores atómicos.
 */
class ServicePageManager {
    constructor() {
        this.app = null;
        this.pageKey = null;
        this.init();
    }

    init() {
        this.initApp();
        this.pageKey = this.getPageKey();
        
        // --- Dispatcher Anatómico ---
        this.initControllers();
        
        // --- Componentes Globales de Página ---
        this.initFloatingDecorations(); 
        this.initBrands(); 
        this.initLazyVideos();
        this.initBreadcrumbs();
        this.initLightboxInstance(); 
    }

    /**
     * Instancia controladores específicos según la página actual.
     * @private
     */
    initControllers() {
        if (!this.pageKey) return;

        // Controlador de Barbería (Hub)
        if (this.pageKey === 'barberia') {
            new BarberHubController(this.app).init();
            return;
        }

        // Controlador de Estética (Hub y Subpáginas)
        const estheticsPages = [
            'estetica', 'spa-facial-integral', 'masajes-relajantes', 
            'cejas-y-pestanas', 'depilacion-corporal', 'limpieza-facial'
        ];
        if (estheticsPages.includes(this.pageKey)) {
            new EstheticsHubController(this.app, this.pageKey).init();
            return;
        }

        // Controlador de Peluquería (Hub y Subpáginas)
        const hairPages = [
            'peluqueria', 'cortes-de-pelo', 'balayage-mechas', 
            'color-tinturas-cabello', 'tratamientos-capilares'
        ];
        if (hairPages.includes(this.pageKey)) {
            new HairHubController(this.app, this.pageKey).init();
            return;
        }

        // Controlador de Uñas (Hub y Subpáginas)
        const nailsPages = [
            'unas-spa', 'unas-acrilicas-gel', 'manicure-pedicure'
        ];
        if (nailsPages.includes(this.pageKey)) {
            new NailsHubController(this.app, this.pageKey).init();
            return;
        }

        // --- Legado (Pendiente de refactorizar) ---
        this.initServiceGrid();
        this.initBentoGallery();
        this.initModalTriggers();
    }

    initApp() {
        if (!window.narbosApp) {
             this.app = new App();
             this.app.init(); 
             window.narbosApp = this.app;
        } else {
            this.app = window.narbosApp;
        }
    }

    getPageKey() {
        const path = window.location.pathname;

        // Peluquería
        if (path.includes('cortes-de-pelo')) return 'cortes-de-pelo';
        if (path.includes('balayage-mechas')) return 'balayage-mechas';
        if (path.includes('color-tinturas-cabello')) return 'color-tinturas-cabello';
        if (path.includes('tratamientos-capilares')) return 'tratamientos-capilares';

        // Estética
        if (path.includes('limpieza-facial')) return 'limpieza-facial';
        if (path.includes('masajes-relajantes')) return 'masajes-relajantes';
        if (path.includes('spa-facial-integral')) return 'spa-facial-integral';
        if (path.includes('cejas-y-pestanas')) return 'cejas-y-pestanas';
        if (path.includes('depilacion-corporal')) return 'depilacion-corporal';
        if (path.includes('/estetica')) return 'estetica';

        // Barbería
        if (path.includes('barberia-cortes-hombre')) return 'barberia-cortes-hombre';
        if (path.includes('barberia')) return 'barberia';

        // Uñas y Spa
        if (path.includes('unas-acrilicas-gel')) return 'unas-acrilicas-gel';
        if (path.includes('manicure-pedicure')) return 'manicure-pedicure';
        if (path.includes('unas-spa')) return 'unas-spa'; 

        // Generales
        if (path.includes('nosotros')) return 'nosotros';
        if (path.includes('contacto')) return 'contacto';
        if (path.includes('peluqueria')) return 'peluqueria';

        return null;
    }

    initBentoGallery() {
        const galleryContainer = document.getElementById('bento-gallery-root');
        if (!galleryContainer || !this.pageKey) return;

        const config = pagesData[this.pageKey];
        if (!config || !config.gallery) return;

        const galleryItems = config.gallery.map(item => ({
             ...item,
             src: this.app.resolvePath(item.src),
             poster: item.poster ? this.app.resolvePath(item.poster) : undefined
        }));

        const galleryOptions = config.galleryOptions || {};
        galleryContainer.innerHTML = getBentoGridHTML(galleryItems, galleryOptions);
    }
    
    initBrands() {
        if (this.pageKey && (this.pageKey === 'peluqueria' || this.pageKey.includes('cortes') || this.pageKey.includes('balayage'))) {
             if(document.getElementById('hair-brands-root')) {
                 new BrandsSection('hair-brands-root', hairBrands).render();
             }
        }
    }

    initModalTriggers() {
        const triggers = document.querySelectorAll('.js-open-beard-modal');
        if (triggers.length > 0) {
            let modalControllerInstance;
            triggers.forEach(trigger => {
                trigger.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (!modalControllerInstance) {
                        import('./controllers/ModalController.js').then(m => {
                            modalControllerInstance = new m.ModalController();
                            modalControllerInstance.openModal('beard-modal');
                        });
                    } else {
                        modalControllerInstance.openModal('beard-modal');
                    }
                });
            });
        }
    }

    initFloatingDecorations() {
        if (this.app) {
             setTimeout(() => {
                new FloatingDecorations({ basePath: this.app.appRoot });
             }, 50);
        }
    }

    initServiceGrid() {
        this.initBarberServices();
        this.initEstheticsServices();
    }



    initBarberServices() {
        const grid = document.getElementById('barber-services-grid');
        if (!grid || this.pageKey === 'barberia') return;
        
        const isCutsPage = this.pageKey === 'barberia-cortes-hombre';
        let displayServices = barberServices;
        if (isCutsPage) {
            displayServices = barberServices.filter(s => s.link.includes('barberia-cortes-hombre.html'));
        }
        this._renderStandardCards(grid, displayServices);
    }

    initEstheticsServices() {
        // Obsoleto: Toda la lógica de Estética ha sido migrada a EstheticsHubController
        return;
    }

    _renderStandardCards(grid, services, modalInstance = null) {
        grid.innerHTML = '';
        services.forEach(data => {
            const processedData = {
                ...data,
                image: this.app.resolvePath(data.image),
                link: modalInstance ? '#' : this.app.resolvePath(data.link),
                id: data.id 
            };
            const cardElement = new ServiceCard(processedData).render();
            if (modalInstance) {
                cardElement.addEventListener('click', (e) => {
                    e.preventDefault();
                    modalInstance.open(data.id);
                });
            }
            grid.appendChild(cardElement);
        });
    }



    initLightboxInstance(retries = 0) {
        if (!this.pageKey || typeof GLightbox === 'undefined') {
            if (retries < 50) setTimeout(() => this.initLightboxInstance(retries + 1), 100);
            return;
        }
        if (this.lightbox) try { this.lightbox.destroy(); } catch(e) {}
        this.lightbox = GLightbox({ selector: '.glightbox', touchNavigation: true, loop: true });
        this.injectLightboxStyles();
    }

    injectLightboxStyles() {
        if (document.getElementById('glightbox-critical-styles')) return;
        const style = document.createElement('style');
        style.id = 'glightbox-critical-styles';
        style.innerHTML = `.glightbox-container { z-index: 99999 !important; }`;
        document.head.appendChild(style);
    }

    initLazyVideos() {
        const lazyVideos = document.querySelectorAll('video.lazy-video');
        if (lazyVideos.length === 0 || !('IntersectionObserver' in window)) return;
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.playVideo(entry.target);
                    videoObserver.unobserve(entry.target);
                }
            });
        });
        lazyVideos.forEach(video => videoObserver.observe(video));
    }

    playVideo(video) {
        video.querySelectorAll('source').forEach(s => s.src = s.dataset.src);
        video.load();
        video.play().catch(() => {});
    }

    initBreadcrumbs() {
        const root = document.getElementById('breadcrumbs-root');
        if (!root || !this.pageKey) return;
        const items = [{ label: 'Inicio', link: '../../' }];
        const path = window.location.pathname;
        if (path.includes('/peluqueria/')) this.addHairBreadcrumbs(items);
        else if (path.includes('/barberia/')) this.addBarberBreadcrumbs(items);
        else if (path.includes('/estetica/')) this.addEstheticsBreadcrumbs(items);
        else if (path.includes('/unas-spa/')) this.addNailsBreadcrumbs(items);
        root.innerHTML = new Breadcrumbs(items).render();
    }

    addHairBreadcrumbs(items) {
        items.push({ label: 'Peluquería', link: '../../servicios/peluqueria/' });
    }

    addBarberBreadcrumbs(items) {
        items.push({ label: 'Barbería', link: '../../servicios/barberia/' });
    }

    addEstheticsBreadcrumbs(items) {
         items.push({ label: 'Estética', link: '../../servicios/estetica/' });
    }

    addNailsBreadcrumbs(items) {
         items.push({ label: 'Uñas y Spa', link: '../../servicios/unas-spa/' });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ServicePageManager();
});
