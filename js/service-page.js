import { getNavbarHTML } from './components/Navbar.js';
import { getFooterHTML } from './components/Footer.js';
import { MobileMenu } from './components/MobileMenu.js';
import { UIService } from './services/UIService.js';
import { FAQAccordion } from './components/FAQAccordion.js';
import { WhatsAppButton } from './components/WhatsAppButton.js';
import { HeaderController } from './controllers/HeaderController.js';
import { ServiceCard } from './components/ServiceCard.js';
import { hairSalonServices } from './data/hairSalonServices.js';
import { Breadcrumbs } from './components/Breadcrumbs.js';
import { FloatingDecorations } from './components/FloatingDecorations.js';

/**
 * Service Page Initialization
 * Entry point for all service subpages (e.g., /peluqueria/*) using a clean modular approach.
 */
document.addEventListener('DOMContentLoaded', () => {
    initLayout();
    initCommonComponents();
    initServiceGrid();
    initFloatingDecorations();
    initLazyVideos();
    initBreadcrumbs();
});

// --- Internal Helper Functions ---

/**
 * Injects static layout components (Navbar, Footer).
 */
function initLayout() {
    const basePath = '../../';

    const navbarRoot = document.getElementById('navbar-root');
    if (navbarRoot) {
        navbarRoot.innerHTML = getNavbarHTML(basePath, false);
    }

    const footerRoot = document.getElementById('footer-root');
    if (footerRoot) {
        footerRoot.innerHTML = getFooterHTML(basePath);
    }
}

/**
 * Initializes common UI components used across all service pages.
 */
function initCommonComponents() {
    new MobileMenu();
    new UIService();
    new FAQAccordion('#faq');
    new WhatsAppButton();
    new HeaderController();
}

/**
 * Renders the Service Cards Grid, automatically filtering out the card 
 * of the currently active service to avoid self-referencing redundancy.
 */
function initServiceGrid() {
    const hairServicesGrid = document.getElementById('hair-services-grid');
    if (!hairServicesGrid) return;

    const currentPath = window.location.pathname;
    const servicesToRender = getFilteredServices(currentPath);

    servicesToRender.forEach(data => {
        const card = new ServiceCard(data);
        hairServicesGrid.appendChild(card.render());
    });
}

/**
 * Helper to filter services data based on current URL.
 * @param {string} path - Current window pathname
 * @returns {Array} - Filtered Array of service data objects
 */
function getFilteredServices(path) {
    if (path.includes('cortes-de-pelo')) {
        return hairSalonServices.filter(s => !s.link.includes('cortes-de-pelo'));
    }
    if (path.includes('barberia')) {
        return hairSalonServices.filter(s => !s.link.includes('barberia'));
    }
    // Add more filters as needed..
    return hairSalonServices; // Default: show all
}

/**
 * Initializes floating 3D decorations (leaves) if applicable.
 * Currently tailored for the Peluquería main page or pages with 'inicio' ID.
 */
function initFloatingDecorations() {
    new FloatingDecorations({
        basePath: '../../',
        enableAnimation: false, // Static as requested
        customConfig: [
            {
                parent: 'inicio',
                img: 'hoja-seca-3d.webp',
                speed: 0,
                classes: 'w-32 -right-6 top-0 md:w-56 md:-right-12 md:-top-4 rotate-12 z-10 opacity-80'
            },
            {
                parent: 'inicio',
                img: 'hoja-verde-3d.webp',
                speed: 0,
                classes: 'w-28 -left-8 bottom-0 md:w-48 md:-left-4 md:-bottom-12 -rotate-12 z-10 opacity-80'
            }
        ]
    });
}

/**
 * Initializes Lazy Loading and Autoplay for muted videos to improve performance.
 */
function initLazyVideos() {
    const lazyVideos = document.querySelectorAll('video.lazy-video');
    if (lazyVideos.length === 0 || !('IntersectionObserver' in window)) return;

    const videoObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                playVideo(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { rootMargin: "0px 0px 50px 0px" });

    lazyVideos.forEach(video => videoObserver.observe(video));
}

/**
 * Helper to actually load and play a video element.
 * @param {HTMLVideoElement} video 
 */
function playVideo(video) {
    const sources = video.querySelectorAll('source');
    sources.forEach(source => {
        if (source.dataset.src) {
            source.src = source.dataset.src;
        }
    });

    video.load();
    video.play().catch(e => console.warn("Autoplay blocked or failed:", e));
    video.classList.remove('lazy-video');
}

/**
 * Generates and renders breadcrumbs based on the current page's context.
 */
function initBreadcrumbs() {
    const breadcrumbsRoot = document.getElementById('breadcrumbs-root');
    if (!breadcrumbsRoot) return;

    const currentPath = window.location.pathname;
    
    // Base Breadcrumbs
    const items = [
        { label: 'Inicio', link: '../../index.html' },
        { label: 'Peluquería', link: 'index.html' }
    ];

    // Determine current sub-page
    if (currentPath.includes('cortes-de-pelo')) {
        items.push({ label: 'Cortes de Pelo', link: '#' });
    } else if (currentPath.includes('barberia')) {
        items.push({ label: 'Barbería', link: '#' });
    } else if (currentPath.includes('balayage')) {
        items.push({ label: 'Color y Balayage', link: '#' });
    } else if (currentPath.includes('tratamientos')) {
        items.push({ label: 'Tratamientos', link: '#' });
    }

    // Handle "Main Service Hub" case
    const isServiceHome = currentPath.endsWith('/peluqueria/') || currentPath.endsWith('/peluqueria/index.html');
    if (isServiceHome) {
        items[1].link = '#'; // Make "Peluquería" unclickable if we are already there
    }

    breadcrumbsRoot.innerHTML = new Breadcrumbs(items).render();
}
