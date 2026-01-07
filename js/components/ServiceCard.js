export class ServiceCard {
    /**
     * @param {Object} props
     * @param {string} props.title - Title of the service
     * @param {string} props.description - Description of the service
     * @param {string} props.icon - SVG content string
     * @param {string} [props.link] - URL to navigate to (optional)
     * @param {string} [props.modalId] - ID of the modal to open (optional)
     * @param {string} [props.animationDelay] - Delay for animation (e.g., "0.2s")
     */
    constructor({ title, description, icon, link, modalId, animationDelay = "0s" }) {
        this.title = title;
        this.description = description;
        this.icon = icon;
        this.link = link;
        this.modalId = modalId;
        this.animationDelay = animationDelay;
    }

    render() {
        // Base classes shared by both <a> and <div> versions
        const baseClasses = "group relative p-8 rounded-lg shadow-lg transform hover:-translate-y-2 transition-transform duration-300 hover:shadow-2xl overflow-hidden cursor-pointer block h-full select-none";
        
        // Element type checks
        const isLink = !!this.link;
        const tag = isLink ? 'a' : 'div';
        
        const element = document.createElement(tag);
        element.className = baseClasses;
        
        // Attributes
        if (isLink) {
            element.href = this.link;
            element.id = `service-card-${this.toKebabCase(this.title)}`;
            element.setAttribute('aria-label', `Ver detalles de ${this.title}`);
        } else if (this.modalId) {
            element.id = `service-card-${this.toKebabCase(this.title)}`;
            element.setAttribute('role', 'button');
            element.setAttribute('tabindex', '0');
            element.setAttribute('aria-label', `Ver detalles de ${this.title}`);
            element.setAttribute('data-modal-target', this.modalId);
        }

        // Search Engine Optimization / Accessibility / Animation
        element.setAttribute('data-animation', 'zoomIn');
        if (this.animationDelay) {
            element.setAttribute('data-animation-delay', this.animationDelay);
        }

        element.innerHTML = `
            <svg class="w-12 h-12 mb-4 text-white transition-colors duration-300 relative z-10 animate-floating" 
                 aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" 
                 fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                ${this.icon}
            </svg>
            <h3 class="text-2xl font-serif font-bold text-white mb-3 relative z-10">${this.title}</h3>
            <p class="text-brand-light relative z-10">${this.description}</p>
            
            <!-- Overlay for hover effect -->
            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
        `;

        return element;
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
