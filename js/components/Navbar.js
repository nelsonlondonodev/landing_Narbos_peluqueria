/**
 * Genera el HTML de la barra de navegación.
 * @param {string} basePath - Ruta base para los assets (ej: './' o '../../').
 * @param {boolean} isHome - Indica si se está renderizando en la página de inicio.
 * @returns {string} HTML del componente Navbar.
 */
import { translations } from '../data/translations.js';

export function getNavbarHTML(basePath = './', isHome = true) {
    const linkPrefix = isHome ? '' : '/index.html';
    
    // --- Configuration: Mega Menu Structure ---
    const menuCategories = [
        {
            title: "Peluquería",
            link: `${basePath}servicios/peluqueria/index.html`,
            items: [
                { label: "Corte Dama", link: `${basePath}servicios/peluqueria/corte-cabello-mujer.html` },
                { label: "Corte General", link: `${basePath}servicios/peluqueria/cortes-de-pelo-en-chia.html` },
                { label: "Balayage y Mechas", link: `${basePath}servicios/peluqueria/balayage-mechas-chia.html` },
                { label: "Color y Tinturas", link: `${basePath}servicios/peluqueria/color-tinturas-cabello.html` },
                { label: "Tratamientos", link: `${basePath}servicios/peluqueria/tratamientos-capilares-chia.html` }
            ]
        },
        {
            title: "Uñas",
            link: `${basePath}servicios/unas-spa/unas-acrilicas-gel-chia.html`, // Intended to be Hub
            items: [
                { label: "Acrílicas y Gel", link: `${basePath}servicios/unas-spa/unas-acrilicas-gel-chia.html` },
                { label: "Diseño y Nail Art", link: `${basePath}servicios/unas-spa/diseno-de-unas-nail-art.html` },
                { label: "Manicure Spa", link: `${basePath}servicios/unas-spa/unas-acrilicas-gel-chia.html#manicure` }, // Anchor placeholder
                { label: "Pedicure Spa", link: `${basePath}servicios/unas-spa/unas-acrilicas-gel-chia.html#pedicure` }
            ]
        },
        {
            title: "Barbería",
            link: `${basePath}servicios/barberia/barberia-cortes-hombre.html`,
            items: [
                { label: "Cortes Caballero", link: `${basePath}servicios/barberia/barberia-cortes-hombre.html` },
                { label: "Arreglo de Barba", link: `${basePath}servicios/barberia/barberia-cortes-hombre.html#barba` },
                { label: "Ritual Toalla Caliente", link: `${basePath}servicios/barberia/barberia-cortes-hombre.html#ritual` }
            ]
        },
        {
            title: "Estética",
            link: `${basePath}servicios/estetica/spa-facial-integral.html`,
            items: [
                { label: "Spa Facial", link: `${basePath}servicios/estetica/spa-facial-integral.html` },
                { label: "Limpieza Facial", link: `${basePath}servicios/estetica/limpieza-facial.html` },
                { label: "Masajes Relajantes", link: `${basePath}servicios/estetica/masajes-relajantes.html` },
                { label: "Cejas y Pestañas", link: `${basePath}servicios/estetica/cejas-y-pestanas.html` },
                { label: "Depilación", link: `${basePath}servicios/depilacion/index.html` }
            ]
        }
    ];

    // Helper for simple top-level links
    const navLink = (href, key, text, mobile = false) => {
        const baseClasses = "text-white hover:text-brand-gold active:text-brand-gold font-medium";
        const mobileClasses = "block py-2 px-4 text-lg hover:bg-brand-light/20 rounded-md active:bg-brand-light/40 text-brand-gray-dark border-b border-gray-100/50";
        const finalHref = href.startsWith('#') ? `${linkPrefix}${href}` : href;
        return `<a href="${finalHref}" data-i18n="${key}" class="${mobile ? mobileClasses : baseClasses}">${text}</a>`;
    };

    // Determine default lang for initial render
    const storedLang = typeof localStorage !== 'undefined' ? localStorage.getItem('user-lang') : 'es';
    const currentLang = (storedLang || navigator.language.split('-')[0] || 'es') === 'en' ? 'en' : 'es';
    const nextLangLabel = currentLang === 'es' ? 'EN' : 'ES';

    // Desktop Mega Menu HTML Generation
    const megaMenuDesktop = `
        <div id="desktop-services-menu" class="absolute left-0 top-full pt-6 w-full hidden group-hover:block hover:block z-50">
             <div class="bg-white rounded-lg shadow-2xl border border-brand-medium/10 p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mx-auto w-full">
                ${menuCategories.map(cat => `
                    <div class="flex flex-col space-y-3">
                        <a href="${cat.link}" class="font-serif font-bold text-brand-green uppercase tracking-wider text-base border-b-2 border-brand-gold/30 pb-2 hover:text-brand-gold transition-colors block">
                            ${cat.title}
                        </a>
                        <ul class="space-y-2">
                            ${cat.items.map(item => `
                                <li>
                                    <a href="${item.link}" class="text-brand-gray-dark hover:text-brand-green hover:translate-x-1 transition-all duration-200 text-sm block">
                                        ${item.label}
                                    </a>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                `).join('')}
             </div>
        </div>
    `;
// ...
            <!-- Mega Menu Trigger -->
            <div class="group h-full flex items-center"> <!-- Removed relative to align dropdown to Nav container -->
                <button id="desktop-services-btn" class="flex items-center text-white hover:text-brand-gold transition-colors py-4 focus:outline-none font-medium h-full" aria-haspopup="true" aria-expanded="false">
                    <span data-i18n="nav.services">Servicios</span>
                    <svg class="w-4 h-4 ml-1 transform group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                ${megaMenuDesktop}
            </div>

            ${navLink(basePath + 'nosotros.html', 'nav.about', 'Nosotros')}
            ${navLink(basePath + 'resenas.html', 'nav.reviews', 'Reseñas')}
            ${navLink(basePath + 'contacto.html', 'nav.contact', 'Contacto')}
            <a href="${basePath}blog/index.html" class="text-white hover:text-brand-gold active:text-brand-gold font-medium" data-i18n="nav.blog">Blog</a>

            <!-- Desktop Language Switcher -->
            <button id="lang-toggle-desktop" class="ml-4 border border-white/40 rounded-full px-3 py-1 text-xs font-semibold text-white hover:bg-white hover:text-brand-gray-dark transition-all duration-300 uppercase tracking-widest shadow-sm hover:shadow-lg">
                ${nextLangLabel}
            </button>
        </div>

        <!-- Mobile Toggle -->
        <div class="md:hidden flex items-center gap-4">
             <button id="lang-toggle-mobile" class="border border-white/50 rounded-md px-2 py-1 text-xs font-bold text-white hover:bg-white/10 transition-colors uppercase">
                ${nextLangLabel}
             </button>

             <button id="menu-btn" aria-label="Abrir menú" class="text-white focus:outline-none z-50 p-1">
                 <svg id="menu-open-icon" class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                 <svg id="menu-close-icon" class="w-7 h-7 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
             </button>
        </div>
    </nav>
    
    <!-- Mobile Menu Overlay -->
    <div id="mobile-menu" class="md:hidden fixed top-0 right-0 w-[85vw] max-w-sm h-[100dvh] bg-white text-brand-gray-dark shadow-2xl z-[110] transform translate-x-full transition-transform duration-300 ease-out overflow-y-auto">
        <div class="flex justify-between items-center p-5 border-b border-gray-100">
             <span class="text-brand-green font-serif font-bold text-lg">Menú</span>
            <button id="internal-close-btn" aria-label="Cerrar menú" class="p-2 text-gray-400 hover:text-brand-red transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
        </div>
        
        <div class="flex flex-col p-4 space-y-1">
            ${navLink(isHome ? '#' : basePath + 'index.html', 'nav.home', 'Inicio', true)}
            ${megaMenuMobile}
            ${navLink(basePath + 'nosotros.html', 'nav.about', 'Nosotros', true)}
            ${navLink(basePath + 'resenas.html', 'nav.reviews', 'Reseñas', true)}
            ${navLink(basePath + 'contacto.html', 'nav.contact', 'Contacto', true)}
            <a href="${basePath}blog/index.html" class="block py-3 px-4 text-lg hover:bg-gray-50 rounded-md text-brand-gray-dark border-b border-gray-100/50" data-i18n="nav.blog">Blog</a>
            
             <div class="mt-8 px-4">
                 <button class="lang-toggle-mobile-internal w-full py-3 border-2 border-brand-green/20 rounded-lg text-brand-green font-bold hover:bg-brand-green hover:text-white transition-all uppercase tracking-widest text-sm">
                    ${currentLang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
                 </button>
             </div>
        </div>
    </div>
    
    <div id="menu-backdrop" class="fixed inset-0 bg-black/60 z-[100] hidden md:hidden backdrop-blur-sm transition-opacity duration-300"></div>
    `;
}
