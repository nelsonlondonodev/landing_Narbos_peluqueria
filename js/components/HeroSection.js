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
export const getHeroHTML = ({ title, subtitle, imageSrc, imageAlt }) => {
    return `
    <div class="relative">
        <section class="relative h-[60vh] md:h-[80vh] bg-white">
            <img src="${imageSrc}" alt="${imageAlt}" class="w-[85%] h-full object-cover absolute inset-0 z-0 mx-auto rounded-b-xl" loading="eager">
        </section>
        
        <div class="absolute z-20 top-[50vh] md:top-[65vh] left-0 right-0 px-6">
            <div class="container mx-auto">
                <div class="bg-white text-brand-gray-dark backdrop-blur-sm p-6 md:p-8 rounded-lg shadow-xl max-w-4xl mx-auto text-left">
                    <h1 id="hero-title" class="animate-hero-element text-4xl md:text-6xl font-serif font-bold mb-4">${title}</h1>
                    <p id="hero-subtitle" class="animate-hero-element text-lg md:text-xl mb-8 max-w-2xl">${subtitle}</p>
                </div>
            </div>
        </div>
    </div>
    `;
};
