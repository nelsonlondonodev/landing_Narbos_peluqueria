/**
 * Componente Hero Section (SSG)
 * Genera el HTML estático para la sección principal, manteniendo consistencia visual con la Home.
 * 
 * @param {Object} props
 * @param {string} props.title - Título principal (H1)
 * @param {string} props.subtitle - Subtítulo descriptivo
 * @param {string} props.imageSrc - Ruta de la imagen de fondo (relativa al root o absoluta)
 * @param {string} props.imageAlt - Texto alternativo para SEO
 * @returns {string} HTML string
 */
/**
 * Componente Hero Section (SSG)
 * Genera el HTML estático para la sección principal.
 * 
 * @param {Object} props
 * @param {string} props.title - Título principal (H1)
 * @param {string} props.subtitle - Subtítulo descriptivo
 * @param {string} props.imageSrc - Ruta de la imagen de fondo
 * @param {string} props.imageAlt - Texto alternativo para SEO
 * @returns {string} HTML string
 */
export const getHeroHTML = ({ title, subtitle, imageSrc, imageSrcMobile, imageAlt, variant = 'standard' }) => {
    return `
    <div class="relative">
        ${renderHeroImage(imageSrc, imageSrcMobile, imageAlt, variant)}
        ${renderHeroContent(title, subtitle)}
    </div>
    `;
};

/**
 * Renderiza la sección de la imagen de fondo con soporte para Picture (Móvil/Escritorio).
 */
function renderHeroImage(src, srcMobile, alt, variant) {
    const isLogo = variant === 'logo';
    const sectionClass = isLogo 
        ? 'relative h-[60vh] md:h-[80vh] bg-gray-900 rounded-b-xl mx-auto w-[85%]' 
        : 'relative h-[60vh] md:h-[80vh] bg-white';
    
    const imgClass = isLogo 
        ? 'w-full h-full object-contain absolute inset-0 z-0 mx-auto p-12 opacity-80' 
        : 'w-[85%] h-full object-cover absolute inset-0 z-0 mx-auto rounded-b-xl';

    // Si tenemos imagen móvil, usamos <picture> para optimizar LCP
    const imageHtml = srcMobile ? `
        <picture class="contents">
            <source media="(max-width: 768px)" srcset="${srcMobile}">
            <source media="(min-width: 769px)" srcset="${src}">
            <img src="${src}" alt="${alt}" class="${imgClass}" loading="eager" fetchpriority="high">
        </picture>
    ` : `<img src="${src}" alt="${alt}" class="${imgClass}" loading="eager" fetchpriority="high">`;

    return `
        <section id="inicio" class="${sectionClass}">
            ${imageHtml}
        </section>
    `;
}

/**
 * Renderiza el cuadro de contenido flotante.
 */
function renderHeroContent(title, subtitle) {
    return `
        <div class="absolute z-20 top-[50vh] md:top-[65vh] left-0 right-0 px-6 pointer-events-none">
            <div class="container mx-auto">
                <div class="bg-white/90 text-brand-gray-dark backdrop-blur-md p-6 md:p-8 rounded-lg shadow-xl max-w-4xl mx-auto text-center border border-gray-100 pointer-events-auto">
                    <h1 id="hero-title" class="animate-hero-element text-4xl md:text-6xl font-serif font-bold mb-4">${title}</h1>
                    <p id="hero-subtitle" class="animate-hero-element text-lg md:text-xl mb-8 max-w-2xl mx-auto">${subtitle}</p>
                </div>
            </div>
        </div>
    `;
}
