/**
 * Componente reutilizable para la sección de marcas premium.
 * Renderiza un carrusel infinito con las marcas configuradas.
 * 
 * @example
 * import { BrandsSection } from './components/BrandsSection.js';
 * import { hairBrands } from '../data/brandsData.js';
 * new BrandsSection('brands-root', hairBrands).render();
 */
export class BrandsSection {
    /**
     * Crea una instancia de BrandsSection.
     * @param {string} containerId - El ID del elemento contenedor donde se renderizará la sección.
     * @param {Array} brands - Lista de objetos de marca {name, sub}.
     */
    constructor(containerId, brands = []) {
        this.container = document.getElementById(containerId);
        this.brands = brands;
    }

    /**
     * Renderiza el contenido HTML de la sección de marcas dentro del contenedor.
     */
    render() {
        if (!this.container || !this.brands || this.brands.length === 0) return;

        // Configuración de dimensiones para cálculo de animación
        const itemWidthMobile = 200; // px
        const itemWidthDesktop = 250; // px
        const uniqueItemsCount = this.brands.length;
        
        // Estilos para la animación del carrusel infinito
        // La animación mueve el track hacia la izquierda el ancho total de los items únicos.
        // Al llegar al final de esa distancia, salta a 0.
        // Como el contenido está duplicado, el salto es invisible.
        const styles = `
            <style>
                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(calc(-${itemWidthMobile}px * ${uniqueItemsCount})); }
                }
                .brands-slider {
                    display: flex;
                    width: 100%;
                    overflow: hidden;
                    position: relative;
                }
                .brands-track {
                    display: flex;
                    align-items: center;
                    width: max-content;
                    animation: scroll ${10 * uniqueItemsCount}s linear infinite;
                    gap: 3rem;
                }
                .brands-item {
                    flex-shrink: 0;
                    width: ${itemWidthMobile}px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }
                
                @media (min-width: 768px) {
                     @keyframes scroll {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(calc(-${itemWidthDesktop}px * ${uniqueItemsCount})); }
                    }
                    .brands-track {
                         gap: 5rem;
                         animation: scroll ${10 * uniqueItemsCount}s linear infinite;
                    }
                    .brands-item {
                        width: ${itemWidthDesktop}px;
                    }
                }
            </style>
        `;

        const createBrandItem = (brand) => `
            <div class="brands-item group cursor-default">
                <span class="text-3xl md:text-4xl font-serif font-bold text-gray-300 group-hover:text-brand-green transition-colors duration-300 whitespace-nowrap">${brand.name}</span>
                <span class="block text-[0.6rem] tracking-widest text-gray-300 group-hover:text-gray-600 uppercase mt-1">${brand.sub}</span>
            </div>
        `;

        // Duplicamos la lista varias veces para asegurar un bucle infinito fluido en pantallas grandes
        // 12 repeticiones del set completo aseguran suficiente buffer visual.
        const itemsHtml = Array(12).fill(this.brands).flat().map(createBrandItem).join('');

        this.container.innerHTML = `
            ${styles}
            <section class="py-12 bg-gray-50 border-y border-gray-100 overflow-hidden">
                <div class="container mx-auto px-6 text-center">
                    <p class="text-gray-500 uppercase tracking-[0.2em] text-xs font-bold mb-8 font-sans" data-animation="fadeInUp">Confianza Premium</p>
                    
                    <div class="brands-slider" data-animation="fadeInUp" data-animation-delay="0.1s">
                        <div class="brands-track">
                            ${itemsHtml}
                        </div>
                    </div>
                </div>
            </section>
        `;
    }
}
