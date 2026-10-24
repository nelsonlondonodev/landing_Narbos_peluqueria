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
     * @param {string} [props.imageMobile] - Variante a 768px; si se pasa, la tarjeta
     *   envuelve la imagen en <picture> y la sirve por debajo de 768px de ancho
     * @param {string} [props.link] - URL de destino
     * @param {string} [props.modalId] - ID de modal (si aplica)
     * @param {string} [props.animationDelay] - Delay de animación ("0.2s")
     * @param {'overlay'|'standard'|'logo'} [props.variant] - Estilo visual
     * @param {string} [props.price] - Precio del servicio (Opcional)
     */
    constructor({ title, description, icon, image, imageMobile, imageAlt, link, modalId, animationDelay = "0s", variant = 'overlay', price, width, height }) {
        this.props = {
            title, description, icon, image, imageMobile, imageAlt, link, modalId, animationDelay, variant, price,
            width: width || (variant === 'overlay' ? 800 : 400),
            height: height || (variant === 'overlay' ? 600 : 300)
        };
    }

    /**
     * Genera el elemento DOM de la tarjeta.
     * @returns {HTMLElement}
     */
    render() {
        const isLink = !!this.props.link && this.props.link !== '#';
        const isModal = !!this.props.modalId;
        const tag = isLink ? 'a' : (isModal ? 'button' : 'div');
        const element = document.createElement(tag);

        this.applyAttributes(element, isLink);
        
        if (this.props.variant === 'standard') {
            this.renderStandardContent(element);
        } else if (this.props.variant === 'logo') {
            this.renderLogoContent(element);
        } else {
            this.renderOverlayContent(element);
        }

        return element;
    }

    /**
     * Renderiza el contenido para la variante Logo (Placeholder de marca).
     */
    renderLogoContent(element) {
        element.className = "group relative bg-stone-900 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-800 flex flex-col h-full block text-left hover:-translate-y-1";

        const priceHtml = this.props.price ? `
            <div class="mt-2 mb-4">
                 <span class="inline-block bg-brand-green/10 text-brand-green font-bold px-3 py-1 rounded-full text-sm border border-brand-green/20">
                    ${this.props.price}
                </span>
            </div>
        ` : '';

        element.innerHTML = `
            <div class="relative aspect-[4/3] flex items-center justify-center bg-stone-900 overflow-hidden shrink-0 p-8">
                <img src="${this.props.image}" alt="${this.props.imageAlt || 'Logo'}" loading="lazy" width="300" height="300" class="w-2/3 h-2/3 object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300">
            </div>
            <div class="p-6 flex flex-col flex-grow bg-white">
                <div class="flex justify-between items-start mb-3">
                    <h3 class="text-xl font-serif font-bold text-gray-900 group-hover:text-brand-green transition-colors leading-tight">${this.props.title}</h3>
                </div>
                
                ${priceHtml}

                <p class="text-gray-600 text-sm mb-6 line-clamp-3 flex-grow leading-relaxed">${this.props.description}</p>
                
                <div class="mt-auto pt-4 border-t border-gray-50 w-full flex justify-end">
                    <span class="relative inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-brand-green transition-colors duration-300 bg-brand-green/5 border border-brand-green/20 rounded-lg group-hover:bg-brand-green group-hover:text-white">
                        <span>Ver detalles</span>
                        <svg class="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                    </span>
                </div>
            </div>
        `;
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
            element.setAttribute('aria-label', `Ir a ${this.props.title}`);
        } else if (this.props.modalId) {
            if (element.tagName === 'BUTTON') {
                element.type = "button";
            } else {
                element.setAttribute('role', 'button');
                element.setAttribute('tabindex', '0');
            }
            element.setAttribute('aria-label', `Ver detalles de ${this.props.title}`);
            
            // SEMANTIC FIX: Usar el ID del servicio (slug) como target para facilitar la resolución de datos
            const semanticTarget = this.toKebabCase(this.props.title);
            element.setAttribute('data-modal-target', semanticTarget);
        }
    }

    /**
     * Renderiza el contenido para la variante Overlay (Home).
     *
     * Por debajo de `md` es una fila compacta (miniatura, título, una línea y flecha);
     * desde `md`, la tarjeta grande con la foto bajo el velo verde. Apiladas a tamaño
     * completo, las cinco sumaban 1.433 px de scroll en un móvil de 390 px, y son lo más
     * pulsado de la home: en fila caben todas en una pantalla.
     */
    renderOverlayContent(element) {
        element.className = [
            'group relative overflow-hidden cursor-pointer select-none',
            'max-md:flex max-md:items-center max-md:gap-4 max-md:p-3 max-md:rounded-xl max-md:bg-white max-md:shadow-md max-md:border max-md:border-brand-gray-lighter',
            'md:block md:h-full md:p-8 md:rounded-lg md:shadow-lg md:bg-brand-green md:hover:-translate-y-2 md:hover:shadow-2xl transition-[translate,box-shadow] duration-300'
        ].join(' ');

        element.innerHTML = `
            ${this.getOverlayBackground()}
            ${this.getOverlayIcon()}
            <div class="relative z-10 flex-1 min-w-0">
                <h3 class="font-serif font-bold max-md:text-lg max-md:text-brand-gray-dark max-md:mb-0.5 md:text-2xl md:text-white md:mb-3 md:drop-shadow-lg">${this.props.title}</h3>
                <p class="text-sm font-medium max-md:text-brand-gray-dark/70 max-md:line-clamp-2 md:text-brand-light md:drop-shadow-md md:opacity-95 md:transition-colors md:duration-300 md:group-hover:text-white md:line-clamp-2">${this.props.description}</p>
                <div class="max-md:hidden mt-4 pt-3 border-t border-white/10 w-full flex justify-between items-center text-sm font-medium text-white">
                    <span>Ver más detalles</span>
                    <svg class="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </div>
            </div>
            <svg class="md:hidden w-5 h-5 shrink-0 text-brand-green" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="m9 18 6-6-6-6"/></svg>
        `;
    }

    getOverlayBackground() {
        if (this.props.image) {
            // En la fila del móvil es la miniatura; desde `md`, el fondo bajo el velo. El
            // <picture> solo es `contents` desde `md`: en la fila, su <source> contaría como
            // un hueco más del `gap` y desplazaría la miniatura.
            const imgClass = "object-cover max-md:block max-md:w-20 max-md:h-20 max-md:shrink-0 max-md:rounded-lg md:absolute md:inset-0 md:w-full md:h-full md:z-0 md:opacity-40 md:transition-all md:duration-700 md:group-hover:opacity-100 md:group-hover:scale-105";
            const alt = this.props.imageAlt || `${this.props.title} en Narbo's Salón Spa Chía`;
            const img = `<img src="${this.props.image}" alt="${alt}" loading="lazy" width="${this.props.width}" height="${this.props.height}" class="${imgClass}">`;

            // En móvil estas tarjetas se muestran a ~640px, pero se servía el original a
            // tamaño de escritorio: solo la de maquillaje eran 161 KB para pintar 637x478.
            const picture = this.props.imageMobile
                ? `<picture class="max-md:shrink-0 md:contents"><source media="(max-width: 768px)" srcset="${this.props.imageMobile}" type="image/webp">${img}</picture>`
                : img;

            return `
                ${picture}

                <!-- Gradiente Base (Verde) que desaparece en hover -->
                <div class="max-md:hidden absolute inset-0 bg-gradient-to-t from-brand-green/90 to-brand-green/60 z-0 transition-opacity duration-500 group-hover:opacity-0"></div>
                
                <!-- Gradiente Hover (Negro/Oscuro) para contraste de lectura -->
                <div class="max-md:hidden absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            `;
        }
        return `<div class="max-md:hidden absolute inset-0 bg-gradient-to-br from-brand-green to-brand-green-dark z-0"></div>`;
    }

    getOverlayIcon() {
        return `
            <div class="max-md:hidden mb-4 relative z-10">
                <svg class="w-12 h-12 text-white transition-colors duration-300 transition-transform duration-300 group-hover:scale-110 drop-shadow-md" 
                     aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" 
                     fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    ${this.props.icon || ''}
                </svg>
            </div>
        `;
    }

    /**
     * Renderiza el contenido para la variante Standard (Grids).
     */
    renderStandardContent(element) {
        // Updated classes: Removed transition-all, added transition-shadow.
        element.className = "group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col h-full isolation-auto block text-left focus:outline-none focus:ring-0 active:outline-none hover:outline-none outline-none border-none ring-0";

        const imageHtml = this.props.image ? `
            <div class="relative aspect-[4/3] overflow-hidden bg-gray-100 shrink-0">
                <img src="${this.props.image}" alt="${this.props.imageAlt || this.props.title}" loading="lazy" width="${this.props.width}" height="${this.props.height}" class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105">
                <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
                
                <!-- Precio Overlay en Móvil/Desktop si se prefiere, pero aquí lo pondremos en el body para más claridad -->
            </div>
        ` : '';

        // Sección de Precio Destacado
        const priceHtml = this.props.price ? `
            <div class="mt-2 mb-3">
                <span class="inline-flex items-center gap-1.5 bg-brand-light/20 text-brand-green font-bold text-lg px-0 py-1 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-brand-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                    ${this.props.price}
                </span>
            </div>
        ` : '';

        const actionHtml = `
            <div class="mt-auto pt-4 border-t border-gray-50 w-full flex justify-end">
                <span class="relative inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-brand-green transition-colors duration-300 bg-brand-green/5 border border-brand-green/20 rounded-lg group-hover:bg-brand-green group-hover:text-white">
                    <span>Ver detalles</span>
                    <svg class="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </span>
            </div>
        `;

        element.innerHTML = `
            ${imageHtml}
            <div class="p-6 flex flex-col flex-grow">
                <div class="flex justify-between items-start mb-1">
                    <h3 class="text-xl font-serif font-bold text-gray-900 group-hover:text-brand-green transition-colors leading-tight">${this.props.title}</h3>
                </div>
                
                ${priceHtml}

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
