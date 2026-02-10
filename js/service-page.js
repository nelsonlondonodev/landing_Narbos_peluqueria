import { App } from './App.js';
import { ServiceCard } from './components/ServiceCard.js';
import { Breadcrumbs } from './components/Breadcrumbs.js';
import { getBentoGridHTML } from './components/BentoGrid.js';

import { pagesData } from './data/pagesData.js';
import { FloatingDecorations } from './components/FloatingDecorations.js';

import { BrandsSection } from './components/BrandsSection.js'; 
import { hairBrands } from './data/brandsData.js'; 
import { hairSalonServices } from './data/hairSalonServices.js';
import { barberServices } from './data/barberServices.js';
import { hairCutStyles } from './data/hairCutStyles.js';
import { colorStyles } from './data/colorStyles.js';
import { tintStyles } from './data/tintStyles.js';
import { treatmentStyles } from './data/treatmentStyles.js';
import { estheticsServices } from './data/estheticsServices.js'; 
import { ModalController } from './controllers/ModalController.js'; 
import { ServiceModal } from './components/ServiceModal.js'; 

/**
 * Gestor de la Página de Servicios.
 * Coordina la inicialización específica para páginas internas (Peluquería, Barbería, etc.).
 * Refactorizado para centralizar la detección de contexto (PageKey).
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
        
        // Inicializar componentes
        this.initHero(); 
        this.initFloatingDecorations(); // Restaurar decoraciones tras renderizar Hero
        this.initServiceGrid();
        this.initBrands(); 
        this.initBentoGallery();
        
        this.initLazyVideos();
        this.initModalTriggers();
        this.initBreadcrumbs();
        
        // Lightbox necesita esperar a que el contenido (grids/galerías) exista
        this.initLightboxInstance(); 
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

    /**
     * Determina la clave de la página actual basada en la URL.
     * El orden es crítico: las subpáginas específicas deben verificarse antes que las categorías generales.
     */
    getPageKey() {
        const path = window.location.pathname;

        // Subpáginas específicas de Peluquería
        if (path.includes('cortes-de-pelo')) return 'cortes-de-pelo';
        if (path.includes('balayage-mechas')) return 'balayage-mechas';
        if (path.includes('color-tinturas-cabello')) return 'color-tinturas-cabello';
        if (path.includes('tratamientos-capilares')) return 'tratamientos-capilares';

        // Subpáginas de Estética
        if (path.includes('limpieza-facial')) return 'limpieza-facial';
        if (path.includes('masajes-relajantes')) return 'masajes-relajantes';
        if (path.includes('spa-facial-integral')) return 'spa-facial-integral';
        if (path.includes('cejas-y-pestanas')) return 'cejas-y-pestanas';
        if (path.includes('/estetica')) return 'estetica';

        // Subpáginas de Barbería
        if (path.includes('barberia-cortes-hombre')) return 'barberia-cortes-hombre';
        if (path.includes('barberia')) return 'barberia';

        // Páginas Generales / Hubs
        if (path.includes('unas-spa')) return 'unas-spa'; // Asumiendo que existe
        if (path.includes('nosotros')) return 'nosotros';
        if (path.includes('contacto')) return 'contacto';

        // Hub Principal Peluquería (Fallback si está en path)
        if (path.includes('peluqueria') || path.includes('index.html')) return 'peluqueria';

        return null; // No matching page config
    }

    /**
     * Inicializa la Sección Hero Dinámica.
     */
    initHero() {
        const heroContainer = document.getElementById('hero-root');
        if (!heroContainer || !this.pageKey) return;

        const config = pagesData[this.pageKey];
        if (!config || !config.hero) return;

        const { hero } = config;
        const imageSrc = this.app.resolvePath(hero.imageSrc);

        heroContainer.innerHTML = `
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
    }

    /**
     * Inicializa la galería Bento Grid Dinámica.
     */
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
    
    /**
     * Inicializa la sección de marcas específicas de peluquería.
     */
    initBrands() {
        // Solo para páginas de peluquería por ahora
        if (this.pageKey && (this.pageKey === 'peluqueria' || this.pageKey.includes('cortes') || this.pageKey.includes('balayage') || this.pageKey.includes('color'))) {
             // Verificar si existe el contenedor antes de instanciar
             if(document.getElementById('hair-brands-root')) {
                 new BrandsSection('hair-brands-root', hairBrands).render();
             }
        }
    }

    /**
     * Inicializa los disparadores de modales (Barbería principalmente).
     */
    initModalTriggers() {
        const triggers = document.querySelectorAll('.js-open-beard-modal');
        if (triggers.length > 0) {
            let modalControllerInstance;
            triggers.forEach(trigger => {
                trigger.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (!modalControllerInstance) {
                        modalControllerInstance = new ModalController();
                    }
                    modalControllerInstance.openModal('beard-modal');
                });
            });
        }


    /**
     * Reinicializa las decoraciones flotantes.
     * Necesario porque initHero() sobrescribe el HTML donde App.js las inyectó.
     */
    }

    initFloatingDecorations() {
        if (this.app) {
             // Pequeño delay para asegurar que el DOM se pintó
             setTimeout(() => {
                new FloatingDecorations({ basePath: this.app.appRoot });
             }, 50);
        }
    }

    /**
     * Renderiza los grids de servicios.
     */
    initServiceGrid() {
        this.initHairServices();
        this.initBarberServices();
        this.initEstheticsServices();
    }

    initHairServices() {
        const grid = document.getElementById('hair-services-grid');
        if (!grid) return;

        const services = this.getServicesForCurrentPage();
        
        services.forEach(data => {
            const processedData = {
                ...data,
                image: this.app.resolvePath(data.image),
                link: this.app.resolvePath(data.link)
            };

            const card = new ServiceCard(processedData);
            const cardElement = card.render();

            // Configurar Lightbox para esta tarjeta
            this.setupHairServiceLightbox(cardElement, processedData);
            
            grid.appendChild(cardElement);

            // Galería oculta para Lightbox
            this.setupHairServiceGallery(grid, processedData);
        });
    }

    getServicesForCurrentPage() {
        switch (this.pageKey) {
            case 'cortes-de-pelo': return hairCutStyles;
            case 'balayage-mechas': return colorStyles;
            case 'color-tinturas-cabello': return tintStyles;
            case 'tratamientos-capilares': return treatmentStyles;
            default: return hairSalonServices;
        }
    }

    initBarberServices() {
        const grid = document.getElementById('barber-services-grid');
        if (!grid) return;

        barberServices.forEach(data => {
            const processedData = {
                ...data,
                image: this.app.resolvePath(data.image),
                link: this.app.resolvePath(data.link)
            };
            const card = new ServiceCard(processedData);
            const cardElement = card.render();
            
            if (data.link === '#open-modal-beard') {
                this.setupBeardModalTrigger(cardElement);
            }

            grid.appendChild(cardElement);
        });
    }

    initEstheticsServices() {
        const grid = document.getElementById('aesthetics-services-static');
        if (!grid) return;
        
        // Limpiar contenido estático previo
        grid.innerHTML = '';

        // Determinar si estamos en una página específica de servicio
        const isSpaPage = this.pageKey === 'spa-facial-integral';
        const isMassagePage = this.pageKey === 'masajes-relajantes';
        const isBrowsPage = this.pageKey === 'cejas-y-pestanas';

        // Inicializar Modal si estamos en una subpágina
        let serviceModal;
        if (isSpaPage || isMassagePage || isBrowsPage) {
            // Generar IDs si no existen en la data original (para que el modal funcione)
            estheticsServices.forEach(s => {
                if (!s.id) s.id = s.title.replace(/\s+/g, '-').toLowerCase();
            });
            
            serviceModal = new ServiceModal(estheticsServices);
            this.renderEstheticsCards(grid, serviceModal);
        } else {
            // Hub General
            this.renderEstheticsCards(grid, null);
        }
    }

    renderEstheticsCards(grid, modalInstance) {
        // Filtrar servicios según la página actual
        let displayServices = estheticsServices;
        
        if (this.pageKey === 'spa-facial-integral') {
            displayServices = estheticsServices.filter(s => s.link.includes('spa-facial-integral'));
        } else if (this.pageKey === 'masajes-relajantes') {
            displayServices = estheticsServices.filter(s => s.link.includes('masajes-relajantes'));
        } else if (this.pageKey === 'cejas-y-pestanas') {
            displayServices = estheticsServices.filter(s => s.link.includes('cejas-y-pestanas'));
        }

        displayServices.forEach(data => {
            const processedData = {
                ...data,
                image: this.app.resolvePath(data.image),
                // Si hay modal, anulamos el link para evitar navegación
                link: modalInstance ? '#' : this.app.resolvePath(data.link),
                id: data.id 
            };

            const card = new ServiceCard(processedData);
            const cardElement = card.render();

            if (modalInstance) {
                // Remove href to prevent default browser behavior visual cues
                const linkEl = cardElement.querySelector('a') || cardElement;
                if(linkEl.tagName === 'A') linkEl.removeAttribute('href');
                
                cardElement.style.cursor = 'pointer';
                cardElement.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    modalInstance.open(data.id);
                });
            }

            grid.appendChild(cardElement);
        });
    }

    setupBeardModalTrigger(element) {
        let modalControllerInstance; 
        element.addEventListener('click', (e) => {
            e.preventDefault();
            if (!modalControllerInstance) {
                modalControllerInstance = new ModalController();
            }
            modalControllerInstance.openModal('beard-modal');
        });
    }

    setupHairServiceLightbox(cardElement, data) {
         if (cardElement.tagName !== 'A' || !this.pageKey) return;

         // Definir prefijos de galería basados en PageKey
         const prefixes = {
             'cortes-de-pelo': 'gallery-',
             'balayage-mechas': 'gallery-color-',
             'color-tinturas-cabello': 'gallery-tint-',
             'tratamientos-capilares': 'gallery-treatment-'
         };

         const prefix = prefixes[this.pageKey];
         if (!prefix) return;

         cardElement.classList.add('glightbox');
         const uniqueGalleryId = prefix + data.title.replace(/\s+/g, '-').toLowerCase();
         
         cardElement.setAttribute('data-gallery', uniqueGalleryId);
         cardElement.setAttribute('data-title', data.title);
         cardElement.setAttribute('data-description', data.description || '');

         const finalUrl = encodeURI(this.app.resolvePath(data.image));
         cardElement.href = 'javascript:void(0);';
         cardElement.setAttribute('data-href', finalUrl);
    }

    setupHairServiceGallery(container, data) {
        if (!data.galleryImages || !Array.isArray(data.galleryImages) || data.galleryImages.length === 0) return;
        if (!this.pageKey) return;

         const prefixes = {
             'cortes-de-pelo': 'gallery-',
             'balayage-mechas': 'gallery-color-',
             'color-tinturas-cabello': 'gallery-tint-',
             'tratamientos-capilares': 'gallery-treatment-'
         };
        
        const prefix = prefixes[this.pageKey] || 'gallery-default-';
        const uniqueGalleryId = prefix + data.title.replace(/\s+/g, '-').toLowerCase();

        data.galleryImages.forEach((item, index) => {
            let imgUrlRaw = typeof item === 'string' ? item : item.src;
            const imgTitle = typeof item === 'string' ? `${data.title} - Imagen ${index + 2}` : item.title;
            
            const imgUrl = encodeURI(this.app.resolvePath(imgUrlRaw));

            const hiddenLink = document.createElement('a');
            hiddenLink.href = 'javascript:void(0);'; 
            hiddenLink.setAttribute('data-href', imgUrl);
            hiddenLink.className = 'glightbox hidden'; 
            hiddenLink.setAttribute('data-gallery', uniqueGalleryId);
            hiddenLink.setAttribute('data-title', imgTitle);
            hiddenLink.style.display = 'none';
            container.appendChild(hiddenLink);
        });
    }

    initLightboxInstance(retries = 0) {
        // Solo inicializar si estamos en una página válida
        if (!this.pageKey) return;

        if (typeof GLightbox === 'undefined') {
            if (retries > 50) {
                console.warn("GLightbox failed to load.");
                return;
            }
            setTimeout(() => this.initLightboxInstance(retries + 1), 100);
            return;
        }

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
            this.injectLightboxStyles();
        } catch (error) {
            console.error("Error initializing GLightbox:", error);
        }

        this.setupLightboxAccessibility();
    }

    injectLightboxStyles() {
        if (document.getElementById('glightbox-critical-styles')) return;

        const style = document.createElement('style');
        style.id = 'glightbox-critical-styles';
        style.innerHTML = `
            .glightbox-container { z-index: 99999 !important; }
            .gbtn { z-index: 100000 !important; display: block !important; opacity: 1 !important; background-color: transparent; }
            .gbtn svg { width: 30px !important; height: 30px !important; display: block !important; color: #fff !important; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5)); }
            .gprev, .gnext, .gclose { z-index: 100000 !important; background-color: rgba(0,0,0,0.3) !important; border-radius: 50%; display: flex !important; align-items: center; justify-content: center; }
            .gprev, .gnext { width: 45px !important; height: 45px !important; }
            .gclose { width: 40px !important; height: 40px !important; top: 15px !important; right: 15px !important; }
        `;
        document.head.appendChild(style);
    }

    setupLightboxAccessibility() {
        const contentElements = [ document.getElementById('app-wrapper'), document.querySelector('header'), document.querySelector('footer') ];
        
        if (this.lightbox) {
             this.lightbox.on('open', () => contentElements.forEach(el => el && el.setAttribute('inert', '')));
             this.lightbox.on('close', () => contentElements.forEach(el => el && el.removeAttribute('inert')));
        }
    }

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

    initBreadcrumbs() {
        const root = document.getElementById('breadcrumbs-root');
        if (!root || !this.pageKey) return;
        
        const path = window.location.pathname;
        const items = [{ label: 'Inicio', link: '../../index.html' }];

        // Lógica simplificada basada en PageKey o Path
        if (path.includes('/peluqueria/')) this.addHairBreadcrumbs(items);
        else if (path.includes('/barberia/')) this.addBarberBreadcrumbs(items);
        else if (path.includes('/estetica/')) this.addEstheticsBreadcrumbs(items);
        else if (path.includes('/unas-spa/')) items.push({ label: 'Uñas', link: '../../servicios/unas-spa/index.html' });

        root.innerHTML = new Breadcrumbs(items).render();
    }

    addHairBreadcrumbs(items) {
        items.push({ label: 'Peluquería', link: '../../servicios/peluqueria/index.html' });
        // Mapeo PageKey -> Etiqueta
        const labels = {
            'cortes-de-pelo': 'Cortes',
            'balayage-mechas': 'Balayage',
            'color-tinturas-cabello': 'Color',
            'tratamientos-capilares': 'Tratamientos'
        };
        if (this.pageKey && labels[this.pageKey]) {
            items.push({ label: labels[this.pageKey], link: '#' });
        }
    }

    addBarberBreadcrumbs(items) {
        items.push({ label: 'Barbería', link: '../../servicios/barberia/index.html' });
        if (this.pageKey === 'barberia-cortes-hombre') {
            items.push({ label: 'Cortes de Hombre', link: '#' });
        }
    }

    addEstheticsBreadcrumbs(items) {
         items.push({ label: 'Estética', link: '../../servicios/estetica/index.html' });
         const labels = {
            'spa-facial-integral': 'Spa Facial Integral',
            'limpieza-facial': 'Limpieza Facial',
            'masajes-relajantes': 'Masajes Relajantes',
            'cejas-y-pestanas': 'Cejas y Pestañas'
         };
         if (this.pageKey && labels[this.pageKey]) {
            items.push({ label: labels[this.pageKey], link: '#' });
         }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ServicePageManager();
});
