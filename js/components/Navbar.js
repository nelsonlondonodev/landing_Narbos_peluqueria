/**
 * Genera el HTML de la barra de navegación.
 * @param {string} basePath - Ruta base para los assets (ej: './' o '../../').
 * @param {boolean} isHome - Indica si se está renderizando en la página de inicio.
 * @returns {string} HTML del componente Navbar.
 */

import { getMenuCategories } from '../data/navigation.js';

/**
 * Genera el HTML de la barra de navegación.
 * @param {string} basePath - URL Raíz absoluta de la app (ej: 'https://dominio/repo/').
 * @param {boolean} isHome - Página de inicio o interna.
 * @returns {string} HTML.
 */
export function getNavbarHTML(basePath = './', isHome = true) {
    // Si no estamos en home, los anclas (#) deben redirigir a index.html
    const linkPrefix = isHome ? '' : `${basePath}index.html`;
    const menuCategories = getMenuCategories(basePath);
    const navLink = createNavLinkHelper(linkPrefix);

    return `
    <nav class="container mx-auto px-6 py-2 flex justify-between items-center max-w-screen-xl relative z-50">
        ${renderLogo(basePath, isHome)}
        
        <!-- Desktop Menu -->
        <div class="desktop-menu flex items-center space-x-8 max-md:hidden pl-8">
            ${navLink(isHome ? '#' : basePath + 'index.html', 'nav.home', 'Inicio')}
            ${renderMegaMenuDesktop(menuCategories)}
            ${navLink(basePath + 'nosotros.html', 'nav.about', 'Nosotros')}
            ${navLink(basePath + 'contacto.html', 'nav.contact', 'Contacto')}
            <a href="${basePath}blog/index.html" class="text-white hover:text-brand-gold active:text-brand-gold font-medium" data-i18n="nav.blog">Blog</a>
        </div>

        <!-- Mobile Toggle -->
        ${renderMobileToggle()}
    </nav>
    
    <!-- Mobile Menu Overlay -->
    <div id="mobile-menu" class="md:hidden fixed top-0 right-0 w-[85vw] max-w-sm h-[100dvh] bg-white text-brand-gray-dark shadow-2xl z-[110] transform translate-x-full transition-transform duration-300 ease-out overflow-y-auto">
        ${renderMobileMenuHeader()}
        
        <div class="flex flex-col p-4 space-y-1">
            ${navLink(isHome ? '#' : basePath + 'index.html', 'nav.home', 'Inicio', true)}
            ${renderMegaMenuMobile(menuCategories)}
            ${navLink(basePath + 'nosotros.html', 'nav.about', 'Nosotros', true)}
            ${navLink(basePath + 'contacto.html', 'nav.contact', 'Contacto', true)}
            <a href="${basePath}blog/index.html" class="block py-3 px-4 text-lg hover:bg-gray-50 rounded-md text-brand-gray-dark border-b border-gray-100/50" data-i18n="nav.blog">Blog</a>
        </div>
    </div>
    
    <div id="menu-backdrop" class="fixed inset-0 bg-black/60 z-[100] hidden md:hidden backdrop-blur-sm transition-opacity duration-300"></div>
    `;
}

// --- Helpers de Renderizado ---

function createNavLinkHelper(linkPrefix) {
    return (href, key, text, mobile = false) => {
        const baseClasses = "text-white hover:text-brand-gold active:text-brand-gold font-medium";
        const mobileClasses = "block py-2 px-4 text-lg hover:bg-brand-light/20 rounded-md active:bg-brand-light/40 text-brand-gray-dark border-b border-gray-100/50";
        const finalHref = href.startsWith('#') ? `${linkPrefix}${href}` : href;
        return `<a href="${finalHref}" data-i18n="${key}" class="${mobile ? mobileClasses : baseClasses}">${text}</a>`;
    };
}



function renderLogo(basePath, isHome) {
    return `
        <a href="${isHome ? '#' : basePath + 'index.html'}" class="block group">
             <img src="${basePath}images/brand/logo_narbos.webp" alt="Narbo's Salón Spa Logo" class="h-12 w-auto md:h-14 transition-transform duration-300 group-hover:scale-105" width="280" height="56">
        </a>
    `;
}

function renderMobileToggle() {
    return `
        <div class="md:hidden flex items-center gap-4">
             <button id="menu-btn" aria-label="Abrir menú" class="text-white focus:outline-none z-50 p-1">
                 <svg id="menu-open-icon" class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                 <svg id="menu-close-icon" class="w-7 h-7 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
             </button>
        </div>
    `;
}

function renderMobileMenuHeader() {
    return `
        <div class="flex justify-between items-center p-5 border-b border-gray-100">
             <span class="text-brand-green font-serif font-bold text-lg">Menú</span>
            <button id="internal-close-btn" aria-label="Cerrar menú" class="p-2 text-gray-400 hover:text-brand-red transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
        </div>
    `;
}

function renderMegaMenuDesktop(menuCategories) {
    const desktopMenuGrid = menuCategories.map(cat => `
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
    `).join('');

    return `
        <div class="group h-full flex items-center static">
            <button id="desktop-services-btn" class="flex items-center text-white hover:text-brand-gold transition-colors py-4 focus:outline-none font-medium h-full relative z-10" aria-haspopup="true" aria-expanded="false">
                <span data-i18n="nav.services">Servicios</span>
                <svg class="w-4 h-4 ml-1 transform group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
             
             <!-- Mega Menu Dropdown -->
             <div id="desktop-services-menu" class="absolute left-0 top-[100%] w-full invisible opacity-0 translate-y-4 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out z-40 pt-2">
                 <div class="bg-white rounded-b-xl shadow-2xl border-t border-brand-gold/20 p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mx-auto w-full max-w-screen-xl relative">
                     <!-- Decorative top accent -->
                     <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-gold/40 via-brand-green/40 to-brand-gold/40"></div>
                     ${desktopMenuGrid}
                 </div>
            </div>
        </div>
    `;
}

function renderMegaMenuMobile(menuCategories) {
    const mobileMenuContent = menuCategories.map(cat => `
        <div class="px-6 py-2">
            <a href="${cat.link}" class="block font-bold text-brand-green text-base mb-2 select-none">${cat.title}</a>
            <ul class="border-l-2 border-gray-200 pl-3 space-y-2">
                ${cat.items.map(item => `
                    <li>
                        <a href="${item.link}" class="block text-brand-gray-dark text-sm hover:text-brand-gold">
                            ${item.label}
                        </a>
                    </li>
                `).join('')}
            </ul>
        </div>
    `).join('');

    return `
        <div class="border-b border-gray-100 pb-2">
             <button class="w-full flex justify-between items-center py-3 px-4 text-lg font-bold text-gray-500 uppercase tracking-wider hover:bg-gray-50 focus:outline-none" onclick="this.nextElementSibling.classList.toggle('hidden'); this.querySelector('svg').classList.toggle('rotate-180');">
                <span data-i18n="nav.services">Servicios</span>
                <svg class="w-4 h-4 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            <div class="hidden bg-gray-50/50 space-y-1 pb-4">
                ${mobileMenuContent}
            </div>
        </div>
    `;
}
