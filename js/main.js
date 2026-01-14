/**
 * Main Application Script (Unified Entry Point)
 * Centralizes initialization logic for Navbar, Footer, and all interactive components.
 */

import { TranslationService } from './services/TranslationService.js';
import { UIService } from './services/UIService.js';
import { getNavbarHTML } from './components/Navbar.js';
import { getFooterHTML } from './components/Footer.js';
import { getContactFormHTML } from './components/ContactForm.js';
// Components
import { MobileMenu } from './components/MobileMenu.js';
import { WhatsAppButton } from './components/WhatsAppButton.js';
import { FAQAccordion } from './components/FAQAccordion.js';
import { ReviewsCarousel } from './components/ReviewsCarousel.js';
import { ShareButton } from './components/ShareButton.js';
import { FloatingDecorations } from './components/FloatingDecorations.js';
import { ServiceCard } from './components/ServiceCard.js';
// Controllers
import { ContactFormController } from './controllers/ContactFormController.js';
import { HeaderController } from './controllers/HeaderController.js';
import { ModalController } from './controllers/ModalController.js';
import { VideoPlayerController } from './controllers/VideoPlayerController.js';
import { GalleryController } from './controllers/GalleryController.js';
// Data
import { servicesData } from './data/servicesData.js';

class App {
    constructor() {
        this.basePath = this.calculateBasePath();
    }

    init() {
        this.mountLayout();
        this.initCoreComponents();
        this.initInteractiveComponents();
        this.mountHomeServices();
        this.initServices();
    }

    /**
     * Calcula la ruta relativa a la raíz basada en la profundidad de la URL actual.
     * @returns {string} Ruta base (e.g. './' o '../../')
     */
    calculateBasePath() {
        const path = window.location.pathname;
        if (path === '/' || path.endsWith('/index.html')) return './';
        
        let dirPath = path.substring(0, path.lastIndexOf('/'));
        if (dirPath.startsWith('/')) dirPath = dirPath.substring(1);
        
        if (!dirPath) return './';
        
        const segments = dirPath.split('/').filter(s => s.length > 0);
        return '../'.repeat(segments.length);
    }

    /**
     * Monta la estructura estática (Navbar, Footer, ContactForm).
     */
    mountLayout() {
        const navbarRoot = document.getElementById('navbar-root');
        const footerRoot = document.getElementById('footer-root');
        const contactRoot = document.getElementById('contact-root');
        
        const path = window.location.pathname;
        const isHomePage = (path === '/' || path.endsWith('/index.html')) && this.basePath === './';

        if (navbarRoot) navbarRoot.innerHTML = getNavbarHTML(this.basePath, isHomePage);
        if (footerRoot) footerRoot.innerHTML = getFooterHTML(this.basePath);
        if (contactRoot) contactRoot.innerHTML = getContactFormHTML();
    }

    /**
     * Inicializa componentes esenciales (Menú, Header, WhatsApp).
     */
    initCoreComponents() {
        new MobileMenu();
        new WhatsAppButton();
        new HeaderController();
    }

    /**
     * Inicializa componentes de interacción (Carrusel, Modales, Video, etc.).
     */
    initInteractiveComponents() {
        new FAQAccordion('#faq');
        new ReviewsCarousel();
        new ContactFormController();
        new ShareButton();
        new ModalController();
        new VideoPlayerController();
        new GalleryController();

        // Decoraciones solo en Home
        const path = window.location.pathname;
        const isHome = (path === '/' || path.endsWith('/index.html')) && this.basePath === './';
        if (isHome) {
            new FloatingDecorations({ basePath: this.basePath });
        }
    }

    /**
     * Monta el grid de servicios en la página de inicio.
     */
    mountHomeServices() {
        const servicesGrid = document.getElementById('services-grid');
        if (servicesGrid && servicesData) {
            servicesGrid.innerHTML = '';
            servicesData.forEach(data => {
                const card = new ServiceCard(data);
                servicesGrid.appendChild(card.render());
            });
        }
    }

    /**
     * Inicializa servicios globales (UI, Traducción).
     */
    initServices() {
        new UIService();
        
        // TranslationService debe ser el último para bindear elementos inyectados
        const translationService = new TranslationService();
        translationService.init();
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
