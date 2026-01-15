/**
 * Componente reutilizable para la sección de marcas premium.
 * Se encarga de renderizar la lista de marcas (Wella, Schwarzkopf, L'Oréal)
 * en el contenedor especificado.
 * 
 * @example
 * // En main.js o service-page.js
 * import { BrandsSection } from './components/BrandsSection.js';
 * const brandsSection = new BrandsSection('brands-root');
 * brandsSection.render();
 */
export class BrandsSection {
    /**
     * Crea una instancia de BrandsSection.
     * @param {string} containerId - El ID del elemento contenedor donde se renderizará la sección.
     */
    constructor(containerId) {
        this.container = document.getElementById(containerId);
    }

    /**
     * Renderiza el contenido HTML de la sección de marcas dentro del contenedor.
     * Si el contenedor no existe, no hace nada.
     */
    render() {
        if (!this.container) return;

        // Estilos para la animación del carrusel infinito
        const styles = `
            <style>
                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(calc(-250px * 3)); } /* Ajustar según el ancho total de los items */
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
                    width: max-content; /* Asegura que quepan todos los items */
                    animation: scroll 20s linear infinite;
                    gap: 3rem; /* Espaciado entre elementos */
                }
                .brands-item {
                    flex-shrink: 0;
                    width: 200px; /* Ancho fijo para cálculo preciso */
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }
                
                /* Pausar animación al hacer hover (opcional, el usuario pidió que siempre se mueva, 
                   pero es buena práctica UX. Si el usuario insistió en "nunca pare", podemos quitar esto) 
                   El usuario dijo "aun así sin ponerle el mouse", implicando que la animación es automática.
                   No pidió explícitamente quitar la pausa en hover, pero sí movimiento constante.
                */
                /* .brands-track:hover { animation-play-state: paused; } */
                
                @media (min-width: 768px) {
                     @keyframes scroll {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(calc(-300px * 3)); }
                    }
                    .brands-track {
                         gap: 5rem;
                         animation: scroll 30s linear infinite; /* Más lento en escritorio */
                    }
                    .brands-item {
                        width: 250px;
                    }
                }
            </style>
        `;

        // Definición de las marcas para renderizarlas dinámicamente
        const brands = [
            {
                name: 'WELLA',
                sub: 'Professionals'
            },
            {
                name: 'Schwarzkopf',
                sub: 'Professional'
            },
            {
                name: "L'ORÉAL",
                sub: 'Paris'
            }
        ];

        // Función para generar un item de marca
        const createBrandItem = (brand) => `
            <div class="brands-item group cursor-default">
                <span class="text-3xl md:text-4xl font-serif font-bold text-gray-300 group-hover:text-gray-800 transition-colors duration-300">${brand.name}</span>
                <span class="block text-[0.6rem] tracking-widest text-gray-300 group-hover:text-gray-600 uppercase mt-1">${brand.sub}</span>
            </div>
        `;

        // Generamos el HTML de las marcas. Duplicamos la lista varias veces para asegurar el loop infinito fluido.
        // 3 marcas * 4 repeticiones = 12 items. Suficiente para llenar pantallas grandes y permitir scroll suave.
        const brandsHtml = [...brands, ...brands, ...brands, ...brands, ...brands, ...brands].map(createBrandItem).join('');

        // Se usa un separador visual (barra vertical) simulado o simplemente espacio. 
        // En el diseño anterior había barras verticales. En un carrusel en movimiento, las barras pueden verse extrañas si no son parte del item.
        // Vamos a simplificar dejando solo espacio (gap) limpio como es tendencia en carruseles de logos.

        this.container.innerHTML = `
            ${styles}
            <section class="py-12 bg-gray-50 border-y border-gray-100 overflow-hidden">
                <div class="container mx-auto px-6 text-center">
                    <p class="text-gray-500 uppercase tracking-[0.2em] text-xs font-bold mb-8 font-sans" data-animation="fadeInUp">Excelencia garantizada con marcas globales</p>
                    
                    <div class="brands-slider" data-animation="fadeInUp" data-animation-delay="0.1s">
                        <div class="brands-track">
                            ${brandsHtml}
                        </div>
                    </div>
                </div>
            </section>
        `;
    }
}

