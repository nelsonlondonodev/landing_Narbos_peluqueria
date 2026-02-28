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
        this.customClasses = options.customClasses || 'py-2';
        this.separatorIcon = `
            <svg class="w-3 h-3 mx-3 text-gray-400" aria-hidden="true" style="width: 12px; height: 12px;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
            </svg>
        `;
    }

    /**
     * Genera el HTML completo del componente.
     * @returns {string} HTML string.
     */
    render() {
        // Inyectar Schema JSON-LD para SEO automáticamente al renderizar
        this.injectSchema();

        const listItemsHTML = this.items.map((item, index) => this.renderItem(item, index)).join('');

        return `
            <nav aria-label="Breadcrumb" class="bg-gray-100 px-6 relative z-10 border-b border-gray-200 ${this.customClasses}">
                <div class="container mx-auto max-w-screen-xl flex items-center">
                    <ol class="list-none p-0 inline-flex items-center text-sm text-gray-600 flex-wrap w-full">
                        ${listItemsHTML}
                    </ol>
                </div>
            </nav>
        `;
    }

    /**
     * Inyecta datos estructurados (JSON-LD) para que Google entienda la jerarquía.
     */
    injectSchema() {
        // Evitar duplicados si ya se inyectó
        if (document.getElementById('breadcrumbs-schema')) return;

        const schema = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": this.items.map((item, index) => {
                // Resolver URL absoluta
                let itemUrl = item.link;
                if (!itemUrl || itemUrl === '#') {
                    itemUrl = window.location.href; // Usar URL actual para el último item
                } else {
                    // Resolver rutas relativas (../../) a absolutas
                    const a = document.createElement('a');
                    a.href = itemUrl;
                    itemUrl = a.href;
                }

                return {
                    "@type": "ListItem",
                    "position": index + 1,
                    "name": item.label,
                    "item": itemUrl
                };
            })
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.id = 'breadcrumbs-schema';
        script.textContent = JSON.stringify(schema);
        document.head.appendChild(script);
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
            <li class="flex items-center">
                <span class="text-gray-800 font-semibold cursor-default mt-0.5" aria-current="page">${item.label}</span>
            </li>
        `;
    }
}
