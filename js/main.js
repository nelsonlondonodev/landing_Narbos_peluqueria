/**
 * Main Application Script (Unified Entry Point)
 * Centralizes initialization logic for Navbar, Footer, and all interactive components.
 */


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
// Data
import { servicesData } from './data/servicesData.js';
import { pagesData } from './data/pagesData.js'; // Nuevo Import

class App {
    constructor() {
        // Estrategia "Hardcoded Safe": Detectar explícitamente si estamos en el entorno de GitHub Pages
        // usando el nombre del repositorio. Esto evita problemas con minificadores o import.meta.
        const repoSegment = '/landing_Narbos_peluqueria/';
        const path = window.location.pathname;
        const origin = window.location.origin;

        if (path.includes(repoSegment)) {
            // Entorno GitHub Pages (Staging)
            this.appRoot = origin + repoSegment;
        } else {
            // Entorno Producción (Hostinger) o Localhost
            this.appRoot = origin + '/';
        }
        
        // Determinamos si estamos en la home
        // Limpiamos la URL actual de todo excepto el path base
        const currentPathClean = path.replace(repoSegment, '/').replace('//', '/');
        this.isHomePage = (currentPathClean === '/' || currentPathClean === '/index.html');
    }

    init() {
        this.mountLayout();
        this.mountHero();
        if (this.isHomePage) this.mountHomeModals();
        this.initCoreComponents();
        this.initInteractiveComponents();
        this.mountHomeServices();
        this.initServices();
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
        if (navbarRoot) navbarRoot.innerHTML = getNavbarHTML(this.appRoot, this.isHomePage);
        if (footerRoot) footerRoot.innerHTML = getFooterHTML(this.appRoot);
        if (contactRoot) contactRoot.innerHTML = getContactFormHTML();
    }

    mountHomeModals() {
        const modalsRoot = document.getElementById('modals-root');
        if (modalsRoot) {
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
    }

    initInteractiveComponents() {
        new FAQAccordion('#faq');
        new ReviewsCarousel();
        new ContactFormController();
        new ShareButton();
        if (this.isHomePage) new ModalController();
        new VideoPlayerController();
        new GalleryController();

        new BrandsSection('home-brands-root', allBrands).render();

        if (this.isHomePage) {
            // Pasamos appRoot para assets de decoraciones
            new FloatingDecorations({ basePath: this.appRoot });
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
}

// Inicialización de la aplicación
function initApp() {
    const app = new App();
    app.init();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

export { initApp };
