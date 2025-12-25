import { getNavbarHTML } from './components/Navbar.js'; // Assuming this might be needed later, but focusing on MobileMenu now
import { MobileMenu } from './components/MobileMenu.js';
import { ReviewsCarousel } from './components/ReviewsCarousel.js';
import { I18nService } from './services/I18nService.js';
import { ThemeService } from './services/ThemeService.js';
import { ContactFormController } from './controllers/ContactFormController.js';
import { UIService } from './services/UIService.js';

window.initApp = function() {
    console.log("Initializing App...");

    // Core Services
    new I18nService();
    new ThemeService();
    
    // Components
    new MobileMenu();
    new ReviewsCarousel();
    new ContactFormController();
    
    // UI Interactions
    new UIService();
};

document.addEventListener("DOMContentLoaded", () => {
    // If navbar-root exists, we wait for the module to call initApp
    if (!document.getElementById('navbar-root')) {
        window.initApp();
    }
});

document.addEventListener("DOMContentLoaded", () => {
    // If navbar-root exists, we wait for the module to call initApp
    if (!document.getElementById('navbar-root')) {
        window.initApp();
    }
});