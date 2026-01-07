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
    constructor({ title, description, icon, image, link, modalId, animationDelay = "0s" }) {
        this.title = title;
        this.description = description;
        this.icon = icon;
        this.image = image;
        this.link = link;
        this.modalId = modalId;
        this.animationDelay = animationDelay;
    }

    render() {
        // Base classes shared by both <a> and <div> versions
        // Added 'bg-brand-green/80' as fallback background color in case image fails or is missing
        const baseClasses = "group relative p-8 rounded-lg shadow-lg transform hover:-translate-y-2 transition-transform duration-300 hover:shadow-2xl overflow-hidden cursor-pointer block h-full select-none bg-brand-green";
        
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

        // Background Image Logic
        let backgroundHtml = '';
        if (this.image) {
            backgroundHtml = `
                <img src="${this.image}" alt="" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 z-0 opacity-40 group-hover:opacity-30">
                <div class="absolute inset-0 bg-gradient-to-t from-brand-green/90 to-brand-green/60 z-0"></div>
            `;
        } else {
             // Fallback gradient if no image
             backgroundHtml = `<div class="absolute inset-0 bg-gradient-to-br from-brand-green to-brand-green-dark z-0"></div>`;
        }

        element.innerHTML = `
            ${backgroundHtml}
            <svg class="w-12 h-12 mb-4 text-white transition-colors duration-300 relative z-10 animate-floating" 
                 aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" 
                 fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                ${this.icon}
            </svg>
            <h3 class="text-2xl font-serif font-bold text-white mb-3 relative z-10 drop-shadow-md">${this.title}</h3>
            <p class="text-brand-light relative z-10 drop-shadow-sm font-medium opacity-95">${this.description}</p>
            
            <!-- Overlay for hover effect -->
            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 z-20 pointer-events-none"></div>
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
