import { App } from './App.js';
import { Breadcrumbs } from './components/Breadcrumbs.js';
import { FloatingDecorations } from './components/FloatingDecorations.js';
import { BrandsSection } from './components/BrandsSection.js';
import { getBentoGridHTML } from './components/BentoGrid.js';
import { ServiceCard } from './components/ServiceCard.js';
import { ServiceModal } from './components/ServiceModal.js'; // Import Modal Component
import { nailBrands } from './data/brandsData.js';
import { pagesData } from './data/pagesData.js';
import { nailsServices } from './data/nailsServices.js';

/**
 * Nails Page Logic
 * Custom logic for the Nails & Spa section.
 * Refactored for clean code and scalability.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Explicitly initialize Core App (Navbar, Footer, etc)
    if (!window.narbosApp) {
        const app = new App();
        window.narbosApp = app;
        app.init();
    }

    initPageComponents();
});

function initPageComponents() {
    initBreadcrumbs();
    initFloatingDecorations();
    initBrandsCarousel();
    initGallery();
    initNailServicesGrid();
}

/* -------------------------------------------------------------------------- */
/*                           COMPONENT INITIALIZERS                           */
/* -------------------------------------------------------------------------- */

function initGallery() {
    const galleryRoot = document.getElementById('nails-gallery-root');
    // Early return if not found
    if (!galleryRoot) return;

    const pageKey = getPageKeyFromPath(window.location.pathname);
    const galleryData = pagesData[pageKey]?.gallery;

    if (galleryData) {
        renderGallery(galleryRoot, galleryData);
        initLightbox();
    } else {
        console.warn(`Gallery data not found for page key: ${pageKey}`);
    }
}

function getPageKeyFromPath(path) {
    if (path.includes('unas-acrilicas-gel')) return 'unas-acrilicas-gel';
    if (path.includes('manicure-pedicure')) return 'manicure-pedicure';
    return 'unas-spa'; // Default
}

function renderGallery(root, data) {
    const titleHTML = `
        <div class="text-center mb-12" data-animation="fadeInUp">
            <h2 class="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">Nuestros Trabajos</h2>
            <p class="text-lg text-gray-700 max-w-2xl mx-auto">Descubre la perfección en cada detalle.</p>
        </div>
    `;
    root.innerHTML = titleHTML + getBentoGridHTML(data);
}

function initLightbox() {
    if (typeof GLightbox !== 'undefined') {
        GLightbox({
            selector: '.glightbox',
            touchNavigation: true,
            loop: true,
            zoomable: true,
            openEffect: 'zoom',
            closeEffect: 'zoom'
        });
    } else {
        // Retry logic for deferred scripts
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

    const isIndex = currentPath.endsWith('/unas-spa/') || currentPath.endsWith('/unas-spa/index.html');
    
    // Level 2: Hub
    items.push({ 
        label: 'Uñas y Spa', 
        link: isIndex ? '#' : '../../servicios/unas-spa/index.html' 
    });

    // Level 3: Subpages
    if (currentPath.includes('unas-acrilicas-gel')) {
        items.push({ label: 'Acrílicas y Gel', link: '#' });
    } else if (currentPath.includes('manicure-pedicure')) {
        items.push({ label: 'Manicure y Pedicure', link: '#' });
    }

    breadcrumbsRoot.innerHTML = new Breadcrumbs(items).render();
}

/* -------------------------------------------------------------------------- */
/*                                GRID & MODAL                                */
/* -------------------------------------------------------------------------- */

function initNailServicesGrid() {
    const gridContainer = document.getElementById('nail-services-grid');
    if (!gridContainer) return;

    gridContainer.innerHTML = '';
    
    // Initialize Modal Logic via Component
    const serviceModal = new ServiceModal(nailsServices);

    const excludeString = gridContainer.dataset.excludeIds;
    const filteredServices = filterServices(nailsServices, excludeString);
    
    filteredServices.forEach(service => {
        const cardElement = createServiceCard(service, serviceModal);
        gridContainer.appendChild(cardElement);
    });
}

function filterServices(services, excludeString) {
    if (!excludeString) return services;
    const excludeIds = excludeString.split(',').map(Number);
    return services.filter(s => !excludeIds.includes(s.id));
}

function createServiceCard(service, modalInstance) {
    const cardElement = new ServiceCard({
        title: service.title,
        description: service.summary || service.description,
        image: service.image,
        price: service.price,
        link: service.link || '#',
        variant: 'standard',
        modalId: service.link ? null : 'service-modal'
    }).render();

    attachClickBehavior(cardElement, service, modalInstance);
    return cardElement;
}

function attachClickBehavior(element, service, modalInstance) {
    if (service.link && !isCurrentPage(service.link)) {
        // Normal navigation behavior (anchor tag works natively)
        // No custom listener needed
    } else {
        // Trigger Modal: either explicitly (no link) or prevention (same page)
        element.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            modalInstance.open(service.id);
        });
        
        element.style.cursor = 'pointer';
        if (service.link) {
             element.removeAttribute('href'); // Visual consistency
        }
    }
}

function isCurrentPage(link) {
    const currentPath = window.location.pathname;
    // Simple robust check
    return currentPath.includes(link);
}
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
    if (currentPath.includes('unas-acrilicas-gel')) {
        items.push({ label: 'Acrílicas y Gel', link: '#' });
    } else if (currentPath.includes('manicure-pedicure')) {
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
            // Check if we are already on the potential destination page
            const currentPath = window.location.pathname;
            // Clean paths for comparison (remove leading slash, query params, etc if needed, but simple includes usually works)
            
            if (currentPath.includes(service.link)) {
                // We are already here, so show Modal instead of reloading/navigating
                 cardElement.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    window.openServiceModal(service.id);
                });
                cardElement.style.cursor = 'pointer';
                cardElement.removeAttribute('href'); // Visual cue that it acts like a button
            } else {
                 // Normal navigation, let the <a> tag work
            }
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
        desc: document.getElementById('modal-description'),
        whatsappBtn: document.getElementById('modal-whatsapp-btn') // Capture link ref
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

        // Update WhatsApp Link Dynamically
        if (refs.whatsappBtn) {
            const message = encodeURIComponent(`Hola, quisiera agendar una cita para ${service.title}`);
            const phoneNumber = '573123462618'; 
            refs.whatsappBtn.href = `https://wa.me/${phoneNumber}?text=${message}`;
        }

        modal.classList.remove('hidden');
        
        // Prevent layout shift
        lockScroll();
        
        requestAnimationFrame(() => {
            refs.backdrop.classList.remove('opacity-0');
            refs.panel.classList.remove('opacity-0', 'scale-95');
            refs.panel.classList.add('opacity-100', 'scale-100');
        });
    };

    const closeModal = () => {
        refs.backdrop.classList.add('opacity-0');
        refs.panel.classList.remove('opacity-100', 'scale-100');
        refs.panel.classList.add('opacity-0', 'scale-95');
        
        setTimeout(() => {
            modal.classList.add('hidden');
            unlockScroll();
        }, 300);
    };

    // Event Listeners
    if (refs.closeBtn) refs.closeBtn.addEventListener('click', closeModal);
    // Close Modal on Backdrop Click
    // Close Modal on Outside Click (Backdrop area)
    // The click actually lands on the scroll container or the flex wrapper, not the backdrop div itself due to z-index.
    const scrollContainer = document.getElementById('modal-scroll-container');
    
    if (scrollContainer) {
        scrollContainer.addEventListener('click', (e) => {
            // We check if the click target is the container itself or the flex centering wrapper
            // e.target will be the element directly clicked.
            // If we click outside the panel, we hit either the scroll container or the flex wrapper div inside it.
            
            // The structure is: scrollContainer -> flexWrapper -> panel
            // We want to close if we click on scrollContainer or flexWrapper.
            
            // Check if click is on the container directly
            if (e.target.id === 'modal-scroll-container') {
                closeModal();
                return;
            }
            
            // Or if it's on the immediate child (flex wrapper) which has no ID but we can check class or parent
            if (e.target.parentElement && e.target.parentElement.id === 'modal-scroll-container') {
                 // Double check it's not the panel itself (which is grandchild)
                 // If the panel is clicked, e.target would be something inside panel, so e.target.closest('#modal-panel') would be true.
                 if (!e.target.closest('#modal-panel')) {
                     closeModal();
                 }
            }
        });
    }
    
    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });

}

// Helper to prevent layout shift when hiding scrollbar
function lockScroll() {
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollBarWidth > 0) {
        document.body.style.paddingRight = `${scrollBarWidth}px`;
    }
}

function unlockScroll() {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
}

