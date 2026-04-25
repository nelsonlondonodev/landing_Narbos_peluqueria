import { siteConfig, BASE_PATH, resolveAsset, resolveRoute } from './config.js';
import { UIService } from './services/UIService.js';
import { getNavbarHTML } from './components/Navbar.js';
import { getFooterHTML } from './components/Footer.js';
import { getContactFormHTML } from './components/ContactForm.js';
import { getHeroHTML } from './components/HeroSection.js';
import { MobileMenu } from './components/MobileMenu.js';
import { WhatsAppButton } from './components/WhatsAppButton.js';
import { StoreBadge } from './components/StoreBadge.js';
import { HeaderController } from './controllers/HeaderController.js';
import { PageTransitionController } from './controllers/PageTransitionController.js';
import { pagesData } from './data/pagesData.js';
import { Breadcrumbs } from './components/Breadcrumbs.js';
import { AnalyticsService } from './services/AnalyticsService.js';
import { HomeHubController } from './controllers/HomeHubController.js';

class App {
    constructor() {
        const isLocalDist = window.location.pathname.includes('/dist/');
        const localDistPath = isLocalDist ? '/dist' : '';
        
        this.appRoot = window.location.origin + BASE_PATH + localDistPath + '/';
        this.version = siteConfig.version;
        
        if (typeof window !== 'undefined') {
            window.__NARBO_VERSION__ = this.version;
        }
        
        this.isHomePage = this._checkIfHomePage();
        
        // Cachear claves ordenadas para detección de páginas
        this._pagesDataKeys = Object.keys(pagesData).sort((a, b) => b.length - a.length);
    }

    _checkIfHomePage() {
        const path = window.location.pathname;
        const currentPathClean = path.replace(BASE_PATH, '')
                                     .replace('/dist/', '/')
                                     .replace('//', '/');
        
        return currentPathClean === '/' || 
               currentPathClean === '/index.html' || 
               currentPathClean === '' ||
               path.endsWith('/dist/') ||
               path.endsWith('/dist/index.html');
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

    resolvePath(path) {
        if (!path || path === '/') return this.isHomePage ? './' : this.appRoot; 
        return resolveRoute(path, this.appRoot);
    }

    /**
     * Resuelve profundamente todas las rutas de un objeto (src, poster, subImages).
     * @param {Object} item 
     */
    resolveDeep(item) {
        if (!item) return item;
        const resolved = { ...item };
        
        if (resolved.src) resolved.src = this.resolvePath(resolved.src);
        if (resolved.poster) resolved.poster = this.resolvePath(resolved.poster);
        
        if (resolved.subImages && Array.isArray(resolved.subImages)) {
            resolved.subImages = resolved.subImages.map(sub => ({
                ...sub,
                src: this.resolvePath(sub.src)
            }));
        }
        
        return resolved;
    }

    mountLayout() {
        const navbarRoot = document.getElementById('navbar-root');
        const footerRoot = document.getElementById('footer-root');
        const contactRoot = document.getElementById('contact-root');
        
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

    mountHero() {
        const heroRoot = document.getElementById('hero-root');
        if (!heroRoot || heroRoot.querySelector('h1')) return;

        const path = window.location.pathname;
        let pageKey = null;

        // 1. Mapeo Explícito
        if (path.includes('nosotros.html')) pageKey = 'nosotros';
        else if (path.includes('contacto.html')) pageKey = 'contacto';
        
        // 2. Detección Dinámica (Usa cache)
        if (!pageKey) {
            pageKey = this._pagesDataKeys.find(key => path.includes(key));
        }

        if (pageKey && pagesData[pageKey]?.hero) {
            const heroData = pagesData[pageKey].hero;
            const imageSrc = this.resolvePath(heroData.imageSrc);
            heroRoot.innerHTML = getHeroHTML({ ...heroData, imageSrc });
        }
    }

    initCoreComponents() {
        const components = [MobileMenu, WhatsAppButton, HeaderController, PageTransitionController];
        components.forEach(Comp => {
            try { new Comp(); } catch(e) {}
        });
        try { new StoreBadge().init(); } catch(e) {}
    }

    initInteractiveComponents() {
        // Blog
        this.observeAndInit('#articles-grid', async () => {
            const { BlogController } = await import('./controllers/BlogController.js');
            new BlogController(this.appRoot);
        });

        // About
        this.observeAndInit('.marquee-track', async () => {
            const { default: AboutHubController } = await import('./controllers/AboutHubController.js');
            new AboutHubController();
        });

        // FAQ
        ['#faq', '#article-faq'].forEach(sel => {
            this.observeAndInit(sel, async () => {
                const { FAQAccordion } = await import('./components/FAQAccordion.js');
                new FAQAccordion(sel);
            });
        });

        // Reviews
        this.observeAndInit('#reviews-slider-wrapper', async () => {
            const { ReviewsCarousel } = await import('./components/ReviewsCarousel.js');
            new ReviewsCarousel();
        });

        // Formulario
        this.observeAndInit('#contact-root', async () => {
            const { ContactFormController } = await import('./controllers/ContactFormController.js');
            new ContactFormController();
        });

        // Galería
        this.observeAndInit('#gallery-root', async () => {
            const { GalleryController } = await import('./controllers/GalleryController.js');
            new GalleryController();
        });

        // Calculadora
        this.observeAndInit('#calculadora', async () => {
            const { default: OxidationCalculator } = await import('./controllers/OxidationCalculator.js');
            new OxidationCalculator();
        });
        
        // Decoraciones (Idle)
        const initDecorations = async () => {
             const { FloatingDecorations } = await import('./components/FloatingDecorations.js');
             new FloatingDecorations({ basePath: this.appRoot });
        };

        if (window.requestIdleCallback) {
            requestIdleCallback(initDecorations, { timeout: 4000 });
        } else {
            setTimeout(initDecorations, 4000);
        }
    }

    /**
     * Inicialización perezosa de módulos (Lazy Hydration).
     */
    observeAndInit(selector, importFn) {
        const element = document.querySelector(selector);
        if (!element) return;

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                importFn();
                observer.disconnect();
            }
        }, { rootMargin: '200px 0px', threshold: 0.01 });

        observer.observe(element);
    }

    initServices() {
        new UIService();
    }

    /**
     * Truncado inteligente de texto para breadcrumbs.
     */
    _truncateText(text, limit = 40) {
        if (!text) return '';
        const cleanText = text.replace(/\s+/g, ' ').trim();
        if (window.innerWidth < 768) {
            const words = cleanText.split(/\s+/);
            return words.length > 3 ? words.slice(0, 3).join(' ') + '...' : cleanText;
        }
        return cleanText.length > limit ? cleanText.substring(0, limit) + '...' : cleanText;
    }

    initBreadcrumbs() {
        const root = document.getElementById('breadcrumbs-root');
        const path = window.location.pathname;

        if (root && path.includes('/blog/articles/')) {
            const items = [
                { label: 'Inicio', link: this.resolvePath('') },
                { label: 'Blog', link: this.resolvePath('blog/') }
            ];

            const h1 = document.querySelector('h1');
            if (h1) {
                const label = h1.getAttribute('data-breadcrumb') || this._truncateText(h1.textContent);
                if (label) items.push({ label, link: '#' });
            }
            
            root.innerHTML = new Breadcrumbs(items).render();
        }
    }

    initAnalytics() {
        if (siteConfig.contact.googleAnalyticsId) {
            new AnalyticsService(siteConfig.contact.googleAnalyticsId).init();
        }
    }
}

export { App };

