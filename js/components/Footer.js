import { siteConfig } from '../config.js';

function renderSocialLinks() {
    return siteConfig.socialLinks.map(link => `
        <a href="${link.url}" target="_blank" class="text-gray-400 hover:text-white transition-colors duration-300">
            <span class="sr-only">${link.name}</span>
            <svg fill="currentColor" class="w-6 h-6" viewBox="0 0 448 512" aria-hidden="true">
                <path d="${link.iconPath}"/>
            </svg>
        </a>
    `).join('');
}

/**
 * Genera el HTML del Footer (Pie de página global).
 * @param {string} basePath - Ruta base para los assets.
 * @returns {string} HTML del componente Footer.
 */
export function getFooterHTML(basePath = './') {
    const year = new Date().getFullYear();
    
    return `
    <footer class="bg-gradient-to-t from-brand-gray-dark to-brand-green text-white py-12">
        <div class="container mx-auto px-6 text-center max-w-screen-xl">
            <div class="flex justify-center space-x-6 mb-6">
                ${renderSocialLinks().replace(/text-gray-400/g, 'text-brand-light/70')}
            </div>
            
            <p class="text-sm text-brand-light/80">
                © ${year} Narbo's Salón Spa.
                <br class="sm:hidden" />
                <span class="hidden sm:inline"> | </span>
                <span data-key="footerMadeWith">Hecho con ❤️ por</span>
                <a href="https://nelsonlondono.es" target="_blank" rel="noopener noreferrer" class="underline hover:text-white transition-colors duration-200">Nelson Londoño Agencia</a>
            </p>
        </div>
    </footer>
    `;
}