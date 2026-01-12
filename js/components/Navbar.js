/**
 * Genera el HTML de la barra de navegación.
 * @param {string} basePath - Ruta base para los assets (ej: './' o '../../').
 * @param {boolean} isHome - Indica si se está renderizando en la página de inicio.
 * @returns {string} HTML del componente Navbar.
 */
import { translations } from '../data/translations.js';

export function getNavbarHTML(basePath = './', isHome = true) {
    const linkPrefix = isHome ? '' : '/index.html';
    
    // Función auxiliar para generar enlaces de navegación
    const navLink = (href, key, text, mobile = false) => {
        const baseClasses = "text-white hover:text-brand-gold active:text-brand-gold";
        const mobileClasses = "block py-2 px-4 text-lg hover:bg-brand-light/20 rounded-md active:bg-brand-light/40 text-brand-gray-dark";
        const finalHref = href.startsWith('#') ? `${linkPrefix}${href}` : href;
        
        return `<a href="${finalHref}" data-i18n="${key}" class="${mobile ? mobileClasses : baseClasses}">${text}</a>`;
    };

    // Determine default lang for initial render (to set button text)
    const storedLang = typeof localStorage !== 'undefined' ? localStorage.getItem('user-lang') : 'es';
    const currentLang = (storedLang || navigator.language.split('-')[0] || 'es') === 'en' ? 'en' : 'es';
    const nextLangLabel = currentLang === 'es' ? 'EN' : 'ES';

    return `
    <nav class="container mx-auto px-6 py-3 flex justify-between items-center max-w-screen-xl relative z-50">
        <a href="${isHome ? '#' : basePath + 'index.html'}" class="block">
            <img src="${basePath}images/logo_narbos.webp" alt="Logo de Narbo's Salón Spa" class="h-14 w-auto" width="280" height="56">
        </a>
        
        <div class="desktop-menu flex items-center space-x-8 max-md:hidden">
            ${navLink(isHome ? '#' : basePath + 'index.html', 'nav.home', 'Inicio')}
            
            <!-- Dropdown Servicios -->
            <div class="relative group">
                <button id="desktop-services-btn" class="flex items-center text-white hover:text-brand-gold transition-colors py-2 focus:outline-none" aria-haspopup="true" aria-expanded="false">
                    <span data-i18n="nav.services">Servicios</span>
                    <svg class="w-4 h-4 ml-1 transform group-hover:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                
                <!-- Dropdown Menu -->
                <div id="desktop-services-menu" class="absolute left-0 top-full pt-2 w-56 hidden group-hover:block hover:block z-50">
                    <div class="bg-white rounded-md shadow-xl py-2 border border-brand-medium/20 text-left">
                        <a href="${basePath}peluqueria/index.html" class="block px-4 py-2 text-sm text-brand-gray-dark hover:bg-brand-light/20 hover:text-brand-green transition-colors" data-i18n="services.hair">Peluquería</a>
                        <a href="${basePath}unas-manicure-pedicure/index.html" class="block px-4 py-2 text-sm text-brand-gray-dark hover:bg-brand-light/20 hover:text-brand-green transition-colors" data-i18n="services.nails">Uñas y Manos</a>
                        <a href="${basePath}spa-y-estetica/masajes-relajantes-chia.html" class="block px-4 py-2 text-sm text-brand-gray-dark hover:bg-brand-light/20 hover:text-brand-green transition-colors" data-i18n="services.spa">Spa y Estética</a>
                        <a href="${basePath}depilacion/index.html" class="block px-4 py-2 text-sm text-brand-gray-dark hover:bg-brand-light/20 hover:text-brand-green transition-colors" data-i18n="services.waxing">Depilación</a>
                    </div>
                </div>
            </div>

            ${navLink(basePath + 'nosotros.html', 'nav.about', 'Nosotros')}
            ${navLink(basePath + 'resenas.html', 'nav.reviews', 'Reseñas')}
            ${navLink(basePath + 'contacto.html', 'nav.contact', 'Contacto')}
            <a href="${basePath}blog/index.html" class="text-white hover:text-brand-gold active:text-brand-gold" data-i18n="nav.blog">Blog</a>

            <!-- Desktop Language Switcher -->
            <button id="lang-toggle-desktop" class="ml-4 border border-white/50 rounded-full px-3 py-1 text-xs font-semibold text-white hover:bg-white hover:text-brand-gray-dark transition-all uppercase tracking-wider">
                ${nextLangLabel}
            </button>
        </div>

        <div class="md:hidden flex items-center gap-4">
             <!-- Mobile Language Switcher -->
             <button id="lang-toggle-mobile" class="border border-white/50 rounded-md px-2 py-1 text-xs font-bold text-white hover:bg-white/10 transition-colors uppercase">
                ${nextLangLabel}
             </button>

             <button id="menu-btn" aria-label="Abrir menú de navegación" class="text-white focus:outline-none z-50">
                 <svg id="menu-open-icon" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                 <svg id="menu-close-icon" class="w-6 h-6 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
             </button>
        </div>
    </nav>
    
    <div id="mobile-menu" class="md:hidden fixed top-0 right-0 w-64 h-[100dvh] bg-white text-brand-gray-dark shadow-2xl z-[110] transform translate-x-full transition-transform duration-300 ease-in-out">
        <div class="flex justify-end p-4">
            <button id="internal-close-btn" aria-label="Cerrar menú" class="p-2 text-brand-gray-dark/80 hover:text-brand-gray-dark transition-colors">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
        </div>
        <div class="flex flex-col px-8 space-y-4 overflow-y-auto max-h-[calc(100dvh-80px)]">
            ${navLink(isHome ? '#' : basePath + 'index.html', 'nav.home', 'Inicio', true)}
            
            <div class="border-b border-gray-100 pb-2">
                <span class="block py-2 px-4 text-sm font-bold text-gray-500 uppercase tracking-wider" data-i18n="nav.services">Servicios</span>
                <a href="${basePath}peluqueria/index.html" class="block py-2 px-6 text-lg hover:bg-brand-light/10 text-brand-gray-dark" data-i18n="services.hair">Peluquería</a>
                <a href="${basePath}unas-manicure-pedicure/index.html" class="block py-2 px-6 text-lg hover:bg-brand-light/10 text-brand-gray-dark" data-i18n="services.nails">Uñas</a>
                <a href="${basePath}spa-y-estetica/masajes-relajantes-chia.html" class="block py-2 px-6 text-lg hover:bg-brand-light/10 text-brand-gray-dark" data-i18n="services.spa">Spa</a>
                <a href="${basePath}depilacion/index.html" class="block py-2 px-6 text-lg hover:bg-brand-light/10 text-brand-gray-dark" data-i18n="services.waxing">Depilación</a>
            </div>

            ${navLink(basePath + 'nosotros.html', 'nav.about', 'Nosotros', true)}
            ${navLink(basePath + 'resenas.html', 'nav.reviews', 'Reseñas', true)}
            ${navLink(basePath + 'contacto.html', 'nav.contact', 'Contacto', true)}
            <a href="${basePath}blog/index.html" class="block py-2 px-4 text-lg hover:bg-gray-100 rounded-md active:bg-gray-200 text-brand-gray-dark" data-i18n="nav.blog">Blog</a>
            
            <!-- Mobile Language Switcher (Inside Menu) - Optional duplicate for better UX -->
             <div class="mt-4 border-t border-gray-100 pt-4 flex justify-center pb-8">
                 <button class="lang-toggle-mobile-internal px-4 py-2 border border-brand-gray-dark rounded text-brand-gray-dark font-bold hover:bg-brand-gray-dark hover:text-white transition-colors">
                    ${currentLang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
                 </button>
             </div>
        </div>
    </div>
    
    <div id="menu-backdrop" class="fixed inset-0 bg-black/50 z-[100] hidden md:hidden blur-sm transition-opacity duration-300"></div>
    `;
}
