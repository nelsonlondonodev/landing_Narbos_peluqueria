/**
 * Módulo para manejar la lógica del acordeón de Preguntas Frecuentes.
 * Incluye animaciones suaves y accesibilidad.
 */
export class FAQAccordion {
    /**
     * @param {string} selector - Selector CSS del contenedor (e.g., '#faq').
     */
    constructor(selector = '#faq') {
        this.container = document.querySelector(selector);
        // Verificar preferencia de movimiento reducido
        this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.init();
    }

    init() {
        if (!this.container) return;

        this.detailsElements = this.container.querySelectorAll('details');
        if (!this.detailsElements.length) return;

        this.detailsElements.forEach(details => {
            const summary = details.querySelector('summary');
            const content = details.querySelector('.faq-content');

            if (!summary || !content) return;

            summary.addEventListener('click', (e) => this.handleToggle(e, details, content));
        });
    }

    /**
     * Maneja el evento click en el summary.
     */
    handleToggle(e, details, content) {
        e.preventDefault(); // Evita el comportamiento por defecto para controlar la animación
        
        if (details.hasAttribute('open')) {
            this.close(details, content);
        } else {
            this.open(details, content);
        }
    }

    /**
     * Abre el elemento con animación.
     */
    open(details, content) {
        // Cerrar otros elementos abiertos (Comportamiento de Acordeón)
        this.closeOthers(details);

        details.setAttribute('open', '');
        
        if (this.prefersReducedMotion) return; // Saltar animación si el usuario lo prefiere

        const endHeight = content.scrollHeight;
        
        content.animate(
            [
                { height: '0px', opacity: 0 },
                { height: `${endHeight}px`, opacity: 1 }
            ],
            {
                duration: 300,
                easing: 'ease-out'
            }
        );
    }

    /**
     * Cierra el elemento con animación.
     */
    close(details, content) {
        if (this.prefersReducedMotion) {
            details.removeAttribute('open');
            return;
        }

        const startHeight = content.scrollHeight;

        const animation = content.animate(
            [
                { height: `${startHeight}px`, opacity: 1 },
                { height: '0px', opacity: 0 }
            ],
            {
                duration: 300,
                easing: 'ease-in'
            }
        );

        animation.onfinish = () => {
            details.removeAttribute('open');
        };
    }

    /**
     * Cierra otros elementos abiertos.
     */
    closeOthers(currentDetails) {
        this.detailsElements.forEach(other => {
            if (other !== currentDetails && other.hasAttribute('open')) {
                const otherContent = other.querySelector('.faq-content');
                if (otherContent) this.close(other, otherContent);
            }
        });
    }
}
