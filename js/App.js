import { siteConfig, BASE_PATH, resolveAsset } from './config.js'; // Importar Config y Helper
import { UIService } from './services/UIService.js';
import { getNavbarHTML } from './components/Navbar.js';
import { getFooterHTML } from './components/Footer.js';
import { getContactFormHTML } from './components/ContactForm.js';
import { getHeroHTML } from './components/HeroSection.js';
import { getHomeModalsHTML } from './components/HomeModals.js'; // Nueva función para modales dinámicos
// Components
import { MobileMenu } from './components/MobileMenu.js';
import { WhatsAppButton } from './components/WhatsAppButton.js';
// Controllers
import { HeaderController } from './controllers/HeaderController.js';
import { PageTransitionController } from './controllers/PageTransitionController.js'; // Nuevo Controller
// Data
import { servicesData } from './data/servicesData.js';
import { pagesData } from './data/pagesData.js'; // Nuevo Import
import { Breadcrumbs } from './components/Breadcrumbs.js';
// ServiceCard is needed for mountHomeServices which runs on init
import { ServiceCard } from './components/ServiceCard.js';
import { AnalyticsService } from './services/AnalyticsService.js';


class App {
    constructor() {
        // App Root se deriva directamente del BASE_PATH configurado
        this.appRoot = window.location.origin + BASE_PATH + '/';
        
        // Debug para verificar en consola
        // console.log(`[App] Initialized. Root: ${this.appRoot}, Host: ${window.location.hostname}`);
        
        // Determinamos si estamos en la home
        const path = window.location.pathname;
        const currentPathClean = path.replace(BASE_PATH, '/').replace('//', '/');
        
        // Comprobación más robusta de Home
        this.isHomePage = (currentPathClean === '/' || currentPathClean === '/index.html' || currentPathClean === '');
    }


    init() {
        this.mountLayout();
        this.mountHero();
        if (this.isHomePage) this.mountHomeModals();
        this.initCoreComponents();
        this.initInteractiveComponents();
        this.mountHomeServices();
        this.initServices();
        this.initBreadcrumbs();
        this.initAnalytics();
    }

    /**
     * Resuelve una ruta (absoluta o relativa) a la URL base correcta de la aplicación.
     * @param {string} path - Ruta a resolver (ej: '/servicios/...' o 'images/...')
     * @returns {string} URL absoluta correcta.
     */
    resolvePath(path) {
        if (!path || path === '/') return this.appRoot; 
        if (path.startsWith('http')) return path; 
        
        // Quitamos el slash inicial si existe para concatenar limpiamente
        const cleanPath = path.startsWith('/') ? path.slice(1) : path;
        return new URL(cleanPath, this.appRoot).href;
    }

    mountLayout() {
        const navbarRoot = document.getElementById('navbar-root');
        const footerRoot = document.getElementById('footer-root');
        const contactRoot = document.getElementById('contact-root');
        
        // Pasamos appRoot (URL absoluta) en lugar de basePath relativo
        // HYDRATION CHECK: Only render if empty (not pre-rendered by SSG)
        if (navbarRoot && navbarRoot.children.length === 0) {
            navbarRoot.innerHTML = getNavbarHTML(this.appRoot, this.isHomePage);
        }
        if (footerRoot && footerRoot.children.length === 0) {
            footerRoot.innerHTML = getFooterHTML(this.appRoot);
        }
        if (contactRoot && contactRoot.children.length === 0) {
            contactRoot.innerHTML = getContactFormHTML();
        }
    }

    mountHomeModals() {
        const modalsRoot = document.getElementById('modals-root');
        if (modalsRoot && modalsRoot.children.length === 0) {
            modalsRoot.innerHTML = getHomeModalsHTML();
        }
    }

    mountHero() {
        const heroRoot = document.getElementById('hero-root');
        if (!heroRoot) return;

        const path = window.location.pathname;
        let pageKey = null;

        // 1. Mapeo Explícito (Prioridad Alta)
        if (path.includes('nosotros.html')) pageKey = 'nosotros';
        else if (path.includes('contacto.html')) pageKey = 'contacto';
        
        // 2. Detección Dinámica Robusta (Basada en pagesData)
        // Ordenamos las claves por longitud (descendente) para que 'cejas-y-pestanas' 
        // se detecte antes que un posible 'cejas' o coincidencias parciales.
        if (!pageKey) {
            const keys = Object.keys(pagesData).sort((a, b) => b.length - a.length);
            for (const key of keys) {
                if (path.includes(key)) {
                    pageKey = key;
                    break;
                }
            }
        }

        if (pageKey && pagesData[pageKey] && pagesData[pageKey].hero) {
            // ROBUST FIX: Force Hydration
            // Eliminamos la verificación (heroRoot.children.length > 0) para obligar a
            // sobrescribir cualquier contenido estático o invisible con la versión estandarizada.
            // Esto soluciona los problemas de H1 no visibles en Barbería y Estética.
            
            const heroData = pagesData[pageKey].hero;
            const imageSrc = this.resolvePath(heroData.imageSrc);
            
            heroRoot.innerHTML = getHeroHTML({ ...heroData, imageSrc });
        }
    }

    initCoreComponents() {
        try { new MobileMenu(); } catch(e) { /* silent */ }
        try { new WhatsAppButton(); } catch(e) { /* silent */ }
        try { new HeaderController(); } catch(e) { /* silent */ }
        try { new PageTransitionController(); } catch(e) { /* silent */ }
    }

    initInteractiveComponents() {
        // 1. Componentes Críticos (Header, Nav, Botones Flotantes) -> Inmediatos
        // (Ya instanciados en initCoreComponents o montados en mountLayout)
        
        // 2. Componentes Pesados / Bajo el fold -> Carga Diferida con Observer
        // Esto libera el Hilo Principal durante la carga inicial (Mejora TBT y LCP)
        
        // FAQ (Footer y Artículos)
        this.observeAndInit('#faq', async () => {
            const { FAQAccordion } = await import('./components/FAQAccordion.js');
            new FAQAccordion('#faq');
        });
        this.observeAndInit('#article-faq', async () => {
            const { FAQAccordion } = await import('./components/FAQAccordion.js');
            new FAQAccordion('#article-faq');
        }); 

        // Reseñas (Carrusel pesado)
        this.observeAndInit('#reviews-slider-wrapper', async () => {
            const { ReviewsCarousel } = await import('./components/ReviewsCarousel.js');
            new ReviewsCarousel();
        });

        // Contacto (Formulario)
        this.observeAndInit('#contact-root', async () => {
            const { ContactFormController } = await import('./controllers/ContactFormController.js');
            new ContactFormController();
        });

        // Brands (Slider infinito)
        this.observeAndInit('#home-brands-root', async () => {
            const { BrandsSection } = await import('./components/BrandsSection.js');
            const { allBrands } = await import('./data/brandsData.js');
            new BrandsSection('home-brands-root', allBrands).render();
        });

        // Galería y Videos (Media intensiva)
        this.observeAndInit('#gallery-root', async () => {
            const { GalleryController } = await import('./controllers/GalleryController.js');
            new GalleryController();
        });
        this.observeAndInit('#video-promo', async () => {
            const { VideoPlayerController } = await import('./controllers/VideoPlayerController.js');
            new VideoPlayerController();
        });
        
        // Decoraciones Flotantes (No críticas)
        const initFloatingDecorations = async () => {
             const { FloatingDecorations } = await import('./components/FloatingDecorations.js');
             new FloatingDecorations({ basePath: this.appRoot });
        };

        if (window.requestIdleCallback) {
            requestIdleCallback(initFloatingDecorations, { timeout: 4000 });
        } else {
            setTimeout(initFloatingDecorations, 4000);
        }

        // Modales de Home (Lógica de apertura)
        if (this.isHomePage) {
            // El controlador de modales es ligero, pero podemos diferirlo un poco
            setTimeout(async () => {
                const { ModalController } = await import('./controllers/ModalController.js');
                new ModalController();
            }, 1000); 
            
            // Share button
            setTimeout(async () => {
                 const { ShareButton } = await import('./components/ShareButton.js');
                 new ShareButton();
            }, 2000);
        }
    }

    /**
     * Helper para Lazy Hydration.
     * Instancia un componente solo cuando su contenedor entra en el viewport.
     * @param {string} selector - Selector CSS del contenedor.
     * @param {Function} initFn - Función que instancia el componente.
     */
    observeAndInit(selector, initFn) {
        const element = document.querySelector(selector);
        // Si el elemento no existe en esta página, no hacemos nada (ahorra recursos)
        if (!element) return;

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                // console.log(`[App] Lazy hydrating: ${selector}`);
                initFn();
                observer.disconnect(); // Solo necesitamos instanciar una vez
            }
        }, { 
            rootMargin: '200px 0px', // Cargar 200px antes de que aparezca
            threshold: 0.01 
        });

        observer.observe(element);
    }

    mountHomeServices() {
        const servicesGrid = document.getElementById('services-grid');
        if (servicesGrid && servicesData) {
            servicesGrid.innerHTML = '';
            servicesData.forEach(data => {
                // Interceptamos los datos para corregir los enlaces e imágenes
                const processedData = {
                    ...data,
                    link: this.resolvePath(data.link),
                    image: this.resolvePath(data.image)
                };
                const card = new ServiceCard(processedData);
                servicesGrid.appendChild(card.render());
            });
        }
    }

    initServices() {
        new UIService();
    }

    initBreadcrumbs() {
        const root = document.getElementById('breadcrumbs-root');
        if (!root) return;

        const path = window.location.pathname;

        // Solo renderizar si es un artículo del blog (por debajo de /blog/articles/)
        // Nosotros, Contacto y el Hub del Blog no llevan breadcrumbs según feedback del usuario.
        if (path.includes('/blog/articles/')) {
            const items = [
                { label: 'Inicio', link: this.resolvePath('') },
                { label: 'Blog', link: this.resolvePath('blog/') }
            ];

            const h1 = document.querySelector('h1');
            if (h1) {
                // Priorizar atributo data-breadcrumb para versiones cortas manuales
                const customBreadcrumb = h1.getAttribute('data-breadcrumb');
                let titleText = customBreadcrumb || h1.textContent.replace(/\s+/g, ' ').trim();
                
                // Truncar títulos automáticos si no hay uno manual y estamos en móvil
                if (!customBreadcrumb && window.innerWidth < 768) {
                    const words = titleText.split(/\s+/);
                    if (words.length > 3) {
                        titleText = words.slice(0, 3).join(' ') + '...';
                    }
                } else if (!customBreadcrumb && titleText.length > 40) {
                    // En escritorio truncamos solo si es excesivo y no hay manual
                    titleText = titleText.substring(0, 40) + '...';
                }
                
                if (titleText) {
                    items.push({ label: titleText, link: '#' });
                }
            }
            
            root.innerHTML = new Breadcrumbs(items).render();
        }
    }

    initAnalytics() {
        if (siteConfig.contact.googleAnalyticsId) {
            const analytics = new AnalyticsService(siteConfig.contact.googleAnalyticsId);
            analytics.init();
        }
    }
}

export { App };
