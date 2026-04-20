import { siteConfig, BASE_PATH, resolveAsset, resolveRoute } from './config.js'; // Importar Config y Helper
import { UIService } from './services/UIService.js';
import { getNavbarHTML } from './components/Navbar.js';
import { getFooterHTML } from './components/Footer.js';
import { getContactFormHTML } from './components/ContactForm.js';
import { getHeroHTML } from './components/HeroSection.js';
// Components
import { MobileMenu } from './components/MobileMenu.js';
import { WhatsAppButton } from './components/WhatsAppButton.js';
import { BusinessStatusBadge } from './components/BusinessStatusBadge.js';
// Controllers
import { HeaderController } from './controllers/HeaderController.js';
import { PageTransitionController } from './controllers/PageTransitionController.js'; // Nuevo Controller
// Data
import { pagesData } from './data/pagesData.js'; // Nuevo Import
import { Breadcrumbs } from './components/Breadcrumbs.js';
import { AnalyticsService } from './services/AnalyticsService.js';
import { HomeHubController } from './controllers/HomeHubController.js';


class App {
    constructor() {
        // App Root se deriva directamente del BASE_PATH configurado
        this.appRoot = window.location.origin + BASE_PATH + '/';
        this.version = siteConfig.version;
        
        // Debug para verificar en consola y soporte técnico
        if (typeof window !== 'undefined') {
            window.__NARBO_VERSION__ = this.version;
            // console.log(`[App] Initialized v${this.version}. Root: ${this.appRoot}`);
        }
        
        this.isHomePage = this._checkIfHomePage();
    }

    /**
     * Comprueba de manera robusta si la URL actual corresponde a la página de inicio.
     * @returns {boolean}
     * @private
     */
    _checkIfHomePage() {
        const path = window.location.pathname;
        const currentPathClean = path.replace(BASE_PATH, '/').replace('//', '/');
        return currentPathClean === '/' || currentPathClean === '/index.html' || currentPathClean === '';
    }


    init() {
        this.mountLayout();
        this.mountHero();
        if (this.isHomePage) {
            new HomeHubController(this).init();
        }
        this.initCoreComponents();
        this.initInteractiveComponents();
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
        
        // Resolvemos el path usando el algoritmo inteligente de config.js (v2.1.8)
        const smartPath = resolveRoute(path);
        
        // Si no es un link externo, aseguramos que se resuelva contra el origin absoluto
        if (smartPath.startsWith('http') && !smartPath.includes(window.location.hostname)) return smartPath;
        
        // Limpiamos smartPath para el constructor de URL si es necesario
        const cleanPath = smartPath.startsWith('/') ? smartPath.slice(1) : smartPath;
        return new URL(cleanPath, this.appRoot).href;
    }

    mountLayout() {
        const navbarRoot = document.getElementById('navbar-root');
        const footerRoot = document.getElementById('footer-root');
        const contactRoot = document.getElementById('contact-root');
        
        // FORCE HYDRATION: Clear existing content to avoid layout issues from partial refactors
        if (navbarRoot) {
            navbarRoot.innerHTML = getNavbarHTML(this.appRoot, this.isHomePage);
        }
        if (footerRoot) {
            footerRoot.innerHTML = getFooterHTML(this.appRoot);
        }
        if (contactRoot && contactRoot.children.length === 0) {
            contactRoot.innerHTML = getContactFormHTML();
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
            // ROBUST FIX V2: Evitar sobrescritura si el Hero ya tiene contenido real (SSG o HTML estático)
            // Verificamos si existe un H1 renderizado para comprobar que no es un contenedor vacío
            const hasStaticHero = heroRoot.querySelector('h1');
            
            if (!hasStaticHero) {
                const heroData = pagesData[pageKey].hero;
                const imageSrc = this.resolvePath(heroData.imageSrc);
                
                heroRoot.innerHTML = getHeroHTML({ ...heroData, imageSrc });
            }
        }
    }

    initCoreComponents() {
        try { new MobileMenu(); } catch(e) { /* silent */ }
        try { new WhatsAppButton(); } catch(e) { /* silent */ }
        try { new HeaderController(); } catch(e) { /* silent */ }
        try { new PageTransitionController(); } catch(e) { /* silent */ }
        try { new BusinessStatusBadge().init(); } catch(e) { /* silent */ }
    }

    initInteractiveComponents() {
        // 1. Componentes Críticos (Header, Nav, Botones Flotantes) -> Inmediatos
        // (Ya instanciados en initCoreComponents o montados en mountLayout)
        
        // 2. Componentes Pesados / Bajo el fold -> Carga Diferida con Observer
        // Esto libera el Hilo Principal durante la carga inicial (Mejora TBT y LCP)
        
        // Blog Catalog
        this.observeAndInit('#articles-grid', async () => {
            const { BlogController } = await import('./controllers/BlogController.js');
            new BlogController(this.appRoot);
        });

        // Página Nosotros (Marquee de reseñas y timeline)
        this.observeAndInit('.marquee-track', async () => {
            const { default: AboutHubController } = await import('./controllers/AboutHubController.js');
            new AboutHubController();
        });

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



        // Galería y Videos (Media intensiva)
        this.observeAndInit('#gallery-root', async () => {
            const { GalleryController } = await import('./controllers/GalleryController.js');
            new GalleryController();
        });
        this.observeAndInit('#video-promo', async () => {
            new VideoPlayerController();
        });

        // Calculadora de Oxidación (Artículos específicos)
        this.observeAndInit('#calculadora', async () => {
            const { default: OxidationCalculator } = await import('./controllers/OxidationCalculator.js');
            new OxidationCalculator();
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
