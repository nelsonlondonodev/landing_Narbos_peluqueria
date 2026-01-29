import { App } from './App.js';
import { ServiceCard } from './components/ServiceCard.js';
import { Breadcrumbs } from './components/Breadcrumbs.js';
import { getBentoGridHTML } from './components/BentoGrid.js'; // Added
import { pagesData } from './data/pagesData.js'; // Added

import { BrandsSection } from './components/BrandsSection.js'; 
import { hairBrands } from './data/brandsData.js'; 
import { hairSalonServices } from './data/hairSalonServices.js';
import { barberServices } from './data/barberServices.js';
import { hairCutStyles } from './data/hairCutStyles.js';
import { colorStyles } from './data/colorStyles.js';
import { tintStyles } from './data/tintStyles.js';
import { treatmentStyles } from './data/treatmentStyles.js';
import { estheticsServices } from './data/estheticsServices.js'; 

/**
 * Gestor de la Página de Servicios.
 * Coordina la inicialización específica para páginas internas (Peluquería, Barbería, etc.).
 */
class ServicePageManager {
    constructor() {
        this.init();
    }

    init() {
        // Inicializar la App base explícitamente para asegurar Navbar/Footer y Configuración
        // Ahora App maneja internamente BASE_PATH, por lo que es seguro instanciarla directamente.
        if (!window.narbosApp) {
             this.app = new App();
             
             // Inicializar Hero dinámico ANTES de que App arranque componentes dependientes (ej: FloatingDecorations)
             this.initHero(); 

             this.app.init(); // Inicializa layout y componentes base
             window.narbosApp = this.app; // Singleton pattern simple
        } else {
            this.app = window.narbosApp;
            this.initHero();
        }

        console.log("✅ ServicePageManager initialized with App context");

        this.initServiceGrid();
        this.initBrands(); 
        
        this.initBentoGallery(); // New Bento Grid dynamic injection

        this.initLazyVideos();
        this.initModalTriggers();
        this.initBreadcrumbs();
        this.initLightboxInstance(); // Initialize Lightbox AFTER all content is injected
    }

    /**
     * Inicializa la galería Bento Grid Dinámica.
     */
    initBentoGallery() {
        const galleryContainer = document.getElementById('bento-gallery-root');
        if (!galleryContainer) return;

        const path = window.location.pathname;
        let pageKey = null;

        // Lógica para detectar la página actual y cargar su galería específica
        if (path.includes('cortes-de-pelo')) pageKey = 'cortes-de-pelo';
        else if (path.includes('balayage-mechas')) pageKey = 'balayage-mechas';
        else if (path.includes('color-tinturas-cabello')) pageKey = 'color-tinturas-cabello';
        else if (path.includes('tratamientos-capilares')) pageKey = 'tratamientos-capilares';
        else if (path.includes('limpieza-facial')) pageKey = 'limpieza-facial';
        else if (path.includes('masajes-relajantes')) pageKey = 'masajes-relajantes';
        else if (path.includes('/estetica')) pageKey = 'estetica';
        else if (path.includes('/peluqueria') || path.includes('index.html')) pageKey = 'peluqueria';

        if (!pageKey || !pagesData[pageKey] || !pagesData[pageKey].gallery) return;

        const galleryItems = pagesData[pageKey].gallery.map(item => ({
             ...item,
             src: this.app.resolvePath(item.src),
             poster: item.poster ? this.app.resolvePath(item.poster) : undefined
        }));

        galleryContainer.innerHTML = getBentoGridHTML(galleryItems);
    }

    /**
     * Inicializa la Sección Hero Dinámica.
     */
    initHero() {
        const heroContainer = document.getElementById('services-hero-root');
        if (!heroContainer) return;

        const path = window.location.pathname;
        let pageKey = null;

        if (path.includes('cortes-de-pelo')) pageKey = 'cortes-de-pelo';
        else if (path.includes('balayage-mechas')) pageKey = 'balayage-mechas';
        else if (path.includes('color-tinturas-cabello')) pageKey = 'color-tinturas-cabello';
        else if (path.includes('tratamientos-capilares')) pageKey = 'tratamientos-capilares';
        else if (path.includes('/peluqueria') || path.includes('index.html')) {
             // Distinguish main hub from subpages if they share structure
             if (path.indexOf('peluqueria') > -1 && 
                 !path.includes('cortes') && 
                 !path.includes('balayage') && 
                 !path.includes('color') && 
                 !path.includes('tratamientos')) {
                 pageKey = 'peluqueria';
             }
        }
        
        // Add specific check for Estetica
        if (path.includes('/estetica')) pageKey = 'estetica';
        if (path.includes('/barberia')) pageKey = 'barberia';
        if (path.includes('/nosotros')) pageKey = 'nosotros';
        if (path.includes('/contacto')) pageKey = 'contacto';

        if (!pageKey || !pagesData[pageKey] || !pagesData[pageKey].hero) return;

        const { hero } = pagesData[pageKey];
        const imageSrc = this.app.resolvePath(hero.imageSrc);

        // Generate Hero HTML
        const html = `
            <div class="relative">
                <section id="inicio" class="relative h-[60vh] md:h-[80vh] bg-white">
                    <img src="${imageSrc}" alt="${hero.imageAlt}" class="w-[85%] h-full object-cover absolute inset-0 z-0 mx-auto rounded-b-xl" loading="eager" width="1920" height="1080">
                </section>

                <div class="absolute z-20 top-[50vh] md:top-[65vh] left-0 right-0 px-6 pointer-events-none">
                    <div class="container mx-auto">
                        <div class="bg-white/90 backdrop-blur-md p-6 md:p-8 rounded-lg shadow-xl max-w-4xl mx-auto text-center border border-gray-100 pointer-events-auto">
                            <h1 class="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-4">${hero.title}</h1>
                            <p class="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">${hero.subtitle}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        heroContainer.innerHTML = html;
    }
    
    /**
     * Inicializa la sección de marcas específicas de peluquería.
     */
    initBrands() {
        // Usamos un ID específico para evitar colisiones con el global del home
        new BrandsSection('hair-brands-root', hairBrands).render();
    }

    /**
     * Inicializa los disparadores de modales para elementos estáticos.
     */
    initModalTriggers() {
        const beardTriggers = document.querySelectorAll('.js-open-beard-modal');
        if (beardTriggers.length > 0) {
            let modalControllerInstance;
            beardTriggers.forEach(trigger => {
                trigger.addEventListener('click', async (e) => {
                    e.preventDefault();
                    if (!modalControllerInstance) {
                        const { ModalController } = await import('./controllers/ModalController.js');
                        modalControllerInstance = new ModalController();
                    }
                    modalControllerInstance.openModal('beard-modal');
                });
            });
        }
    }

    /**
     * Renderiza los grids de servicios correspondientes.
     */
    initServiceGrid() {
        this.initHairServices();
        this.initBarberServices();
        this.initEstheticsServices();
    }

    initHairServices() {
        const hairServicesGrid = document.getElementById('hair-services-grid');
        if (!hairServicesGrid) return;

        const currentPath = window.location.pathname;
        const servicesToRender = this.getFilteredServices(currentPath);

        servicesToRender.forEach(data => {
            // Resolver rutas usando el contexto de App (Singleton)
            const processedData = {
                ...data,
                image: this.app.resolvePath(data.image), // Resolver imagen
                link: this.app.resolvePath(data.link)    // Resolver enlace
            };

            const card = new ServiceCard(processedData);
            const cardElement = card.render();

            this.setupHairServiceLightbox(cardElement, processedData);
            
            hairServicesGrid.appendChild(cardElement);

            this.setupHairServiceGallery(hairServicesGrid, processedData);
        });
    }

    initBarberServices() {
        const barberServicesGrid = document.getElementById('barber-services-grid');
        if (!barberServicesGrid) return;

        barberServices.forEach(data => {
            const processedData = {
                ...data,
                image: this.app.resolvePath(data.image), // Resolver imagen
                link: this.app.resolvePath(data.link)    // Resolver enlace
            };
            const card = new ServiceCard(processedData);
            const cardElement = card.render();
            
            // Lógica para abrir el modal si el enlace es el específico
            if (data.link === '#open-modal-beard') {
                this.setupBeardModalTrigger(cardElement);
            }

            barberServicesGrid.appendChild(cardElement);
        });
    }

    initEstheticsServices() {
        const aestheticsServicesGrid = document.getElementById('esthetics-services-grid');
        if (!aestheticsServicesGrid) return;

        estheticsServices.forEach(data => {
            const processedData = {
                ...data,
                image: this.app.resolvePath(data.image),
                link: this.app.resolvePath(data.link)
            };
            const card = new ServiceCard(processedData);
            aestheticsServicesGrid.appendChild(card.render());
        });
    }

    setupBeardModalTrigger(element) {
        let modalControllerInstance; 
        element.addEventListener('click', async (e) => {
            e.preventDefault();
            if (!modalControllerInstance) {
                const { ModalController } = await import('./controllers/ModalController.js');
                modalControllerInstance = new ModalController();
            }
            modalControllerInstance.openModal('beard-modal');
        });
    }

    setupHairServiceLightbox(cardElement, data) {
         if (cardElement.tagName !== 'A') return;

         const path = window.location.pathname;
         let prefix = '';

         if (path.includes('cortes-de-pelo')) prefix = 'gallery-';
         else if (path.includes('balayage-mechas')) prefix = 'gallery-color-';
         else if (path.includes('color-tinturas-cabello')) prefix = 'gallery-tint-';
         else if (path.includes('tratamientos-capilares')) prefix = 'gallery-treatment-';
         else return; // Si no estamos en una de estas páginas, no configuramos lightbox

         cardElement.classList.add('glightbox');
         const uniqueGalleryId = prefix + data.title.replace(/\s+/g, '-').toLowerCase();
         
         cardElement.setAttribute('data-gallery', uniqueGalleryId);
         cardElement.setAttribute('data-title', data.title);
         cardElement.setAttribute('data-description', data.description);
         // Importante: El href original del elemento 'a' (que es la imagen principal) ya viene resuelto en 'renderStandardContent' via 'processedData.image' en ServiceCard?
         // No, ServiceCard usa processedData.link para el href del <a> contenedor (si es link).
         // Si queremos que el lightbox abra la imagen principal, debemos asegurarnos que el href apunte a la imagen.
         // En el diseño actual de ServiceCard, el elemento raíz ES el <a> si hay link.
         // PERO para lightbox, queremos que al hacer clic se abra la imagen 'data.image'.
         // ServicePageManager sobreescribe el comportamiento estándar de navegación para el lightbox.
         
         // Fix: Asegurar que el href apunte a la imagen resuelta para que GLightbox la encuentre.
         // Usamos data-href para evitar navegación accidental si falla JS
         const finalUrl = encodeURI(this.app.resolvePath(data.image));
         cardElement.href = 'javascript:void(0);';
         cardElement.setAttribute('data-href', finalUrl);
    }

    setupHairServiceGallery(container, data) {
        if (!data.galleryImages || !Array.isArray(data.galleryImages) || data.galleryImages.length === 0) return;

        const path = window.location.pathname;
        let prefix = 'gallery-default-';
        if (path.includes('cortes-de-pelo')) prefix = 'gallery-';
        if (path.includes('balayage-mechas')) prefix = 'gallery-color-';
        if (path.includes('color-tinturas-cabello')) prefix = 'gallery-tint-';
        if (path.includes('tratamientos-capilares')) prefix = 'gallery-treatment-';

        const uniqueGalleryId = prefix + data.title.replace(/\s+/g, '-').toLowerCase();

        data.galleryImages.forEach((item, index) => {
            let imgUrlRaw = typeof item === 'string' ? item : item.src;
            const imgTitle = typeof item === 'string' ? `${data.title} - Imagen ${index + 2}` : item.title;
            
            // Resolver ruta de imagen de galería
            const imgUrl = encodeURI(this.app.resolvePath(imgUrlRaw));

            const hiddenLink = document.createElement('a');
            hiddenLink.href = 'javascript:void(0);'; // Prevenir navegación
            hiddenLink.setAttribute('data-href', imgUrl); // GLightbox usará esto
            hiddenLink.className = 'glightbox hidden'; 
            hiddenLink.setAttribute('data-gallery', uniqueGalleryId);
            hiddenLink.setAttribute('data-title', imgTitle);
            hiddenLink.style.display = 'none';
            container.appendChild(hiddenLink);
        });
    }

    initLightboxInstance() {
        const isServicePage = window.location.pathname.includes('cortes-de-pelo') || 
                              window.location.pathname.includes('balayage-mechas') || 
                              window.location.pathname.includes('color-tinturas-cabello') ||
                              window.location.pathname.includes('tratamientos-capilares');

        if (!isServicePage) return;

        // Mecanismo de reintento si GLightbox (CDN) aún no ha cargado
        if (typeof GLightbox === 'undefined') {
            console.warn("GLightbox not loaded yet, retrying in 100ms...");
            setTimeout(() => this.initLightboxInstance(), 100);
            return;
        }

        // Limpiar instancia previa para evitar duplicados o referencias rotas
        if (this.lightbox) {
            this.lightbox.destroy();
            this.lightbox = null;
        }

        try {
            this.lightbox = GLightbox({
                selector: '.glightbox',
                touchNavigation: true,
                loop: true,
                zoomable: true,
                draggable: true,
                openEffect: 'zoom',
                closeEffect: 'zoom',
                slideEffect: 'slide'
            });
            console.log("✅ GLightbox initialized successfully with " + document.querySelectorAll('.glightbox').length + " elements.");
            
            // Inyectar estilos correctivos para asegurar visibilidad de controles
            this.injectLightboxStyles();
            
        } catch (error) {
            console.error("Error initializing GLightbox:", error);
        }

        this.setupLightboxAccessibility();
    }

    /**
     * Inyecta estilos CSS críticos para forzar la visibilidad de los controles de GLightbox.
     * Soluciona conflictos de z-index o visibilidad con Tailwind/Estilos globales.
     */
    injectLightboxStyles() {
        if (document.getElementById('glightbox-critical-styles')) return;

        const style = document.createElement('style');
        style.id = 'glightbox-critical-styles';
        style.innerHTML = `
            .glightbox-container { z-index: 99999 !important; }
            .gbtn { 
                z-index: 100000 !important; 
                display: block !important;
                opacity: 1 !important;
                background-color: transparent;
            }
            .gbtn svg {
                width: 30px !important;
                height: 30px !important;
                display: block !important;
                color: #fff !important; /* Forzar color blanco */
                filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));
            }
            .gprev, .gnext {
                z-index: 100000 !important;
                background-color: rgba(0,0,0,0.3) !important;
                border-radius: 50%;
                width: 45px !important;
                height: 45px !important;
                display: flex !important;
                align-items: center;
                justify-content: center;
            }
            .gclose {
                z-index: 100000 !important;
                top: 15px !important;
                right: 15px !important;
                background-color: rgba(0,0,0,0.3) !important;
                border-radius: 50%;
                width: 40px !important;
                height: 40px !important;
                display: flex !important;
                align-items: center;
                justify-content: center;
            }
            .glightbox-mobile .gbtn {
                visibility: visible !important;
            }
        `;
        document.head.appendChild(style);
    }

    setupLightboxAccessibility() {
        const contentElements = [
            document.getElementById('app-wrapper'),
            document.querySelector('header'),
            document.querySelector('footer')
        ];

        this.lightbox.on('open', () => {
            contentElements.forEach(el => {
                if (el) {
                    el.setAttribute('inert', '');
                    el.removeAttribute('aria-hidden'); 
                }
            });
        });

        this.lightbox.on('close', () => {
            contentElements.forEach(el => {
                if (el) el.removeAttribute('inert');
            });
        });
    }

    getFilteredServices(path) {
        if (path.includes('cortes-de-pelo')) {
            return hairCutStyles;
        }
        if (path.includes('balayage-mechas')) {
            return colorStyles;
        }
        if (path.includes('color-tinturas-cabello')) {
            return tintStyles;
        }
        if (path.includes('tratamientos-capilares')) {
            return treatmentStyles;
        }
        return hairSalonServices;
    }



    /**
     * Carga diferida de videos usando IntersectionObserver.
     */
    initLazyVideos() {
        const lazyVideos = document.querySelectorAll('video.lazy-video');
        if (lazyVideos.length === 0 || !('IntersectionObserver' in window)) return;

        const videoObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.playVideo(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { rootMargin: "0px 0px 50px 0px" });

        lazyVideos.forEach(video => videoObserver.observe(video));
    }

    playVideo(video) {
        const sources = video.querySelectorAll('source');
        sources.forEach(source => {
            if (source.dataset.src) source.src = source.dataset.src;
        });

        video.load();
        video.play().catch(e => console.warn("Autoplay blocked:", e));
        video.classList.remove('lazy-video');
    }

    /**
     * Genera e inyecta las migas de pan (Breadcrumbs).
     */
    initBreadcrumbs() {
        const breadcrumbsRoot = document.getElementById('breadcrumbs-root');
        if (!breadcrumbsRoot) return;

        const currentPath = window.location.pathname;
        const items = this.getBreadcrumbItems(currentPath);

        breadcrumbsRoot.innerHTML = new Breadcrumbs(items).render();
    }

    getBreadcrumbItems(currentPath) {
        const items = [{ label: 'Inicio', link: '../../index.html' }];

        if (currentPath.includes('/peluqueria/')) {
            this.addHairBreadcrumbs(items, currentPath);
        } else if (currentPath.includes('/barberia/')) {
            items.push({ label: 'Barbería', link: '../../servicios/barberia/index.html' });
        } else if (currentPath.includes('/estetica/')) {
            this.addEstheticsBreadcrumbs(items, currentPath);
        } else if (currentPath.includes('/unas-spa/')) {
            items.push({ label: 'Uñas', link: '../../servicios/unas-spa/index.html' });
        }
        
        return items;
    }

    addHairBreadcrumbs(items, path) {
        items.push({ label: 'Peluquería', link: '../../servicios/peluqueria/index.html' });
        
        const subPages = {
            'cortes-de-pelo': 'Cortes',
            'balayage-mechas': 'Balayage',
            'color-tinturas-cabello': 'Color',
            'tratamientos-capilares': 'Tratamientos'
        };

        for (const [key, label] of Object.entries(subPages)) {
            if (path.includes(key)) {
                items.push({ label, link: '#' });
                break;
            }
        }
    }

    addEstheticsBreadcrumbs(items, path) {
        items.push({ label: 'Estética', link: '../../servicios/estetica/index.html' });
        
        const subPages = {
            'spa-facial-integral': 'Spa Facial Integral',
            'spa-y-estetica-facial-chia': 'Spa Facial Integral',
            'limpieza-facial': 'Limpieza Facial',
            'masajes-relajantes': 'Masajes Relajantes',
            'cejas-y-pestanas': 'Cejas y Pestañas'
        };

        for (const [key, label] of Object.entries(subPages)) {
            if (path.includes(key)) {
                items.push({ label, link: '#' });
                break;
            }
        }
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new ServicePageManager();
});
