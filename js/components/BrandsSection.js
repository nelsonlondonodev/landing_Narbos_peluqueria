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

        this.container.innerHTML = `
            <section class="py-12 bg-gray-50 border-y border-gray-100">
                <div class="container mx-auto px-6 text-center">
                    <p class="text-gray-500 uppercase tracking-[0.2em] text-xs font-bold mb-8 font-sans" data-animation="fadeInUp">Excelencia garantizada con marcas globales</p>
                    <div class="flex flex-wrap justify-center items-center gap-8 md:gap-20" data-animation="fadeInUp" data-animation-delay="0.1s">
                        <!-- Textos tipográficos simulando logos minimalistas -->
                        <div class="group cursor-default">
                            <span class="text-3xl md:text-4xl font-serif font-bold text-gray-300 group-hover:text-gray-800 transition-colors duration-300">WELLA</span>
                            <span class="block text-[0.6rem] tracking-widest text-gray-300 group-hover:text-gray-600 uppercase mt-1">Professionals</span>
                        </div>
                        
                        <div class="hidden md:block w-px h-12 bg-gray-200"></div>

                        <div class="group cursor-default">
                            <span class="text-3xl md:text-4xl font-serif font-bold text-gray-300 group-hover:text-gray-800 transition-colors duration-300">Schwarzkopf</span>
                            <span class="block text-[0.6rem] tracking-widest text-gray-300 group-hover:text-gray-600 uppercase mt-1">Professional</span>
                        </div>

                        <div class="hidden md:block w-px h-12 bg-gray-200"></div>

                        <div class="group cursor-default">
                            <span class="text-3xl md:text-4xl font-serif font-bold text-gray-300 group-hover:text-gray-800 transition-colors duration-300">L'ORÉAL</span>
                            <span class="block text-[0.6rem] tracking-widest text-gray-300 group-hover:text-gray-600 uppercase mt-1">Paris</span>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }
}
