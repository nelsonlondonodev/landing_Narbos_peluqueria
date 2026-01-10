import { TranslationService } from './services/TranslationService.js';
import { getNavbarHTML } from './components/Navbar.js';
import { getFooterHTML } from './components/Footer.js';
import { ServiceCard } from './components/ServiceCard.js';
import { servicesData } from './data/servicesData.js';
// Import the core app logic (which defines window.initApp)
import './script.js'; 

/**
 * Main Entry Point
 * Handles component mounting and app initialization.
 */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Mount Static Layout (Navbar, Footer)
    mountLayout();
    
    // 2. Initialize Translation Service
    const translationService = new TranslationService();
    translationService.init();
    // Bind listeners *after* layout is mounted
    translationService.bindSwitchers(); 

    // 3. Mount Content
    mountHomeServices();
    
    // 4. Initialize Core App Logic (Controllers)
    if (window.initApp) {
        window.initApp();
    }
});

function mountLayout() {
    const navbarRoot = document.getElementById('navbar-root');
    const footerRoot = document.getElementById('footer-root');

    // Determine environment context
    // Ideally this should be configurable, but we can infer for now.
    // If we are in the root index.html, we likely want './' and isHome=true.
    // We can check if we are in a subdirectory by checking document.baseURI or location.
    
    // Simple heuristic: If we are at root, basePath is './'. 
    // If we are deep, we need to know depth.
    // For now, valid for index.html as requested. 
    // We will make it smart enough to be used in index.html specifically.
    
    // HACK: To support multiple pages without complexity, we can read a data attribute from the script tag 
    // if we converted this to a generic loader.
    // But for this specific task (fixing index.html), we hardcode for Home.
    // However, to be "best practice", let's be robust.
    
    // For index.html specifically:
    if (navbarRoot) {
        navbarRoot.innerHTML = getNavbarHTML('./', true);
    }

    if (footerRoot) {
        footerRoot.innerHTML = getFooterHTML('./');
    }
}

function mountHomeServices() {
    const servicesGrid = document.getElementById('services-grid');
    if (servicesGrid) {
        servicesData.forEach(data => {
            const card = new ServiceCard(data);
            servicesGrid.appendChild(card.render());
        });
    }
}
