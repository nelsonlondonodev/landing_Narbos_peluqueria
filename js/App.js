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
import { FAQAccordion } from './components/FAQAccordion.js';
import { ReviewsCarousel } from './components/ReviewsCarousel.js';
import { ShareButton } from './components/ShareButton.js';
import { FloatingDecorations } from './components/FloatingDecorations.js';
import { ServiceCard } from './components/ServiceCard.js';
import { BrandsSection } from './components/BrandsSection.js';
import { allBrands } from './data/brandsData.js';

// Controllers
import { ContactFormController } from './controllers/ContactFormController.js';
import { HeaderController } from './controllers/HeaderController.js';
import { ModalController } from './controllers/ModalController.js';
import { VideoPlayerController } from './controllers/VideoPlayerController.js';
import { GalleryController } from './controllers/GalleryController.js';
import { PageTransitionController } from './controllers/PageTransitionController.js'; // Nuevo Controller
// Data
import { servicesData } from './data/servicesData.js';
import { pagesData } from './data/pagesData.js'; // Nuevo Import
import { Breadcrumbs } from './components/Breadcrumbs.js';


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
    }

    /**
     * Resuelve una ruta (absoluta o relativa) a la URL base correcta de la aplicación.
     * @param {string} path - Ruta a resolver (ej: '/servicios/...' o 'images/...')
     * @returns {string} URL absoluta correcta.
     */
    resolvePath(path) {
        if (!path) return '#';
        if (path.startsWith('http')) return path; // Ya es absoluta
        
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

        if (path.includes('nosotros.html')) pageKey = 'nosotros';
        else if (path.includes('peluqueria')) pageKey = 'peluqueria';
        else if (path.includes('barberia')) pageKey = 'barberia';
        else if (path.includes('contacto.html')) pageKey = 'contacto';

        if (pageKey && pagesData[pageKey] && pagesData[pageKey].hero) {
            // HYDRATION CHECK
            if (heroRoot.children.length > 0) return;

            const heroData = pagesData[pageKey].hero;
            // Resolvemos la imagen usando appRoot para garantizar que cargue
            const imageSrc = this.resolvePath(heroData.imageSrc);
            
            heroRoot.innerHTML = getHeroHTML({ ...heroData, imageSrc });
        }
    }

    initCoreComponents() {
        new MobileMenu();
        new WhatsAppButton();
        new HeaderController();
        new PageTransitionController();
    }

    initInteractiveComponents() {
        // Critical / Above the fold components
        new FAQAccordion('#faq');
        new ReviewsCarousel();
        new ContactFormController();

        // Defer non-critical components to free up Main Thread (TBT)
        const loadDeferredComponents = () => {
            new ShareButton();
            if (this.isHomePage) new ModalController();
            new VideoPlayerController();
            new GalleryController();

            // Brands Section
            new BrandsSection('home-brands-root', allBrands).render();
            
            // Initialization of floating decorations
            new FloatingDecorations({ basePath: this.appRoot });
        };

        if ('requestIdleCallback' in window) {
            requestIdleCallback(loadDeferredComponents, { timeout: 3000 });
        } else {
            // Fallback for Safari/Older browsers
            setTimeout(loadDeferredComponents, 1500);
        }
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
}

// End of App class definition


export { App };
