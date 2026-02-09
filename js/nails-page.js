import { App } from './App.js';
import { Breadcrumbs } from './components/Breadcrumbs.js';
import { FloatingDecorations } from './components/FloatingDecorations.js';
import { BrandsSection } from './components/BrandsSection.js';
import { getBentoGridHTML } from './components/BentoGrid.js';
import { ServiceCard } from './components/ServiceCard.js';
import { nailBrands } from './data/brandsData.js';
import { pagesData } from './data/pagesData.js';
import { nailsServices } from './data/nailsServices.js';

/**
 * Nails Page Logic
 * Custom logic for the Nails & Spa section.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Explicitly initialize Core App (Navbar, Footer, etc)
    if (!window.narbosApp) {
        const app = new App();
        window.narbosApp = app;
        app.init();
    }

    initBreadcrumbs();
    initFloatingDecorations();
    initBrandsCarousel();
    initGallery();
    initNailServicesGrid();
});

/* -------------------------------------------------------------------------- */
/*                                INITIALIZATIONS                              */
/* -------------------------------------------------------------------------- */

function initGallery() {
    const galleryRoot = document.getElementById('nails-gallery-root');
    const path = window.location.pathname;
    let pageKey = 'unas-spa'; // Default

    if (path.includes('unas-acrilicas-gel')) {
        pageKey = 'unas-acrilicas-gel';
    } else if (path.includes('manicure-pedicure')) {
        pageKey = 'manicure-pedicure';
    }

    // Ensure we are accessing the correct data key
    if (galleryRoot && pagesData && pagesData[pageKey] && pagesData[pageKey].gallery) {
        galleryRoot.innerHTML = getBentoGridHTML(pagesData[pageKey].gallery);
        
        // Add Title manually if needed, or rely on the HTML structure
        const titleHTML = `
            <div class="text-center mb-12" data-animation="fadeInUp">
                <h2 class="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">Nuestros Trabajos</h2>
                <p class="text-lg text-gray-700 max-w-2xl mx-auto">Descubre la perfección en cada detalle.</p>
            </div>
        `;
        // Prepend title to grid
        galleryRoot.insertAdjacentHTML('afterbegin', titleHTML);

        initLightbox();
    } else {
        console.warn(`Gallery root or data not found for nails page (Key: ${pageKey})`);
    }
}

function initLightbox() {
    // Check if GLightbox is loaded globally
    if (typeof GLightbox !== 'undefined') {
        const lightbox = GLightbox({
            selector: '.glightbox',
            touchNavigation: true,
            loop: true,
            zoomable: true,
            openEffect: 'zoom',
            closeEffect: 'zoom'
        });
    } else {
        // Retry logic in case script is deferred and not yet ready
        setTimeout(initLightbox, 100);
    }
}

function initBrandsCarousel() {
    new BrandsSection('nail-brands-root', nailBrands).render();
}

function initFloatingDecorations() {
    new FloatingDecorations({
        basePath: '../../',
        enableAnimation: false, 
        customConfig: [
             {
                parent: 'inicio',
                img: 'ui/decorations/hoja-seca-3d.webp',
                speed: 0,
                wrapperClasses: '-right-6 top-0 md:-right-12 md:-top-4 z-10',
                imgClasses: 'w-32 md:w-56 rotate-12 opacity-80'
            },
            {
                parent: 'inicio',
                img: 'ui/decorations/hoja-verde-3d.webp',
                speed: 0,
                wrapperClasses: '-left-8 bottom-0 md:-left-4 md:-bottom-12 z-10',
                imgClasses: 'w-28 md:w-48 -rotate-12 opacity-80'
            }
        ]
    });
}

function initBreadcrumbs() {
    const breadcrumbsRoot = document.getElementById('breadcrumbs-root');
    if (!breadcrumbsRoot) return;

    const currentPath = window.location.pathname;
    const items = [
        { label: 'Inicio', link: '../../index.html' }
    ];

    // Determinar si estamos en el Hub de Uñas o en una subpágina
    const isIndex = currentPath.endsWith('/unas-spa/') || currentPath.endsWith('/unas-spa/index.html');
    
    // Nivel 2: Hub de Uñas
    items.push({ 
        label: 'Uñas y Spa', 
        link: isIndex ? '#' : '../../servicios/unas-spa/index.html' 
    });

    // Nivel 3: Subpáginas específicas
    if (currentPath.includes('unas-acrilicas-gel-chia')) {
        items.push({ label: 'Acrílicas y Gel', link: '#' });
    } else if (currentPath.includes('manicure-pedicure-chia')) {
        items.push({ label: 'Manicure y Pedicure', link: '#' });
    }

    breadcrumbsRoot.innerHTML = new Breadcrumbs(items).render();
}

/* -------------------------------------------------------------------------- */
/*                                GRID LOGIC                                  */
/* -------------------------------------------------------------------------- */

function initNailServicesGrid() {
    const gridContainer = document.getElementById('nail-services-grid');
    if (!gridContainer) return;

    // Limpiar contenido estático si lo hay
    gridContainer.innerHTML = '';

    // Filter services based on data attribute
    const filteredServices = getFilteredServices(nailsServices, gridContainer.dataset.excludeIds);
    
    // Render grid using ServiceCard component
    filteredServices.forEach(service => {
        // En un SPA real, App.js resolvería rutas, aquí asumimos rutas relativas o absolutas en datos.
        // Si las imágenes en datos son relativas a root (../../), ServiceCard las usa tal cual.
        
        const cardElement = new ServiceCard({
            title: service.title,
            description: service.summary || service.description, // Use summary for card
            image: service.image,
            price: service.price, // Pass price for display
            link: service.link || '#', // Use actual link if available
            variant: 'standard',
            modalId: service.link ? null : 'service-modal' // Only use modal logic if no link
        }).render();

        // Custom Click Handler logic
        if (service.link) {
            // If it has a link, we let natural navigation happen or ensure it works
            // ServiceCard creates an <a> tag if link is provided.
            // We just ensure it doesn't have the modal trigger interference.
        } else {
            // No link, use Modal
            cardElement.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                window.openServiceModal(service.id);
            });
            cardElement.style.cursor = 'pointer';
        }

        gridContainer.appendChild(cardElement);
    });

    // Setup Modal
    setupModalLogic(nailsServices); 
}

function getFilteredServices(services, excludeString) {
    if (!excludeString) return services;
    const excludeIds = excludeString.split(',').map(Number);
    return services.filter(s => !excludeIds.includes(s.id));
}

/* -------------------------------------------------------------------------- */
/*                                MODAL LOGIC                                 */
/* -------------------------------------------------------------------------- */

function setupModalLogic(services) {
    const modal = document.getElementById('service-modal');
    if (!modal) return;

    const refs = {
        backdrop: document.getElementById('modal-backdrop'),
        panel: document.getElementById('modal-panel'),
        closeBtn: document.getElementById('close-modal-btn'),
        title: document.getElementById('modal-title'),
        image: document.getElementById('modal-image'),
        duration: document.getElementById('modal-duration'),
        price: document.getElementById('modal-price'),
        desc: document.getElementById('modal-description')
    };

    // Define Global Function
    window.openServiceModal = (id) => {
        const service = services.find(s => s.id === id);
        if (!service) return;

        refs.title.textContent = service.title;
        refs.image.src = service.image;
        refs.duration.textContent = service.duration;
        refs.price.textContent = service.price;
        // Convert Markdown bold to HTML bold
        refs.desc.innerHTML = service.description.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

        modal.classList.remove('hidden');
        
        requestAnimationFrame(() => {
            refs.backdrop.classList.remove('opacity-0');
            refs.panel.classList.remove('opacity-0', 'scale-95');
            refs.panel.classList.add('opacity-100', 'scale-100');
        });
        
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        refs.backdrop.classList.add('opacity-0');
        refs.panel.classList.remove('opacity-100', 'scale-100');
        refs.panel.classList.add('opacity-0', 'scale-95');
        
        setTimeout(() => {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        }, 300);
    };

    // Event Listeners
    if (refs.closeBtn) refs.closeBtn.addEventListener('click', closeModal);
    if (refs.backdrop) {
        refs.backdrop.addEventListener('click', (e) => {
            if (e.target === refs.backdrop) closeModal();
        });
    }
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });
}
