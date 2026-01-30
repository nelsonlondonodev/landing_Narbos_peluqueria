/**
 * Componente Breadcrumbs (Migas de pan).
 * Genera la navegación jerárquica basada en una lista de items.
 */
export class Breadcrumbs {
    /**
     * @param {Array<{label: string, link: string}>} items - Lista de rutas.
     * @param {Object} options - Configuración opcional.
     * @param {string} options.customClasses - Clases CSS adicionales para el contenedor.
     */
    constructor(items, options = {}) {
        this.items = items;
        this.customClasses = options.customClasses || 'pt-24 md:pt-28';
        this.separatorIcon = `
            <svg class="w-3 h-3 mx-3" aria-hidden="true" style="width: 12px; height: 12px;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
            </svg>
        `;
    }

    /**
     * Genera el HTML completo del componente.
     * @returns {string} HTML string.
     */
    render() {
        const listItemsHTML = this.items.map((item, index) => this.renderItem(item, index)).join('');

        return `
            <nav aria-label="Breadcrumb" class="bg-gray-100 py-4 px-6 relative z-10 ${this.customClasses}">
                <div class="container mx-auto max-w-screen-xl">
                    <ol class="list-none p-0 inline-flex text-sm text-gray-600">
                        ${listItemsHTML}
                    </ol>
                </div>
            </nav>
        `;
    }

    /**
     * Renderiza un item individual de la lista.
     * @param {Object} item - Datos del item.
     * @param {number} index - Índice en el array.
     * @returns {string} HTML del item.
     */
    renderItem(item, index) {
        const isLast = index === this.items.length - 1;

        if (isLast) {
            return this.renderCurrentPage(item);
        }

        return this.renderLink(item);
    }

    /**
     * Renderiza el enlace de navegación.
     * @param {Object} item 
     * @returns {string}
     */
    renderLink(item) {
        return `
            <li class="flex items-center">
                <a href="${item.link}" class="hover:text-brand-green transition-colors font-medium">${item.label}</a>
                ${this.separatorIcon}
            </li>
        `;
    }

    /**
     * Renderiza el texto de la página actual (sin enlace).
     * @param {Object} item 
     * @returns {string}
     */
    renderCurrentPage(item) {
        return `
            <li>
                <span class="text-gray-800 font-semibold cursor-default" aria-current="page">${item.label}</span>
            </li>
        `;
    }
}
