import { MobileMenu } from './components/MobileMenu.js';
import { ReviewsCarousel } from './components/ReviewsCarousel.js';
import { ContactFormController } from './controllers/ContactFormController.js';
import { UIService } from './services/UIService.js';
import { ShareButton } from './components/ShareButton.js';
import { FloatingDecorations } from './components/FloatingDecorations.js';


// Ensure initApp is idempotent and robust
let appInitialized = false;

window.initApp = function() {
    if (appInitialized) return;
    appInitialized = true;

    try {
        // Core Services
        
        // Components
        new MobileMenu();
        new ReviewsCarousel();
        new ContactFormController();
        new ShareButton();
        new FloatingDecorations();
        
        // UI Interactions
        new UIService();
        
    } catch (error) {
        console.error("Critical Error initializing app:", error);
    }
};

// Auto-start for pages without specific inline initialization logic (like some inner pages)
// or as a fallback if the inline script somehow missed it (though inline usually handles it)
document.addEventListener("DOMContentLoaded", () => {
    // We check if it has already been called (idempotency handled inside initApp)
    // But we give precedence to inline scripts which might want to mount components first.
    // If we are on a page where navbar-root is MISSING, we might need to init immediately.
    // Use a small timeout to allow inline scripts to run first if they exist?
    // Actually, simply calling it if it hasn't run is safest.
    
    // Check if we are on a page that needs auto-init from here (e.g. no inline script doing it)
    // We can just call it. But we want to ensure Navbar is in DOM if it's supposed to be.
    // The inline script mounts the Navbar. If we run before that, ThemeService fails.
    
    // The previous logic was: if (!navbar-root) initApp().
    // We will keep it but make it smarter?
    // Actually, let's just leave it to the inline script for pages with navbar-root.
    
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