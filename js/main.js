import { App } from './App.js';

/**
 * Main Entry Point for the Homepage and General Site Logic.
 * Initializes the App class when the DOM is ready.
 */

function initApp() {
    // Avoid double initialization if the app is already running
    if (window.narbosApp) return;

    console.log("[Main] Initializing App...");
    const app = new App();
    window.narbosApp = app; 
    app.init();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
