import { siteConfig } from '../config.js';

/**
 * Genera el HTML del Footer (Pie de página global).
 * @param {string} basePath - Ruta base para los assets.
 * @returns {string} HTML del componente.
 */
export function getFooterHTML(basePath = './') {
    const year = new Date().getFullYear();

    return `
    <footer class="bg-gradient-to-t from-brand-gray-dark to-brand-green text-white py-12">
        <div class="container mx-auto px-6 text-center max-w-screen-xl">
            <div class="flex justify-center space-x-6 mb-6">
                ${renderSocialLinks()}
            </div>

            <div class="mb-6 text-brand-light/90">
                ${renderAddress()}
            </div>
            
            <p class="text-sm text-brand-light/80">
                ${renderCopyright(year)}
            </p>
        </div>
    </footer>
    `;
}

/**
 * Renderiza los iconos de redes sociales.
 */
function renderSocialLinks() {
    // Generamos los links y reemplazamos el color gris por el color de marca claro
    const linksHTML = siteConfig.socialLinks.map(link => `
        <a href="${link.url}" target="_blank" class="text-brand-light/70 hover:text-white transition-colors duration-300">
            <span class="sr-only">${link.name}</span>
            <svg fill="currentColor" class="w-6 h-6" viewBox="0 0 448 512" aria-hidden="true">
                <path d="${link.iconPath}"/>
            </svg>
        </a>
    `).join('');
    
    return linksHTML;
}

/**
 * Renderiza la dirección del negocio.
 */
function renderAddress() {
    // Enlace directo a Google Maps con la ubicación exacta
    const mapsUrl = "https://maps.app.goo.gl/WyqYyvVpWwXyJk6X6"; // Link corto si se tuviera, o query

    // Usamos una query de búsqueda precisa como fallback robusto si no tenemos el CID exacto a mano, 
    // aunque la búsqueda "Narbo's Salon Spa Chia" es muy específica.
    // Mejor aún, usaremos una query de búsqueda codificada para asegurar compatibilidad.
    const query = encodeURIComponent("Narbo's Salon Spa, Bajos Hotel Ibis, Chía");
    const mapsLink = `https://www.google.com/maps/search/?api=1&query=${query}`;

    return `
        <a href="${mapsLink}" target="_blank" rel="noopener noreferrer" class="group flex items-start md:items-center justify-center gap-2 max-w-sm mx-auto hover:text-white transition-colors duration-300" aria-label="Ver ubicación en Google Maps">
            <svg class="w-5 h-5 mt-1 md:mt-0 shrink-0 text-brand-gold group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <span class="text-left md:text-center leading-tight border-b border-transparent group-hover:border-white/50 transition-colors duration-300">Bajos del Hotel Ibis, Km 2 Vía Cajicá - Chía, Cundinamarca</span>
        </a>
    `;
}

/**
 * Renderiza el copyright y créditos.
 * @param {number} year - Año actual.
 */
function renderCopyright(year) {
    return `
        © ${year} Narbo's Salón Spa.
        <span class="block sm:inline sm:ml-1 mt-2 sm:mt-0 opacity-80 text-xs sm:text-sm">
            Hecho con ❤️ por 
            <a href="https://nelsonlondono.es" target="_blank" rel="noopener noreferrer" class="font-medium underline hover:text-white transition-colors duration-200 decoration-brand-gold/50 hover:decoration-white">
                Nelson Londoño - Marketing y Automatización
            </a>
        </span>
    `;
}