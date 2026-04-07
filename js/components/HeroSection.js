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
            
            <!-- COLOUMNA IZQUIERDA: CONTENIDO Y CONFIANZA -->
            <div class="w-full lg:w-[45%] flex flex-col justify-center animate-hero-element">
                <div class="inline-flex items-center gap-3 mb-8">
                    <span class="w-12 h-[2px] bg-brand-green"></span>
                    <span class="text-xs md:text-sm font-bold tracking-[0.5em] text-brand-green uppercase">Premium Experience</span>
                </div>

                <!-- H1 Intacto para SEO -->
                <h1 id="hero-title" class="text-5xl md:text-7xl lg:text-8xl font-serif font-black text-brand-gray-dark leading-[0.85] tracking-tightest mb-8">
                    ${title}
                </h1>
                
                <p id="hero-subtitle" class="text-lg md:text-xl text-brand-gray-dark/70 mb-12 max-w-lg leading-relaxed font-normal">
                    ${subtitle}
                </p>
                
                <!-- Trust Indicators (GMB Data) -->
                <div class="grid grid-cols-2 gap-8 border-t border-gray-100 pt-10">
                    <div>
                        <div class="text-4xl md:text-5xl font-serif font-black text-brand-gray-dark tracking-tighter">4.9 ⭐</div>
                        <div class="h-1 w-12 bg-brand-green mt-2"></div>
                        <div class="text-xs font-bold text-brand-gray-dark/40 uppercase mt-3 tracking-widest">Google Rating</div>
                    </div>
                    <div>
                        <div class="text-4xl md:text-5xl font-serif font-black text-brand-gray-dark tracking-tighter">+500</div>
                        <div class="h-1 w-12 bg-brand-green mt-2"></div>
                        <div class="text-xs font-bold text-brand-gray-dark/40 uppercase mt-3 tracking-widest">Reseñas Reales</div>
                    </div>
                </div>
            </div>

            <!-- COLUMNA DERECHA: EL RECORTE POÉTICO -->
            <div class="w-full lg:w-[55%] flex items-center justify-center relative">
                
                <!-- Fondo Sólido de Respaldo -->
                <div class="absolute inset-0 bg-brand-green/20 rounded-[4rem] rotate-3 scale-95 -z-10 blur-xl opacity-50"></div>

                <div class="relative w-full max-w-2xl h-[60vh] lg:h-[85vh] group animate-hero-element" style="animation-delay: 200ms;">
                    
                    <!-- Contenedor con Notch UI (Muescas Circulares) -->
                    <div class="w-full h-full p-4 lg:p-6 bg-white shadow-2xl rounded-[3.5rem] relative overflow-hidden">
                        
                        <!-- El Recorte Visual -->
                        <div class="w-full h-full rounded-[2.5rem] overflow-hidden relative
                                    [clip-path:polygon(0%_0%,100%_0%,100%_75%,85%_75%,85%_100%,0%_100%)]">
                            
                            <img src="${imageSrc}" alt="${imageAlt}" class="w-full h-full object-cover transition-transform duration-1000 scale-105 group-hover:scale-110">
                            
                            <!-- Overlay Gradiente -->
                            <div class="absolute inset-0 bg-gradient-to-tr from-brand-gray-dark/40 via-transparent to-transparent pointer-events-none"></div>
                        </div>

                        <!-- Notch: Business Status (Incrustado en la muesca inferior derecha) -->
                        <div class="absolute bottom-6 right-6 z-30">
                            <div id="business-status-root" class="bg-white p-3 rounded-full shadow-2xl scale-125 border-4 border-[#FDFBF9]"></div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </section>
    `;
};
