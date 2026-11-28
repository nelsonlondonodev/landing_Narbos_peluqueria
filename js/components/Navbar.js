/**
 * Genera el HTML de la barra de navegación.
 */
import { getMenuCategories } from '../data/navigation.js';
import { resolveAsset, resolveRoute } from '../config.js';

/**
 * Genera el HTML de la barra de navegación.
 */
export function getNavbarHTML(basePath = './', isHome = true) {
    const linkPrefix = isHome ? '' : `${basePath}`;
    const menuCategories = getMenuCategories();
    const navLink = createNavLinkHelper(linkPrefix, basePath);

    return `
    <nav class="container mx-auto px-6 flex justify-between items-center max-w-screen-xl relative z-50 h-full w-full transition-all duration-300">
        ${renderLogo(basePath, isHome)}
        
        <!-- Desktop Menu -->
        <div class="desktop-menu flex items-center space-x-8 max-md:hidden pl-8">
            ${renderMegaMenuDesktop(menuCategories, basePath)}
            ${navLink(resolveRoute('nosotros', basePath), 'Nosotros')}
            ${navLink(resolveRoute('contacto', basePath), 'Contacto')}
            ${navLink(resolveRoute('blog/', basePath), 'Blog')}
            ${renderSearchButton()}
        </div>

        <!-- Mobile Toggle -->
        ${renderMobileToggle()}
    </nav>
    
    <!-- Mobile Menu Overlay -->
    <div id="mobile-menu" class="md:hidden fixed top-0 right-0 w-[85vw] max-w-sm h-[100dvh] bg-white text-brand-gray-dark shadow-2xl z-[110] transform translate-x-full transition-transform duration-300 ease-out overflow-y-auto">
        ${renderMobileMenuHeader()}
        
        <div class="flex flex-col p-4 space-y-1">
            ${navLink(isHome ? '#' : basePath, 'Inicio', true)}
            ${renderMegaMenuMobile(menuCategories, basePath)}
            ${navLink(resolveRoute('nosotros', basePath), 'Nosotros', true)}
            ${navLink(resolveRoute('contacto', basePath), 'Contacto', true)}
            ${navLink(resolveRoute('blog/', basePath), 'Blog', true)}
        </div>
    </div>
    
    <div id="menu-backdrop" class="fixed inset-0 bg-black/60 z-[100] hidden md:hidden backdrop-blur-sm transition-opacity duration-300"></div>
    `;
}

// --- Helpers de Renderizado ---

function createNavLinkHelper(linkPrefix, basePath) {
    return (href, text, mobile = false) => {
        const baseClasses = "nav-top text-white font-medium";
        const mobileClasses = "block py-3 px-4 text-lg hover:bg-gray-50 rounded-md text-brand-gray-dark border-b border-gray-100/50 transition-all";
        const finalHref = href.startsWith('#') ? `${linkPrefix}${href}` : href;
        return `<a href="${finalHref}" class="${mobile ? mobileClasses : baseClasses}">${text}</a>`;
    };
}

function renderLogo(basePath, isHome) {
    const logoSrc = resolveAsset('images/brand/logo_narbos.webp', basePath);
    return `
        <a href="${isHome ? '#' : basePath}" class="block group">
             <img src="${logoSrc}" alt="Narbo's Salón Spa, ir al inicio" class="h-12 w-auto md:h-14 transition-transform duration-300 group-hover:scale-105" width="280" height="56" decoding="async">
        </a>
    `;
}

/**
 * Lupa del buscador. La reutiliza el propio `SiteSearch` en su caja de texto.
 * @param {string} sizeClasses - Clases de tamaño y color del SVG.
 */
export const searchIcon = (sizeClasses) => `<svg class="${sizeClasses}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>`;

/**
 * Lupa del buscador interno. La abre `SearchController` por delegación, así que basta
 * con el atributo `data-search-open`.
 */
function renderSearchButton(mobile = false) {
    if (mobile) {
        return `
             <button type="button" data-search-open aria-label="Buscar en la web" class="text-white p-1 focus:outline-none">
                 ${searchIcon('w-6 h-6')}
             </button>
        `;
    }
    return `
        <button type="button" data-search-open aria-label="Buscar en la web" class="flex items-center gap-2 text-white hover:text-brand-light font-medium transition-colors rounded-full border border-white/40 hover:border-white/70 px-3 py-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70">
            ${searchIcon('w-5 h-5')}
            <span class="max-lg:hidden">Buscar</span>
        </button>
    `;
}

function renderMobileToggle() {
    return `
        <div class="md:hidden flex items-center gap-4">
             ${renderSearchButton(true)}
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

/**
 * Renderiza una categoría individual para el menú.
 */
function renderCategory(cat, basePath, isMobile = false) {
    const itemsHTML = cat.items.map(item => `
        <li>
            <a href="${resolveRoute(item.link, basePath)}" class="${isMobile ? 'block text-brand-gray-dark text-sm hover:text-brand-gold py-1' : 'services-link block -mx-3 rounded-md px-3 py-2 text-sm text-brand-gray-dark'}">
                ${item.label}
            </a>
        </li>
    `).join('');

    if (isMobile) {
        return `
            <div class="px-6 py-2">
                <a href="${resolveRoute(cat.link, basePath)}" class="block font-bold text-brand-green text-base mb-2 select-none">${cat.title}</a>
                <ul class="border-l-2 border-gray-200 pl-3 space-y-2">
                    ${itemsHTML}
                </ul>
            </div>
        `;
    }

    return `
        <div class="flex flex-col space-y-2">
            <a href="${resolveRoute(cat.link, basePath)}" class="services-title flex items-center justify-between border-b-2 border-brand-green pb-2 font-serif text-base font-bold uppercase tracking-wider text-brand-green">
                <span>${cat.title}</span>
                <span class="services-arrow" aria-hidden="true">&rarr;</span>
            </a>
            <ul>
                ${itemsHTML}
            </ul>
        </div>
    `;
}

function renderMegaMenuDesktop(menuCategories, basePath) {
    const gridContent = menuCategories.map(cat => renderCategory(cat, basePath)).join('');
    return `
        <div class="services-nav static flex h-full items-center" data-services-nav>
            <button type="button" id="desktop-services-btn" class="services-trigger relative z-10 flex h-full cursor-pointer items-center py-4 font-medium text-white focus:outline-none" aria-expanded="false" aria-controls="desktop-services-menu">
                <span class="nav-top">Servicios</span>
                <svg class="services-chevron ml-1 h-4 w-4 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            <div id="desktop-services-menu" class="services-panel absolute left-0 top-full z-40 w-full pt-2">
                <div class="mx-auto grid w-full max-w-screen-xl grid-cols-1 gap-8 rounded-b-xl border-t-2 border-brand-medium bg-white p-8 shadow-2xl md:grid-cols-2 lg:grid-cols-4">
                    ${gridContent}
                </div>
            </div>
        </div>
    `;
}

function renderMegaMenuMobile(menuCategories, basePath) {
    const content = menuCategories.map(cat => renderCategory(cat, basePath, true)).join('');
    return `
        <div class="border-b border-gray-100 pb-2">
             <button class="mobile-services-toggle w-full flex justify-between items-center py-3 px-4 text-lg font-bold text-gray-500 uppercase tracking-wider hover:bg-gray-50 focus:outline-none">
                <span>Servicios</span>
                <svg class="w-4 h-4 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            <div class="hidden bg-gray-50/50 space-y-1 pb-4">
                ${content}
            </div>
        </div>
    `;
}

