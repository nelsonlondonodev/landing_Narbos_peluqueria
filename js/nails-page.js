import { getNavbarHTML } from './components/Navbar.js';
import { getFooterHTML } from './components/Footer.js';
import { MobileMenu } from './components/MobileMenu.js';
import { UIService } from './services/UIService.js';
import { FAQAccordion } from './components/FAQAccordion.js';
import { WhatsAppButton } from './components/WhatsAppButton.js';
import { Breadcrumbs } from './components/Breadcrumbs.js';
import { FloatingDecorations } from './components/FloatingDecorations.js';

document.addEventListener('DOMContentLoaded', () => {
    initLayout();
    initCommonComponents();
    initBreadcrumbs();
    initNailServices();
    initFloatingDecorations();
});

function initFloatingDecorations() {
    new FloatingDecorations({
        basePath: '../',
        enableAnimation: false, // Static as requested usually for performance or style
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


function initLayout() {
    const basePath = '../';
    const navbarRoot = document.getElementById('navbar-root');
    if (navbarRoot) navbarRoot.innerHTML = getNavbarHTML(basePath, false);

    const footerRoot = document.getElementById('footer-root');
    if (footerRoot) footerRoot.innerHTML = getFooterHTML(basePath);
}

function initCommonComponents() {
    new MobileMenu();
    new UIService();
    new FAQAccordion('#faq');
    new WhatsAppButton();
}

function initBreadcrumbs() {
    const breadcrumbsRoot = document.getElementById('breadcrumbs-root');
    if (!breadcrumbsRoot) return;

    const items = [
        { label: 'Inicio', link: '../index.html' },
        { label: 'Uñas y Manos', link: '#' }
    ];

    breadcrumbsRoot.innerHTML = new Breadcrumbs(items).render();
}

function initNailServices() {
    // 1. DATA: Servicios de Uñas
    const servicesData = [
        {
            id: 1,
            title: 'Manicura Spa',
            price: '$35.000',
            duration: '45 min',
            summary: 'Limpieza profunda, exfoliación e hidratación para manos suaves y renovadas.',
            description: 'Nuestra Manicura Spa es un ritual completo de renovación para tus manos. El servicio comienza con una limpieza detallada de cutículas y limado de uñas según tu preferencia. Continuamos con una exfoliación profunda utilizando sales minerales aromáticas para eliminar células muertas, seguida de una mascarilla hidratante nutritiva. Finalizamos con un masaje relajante de manos que activa la circulación y, por supuesto, el esmaltado tradicional con el tono que elijas de nuestra amplia gama de colores premium.',
            image: '../images/unas-manicure-pedicure/foto_unas_1.webp'
        },
        {
            id: 2,
            title: 'Pedicura Spa',
            price: '$45.000',
            duration: '60 min',
            summary: 'El tratamiento ideal para pies cansados con masaje anti-estrés y cuidado estético.',
            description: 'Deleita tus pies con nuestra Pedicura Spa, diseñada no solo para embellecer sino para relajar. Disfrutarás de un baño de pies inmersivo con sales efervescentes, remoción cuidadosa de durezas y callosidades, tratamiento de cutículas y una exfoliación revitalizante. El punto culminante es nuestro masaje terapéutico diseñado para aliviar la tensión acumulada. Tus pies quedarán suaves, descansados y estéticamente perfectos con un esmaltado impecable.',
            image: '../images/unas-manicure-pedicure/foto_unas_1.webp' 
        },
        {
            id: 3,
            title: 'Esmaltado Semipermanente',
            price: '$55.000',
            duration: '60 min',
            summary: 'Color vibrante, secado instantáneo y brillo espejo garantizado por 21 días.',
            description: 'La solución perfecta para la mujer moderna que busca manos impecables por más tiempo. Utilizamos marcas líderes mundiales como Organic Nails y Masglo Gel Evolution para asegurar un acabado profesional. El proceso incluye una preparación meticulosa de la uña (manicura en seco), aplicación de base protectora, dos capas de color intenso y un top coat de alto brillo, todo curado en lámpara LED. Olvídate de los rayones y disfruta de uñas perfectas por hasta 3 semanas.',
            image: '../images/peluqueria/foto_8_peluqueria.webp' 
        },
        {
            id: 4,
            title: 'Uñas Acrílicas / Polygel (Esculpidas)',
            price: '$120.000',
            duration: '120 min',
            summary: 'Extensiones artísticas con Acrílico o Polygel para unas uñas de impacto.',
            description: 'Transforma tus manos con nuestro servicio de uñas esculpidas. Ya sea que desees mayor longitud o corregir la forma natural de tus uñas, nuestras artistas crearán estructuras perfectas (Coffin, Stiletto, Almendra, Cuadrada) utilizando **acrílico** o **Polygel** (Acrigel) de última generación, ideal para quienes buscan ligereza y resistencia. Este servicio premium incluye manicura completa, moldeado experto y esmaltado semipermanente.',
            image: '../images/peluqueria/foto_7_peluqueria.webp'
        },
        {
            id: 5,
            title: 'Retiro de Semipermanente',
            price: '$15.000',
            duration: '20 min',
            summary: 'Remoción cuidadosa del esmalte gel cuidando la salud de tu uña natural.',
            description: 'No arranques tu esmalte. Nuestro servicio de retiro profesional utiliza técnicas suaves para disolver el producto sin limar excesivamente ni dañar la capa superior de tu uña natural. Finalizamos con una aplicación de aceite de cutícula vitaminado para restaurar la hidratación.',
            image: '../images/peluqueria/foto_3_peluqueria.webp'
        },
        {
            id: 6,
            title: 'Diseños de Uñas (Nail Art)',
            price: 'Desde $5.000',
            duration: '15+ min',
            summary: 'Uñas decoradas: animal print, diseños fáciles, pedrería y tendencias.',
            description: 'Personaliza tu manicura con nuestro servicio de Nail Art en Chía. Realizamos **uñas decoradas** a tu gusto: desde tendencias como **animal print**, líneas minimalistas para **uñas cortas**, efectos espejo, baby boomer, hasta "uñas decoradas fácil" y rápido si tienes poco tiempo. ¡Trae tu inspiración de Pinterest o Instagram y la haremos realidad!',
            image: '../images/peluqueria/foto_5_peluqueria.webp'
        }
    ];

    // 2. REFERENCIAS DOM
    const gridContainer = document.getElementById('nail-services-grid');
    const modal = document.getElementById('service-modal');
    const modalBackdrop = document.getElementById('modal-backdrop');
    const modalPanel = document.getElementById('modal-panel');
    const closeModalBtn = document.getElementById('close-modal-btn');
    
    // Elementos internos del Modal
    const mTitle = document.getElementById('modal-title');
    const mImage = document.getElementById('modal-image');
    const mDuration = document.getElementById('modal-duration');
    const mPrice = document.getElementById('modal-price');
    const mDesc = document.getElementById('modal-description');

    // 3. RENDERIZAR TARJETAS EN EL GRID
    if (gridContainer) {
        gridContainer.innerHTML = servicesData.map(service => `
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
        `).join('');
    }

    // 4. LÓGICA DEL MODAL
    window.openServiceModal = (id) => {
        const service = servicesData.find(s => s.id === id);
        if (!service) return;

        mTitle.textContent = service.title;
        mImage.src = service.image;
        mDuration.textContent = service.duration;
        mPrice.textContent = service.price;
        // Convert MD to HTML bold if needed, currently just text
        mDesc.innerHTML = service.description.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

        modal.classList.remove('hidden');
        
        requestAnimationFrame(() => {
            modalBackdrop.classList.remove('opacity-0');
            modalPanel.classList.remove('opacity-0', 'scale-95');
            modalPanel.classList.add('opacity-100', 'scale-100');
        });
        
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        modalBackdrop.classList.add('opacity-0');
        modalPanel.classList.remove('opacity-100', 'scale-100');
        modalPanel.classList.add('opacity-0', 'scale-95');
        
        setTimeout(() => {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        }, 300);
    };

    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    
    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', (e) => {
            if (e.target === modalBackdrop) closeModal();
        });
    }
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });
}
