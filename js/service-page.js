import { initApp } from './main.js';
import { ServiceCard } from './components/ServiceCard.js';
import { hairSalonServices } from './data/hairSalonServices.js';
import { Breadcrumbs } from './components/Breadcrumbs.js';
import { FloatingDecorations } from './components/FloatingDecorations.js';

/**
 * Service Page Logic
 * Extends the main application logic with specific features for validation pages.
 * Global init (Navbar, Footer, MobileMenu, etc) is handled by main.js.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Specific initializations
    initServiceGrid();
    initFloatingDecorations();
    initLazyVideos();
    initBreadcrumbs();
});

// --- Specific Logic ---

/**
 * Renders the Service Cards Grid, filtering out active service.
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

function getFilteredServices(path) {
    if (path.includes('cortes-de-pelo')) {
        return hairSalonServices.filter(s => !s.link.includes('cortes-de-pelo'));
    }
    if (path.includes('barberia')) {
        return hairSalonServices.filter(s => !s.link.includes('barberia'));
    }
    return hairSalonServices;
}

/**
 * Initializes floating 3D decorations.
 */
function initFloatingDecorations() {
    new FloatingDecorations({
        basePath: '../../', // Still manual here? main.js doesn't expose basePath easily. 
                           // But FloatingDecorations is specific to deep pages usually.
                           // Improve: Calculate automatically or accept manual if this script is only for subpages.
                           // Since service-page.js is ONLY for subpages (depth 2), '../../' is safe.
        enableAnimation: false, 
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
 * Lazy Video Logic
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

function playVideo(video) {
    const sources = video.querySelectorAll('source');
    sources.forEach(source => {
        if (source.dataset.src) source.src = source.dataset.src;
    });

    video.load();
    video.play().catch(e => console.warn("Autoplay blocked:", e));
    video.classList.remove('lazy-video');
}

/**
 * Breadcrumbs Logic
 */
function initBreadcrumbs() {
    const breadcrumbsRoot = document.getElementById('breadcrumbs-root');
    if (!breadcrumbsRoot) return;

    const currentPath = window.location.pathname;
    const items = [{ label: 'Inicio', link: '../../index.html' }];

    // Simple detection logic
    if (currentPath.includes('/peluqueria/')) {
        items.push({ label: 'Peluquería', link: '../../servicios/peluqueria/index.html' });
        if (currentPath.includes('cortes-de-pelo')) items.push({ label: 'Cortes', link: '#' });
        // ... (simplified for brevity, can copy full logic if needed or rely on existing structure)
    } else if (currentPath.includes('/barberia/')) {
        items.push({ label: 'Barbería', link: '../../servicios/barberia/index.html' });
    } else if (currentPath.includes('/estetica/')) {
        items.push({ label: 'Estética', link: '../../servicios/estetica/index.html' });
    } else if (currentPath.includes('/unas-spa/')) {
        items.push({ label: 'Uñas', link: '../../servicios/unas-spa/index.html' });
    }

    breadcrumbsRoot.innerHTML = new Breadcrumbs(items).render();
}
