import { initApp } from './main.js';
import { Breadcrumbs } from './components/Breadcrumbs.js';
import { FloatingDecorations } from './components/FloatingDecorations.js';
import { BrandsSection } from './components/BrandsSection.js';
import { nailBrands } from './data/brandsData.js';

/**
 * Nails Page Logic
 * Custom logic for the Nails & Spa section.
 * Global init handled by main.js.
 */

document.addEventListener('DOMContentLoaded', () => {
    initBreadcrumbs();
    initFloatingDecorations();
    initBrandsCarousel();
});

/* -------------------------------------------------------------------------- */
/*                                INITIALIZATIONS                              */
/* -------------------------------------------------------------------------- */

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
                classes: 'w-32 -right-6 top-0 md:w-56 md:-right-12 md:-top-4 rotate-12 z-10 opacity-80'
            },
            {
                parent: 'inicio',
                img: 'ui/decorations/hoja-verde-3d.webp',
                speed: 0,
                classes: 'w-28 -left-8 bottom-0 md:w-48 md:-left-4 md:-bottom-12 -rotate-12 z-10 opacity-80'
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

    // Filter services based on data attribute
    const filteredServices = getFilteredServices(nailsServices, gridContainer.dataset.excludeIds);
    
    // Render grid
    gridContainer.innerHTML = filteredServices.map(createServiceCard).join('');

    // Setup Modal
    setupModalLogic(nailsServices); // Pass full data to find any service by ID
}

function getFilteredServices(services, excludeString) {
    if (!excludeString) return services;
    const excludeIds = excludeString.split(',').map(Number);
    return services.filter(s => !excludeIds.includes(s.id));
}

function createServiceCard(service) {
    return `
        <article class="group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full isolation-auto">
            <div class="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <img src="${service.image}" alt="${service.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out">
                <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
                <span class="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-brand-gray-dark text-xs font-bold px-3 py-1 rounded-full shadow-sm border border-white/50">
                    ${service.duration}
                </span>
            </div>

            <div class="p-6 flex flex-col flex-grow relative">
                <div class="flex justify-between items-start mb-3">
                        <h3 class="text-xl font-serif font-bold text-gray-900 group-hover:text-brand-green transition-colors leading-tight">${service.title}</h3>
                </div>
                
                <p class="text-gray-600 text-sm mb-6 line-clamp-3 flex-grow leading-relaxed">${service.summary}</p>
                
                <div class="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                    <span class="text-lg font-bold text-brand-green">${service.price}</span>
                    <button onclick="window.openServiceModal(${service.id})" class="group/btn relative inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-brand-green transition-all duration-300 bg-brand-green/5 border border-brand-green/20 rounded-lg hover:bg-brand-green hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green cursor-pointer">
                        <span>Ver Detalles</span>
                        <svg class="w-4 h-4 ml-2 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                    </button>
                </div>
            </div>
        </article>
    `;
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
