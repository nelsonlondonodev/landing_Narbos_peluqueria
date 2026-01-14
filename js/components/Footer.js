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
    return `
        <p class="flex items-center justify-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <span>Bajos del Hotel Ibis, Km 2 Vía Cajicá - Chía, Cundinamarca</span>
        </p>
    `;
}

/**
 * Renderiza el copyright y créditos.
 * @param {number} year - Año actual.
 */
function renderCopyright(year) {
    return `
        © ${year} Narbo's Salón Spa.
        <br class="sm:hidden" />
        <span class="hidden sm:inline"> | </span>
        <span data-key="footerMadeWith">Hecho con ❤️ por</span>
        <a href="https://nelsonlondono.es" target="_blank" rel="noopener noreferrer" class="underline hover:text-white transition-colors duration-200">Nelson Londoño Agencia</a>
    `;
}