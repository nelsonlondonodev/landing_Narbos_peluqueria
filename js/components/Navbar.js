
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
        const baseClasses = "text-white hover:text-brand-medium active:text-brand-medium";
        const mobileClasses = "block py-2 px-4 text-lg hover:bg-brand-light/20 rounded-md active:bg-brand-light/40";
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
                <button id="desktop-services-btn" class="flex items-center text-white hover:text-brand-medium transition-colors py-2 focus:outline-none" aria-haspopup="true" aria-expanded="false">
                    <span data-key="navServicios">Servicios</span>
                    <svg class="w-4 h-4 ml-1 transform group-hover:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                
                <!-- Dropdown Menu -->
                <div id="desktop-services-menu" class="absolute left-0 top-full pt-2 w-48 hidden group-hover:block hover:block z-50">
                    <div class="bg-white rounded-md shadow-xl py-2 border border-brand-medium/20">
                        <a href="${basePath}servicios/peluqueria.html" class="block px-4 py-2 text-sm text-brand-gray-dark hover:bg-brand-light/20 hover:text-brand-green transition-colors">Peluquería</a>
                        <!-- Futuros servicios aquí -->
                    </div>
                </div>
            </div>

            ${navLink('#nosotros', 'navNosotros', 'Nosotros')}
            ${navLink('#galeria', 'navGaleria', 'Galería')}
            ${navLink('#resenas', 'navResenas', 'Reseñas')}
            ${navLink('#ubicacion', 'navUbicacion', 'Ubicación')}
            ${navLink('#contacto', 'navContacto', 'Contacto')}
            <a href="${basePath}blog/index.html" class="text-white hover:text-brand-medium active:text-brand-medium">Blog</a>

            <div class="ml-4 border-l border-brand-medium/50 pl-4 flex items-center space-x-4">
                <button id="lang-toggle-desktop" aria-label="Cambiar idioma" class="flex items-center text-white hover:text-brand-medium transition-colors duration-200"></button>
            </div>
        </div>

        <div class="md:hidden flex items-center">
             <button id="lang-toggle-mobile" aria-label="Cambiar idioma" class="mr-2 flex items-center text-white hover:text-white transition-colors duration-200"></button>
             
             <button id="menu-btn" aria-label="Abrir menú de navegación" class="text-white focus:outline-none z-50">
                 <svg id="menu-open-icon" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                 <svg id="menu-close-icon" class="w-6 h-6 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
             </button>
        </div>
    </nav>
    
    <div id="mobile-menu" class="md:hidden fixed top-0 right-0 h-screen w-64 bg-white text-brand-gray-dark shadow-2xl z-[110] transform translate-x-full transition-transform duration-300 ease-in-out">
        <div class="flex justify-end p-4">
            <button id="internal-close-btn" aria-label="Cerrar menú" class="p-2 text-brand-gray-dark/80 hover:text-brand-gray-dark transition-colors">
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
            <a href="${basePath}blog/index.html" class="block py-2 px-4 text-lg hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md active:bg-gray-200 dark:active:bg-gray-600">Blog</a>
        </div>
    </div>
    
    <div id="menu-backdrop" class="fixed inset-0 bg-black/50 z-30 hidden md:hidden"></div>
    `;
}
