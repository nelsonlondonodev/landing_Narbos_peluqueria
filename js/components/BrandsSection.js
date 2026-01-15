/**
 * Componente reutilizable para la sección de marcas premium.
 * Renderiza un carrusel infinito con las marcas configuradas.
 * Utiliza Web Animations API para manejar anchos variables y carga de fuentes.
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

        // Estilos base
        // Usamos padding en los items en lugar de gap flex para facilitar el cálculo del ancho total
        const styles = `
            <style>
                .brands-slider {
                    display: flex;
                    width: 100%;
                    overflow: hidden;
                    position: relative;
                    /* Máscara de degradado para suavizar bordes */
                    mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
                    -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
                }
                .brands-track {
                    display: flex;
                    align-items: center;
                    width: max-content;
                    will-change: transform;
                }
                .brands-item {
                    flex-shrink: 0;
                    width: auto; /* Ancho variable según contenido */
                    padding: 0 2rem; /* Espaciado mobile (Gap simulado) */
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    box-sizing: border-box;
                }
                
                @media (min-width: 768px) {
                    .brands-item {
                        padding: 0 4rem; /* Espaciado desktop más amplio */
                    }
                }
            </style>
        `;

        const createBrandItem = (brand) => `
            <div class="brands-item group cursor-default select-none">
                <span class="text-3xl md:text-4xl font-serif font-bold text-gray-300 group-hover:text-brand-green transition-colors duration-300 whitespace-nowrap">${brand.name}</span>
                <span class="block text-[0.6rem] tracking-widest text-gray-300 group-hover:text-gray-600 uppercase mt-1 text-center">${brand.sub}</span>
            </div>
        `;

        // Duplicamos la lista suficientes veces para cubrir pantallas grandes y buffer de scroll (12x es seguro)
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

        // Iniciamos la animación una vez que las fuentes estén cargadas para asegurar medidas correctas
        document.fonts.ready.then(() => {
            this.startAnimation();
        });
    }

    /**
     * Calcula el ancho del set original de marcas e inicia la animación infinita.
     */
    startAnimation() {
        const track = this.container.querySelector('.brands-track');
        if (!track) return;

        const items = track.children;
        const uniqueCount = this.brands.length;
        
        // Sumamos el offsetWidth (ancho + padding) de los elementos originales únicos
        let totalScrollWidth = 0;
        for (let i = 0; i < uniqueCount; i++) {
            if (items[i]) {
                totalScrollWidth += items[i].offsetWidth;
            }
        }

        // Animación usando Web Animations API
        // Mueve el track hacia la izquierda exactamente el ancho de los items únicos
        track.animate([
            { transform: 'translateX(0)' },
            { transform: `translateX(-${totalScrollWidth}px)` }
        ], {
            duration: uniqueCount * 3000, // 3 segundos por item para mantener velocidad constante
            iterations: Infinity,
            easing: 'linear'
        });
    }
}
