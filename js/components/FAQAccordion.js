/**
 * Componente de Acordeón para Preguntas Frecuentes.
 * Maneja la apertura y cierre suave de elementos <details> usando Web Animations API.
 * 
 * Principios:
 * - Progressive Enhancement: Funciona nativamente si falla JS.
 * - Performance: Usa delegación de eventos y cancela animaciones redundantes.
 * - UX: Cierra otros items automáticamente (comportamiento de acordeón).
 */
export class FAQAccordion {
    /**
     * @param {string} selector - Selector CSS del contenedor padre (e.g., '#faq').
     */
    constructor(selector = '#faq') {
        this.container = document.querySelector(selector);
        // Map para guardar referencias a las animaciones activas por elemento
        this.animations = new WeakMap();
        this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (this.container) {
            this.init();
        } else {
            console.warn(`FAQAccordion: No se encontró el contenedor con selector "${selector}"`);
        }
    }

    init() {
        this.container.addEventListener('click', (e) => {
            const summary = e.target.closest('summary');
            if (!summary) return;

            const details = summary.parentElement;
            const content = details.querySelector('.faq-content');

            if (!details || !content) return;

            e.preventDefault();
            this.toggle(details, content);
        });
    }

    /**
     * Alterna el estado del detalle permitiendo interrupción de animaciones.
     */
    toggle(details, content) {
        const isOpen = details.hasAttribute('open');
        const isOpening = details.classList.contains('is-opening');

        // Cancelar animación previa si existe para este elemento
        if (this.animations.has(details)) {
            this.animations.get(details).cancel();
        }

        // Determinar la intención lógica:
        // Si está abierto y NO se está abriendo (estado estable) -> Cerrar
        // Si se está abriendo (animación en curso) -> Cerrar (revertir)
        // Si está cerrado -> Abrir
        if (isOpen && !isOpening) {
            this.animateClose(details, content);
        } else {
            this.animateOpen(details, content);
        }
    }

    animateOpen(details, content) {
        // Cerrar otros (sin animación para rapidez, o con animación si se prefiere)
        this.closeOthers(details);

        details.setAttribute('open', '');
        details.classList.add('is-opening');
        
        if (this.prefersReducedMotion) return;

        // Calcular altura dinámica actual (útil si interrumpimos una animación de cierre)
        const startHeight = content.offsetHeight;
        const endHeight = content.scrollHeight;

        if (startHeight === endHeight) return; // Ya está abierto completamente

        const animation = content.animate(
            { 
                height: [`${startHeight}px`, `${endHeight}px`],
                opacity: [0, 1] // Opcional: Fade in
            }, 
            {
                duration: 300,
                easing: 'ease-out',
                fill: 'forwards'
            }
        );

        this.animations.set(details, animation);

        animation.onfinish = () => {
            details.classList.remove('is-opening');
            animation.cancel(); // Limpia estilos inline
            this.animations.delete(details);
        };

        animation.oncancel = () => {
            details.classList.remove('is-opening');
            this.animations.delete(details);
        };
    }

    animateClose(details, content) {
        if (this.prefersReducedMotion) {
            details.removeAttribute('open');
            return;
        }

        // Calcular altura actual (útil si interrumpimos una apertura a medias)
        const startHeight = content.offsetHeight;
        
        const animation = content.animate(
            { 
                height: [`${startHeight}px`, '0px'],
                opacity: [1, 0] // Opcional: Fade out
            }, 
            {
                duration: 300,
                easing: 'ease-in'
            }
        );

        this.animations.set(details, animation);

        animation.onfinish = () => {
            details.removeAttribute('open');
            animation.cancel();
            this.animations.delete(details);
        };

        animation.oncancel = () => {
            this.animations.delete(details);
        };
    }

    closeOthers(currentDetails) {
        const allDetails = this.container.querySelectorAll('details');
        
        allDetails.forEach(other => {
            if (other !== currentDetails && other.hasAttribute('open')) {
                // Si ya se está animando (cerrando o abriendo), dejamos que termine o lo forzamos?
                // Mejor: Si se está cerrando, no hacemos nada.
                // Si está abierto estático, lo cerramos.
                
                if (this.animations.has(other)) {
                    // Ya tiene animación. Asumimos que si estamos abriendo uno nuevo,
                    // queremos que este viejo se cierre YA.
                    // Pero si ya se está cerrando, no lo interrumpas para reiniciarlo.
                    return; 
                }

                const content = other.querySelector('.faq-content');
                if (content) {
                    this.animateClose(other, content); 
                }
            }
        });
    }
}


