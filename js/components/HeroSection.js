/**
 * Componente Hero Section (Clean Bento Refactor)
 * Diseño minimalista con una sola imagen de alto impacto y jerarquía clara.
 * 
 * @param {Object} props
 * @param {string} props.title - Título principal (H1)
 * @param {string} props.subtitle - Subtítulo descriptivo
 * @param {string} props.imageSrc - Imagen principal
 * @param {string} [props.ctaText] - Texto del botón principal
 * @param {string} [props.ctaLink] - Enlace del botón principal
 * @returns {string} HTML string
 */
export const getHeroHTML = ({ 
    title, 
    subtitle, 
    imageSrc, 
    imageAlt = "Narbo's Salón Spa", 
    ctaText = "Ver Servicios", 
    ctaLink = "#servicios" 
}) => {
    return `
    <section id="inicio" class="relative w-full bg-[#FDFBF9] overflow-hidden pt-16 lg:pt-0" aria-labelledby="hero-title">
        
        <!-- Decoración de Fondo: Minimalista -->
        <div class="absolute top-0 right-0 w-1/3 h-1/2 bg-brand-green/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div class="container mx-auto px-6 lg:px-12 min-h-[70vh] lg:min-h-[85vh] flex flex-col lg:grid lg:grid-cols-12 lg:gap-16 items-center py-12 lg:py-24">
            
            <!-- Columna de Contenido: Limpia y Directa -->
            <div class="lg:col-span-7 flex flex-col justify-center z-10 animate-hero-element mb-12 lg:mb-0">
                <div class="inline-flex items-center gap-2 mb-6 px-3 py-1 bg-brand-green/10 rounded-full">
                    <span class="w-1.5 h-1.5 bg-brand-green rounded-full"></span>
                    <span class="text-[10px] md:text-xs font-bold tracking-[0.2em] text-brand-green uppercase">Estética Premium</span>
                </div>

                <h1 id="hero-title" class="text-4xl md:text-5xl lg:text-7xl font-serif font-bold text-brand-gray-dark leading-[1.1] mb-8 lg:max-w-3xl">
                    ${title}
                </h1>
                
                <p id="hero-subtitle" class="text-base md:text-lg lg:text-xl text-brand-gray-dark/70 mb-10 max-w-xl leading-relaxed font-light">
                    ${subtitle}
                </p>
                
                <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                    <a href="${ctaLink}" class="px-8 py-4 bg-brand-green text-white rounded-2xl font-bold text-lg text-center shadow-lg transition-all hover:bg-brand-gray-dark active:scale-95">
                        ${ctaText}
                    </a>
                    
                    <a href="https://wa.me/573123462618" class="px-8 py-4 border-2 border-brand-green/20 text-brand-green rounded-2xl font-bold text-lg text-center hover:bg-brand-green/5 transition-all active:scale-95">
                        Agendar Cita
                    </a>
                </div>
            </div>

            <!-- Columna de Imagen: Un solo bloque Bento con bordes orgánicos -->
            <div class="lg:col-span-5 w-full relative animate-hero-element" style="animation-delay: 200ms;">
                <div class="relative w-full aspect-[4/5] bg-brand-green/5 rounded-[4rem] overflow-hidden shadow-2xl border-4 border-white">
                    <img src="${imageSrc}" alt="${imageAlt}" class="w-full h-full object-cover">
                    <!-- Overlay sutil para profundidad -->
                    <div class="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"></div>
                </div>

                <!-- Business Status Badge: Posicionado estratégicamente para no estorbar -->
                <div id="business-status-root" class="absolute -top-4 -right-2 md:top-8 md:-right-8 z-20 scale-90 md:scale-100"></div>
                
                <!-- Detalle Decorativo del Bento (Refleja el concepto de cuadrícula) -->
                <div class="absolute -bottom-6 -left-6 w-20 h-20 bg-brand-green rounded-3xl -rotate-12 z-0 opacity-10"></div>
            </div>
        </div>
    </section>
    `;
};
