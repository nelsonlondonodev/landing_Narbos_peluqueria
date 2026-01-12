
import { getNavbarHTML } from './components/Navbar.js';
import { getFooterHTML } from './components/Footer.js';
import { MobileMenu } from './components/MobileMenu.js';
import { UIService } from './services/UIService.js';
import { FAQAccordion } from './components/FAQAccordion.js';
import { WhatsAppButton } from './components/WhatsAppButton.js';
import { ServiceCard } from './components/ServiceCard.js';
import { hairSalonServices } from './data/hairSalonServices.js';
import { Breadcrumbs } from './components/Breadcrumbs.js';

/**
 * Service Page Main Entry Point
 * Initializes common layout and components for service subpages in /peluqueria/
 */
document.addEventListener('DOMContentLoaded', () => {
    // Determine the base path (assuming we are in /peluqueria/)
    const basePath = '../';

    // 1. Inyección de Componentes Estáticos (Navbar, Footer)
    const navbarRoot = document.getElementById('navbar-root');
    if (navbarRoot) navbarRoot.innerHTML = getNavbarHTML(basePath, false);

    const footerRoot = document.getElementById('footer-root');
    if (footerRoot) footerRoot.innerHTML = getFooterHTML(basePath);

    // 2. Inicialización de Componentes Comunes
    new MobileMenu();
    new UIService();
    new FAQAccordion('#faq');
    new WhatsAppButton();

    // 3. Montar Servicios de Peluquería
    const hairServicesGrid = document.getElementById('hair-services-grid');
    if (hairServicesGrid) {
        // Obtenemos la URL actual para saber qué servicio filtrar
        const currentPath = window.location.pathname;
        
        let servicesToRender = hairSalonServices;

        if (currentPath.includes('cortes-de-pelo')) {
             servicesToRender = hairSalonServices.filter(s => !s.link.includes('cortes-de-pelo'));
        } else if (currentPath.includes('barberia')) {
             servicesToRender = hairSalonServices.filter(s => !s.link.includes('barberia'));
        }
        // Agrega más condiciones si es necesario para otras páginas
        
        servicesToRender.forEach(data => {
            const card = new ServiceCard(data);
            hairServicesGrid.appendChild(card.render());
        });
    }

    // 4. Autoplay Lazy Videos (UX/Performance)
    const lazyVideos = document.querySelectorAll('video.lazy-video');
    if ('IntersectionObserver' in window) {
        const videoObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const video = entry.target;
                    const sources = video.querySelectorAll('source');
                    
                    sources.forEach(source => {
                        if (source.dataset.src) {
                            source.src = source.dataset.src;
                        }
                    });

                    video.load();
                    video.play().catch(e => console.log("Autoplay prevented:", e));
                    video.classList.remove('lazy-video');
                    observer.unobserve(video);
                }
            });
        }, { rootMargin: "0px 0px 50px 0px" });

        lazyVideos.forEach(video => videoObserver.observe(video));
    }

    // 5. Initialize Breadcrumbs
    const breadcrumbsRoot = document.getElementById('breadcrumbs-root');
    if (breadcrumbsRoot) {
        const items = [
            { label: 'Inicio', link: '../index.html' },
            { label: 'Peluquería', link: 'index.html' }
        ];

        // Añadir el tercer nivel específico basado en la página actual
        const currentPath = window.location.pathname;
        if (currentPath.includes('cortes-de-pelo')) {
            items.push({ label: 'Cortes de Pelo', link: '#' });
        } else if (currentPath.includes('barberia')) {
            items.push({ label: 'Barbería', link: '#' });
        } else if (currentPath.includes('balayage')) {
            items.push({ label: 'Color y Balayage', link: '#' });
        } else if (currentPath.includes('tratamientos')) {
            items.push({ label: 'Tratamientos', link: '#' });
        }
         // Si es peluqueria/index.html, no añadimos nada extra o manejamos "Peluquería" como activo
        if (currentPath.endsWith('/peluqueria/') || currentPath.endsWith('/peluqueria/index.html')) {
             // En este caso "Peluquería" es el último. 
             // Ajustamos el link del segundo item para que no sea clickable si estamos en él
             items[1].link = '#';
        }

        breadcrumbsRoot.innerHTML = new Breadcrumbs(items).render();
    }
});
