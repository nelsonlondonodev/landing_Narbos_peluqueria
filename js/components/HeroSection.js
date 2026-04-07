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
    imageAlt = "Narbo's Salón Spa"
}) => {
    return `
    <section id="inicio" class="relative w-full bg-[#FDFBF9] overflow-hidden" aria-label="Introducción narbo's">
        
        <!-- Fondo Abstracto Editorial -->
        <div class="absolute inset-0 z-0 pointer-events-none opacity-20">
            <div class="absolute top-[-10%] right-[-5%] w-[50%] h-[120%] bg-brand-green/10 blur-[120px] rounded-full rotate-12"></div>
        </div>

        <div class="container mx-auto px-6 lg:px-12 min-h-screen flex flex-col lg:flex-row items-center gap-16 py-32 lg:py-0 relative z-10">
            
            <!-- COLOUMNA IZQUIERDA: MENSAJE ESCULTURAL -->
            <div class="w-full lg:w-[45%] flex flex-col justify-center animate-hero-element">
                
                <!-- H1 Intacto para SEO (Minimalismo Puro) -->
                <h1 id="hero-title" class="text-5xl md:text-7xl lg:text-8xl font-serif font-black text-brand-gray-dark leading-[0.85] tracking-tightest mb-10">
                    ${title}
                </h1>
                
                <p id="hero-subtitle" class="text-lg md:text-xl text-brand-gray-dark/70 mb-12 max-w-md leading-relaxed font-normal">
                    ${subtitle}
                </p>
                
                <!-- Trust Indicator: Rating (Minimalista) -->
                <div class="flex flex-col gap-2">
                    <div class="text-5xl md:text-6xl font-serif font-black text-brand-gray-dark tracking-tighter">4.9 ⭐</div>
                    <div class="h-1 w-20 bg-brand-green"></div>
                    <div class="text-xs font-bold text-brand-gray-dark/40 uppercase mt-4 tracking-[0.3em]">Google Experience</div>
                </div>
            </div>

            <!-- COLUMNA DERECHA: LA PIEZA ARQUITECTÓNICA (LA IMAGEN) -->
            <div class="w-full lg:w-[55%] flex items-center justify-center relative">
                
                <!-- Fondo Sólido de Respaldo (Sin bordes, efecto flotante) -->
                <div class="absolute inset-0 bg-brand-green/20 rounded-[4rem] rotate-2 scale-95 -z-10 blur-xl opacity-30"></div>

                <div class="relative w-full max-w-2xl h-[55vh] lg:h-[75vh] group animate-hero-element" style="animation-delay: 200ms;">
                    
                    <!-- Contenedor con Clip-Path de Doble Muesca (Inferiores) -->
                    <!-- El recorte permite que los elementos "penetren" en la imagen -->
                    <div class="w-full h-full overflow-hidden relative shadow-2xl rounded-[3rem] lg:rounded-[5rem]
                                [clip-path:polygon(0%_0%,100%_0%,100%_80%,85%_80%,85%_100%,18%_100%,18%_80%,0%_80%)]">
                        
                        <img src="${imageSrc}" alt="${imageAlt}" class="w-full h-full object-cover transition-transform duration-[2000ms] scale-105 group-hover:scale-110">
                        
                        <!-- Overlay Sutil para profundidad -->
                        <div class="absolute inset-0 bg-gradient-to-tr from-brand-gray-dark/30 via-transparent to-transparent pointer-events-none"></div>
                    </div>

                    <!-- ELEMENTOS QUE "PENETRAN" (BUDGETS) -->

                    <!-- 1. Muesca Inferior Izquierda: Reseñas / Avatars -->
                    <div class="absolute bottom-[-2%] left-[2%] z-30 flex flex-col items-center gap-2">
                        <div class="bg-white p-2 md:p-4 rounded-3xl shadow-2xl flex items-center gap-4 border-l-8 border-brand-green">
                            <div class="flex -space-x-3">
                                <span class="w-10 h-10 rounded-full border-2 border-white bg-slate-200"></span>
                                <span class="w-10 h-10 rounded-full border-2 border-white bg-slate-300"></span>
                                <span class="w-10 h-10 rounded-full border-2 border-white bg-slate-400"></span>
                            </div>
                            <div class="flex flex-col">
                                <span class="text-xl font-black text-brand-gray-dark leading-none">+500</span>
                                <span class="text-[9px] uppercase font-bold tracking-widest text-brand-gray-dark/50">Reseñas</span>
                            </div>
                        </div>
                    </div>

                    <!-- 2. Muesca Inferior Derecha: Business Status -->
                    <div class="absolute bottom-[-2%] right-[2%] z-30 transform scale-110 md:scale-125">
                        <div id="business-status-root" class="bg-white p-2 rounded-full shadow-2xl ring-8 ring-[#FDFBF9]"></div>
                    </div>

                    <!-- 3. Decoración Minimalista Extra (Efecto Visual Poetry) -->
                    <div class="absolute -top-6 -right-6 w-16 h-16 bg-brand-green rounded-full flex items-center justify-center text-white shadow-2xl animate-pulse">
                         <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </div>

                </div>
            </div>
        </div>
    </section>
    `;
};
