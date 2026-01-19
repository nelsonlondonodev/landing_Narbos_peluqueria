/**
 * Componente Tarjeta de Servicio.
 * Renderiza tarjetas de servicios en variantes 'overlay' (Home) o 'standard' (Grid).
 */
export class ServiceCard {
    /**
     * @param {Object} props
     * @param {string} props.title - Título del servicio
     * @param {string} props.description - Descripción corta
     * @param {string} [props.icon] - SVG string
     * @param {string} [props.image] - URL de imagen
     * @param {string} [props.link] - URL de destino
     * @param {string} [props.modalId] - ID de modal (si aplica)
     * @param {string} [props.animationDelay] - Delay de animación ("0.2s")
     * @param {'overlay'|'standard'} [props.variant] - Estilo visual
     */
    constructor({ title, description, icon, image, link, modalId, animationDelay = "0s", variant = 'overlay' }) {
        this.props = { title, description, icon, image, link, modalId, animationDelay, variant };
    }

    /**
     * Genera el elemento DOM de la tarjeta.
     * @returns {HTMLElement}
     */
    render() {
        const isLink = !!this.props.link;
        const tag = isLink ? 'a' : 'div';
        const element = document.createElement(tag);

        this.applyAttributes(element, isLink);
        
        if (this.props.variant === 'standard') {
            this.renderStandardContent(element);
        } else {
            this.renderOverlayContent(element);
        }

        return element;
    }

    /**
     * Aplica atributos accesibles y de animación.
     */
    applyAttributes(element, isLink) {
        element.id = `service-card-${this.toKebabCase(this.props.title)}`;
        element.setAttribute('data-animation', 'zoomIn');
        
        if (this.props.animationDelay) {
            element.setAttribute('data-animation-delay', this.props.animationDelay);
        }

        if (isLink) {
            element.href = this.props.link;
            element.setAttribute('aria-label', `Ver detalles de ${this.props.title}`);
        } else if (this.props.modalId) {
            element.setAttribute('role', 'button');
            element.setAttribute('tabindex', '0');
            element.setAttribute('aria-label', `Ver detalles de ${this.props.title}`);
            element.setAttribute('data-modal-target', this.props.modalId);
        }
    }

    /**
     * Renderiza el contenido para la variante Overlay (Home).
     */
    renderOverlayContent(element) {
        element.className = "group relative p-8 rounded-lg shadow-lg transform hover:-translate-y-2 transition-transform duration-300 hover:shadow-2xl overflow-hidden cursor-pointer block h-full select-none bg-brand-green hover:bg-white transition-colors duration-500";
        
        const backgroundHtml = this.getOverlayBackground();
        const iconHtml = this.getOverlayIcon();
        
        element.innerHTML = `
            ${backgroundHtml}
            ${iconHtml}
            <h3 class="text-2xl font-serif font-bold text-white mb-3 relative z-10 drop-shadow-md transition-colors duration-300 group-hover:text-brand-gray-dark">${this.props.title}</h3>
            <p class="text-brand-light relative z-10 drop-shadow-sm font-medium opacity-95 transition-colors duration-300 group-hover:text-brand-gray-dark group-hover:font-semibold">${this.props.description}</p>
            <div class="absolute inset-0 bg-black/0 group-hover:bg-white/10 transition-colors duration-300 z-20 pointer-events-none"></div>
        `;
    }

    getOverlayBackground() {
        if (this.props.image) {
            return `
                <img src="${this.props.image}" alt="" class="absolute inset-0 w-full h-full object-cover transition-all duration-700 z-0 opacity-40 group-hover:opacity-100 group-hover:scale-105">
                <div class="absolute inset-0 bg-gradient-to-t from-brand-green/90 to-brand-green/60 z-0 transition-opacity duration-500 group-hover:opacity-20"></div>
            `;
        }
        return `<div class="absolute inset-0 bg-gradient-to-br from-brand-green to-brand-green-dark z-0"></div>`;
    }

    getOverlayIcon() {
        return `
            <svg class="w-12 h-12 mb-4 text-white transition-colors duration-300 relative z-10 animate-floating group-hover:text-brand-green-dark" 
                 aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" 
                 fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                ${this.props.icon || ''}
            </svg>
        `;
    }

    /**
     * Renderiza el contenido para la variante Standard (Grids).
     */
    renderStandardContent(element) {
        // Updated classes to match Hub design (Article style but applied to A/Div)
        element.className = "group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full isolation-auto block text-left";

        const imageHtml = this.props.image ? `
            <div class="relative aspect-[4/3] overflow-hidden bg-gray-100 shrink-0">
                <img src="${this.props.image}" alt="${this.props.title}" class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105">
                <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
            </div>
        ` : '';

        // Visual button style (span mimicking the button)
        const actionHtml = `
            <div class="mt-auto pt-4 border-t border-gray-50 w-full flex justify-end">
                <span class="relative inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-brand-green transition-all duration-300 bg-brand-green/5 border border-brand-green/20 rounded-lg group-hover:bg-brand-green group-hover:text-white">
                    <span>Ver Detalles</span>
                    <svg class="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </span>
            </div>
        `;

        element.innerHTML = `
            ${imageHtml}
            <div class="p-6 flex flex-col flex-grow">
                <div class="flex justify-between items-start mb-3">
                    <h3 class="text-xl font-serif font-bold text-gray-900 group-hover:text-brand-green transition-colors leading-tight">${this.props.title}</h3>
                </div>
                <p class="text-gray-600 text-sm mb-6 line-clamp-3 flex-grow leading-relaxed">${this.props.description}</p>
                ${actionHtml}
            </div>
        `;
    }

    toKebabCase(str) {
        return str
            .toLowerCase()
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "") 
            .replace(/[^a-z0-9 -]/g, "") 
            .replace(/\s+/g, "-") 
            .replace(/-+/g, "-"); 
    }
}
