export class ServiceCard {
    /**
     * @param {Object} props
     * @param {string} props.title - Title of the service
     * @param {string} props.description - Description of the service
     * @param {string} props.icon - SVG content string
     * @param {string} [props.image] - Background image URL (optional)
     * @param {string} [props.link] - URL to navigate to (optional)
     * @param {string} [props.modalId] - ID of the modal to open (optional)
     * @param {string} [props.animationDelay] - Delay for animation (e.g., "0.2s")
     */
    /**
     * @param {Object} props
     * @param {string} props.title - Title of the service
     * @param {string} props.description - Description of the service
     * @param {string} [props.icon] - SVG content string (Optional in standard variant)
     * @param {string} [props.image] - Background/Header image URL
     * @param {string} [props.link] - URL to navigate to
     * @param {string} [props.modalId] - ID of the modal to open
     * @param {string} [props.animationDelay] - Delay for animation ("0.2s")
     * @param {'overlay'|'standard'} [props.variant] - Visual style ('overlay' | 'standard')
     */
    constructor({ title, description, icon, image, link, modalId, animationDelay = "0s", variant = 'overlay' }) {
        this.title = title;
        this.description = description;
        this.icon = icon;
        this.image = image;
        this.link = link;
        this.modalId = modalId;
        this.animationDelay = animationDelay;
        this.variant = variant;
    }

    render() {
        const isLink = !!this.link;
        const tag = isLink ? 'a' : 'div';
        const element = document.createElement(tag);

        // Attributes Logic
        if (isLink) {
            element.href = this.link;
            element.setAttribute('aria-label', `Ver detalles de ${this.title}`);
        } else if (this.modalId) {
            element.setAttribute('role', 'button');
            element.setAttribute('tabindex', '0');
            element.setAttribute('aria-label', `Ver detalles de ${this.title}`);
            element.setAttribute('data-modal-target', this.modalId);
        }
        
        element.id = `service-card-${this.toKebabCase(this.title)}`;
        element.setAttribute('data-animation', 'zoomIn');
        if (this.animationDelay) {
            element.setAttribute('data-animation-delay', this.animationDelay);
        }

        // Render based on variant
        if (this.variant === 'standard') {
            this.renderStandard(element);
        } else {
            this.renderOverlay(element);
        }

        return element;
    }

    renderOverlay(element) {
        // Overlay Variant (Home Style)
        element.className = "group relative p-8 rounded-lg shadow-lg transform hover:-translate-y-2 transition-transform duration-300 hover:shadow-2xl overflow-hidden cursor-pointer block h-full select-none bg-brand-green";

        let backgroundHtml = '';
        if (this.image) {
            backgroundHtml = `
                <img src="${this.image}" alt="" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 z-0 opacity-40 group-hover:opacity-30">
                <div class="absolute inset-0 bg-gradient-to-t from-brand-green/90 to-brand-green/60 z-0"></div>
            `;
        } else {
             backgroundHtml = `<div class="absolute inset-0 bg-gradient-to-br from-brand-green to-brand-green-dark z-0"></div>`;
        }

        element.innerHTML = `
            ${backgroundHtml}
            <svg class="w-12 h-12 mb-4 text-white transition-colors duration-300 relative z-10 animate-floating" 
                 aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" 
                 fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                ${this.icon || ''}
            </svg>
            <h3 class="text-2xl font-serif font-bold text-white mb-3 relative z-10 drop-shadow-md">${this.title}</h3>
            <p class="text-brand-light relative z-10 drop-shadow-sm font-medium opacity-95">${this.description}</p>
            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 z-20 pointer-events-none"></div>
        `;
    }

    renderStandard(element) {
        // Standard Variant (Sub-page Style - Card with Image Top)
        element.className = "group block bg-gray-50 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col";

        const imageHtml = this.image ? `
            <div class="relative h-48 overflow-hidden shrink-0">
                <img src="${this.image}" alt="${this.title}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
                <div class="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
            </div>
        ` : '';

        // "Ver Detalles" Action
        const actionHtml = `
            <span class="text-brand-green font-bold text-sm uppercase tracking-wider flex items-center mt-auto pt-4">
                Ver Detalles 
                <svg class="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </span>
        `;

        element.innerHTML = `
            ${imageHtml}
            <div class="p-6 flex flex-col flex-grow">
                <h3 class="text-xl font-serif font-bold text-gray-900 mb-2 group-hover:text-brand-green transition-colors">${this.title}</h3>
                <p class="text-gray-600 text-sm mb-4 flex-grow">${this.description}</p>
                ${actionHtml}
            </div>
        `;
    }

    toKebabCase(str) {
        return str
            .toLowerCase()
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Remove accents
            .replace(/[^a-z0-9 -]/g, "") // Remove bad chars
            .replace(/\s+/g, "-") // Replace spaces with hyphens
            .replace(/-+/g, "-"); // Remove duplicate hyphens
    }
}
