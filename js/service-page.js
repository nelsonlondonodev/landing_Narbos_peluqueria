import { initApp } from './main.js';
import { ServiceCard } from './components/ServiceCard.js';
import { Breadcrumbs } from './components/Breadcrumbs.js';
import { FloatingDecorations } from './components/FloatingDecorations.js';
import { hairSalonServices } from './data/hairSalonServices.js';
import { barberServices } from './data/barberServices.js';
import { hairCutStyles } from './data/hairCutStyles.js';

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
        this.initFloatingDecorations();
        this.initLazyVideos();
        this.initBreadcrumbs();
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
                        cardElement.setAttribute('data-gallery', 'haircuts-gallery');
                        cardElement.setAttribute('data-title', data.title);
                        cardElement.setAttribute('data-description', data.description);
                    }
                }

                hairServicesGrid.appendChild(cardElement);
            });

            // Init GLightbox if we added class
            if (window.location.pathname.includes('cortes-de-pelo') && typeof GLightbox !== 'undefined') {
                this.lightbox = GLightbox({
                    selector: '.glightbox',
                    touchNavigation: true,
                    loop: true
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
    }

    getFilteredServices(path) {
        if (path.includes('cortes-de-pelo')) {
            return hairCutStyles;
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
                    img: 'hoja-seca-3d.webp',
                    speed: 0,
                    classes: 'w-32 -right-6 top-0 md:w-56 md:-right-12 md:-top-4 rotate-12 z-10 opacity-80'
                },
                {
                    parent: 'inicio',
                    img: 'hoja-verde-3d.webp',
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
            if (currentPath.includes('cortes-de-pelo')) items.push({ label: 'Cortes', link: '#' });
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
