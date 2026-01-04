
/**
 * Genera el HTML de la barra de navegación.
 * @param {string} basePath - Ruta base para los assets (ej: './' o '../../').
 * @param {boolean} isHome - Indica si se está renderizando en la página de inicio.
 * @returns {string} HTML del componente Navbar.
 */
export function getNavbarHTML(basePath = './', isHome = true) {
    const linkPrefix = isHome ? '' : '/index.html';
    
    // Función auxiliar para generar enlaces de navegación
    const navLink = (href, key, text, mobile = false) => {
        const baseClasses = "text-white dark:text-gray-200 hover:text-brand-medium dark:hover:text-brand-medium active:text-brand-medium dark:active:text-brand-medium";
        const mobileClasses = "block py-2 px-4 text-lg hover:bg-brand-gray-light dark:hover:bg-gray-700 rounded-md active:bg-brand-gray-light dark:active:bg-gray-700";
        const finalHref = href.startsWith('#') ? `${linkPrefix}${href}` : href;
        
        return `<a href="${finalHref}" data-key="${key}${mobile ? 'Mobile' : ''}" class="${mobile ? mobileClasses : baseClasses}">${text}</a>`;
    };

    return `
    <nav class="container mx-auto px-6 py-3 flex justify-between items-center max-w-screen-xl">
        <a href="${linkPrefix}#inicio" class="block">
            <img src="${basePath}images/logo_narbos.webp" alt="Logo de Narbo's Salón Spa" class="h-14 w-auto" width="280" height="56">
        </a>
        
        <div class="desktop-menu flex items-center space-x-8 max-md:hidden">
            ${navLink('#inicio', 'navInicio', 'Inicio')}
            
            <!-- Dropdown Servicios -->
            <div class="relative group">
                <button id="desktop-services-btn" class="flex items-center text-white dark:text-gray-200 hover:text-brand-medium dark:hover:text-brand-medium transition-colors py-2 focus:outline-none" aria-haspopup="true" aria-expanded="false">
                    <span data-key="navServicios">Servicios</span>
                    <svg class="w-4 h-4 ml-1 transform group-hover:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                
                <!-- Dropdown Menu -->
                <div id="desktop-services-menu" class="absolute left-0 top-full pt-2 w-48 hidden group-hover:block hover:block z-50">
                    <div class="bg-white dark:bg-gray-800 rounded-md shadow-xl py-2 border border-gray-100 dark:border-gray-700">
                        <a href="${basePath}servicios/peluqueria.html" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-brand-green dark:hover:text-brand-medium transition-colors">Peluquería</a>
                        <!-- Futuros servicios aquí -->
                    </div>
                </div>
            </div>

            ${navLink('#nosotros', 'navNosotros', 'Nosotros')}
            ${navLink('#galeria', 'navGaleria', 'Galería')}
            ${navLink('#resenas', 'navResenas', 'Reseñas')}
            ${navLink('#ubicacion', 'navUbicacion', 'Ubicación')}
            ${navLink('#contacto', 'navContacto', 'Contacto')}
            <a href="${basePath}blog/index.html" class="text-white dark:text-gray-200 hover:text-brand-medium dark:hover:text-brand-medium active:text-brand-medium dark:active:text-brand-medium">Blog</a>

            <div class="ml-4 border-l border-gray-300/50 dark:border-gray-600 pl-4 flex items-center space-x-4">
                <button id="lang-toggle-desktop" aria-label="Cambiar idioma" class="flex items-center text-brand-light hover:text-white dark:hover:text-brand-medium transition-colors duration-200"></button>
                
                <button id="theme-toggle" type="button" aria-label="Cambiar tema de color" class="text-brand-light dark:text-gray-400 hover:bg-white/20 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-brand-light dark:focus:ring-gray-700 rounded-lg text-sm p-2.5">
                    <svg id="theme-toggle-dark-icon" class="hidden w-5 h-5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                    <svg id="theme-toggle-light-icon" class="hidden w-5 h-5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                    <svg id="theme-toggle-auto-icon" class="hidden w-5 h-5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                </button>
            </div>
        </div>

        <div class="md:hidden flex items-center">
             <button id="lang-toggle-mobile" aria-label="Cambiar idioma" class="mr-2 flex items-center text-brand-light hover:text-white dark:hover:text-brand-medium transition-colors duration-200"></button>
             <button id="theme-toggle-mobile" type="button" aria-label="Cambiar tema de color" class="text-brand-light dark:text-gray-400 hover:bg-white/20 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-brand-light dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-2">
                <svg id="theme-toggle-dark-icon-mobile" class="hidden w-5 h-5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                <svg id="theme-toggle-light-icon-mobile" class="hidden w-5 h-5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                <svg id="theme-toggle-auto-icon-mobile" class="hidden w-5 h-5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
             </button>
             <button id="menu-btn" aria-label="Abrir menú de navegación" class="text-white dark:text-gray-200 focus:outline-none z-50">
                 <svg id="menu-open-icon" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                 <svg id="menu-close-icon" class="w-6 h-6 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
             </button>
        </div>
    </nav>
    
    <div id="mobile-menu" class="md:hidden fixed top-0 right-0 h-screen w-64 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-2xl z-[110] transform translate-x-full transition-transform duration-300 ease-in-out">
        <div class="flex justify-end p-4">
            <button id="internal-close-btn" aria-label="Cerrar menú" class="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
        </div>
        <div class="flex flex-col px-8 space-y-4 overflow-y-auto max-h-[calc(100vh-80px)]">
            ${navLink('#inicio', 'navInicio', 'Inicio', true)}
            ${navLink('#servicios', 'navServicios', 'Servicios', true)}
            ${navLink('#nosotros', 'navNosotros', 'Nosotros', true)}
            ${navLink('#galeria', 'navGaleria', 'Galería', true)}
            ${navLink('#resenas', 'navResenas', 'Reseñas', true)}
            ${navLink('#ubicacion', 'navUbicacion', 'Ubicación', true)}
            ${navLink('#contacto', 'navContacto', 'Contacto', true)}
            <a href="${basePath}blog/index.html" class="block py-2 px-4 text-lg hover:bg-brand-gray-light dark:hover:bg-gray-700 rounded-md active:bg-brand-gray-light dark:active:bg-gray-700">Blog</a>
        </div>
    </div>
    
    <div id="menu-backdrop" class="fixed inset-0 bg-black/50 z-30 hidden md:hidden"></div>
    `;
}
