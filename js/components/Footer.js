import { siteConfig } from '../config.js';
import businessHours from '../data/business-hours.js';

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

            <div class="mb-8 text-brand-light/80 text-sm">
                ${renderHours()}
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
            <span class="text-left md:text-center leading-tight border-b border-transparent group-hover:border-white/50 transition-colors duration-300">${siteConfig.contact.address}</span>
        </a>
    `;
}

/**
 * Renderiza los horarios de atención sincronizados.
 */
function renderHours() {
    const { schedule, lastSync } = businessHours;
    
    // Agrupamos lunes a sábado si tienen el mismo horario
    const monToSat = schedule.find(s => s.day === 'Lunes');
    const sunday = schedule.find(s => s.day === 'Domingo');

    const holiday = schedule.find(s => s.day === 'Festivos');

    return `
        <div class="flex flex-col items-center gap-1">
            <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span class="font-bold uppercase tracking-wider text-xs opacity-70">Horario de atención</span>
            </div>
            <p>Lunes a Sábado: <span class="font-bold text-white">${monToSat.opens} AM – ${monToSat.closes} PM</span></p>
            <p>Festivos: <span class="font-bold text-white">${holiday.opens} AM – ${holiday.closes} PM</span></p>
            <p class="opacity-60 text-xs">Domingos: <span class="font-bold text-red-400">Cerrado</span></p>
            <span class="text-[9px] opacity-30 mt-1 uppercase tracking-tighter">Sincronizado con Google • ${new Date(lastSync).toLocaleDateString()}</span>
        </div>
    `;
}

/**
 * Renderiza el copyright y créditos.
 * @param {number} year - Año actual.
 */
function renderCopyright(year) {
    return `
        <div class="flex flex-col sm:flex-row items-center justify-center gap-2 opacity-80 text-xs sm:text-sm">
            <span>© ${year} Narbo's Salón Spa.</span>
            <span class="hidden sm:inline text-brand-light/30">|</span>
            ${renderVersionTag()}
        </div>
        <span class="block mt-2 opacity-70 text-xs text-brand-light/90">
            Hecho con ❤️ por 
            <a href="https://nelsonlondono.es" target="_blank" rel="noopener noreferrer" class="font-medium underline hover:text-white transition-colors duration-200 decoration-brand-gold/50 hover:decoration-white">
                Nelson Londoño - Marketing y Automatización
            </a>
        </span>
    `;
}
/**
 * Renderiza el distintivo de versión del proyecto.
 * @returns {string} HTML del badge de versión.
 */
function renderVersionTag() {
    return `<span class="text-brand-light/50 font-mono text-[10px]" title="Versión del Proyecto">v${siteConfig.version}</span>`;
}
