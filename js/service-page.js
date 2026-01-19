import { initApp } from './main.js';
import { ServiceCard } from './components/ServiceCard.js';
import { Breadcrumbs } from './components/Breadcrumbs.js';
import { FloatingDecorations } from './components/FloatingDecorations.js';
import { BrandsSection } from './components/BrandsSection.js'; // Added
import { hairBrands } from './data/brandsData.js'; // Added
import { hairSalonServices } from './data/hairSalonServices.js';
import { barberServices } from './data/barberServices.js';
import { hairCutStyles } from './data/hairCutStyles.js';
import { colorStyles } from './data/colorStyles.js';
import { tintStyles } from './data/tintStyles.js';
import { treatmentStyles } from './data/treatmentStyles.js';
import { estheticsServices } from './data/estheticsServices.js'; // Added

/**
 * Gestor de la Página de Servicios.
 * Coordina la inicialización específica para páginas internas (Peluquería, Barbería, etc.).
 */
class ServicePageManager {
    constructor() {
        this.init();
    }

    init() {
        this.initServiceGrid();
        this.initBrands(); // Added
        this.initFloatingDecorations();
        this.initLazyVideos();
        this.initModalTriggers();
        this.initBreadcrumbs();
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
        // 1. Grid Peluquería
        const hairServicesGrid = document.getElementById('hair-services-grid');
        if (hairServicesGrid) {
            const currentPath = window.location.pathname;
            const servicesToRender = this.getFilteredServices(currentPath);

            servicesToRender.forEach(data => {
                const card = new ServiceCard(data);
                const cardElement = card.render();

                // Logic for GLightbox (Modal Image)
                if (window.location.pathname.includes('cortes-de-pelo')) {
                    if (cardElement.tagName === 'A') {
                        cardElement.classList.add('glightbox');
                        // Usamos un gallery ID único por tarjeta para que NO haya navegación entre cortes diferentes (sin flechas)
                        const uniqueGalleryId = 'gallery-' + data.title.replace(/\s+/g, '-').toLowerCase();
                        cardElement.setAttribute('data-gallery', uniqueGalleryId);
                        cardElement.setAttribute('data-title', data.title);
                        cardElement.setAttribute('data-description', data.description);
                    }
                }

                if (window.location.pathname.includes('balayage-mechas-chia')) {
                    if (cardElement.tagName === 'A') {
                        cardElement.classList.add('glightbox');
                        cardElement.setAttribute('data-gallery', 'color-gallery');
                        cardElement.setAttribute('data-title', data.title);
                        cardElement.setAttribute('data-description', data.description);
                    }
                }

                if (window.location.pathname.includes('color-tinturas-cabello')) {
                    if (cardElement.tagName === 'A') {
                        cardElement.classList.add('glightbox');
                        cardElement.setAttribute('data-gallery', 'tints-gallery');
                        cardElement.setAttribute('data-title', data.title);
                        cardElement.setAttribute('data-description', data.description);
                    }
                }

                if (window.location.pathname.includes('tratamientos-capilares-chia')) {
                    if (cardElement.tagName === 'A') {
                        cardElement.classList.add('glightbox');
                        cardElement.setAttribute('data-gallery', 'treatments-gallery');
                        cardElement.setAttribute('data-title', data.title);
                        cardElement.setAttribute('data-description', data.description);
                    }
                }

                hairServicesGrid.appendChild(cardElement);
            });

    
            // Init GLightbox if we added class
            const isServicePage = window.location.pathname.includes('cortes-de-pelo') || 
                                  window.location.pathname.includes('balayage-mechas-chia') || 
                                  window.location.pathname.includes('color-tinturas-cabello') ||
                                  window.location.pathname.includes('tratamientos-capilares-chia');

            if (isServicePage && typeof GLightbox !== 'undefined') {
                this.lightbox = GLightbox({
                    selector: '.glightbox',
                    touchNavigation: true,
                    loop: true
                });

                // Accessibility Fix: Hide background content when modal is open using 'inert'
                const contentElements = [
                    document.getElementById('app-wrapper'),
                    document.querySelector('header'),
                    document.querySelector('footer')
                ];

                this.lightbox.on('open', () => {
                    contentElements.forEach(el => {
                        if (el) {
                            el.setAttribute('inert', '');
                            el.removeAttribute('aria-hidden'); // Prevent conflicts if library adds it
                        }
                    });
                });

                this.lightbox.on('close', () => {
                    contentElements.forEach(el => {
                        if (el) el.removeAttribute('inert');
                    });
                });
            }
        }

        // 2. Grid Barbería
        const barberServicesGrid = document.getElementById('barber-services-grid');
        if (barberServicesGrid) {
            barberServices.forEach(data => {
                 const card = new ServiceCard(data);
                 const cardElement = card.render();
                 
     // Lógica para abrir el modal si el enlace es el específico
                 if (data.link === '#open-modal-beard') {
                    let modalControllerInstance; 
                    cardElement.addEventListener('click', async (e) => {
                        e.preventDefault();
                        if (!modalControllerInstance) {
                            const { ModalController } = await import('./controllers/ModalController.js');
                            modalControllerInstance = new ModalController();
                        }
                        modalControllerInstance.openModal('beard-modal');
                    });
                 }

                 barberServicesGrid.appendChild(cardElement);
            });
        }

        // 3. Grid Estética
        const aestheticsServicesGrid = document.getElementById('aesthetics-services-grid');
        if (aestheticsServicesGrid) {
            estheticsServices.forEach(data => {
                const card = new ServiceCard(data);
                aestheticsServicesGrid.appendChild(card.render());
            });
        }
    }

    getFilteredServices(path) {
        if (path.includes('cortes-de-pelo')) {
            return hairCutStyles;
        }
        if (path.includes('balayage-mechas-chia')) {
            return colorStyles;
        }
        if (path.includes('color-tinturas-cabello')) {
            return tintStyles;
        }
        if (path.includes('tratamientos-capilares-chia')) {
            return treatmentStyles;
        }
        return hairSalonServices;
    }

    /**
     * Inicializa decoraciones flotantes 3D específicas para servicios.
     */
    initFloatingDecorations() {
        new FloatingDecorations({
            basePath: '../../',
            enableAnimation: false, 
            customConfig: [
                {
                    parent: 'inicio',
                    img: 'ui/decorations/hoja-seca-3d.webp',
                    speed: 0,
                    classes: 'w-32 -right-6 top-0 md:w-56 md:-right-12 md:-top-4 rotate-12 z-10 opacity-80'
                },
                {
                    parent: 'inicio',
                    img: 'ui/decorations/hoja-verde-3d.webp',
                    speed: 0,
                    classes: 'w-28 -left-8 bottom-0 md:w-48 md:-left-4 md:-bottom-12 -rotate-12 z-10 opacity-80'
                }
            ]
        });
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
        const items = [{ label: 'Inicio', link: '../../index.html' }];

        if (currentPath.includes('/peluqueria/')) {
            items.push({ label: 'Peluquería', link: '../../servicios/peluqueria/index.html' });
            
            if (currentPath.includes('cortes-de-pelo')) {
                items.push({ label: 'Cortes', link: '#' });
            } else if (currentPath.includes('balayage-mechas-chia')) {
                items.push({ label: 'Balayage', link: '#' });
            } else if (currentPath.includes('color-tinturas-cabello')) {
                items.push({ label: 'Color', link: '#' });
            } else if (currentPath.includes('tratamientos-capilares-chia')) {
                items.push({ label: 'Tratamientos', link: '#' });
            }
        } else if (currentPath.includes('/barberia/')) {
            items.push({ label: 'Barbería', link: '../../servicios/barberia/index.html' });
        } else if (currentPath.includes('/estetica/')) {
            items.push({ label: 'Estética', link: '../../servicios/estetica/index.html' });
        } else if (currentPath.includes('/unas-spa/')) {
            items.push({ label: 'Uñas', link: '../../servicios/unas-spa/index.html' });
        }

        breadcrumbsRoot.innerHTML = new Breadcrumbs(items).render();
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new ServicePageManager();
});
