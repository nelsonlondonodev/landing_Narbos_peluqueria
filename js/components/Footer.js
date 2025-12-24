const socialLinksData = [
    {
        name: "WhatsApp",
        url: "https://wa.me/573123462618?text=hola, ¡Te hablo desde la web de Narbos Salón!",
        iconPath: "M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.8 0-66.3-8.8-94.3-25.7l-6.7-4-69.8 18.3L72 359.2l-4.5-7c-18.9-29.5-29.9-63.5-29.9-98.8 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"
    },
    {
        name: "Instagram",
        url: "https://www.instagram.com/narbos_salon_spa/",
        iconPath: "M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9 26.3 26.2 58 34.4 93.9 36.2 37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
    },
    {
        name: "Facebook",
        url: "https://www.facebook.com/p/Narbos-Spa-61552033490282/",
        iconPath: "M504 256C504 119 393 8 256 8S8 119 8 256c0 123.8 90.5 226.4 209.3 245V327.7h-63V256h63v-54.6c0-62.2 37-96.5 93.7-96.5 27.1 0 55.5 4.8 55.5 4.8v61h-31.3c-30.8 0-40.4 19.1-40.4 38.7V256h68.8l-11 71.7h-57.8V501C413.5 482.4 504 379.8 504 256z"
    },
    {
        name: "TikTok",
        url: "https://www.tiktok.com/@narbosspa2508",
        iconPath: "M448 209.9a210.1 210.1 0 0 1 -122.8-39.25V349.38A162.6 162.6 0 1 1 185.3 189.31V292.8a74.62 74.62 0 1 0 52.23 71.18V0l88 0a121.18 121.18 0 0 0 122.4 121.18c0 34.13-13.43 65.29-35.12 88.72z"
    }
];

function renderSocialLinks() {
    return socialLinksData.map(link => `
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
    <footer class="bg-gradient-to-t from-gray-800 to-brand-green text-white py-12">
        <div class="container mx-auto px-6 text-center max-w-screen-xl">
            <div class="flex justify-center space-x-6 mb-6">
                ${renderSocialLinks()}
            </div>
            
            <p class="text-sm text-gray-400 dark:text-gray-500">
                © ${year} Narbo's Salón Spa.
                <br class="sm:hidden" />
                <span class="hidden sm:inline"> | </span>
                <span data-key="footerMadeWith">Hecho con ❤️ por</span>
            </p>
        </div>
    </footer>
    `;
}