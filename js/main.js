/**
 * Main Application Script (Unified Entry Point)
 * Centralizes initialization logic for Navbar, Footer, and all interactive components.
 * Replaces script.js logic.
 */

import { TranslationService } from './services/TranslationService.js';
import { getNavbarHTML } from './components/Navbar.js';
import { getFooterHTML } from './components/Footer.js';
import { getContactFormHTML } from './components/ContactForm.js'; // Added import
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
// Services
import { UIService } from './services/UIService.js';
import { servicesData } from './data/servicesData.js';


/**
 * Automatically calculates relative path to root based on current URL depth.
 */
function calculateBasePath() {
    const path = window.location.pathname;
    if (path === '/' || path === '/index.html') return './';
    
    // get directory path (e.g. /servicios/peluqueria)
    let dirPath = path.substring(0, path.lastIndexOf('/'));
    if (dirPath.startsWith('/')) dirPath = dirPath.substring(1);
    
    if (!dirPath) return './';
    
    const segments = dirPath.split('/').filter(s => s.length > 0);
    return '../'.repeat(segments.length);
}

/**
 * Mounts the static layout (Navbar, Footer, ContactForm).
 */
function mountLayout(basePath) {
    const navbarRoot = document.getElementById('navbar-root');
    const footerRoot = document.getElementById('footer-root');
    const contactRoot = document.getElementById('contact-root'); // Check for contact root
    
    // Determine isHome for Navbar styling
    const path = window.location.pathname;
    const isHomePage = (path === '/' || path.endsWith('/index.html')) && basePath === './';

    if (navbarRoot) {
        navbarRoot.innerHTML = getNavbarHTML(basePath, isHomePage);
    }

    if (footerRoot) {
        footerRoot.innerHTML = getFooterHTML(basePath);
    }

    if (contactRoot) {
         contactRoot.innerHTML = getContactFormHTML();
    }
}

/**
 * Mounts Home Services Grid if element exists.
 */
function mountHomeServices() {
    const servicesGrid = document.getElementById('services-grid');
    if (servicesGrid && servicesData) {
        // Clear previous content just in case
        servicesGrid.innerHTML = '';
        servicesData.forEach(data => {
            const card = new ServiceCard(data);
            servicesGrid.appendChild(card.render());
        });
    }
}

/**
 * Initializes the application.
 * Called automatically via DOMContentLoaded.
 */
function initApp() {
    // 1. Calculate Base Path
    const basePath = calculateBasePath();
    
    // 2. Mount Layout (Navbar/Footer)
    mountLayout(basePath);
    
    // 3. Initialize Global Components (depend on layout or body)
    // Mobile Menu needs Navbar to be mounted first
    new MobileMenu();
    new WhatsAppButton();
    new HeaderController(); // Handles sticky/transparent header
    new FloatingDecorations(); // If applicable
    
    // 4. Initialize Functionality Components (Safe to call even if elements missing)
    new FAQAccordion('#faq');
    new ReviewsCarousel();
    new ContactFormController();
    new ShareButton();
    new ModalController(); // Handles service modals if present
    new VideoPlayerController();
    new GalleryController();
    
    // 5. Mount Home Specifics
    mountHomeServices();
    
    // 6. UI Service (Animations, etc)
    new UIService();

    // 7. Translation Service (Last, to bind to all injected elements)
    const translationService = new TranslationService();
    translationService.init();
    translationService.bindSwitchers();
}

// Boot the app
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

// Export for debugging or manual re-init if needed
export { initApp };
