import { App } from './App.js';
import { getBentoGridHTML } from './components/BentoGrid.js';
import { getHeroHTML } from './components/HeroSection.js';

import { pagesData } from './data/pagesData.js';


import { BrandsSection } from './components/BrandsSection.js'; 
 





/**
 * Gestor de la Página de Servicios.
 * Coordina la inicialización específica para páginas internas (Peluquería, Estética, etc.).
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
  
        this.initBrands(); 
        this.initLazyVideos();
        this.initLightboxInstance(); 
    }

    /**
     * Instancia controladores específicos según la página actual.
     * @private
     */
    initControllers() {
        if (!this.pageKey) return;

        // Controlador de Estética (Hub y Subpáginas)
        const estheticsPages = [
            'estetica', 'spa-facial-integral', 'masajes-relajantes', 
            'cejas-y-pestanas', 'depilacion-corporal', 'limpieza-facial'
        ];
        if (estheticsPages.includes(this.pageKey)) {
            import('./controllers/EstheticsHubController.js')
                .then(({ EstheticsHubController }) => {
                    new EstheticsHubController(this.app, this.pageKey).init();
                })
                .catch(error => console.error("Error loading EstheticsHubController:", error));
            return;
        }

        // Controlador de Peluquería (Hub)
        // Solo el hub: las subpáginas cargan `hair-page.js` y no este archivo.
        if (this.pageKey === 'peluqueria') {
            import('./controllers/HairHubController.js')
                .then(({ HairHubController }) => {
                    new HairHubController(this.app, this.pageKey).init();
                })
                .catch(error => console.error("Error loading HairHubController:", error));
            return;
        }

        // Controlador de Uñas (Hub y Subpáginas)
        const nailsPages = [
            'unas-spa', 'unas-acrilicas-gel', 'manicure-pedicure'
        ];
        if (nailsPages.includes(this.pageKey)) {
            import('./controllers/NailsHubController.js')
                .then(({ NailsHubController }) => {
                    new NailsHubController(this.app, this.pageKey).init();
                })
                .catch(error => console.error("Error loading NailsHubController:", error));
            return;
        }

        // --- Legado (Pendiente de refactorizar) ---
        this.initBentoGallery();
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

        // Estética
        if (path.includes('limpieza-facial')) return 'limpieza-facial';
        if (path.includes('masajes-relajantes')) return 'masajes-relajantes';
        if (path.includes('spa-facial-integral')) return 'spa-facial-integral';
        if (path.includes('cejas-y-pestanas')) return 'cejas-y-pestanas';
        if (path.includes('depilacion-corporal')) return 'depilacion-corporal';
        if (path.includes('/estetica')) return 'estetica';

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

        // INTELLIGENT HYDRATION: Si ya tiene contenido del SSG, no tocar.
        if (galleryContainer.children.length > 0) return;

        const config = pagesData[this.pageKey];
        if (!config || !config.gallery) return;

        const galleryItems = config.gallery.map(item => this.app.resolveDeep(item));

        const galleryOptions = config.galleryOptions || {};
        galleryContainer.innerHTML = getBentoGridHTML(galleryItems, galleryOptions);
    }
    
    initBrands() {
        if (this.pageKey && (this.pageKey === 'peluqueria' || this.pageKey.includes('cortes') || this.pageKey.includes('balayage'))) {
             if(document.getElementById('hair-brands-root')) {
                 import('./data/brandsData.js')
                    .then(({ hairBrands }) => {
                        new BrandsSection('hair-brands-root', hairBrands).render();
                    })
                    .catch(error => console.error("Error loading hairBrands data:", error));
             }
        }
    }

    initLightboxInstance() {
        // Limpiamos reintentos infinitos. Si GLightbox no está, se reintenta una vez tras 500ms o se ignora.
        if (!this.pageKey || typeof GLightbox === 'undefined') {
            if (!this._glightboxRetry) {
                this._glightboxRetry = true;
                setTimeout(() => this.initLightboxInstance(), 500);
            }
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

}

document.addEventListener('DOMContentLoaded', () => {
    new ServicePageManager();
});
