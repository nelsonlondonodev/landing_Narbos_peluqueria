/**
 * Componente Hero Section (Extreme Cutout UI)
 * Implementa el efecto de "recorte" profundo donde los elementos se integran en los huecos de la imagen.
 * 
 * @param {Object} props
 * @param {string} props.title - Título principal (H1)
 * @param {string} props.subtitle - Subtítulo descriptivo
 * @param {string} props.imageSrc - Imagen principal
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
    <section id="inicio" class="relative w-full bg-[#FDFBF9] overflow-hidden" aria-label="Introducción narbo's">
        
        <!-- Fondo Abstracto Premium -->
        <div class="absolute inset-0 z-0 pointer-events-none opacity-30">
            <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-green/5 via-transparent to-brand-medium/5"></div>
        </div>

        <div class="container mx-auto px-6 lg:px-12 min-h-screen flex flex-col lg:grid lg:grid-cols-12 lg:gap-8 items-center py-20 lg:py-0 relative z-10">
            
            <!-- Columna de Texto: Fuerte y Elegante -->
            <div class="lg:col-span-5 flex flex-col justify-center animate-hero-element mb-12 lg:mb-0">
                <div class="inline-flex items-center gap-3 mb-6">
                    <span class="w-12 h-[1px] bg-brand-green"></span>
                    <span class="text-xs md:text-sm font-bold tracking-[0.4em] text-brand-green uppercase">Premium Spa</span>
                </div>

                <h1 id="hero-title" class="text-5xl md:text-7xl lg:text-7xl xl:text-8xl font-serif font-medium text-brand-gray-dark leading-[0.9] tracking-tighter mb-8 max-w-lg">
                    ${title}
                </h1>
                
                <p id="hero-subtitle" class="text-lg md:text-xl text-brand-gray-dark/60 mb-10 max-w-md leading-relaxed font-light">
                    ${subtitle}
                </p>
                
                <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-6">
                    <a href="${ctaLink}" class="px-10 py-5 bg-brand-green text-white rounded-full font-bold text-lg text-center shadow-xl shadow-brand-green/20 hover:bg-brand-gray-dark transition-all hover:-translate-y-1 active:scale-95">
                        ${ctaText}
                    </a>
                    
                    <a href="https://wa.me/573123462618" class="group flex items-center justify-center gap-2 text-brand-green font-bold text-lg">
                        <span>Agendar Ahora</span>
                        <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                    </a>
                </div>
            </div>

            <!-- Columna de Imagen: El Corazón del Cutout UI -->
            <div class="lg:col-span-12 lg:absolute lg:top-0 lg:right-0 lg:w-3/5 lg:h-full flex items-center justify-end z-0">
                <div class="relative w-full h-[60vh] lg:h-[85vh] group animate-hero-element" style="animation-delay: 200ms;">
                    
                    <!-- Sombra 3D profunda que sigue la forma -->
                    <div class="absolute inset-0 bg-brand-gray-dark/5 blur-3xl translate-x-10 translate-y-10 rounded-[5rem] pointer-events-none"></div>

                    <!-- El Contenedor con el Recorte (Clip-path) -->
                    <!-- El recorte crea muescas en la esquina superior izquierda y abajo derecha -->
                    <div class="w-full h-full overflow-hidden bg-white border-[12px] border-white shadow-2xl transition-all duration-700
                                [clip-path:polygon(15%_0%,100%_0%,100%_80%,85%_80%,85%_100%,0%_100%,0%_20%,15%_20%)]
                                rounded-[3rem] lg:rounded-[6rem]">
                        
                        <img src="${imageSrc}" alt="${imageAlt}" class="w-full h-full object-cover transition-transform duration-1000 scale-105 group-hover:scale-100 grayscale-[0.2] group-hover:grayscale-0">
                        
                        <!-- Overlay sutil -->
                        <div class="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60 pointer-events-none"></div>
                    </div>

                    <!-- Elementos Integrados en las "Muescas" -->
                    

                    <!-- 2. Business Status en la muesca inferior derecha -->
                    <div class="absolute bottom-[8%] right-[2%] md:bottom-[15%] md:right-[5%] z-20">
                        <div id="business-status-root" class="bg-white p-2 rounded-full shadow-2xl ring-8 ring-[#FDFBF9] transform scale-110 md:scale-125"></div>
                    </div>

                    <!-- Decoración extra: El "puzzle piece" faltante -->
                    <div class="absolute -bottom-8 -left-8 w-32 h-32 bg-brand-green/10 rounded-full blur-2xl z-0"></div>
                </div>
            </div>
        </div>
    </section>
    `;
};
