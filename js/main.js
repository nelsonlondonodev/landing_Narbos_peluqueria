/**
 * Main Application Script (Unified Entry Point)
 * Centralizes initialization logic for Navbar, Footer, and all interactive components.
 */

import { TranslationService } from './services/TranslationService.js';
import { UIService } from './services/UIService.js';
import { getNavbarHTML } from './components/Navbar.js';
import { getFooterHTML } from './components/Footer.js';
import { getContactFormHTML } from './components/ContactForm.js';
import { getHeroHTML } from './components/HeroSection.js'; // Nuevo Import
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
        this.basePath = this.calculateBasePath();
    }

    init() {
        this.mountLayout();
        this.mountHero(); // Nuevo método
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
        
        // Caso explícito para la raíz
        if (path === '/' || path === '/index.html') return './';
        
        // Para cualquier otra ruta, contamos los segmentos de directorios para subir
        // Eliminamos el fichero final de la ruta para obtener solo los directorios
        let dirPath = path.substring(0, path.lastIndexOf('/'));
        
        // Si comienza con /, lo quitamos para no contar un segmento vacío al principio
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
     * Monta el Hero Section si existe el contenedor y configuración en pagesData.
     */
     mountHero() {
        const heroRoot = document.getElementById('hero-root');
        if (!heroRoot) return; // Si no hay contenedor, no hacemos nada

        // Detectar página actual para buscar datos
        const path = window.location.pathname;
        let pageKey = null;

        if (path.includes('nosotros.html')) pageKey = 'nosotros';
        else if (path.includes('peluqueria')) pageKey = 'peluqueria';
        else if (path.includes('barberia')) pageKey = 'barberia';
        // Añadir más lógica de detección según sea necesario

        if (pageKey && pagesData[pageKey] && pagesData[pageKey].hero) {
            // Aseguramos que la ruta de la imagen sea correcta relativa a la página actual
            // Simbólicamente ajustamos paths si es necesario, pero getHeroHTML inyecta el src tal cual
            // Si las imágenes en pagesData tienen rutas relativas (../../), funcionarán solo si la estructura de carpetas coincide
            // Para 'nosotros.html' (en raíz), '../' o '../../' podría fallar si imageSrc está hardcodeado para subdirectorios.
            // Solución: pagesData debe tener rutas agnósticas o ajustamos aquí.
            // Por simplicidad, asumimos que pagesData tiene la ruta correcta o la ajustamos.
            
            const heroData = pagesData[pageKey].hero;
            // Ajuste simple de ruta para nosotros.html que está en la raíz
            let imageSrc = heroData.imageSrc;
            if (this.basePath === './' && imageSrc.startsWith('../../')) {
                 imageSrc = imageSrc.replace('../../', './');
            }

            heroRoot.innerHTML = getHeroHTML({ ...heroData, imageSrc });
        }
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

        // Inicializamos la sección de marcas (si existe el contenedor)
        new BrandsSection('home-brands-root', allBrands).render();

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
