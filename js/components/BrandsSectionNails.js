/**
 * Componente reutilizable para la sección de marcas de Uñas.
 * Carousel infinito con marcas específicas (Organic Nails, Masglo, OPI).
 */
export class BrandsSectionNails {
    /**
     * Crea una instancia de BrandsSectionNails.
     * @param {string} containerId - El ID del elemento contenedor.
     */
    constructor(containerId) {
        this.container = document.getElementById(containerId);
    }

    /**
     * Renderiza el contenido HTML de la sección de marcas dentro del contenedor.
     */
    render() {
        if (!this.container) return;

        // Estilos para la animación del carrusel infinito (reutilizando lógica)
        const styles = `
            <style>
                @keyframes scroll-nails {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(calc(-250px * 3)); }
                }
                .brands-slider {
                    display: flex;
                    width: 100%;
                    overflow: hidden;
                    position: relative;
                }
                .brands-track-nails {
                    display: flex;
                    align-items: center;
                    width: max-content;
                    animation: scroll-nails 20s linear infinite;
                    gap: 3rem;
                }
                .brands-item {
                    flex-shrink: 0;
                    width: 200px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }
                
                @media (min-width: 768px) {
                     @keyframes scroll-nails {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(calc(-300px * 3)); }
                    }
                    .brands-track-nails {
                         gap: 5rem;
                         animation: scroll-nails 30s linear infinite;
                    }
                    .brands-item {
                        width: 250px;
                    }
                }
            </style>
        `;

        const brands = [
            {
                name: 'Organic Nails',
                sub: 'Premium System'
            },
            {
                name: 'Masglo',
                sub: 'Gel Evolution'
            },
            {
                name: "OPI",
                sub: 'Professional'
            }
        ];

        const createBrandItem = (brand) => `
            <div class="brands-item group cursor-default">
                <span class="text-3xl md:text-4xl font-serif font-bold text-gray-300 group-hover:text-brand-green transition-colors duration-300 whitespace-nowrap">${brand.name}</span>
                <span class="block text-[0.6rem] tracking-widest text-gray-300 group-hover:text-gray-600 uppercase mt-1">${brand.sub}</span>
            </div>
        `;

        // Duplicamos la lista para efecto infinito
        const brandsHtml = [...brands, ...brands, ...brands, ...brands, ...brands, ...brands].map(createBrandItem).join('');

        this.container.innerHTML = `
            ${styles}
            <section class="py-12 bg-gray-50 border-y border-gray-100 overflow-hidden">
                <div class="container mx-auto px-6 text-center">
                    <p class="text-gray-500 uppercase tracking-[0.2em] text-xs font-bold mb-8 font-sans" data-animation="fadeInUp">Calidad Superior en tus Manos</p>
                    
                    <div class="brands-slider" data-animation="fadeInUp" data-animation-delay="0.1s">
                        <div class="brands-track-nails">
                            ${brandsHtml}
                        </div>
                    </div>
                </div>
            </section>
        `;
    }
}
