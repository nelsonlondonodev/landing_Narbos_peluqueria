import { MobileMenu } from './components/MobileMenu.js';
import { ReviewsCarousel } from './components/ReviewsCarousel.js';
import { ContactFormController } from './controllers/ContactFormController.js';
import { UIService } from './services/UIService.js';
import { ShareButton } from './components/ShareButton.js';
import { FloatingDecorations } from './components/FloatingDecorations.js';
import { WhatsAppButton } from './components/WhatsAppButton.js';
import { FAQAccordion } from './components/FAQAccordion.js';
import { HeaderController } from './controllers/HeaderController.js';
import { ModalController } from './controllers/ModalController.js';
import { VideoPlayerController } from './controllers/VideoPlayerController.js';
import { GalleryController } from './controllers/GalleryController.js';


// Ensure initApp is idempotent and robust
let appInitialized = false;

window.initApp = function() {
    if (appInitialized) return;
    appInitialized = true;

    try {
        // Core Services
        
        // Components & Controllers
        new MobileMenu();
        new ReviewsCarousel();
        new ContactFormController();
        new ShareButton();
        new FloatingDecorations();
        new WhatsAppButton();
        new FAQAccordion('#faq');
        
        // Split UIService Controllers
        new HeaderController();
        new ModalController();
        new VideoPlayerController();
        new GalleryController();

        // UI Interactions (Animations)
        new UIService();
        
    } catch (error) {
        console.error("Critical Error initializing app:", error);
    }
};
