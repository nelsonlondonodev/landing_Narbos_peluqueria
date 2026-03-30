import { resolveRoute } from '../config.js';

/**
 * Componente Tarjeta de Artículo para el Blog.
 * Renderiza tarjetas consistentes y dinámicas con los datos del catálogo.
 */
export class ArticleCard {
    constructor({ title, description, category, date, image, alt, link }) {
        this.props = { title, description, category, date, image, alt, link };
    }

    render() {
        const link = resolveRoute(this.props.link);
        const element = document.createElement('div');
        element.className = "bg-white rounded-lg shadow-lg overflow-hidden group";

        element.innerHTML = `
            <a href="${link}" aria-label="Leer artículo: ${this.props.title}">
                <img
                    src="${this.props.image}"
                    alt="${this.props.alt}"
                    class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                />
            </a>
            <div class="p-6 flex flex-col h-full">
                <p class="text-sm text-gray-500 mb-2">
                    ${this.props.category} • ${this.props.date}
                </p>
                <h2 class="text-xl md:text-2xl font-serif font-bold text-gray-900 mb-3 leading-tight">
                    <a href="${link}" class="hover:text-brand-green">${this.props.title}</a>
                </h2>
                <p class="text-gray-700 mb-4 line-clamp-3">${this.props.description}</p>
                <div class="mt-auto pt-2">
                    <a
                        href="${link}"
                        class="font-bold text-brand-green hover:underline inline-flex items-center"
                        aria-label="Leer más sobre ${this.props.title}"
                    >
                        Leer más 
                        <svg class="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </a>
                </div>
            </div>
        `;

        return element;
    }
}
