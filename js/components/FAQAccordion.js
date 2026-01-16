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
    constructor(selector = '#faq') {
        this.container = document.querySelector(selector);
        if (this.container) {
            this.init();
        }
    }

    init() {
        this.container.addEventListener('click', (e) => {
            const summary = e.target.closest('summary');
            if (!summary) return;

            e.preventDefault();
            const details = summary.parentElement;
            this.toggle(details);
        });
    }

    toggle(details) {
        const isOpen = details.hasAttribute('open');
        const content = details.querySelector('.faq-content');
        
        if (!content) return;

        // Si está cerrado, cerramos los demás antes de abrir este
        if (!isOpen) {
            this.closeOthers(details);
        }

        if (isOpen) {
            this.close(details, content);
        } else {
            this.open(details, content);
        }
    }

    open(details, content) {
        // 1. Preparar navegador para renderizar contenido
        details.setAttribute('open', '');
        
        // 2. Si ya estamos en transición de apertura/cierre, calculamos desde donde estamos
        // Pero para simplificar y asegurar fluidez, usamos el truco de transición CSS
        
        // Cancelamos transición previa si existe (limpiando listeners viejos no es trivial sin AbortController, 
        // pero al sobreescribir estilos el navegador maneja la interpolación visual).
        
        const targetHeight = content.scrollHeight;

        // Estado inicial de animación
        // Si estaba cerrado (height 0 o null), empezamos de 0. 
        // Si estaba cerrándose, computamos la altura actual.
        if (!content.style.height) {
            content.style.height = '0px';
            content.style.opacity = '0';
        }
        
        content.style.overflow = 'hidden';
        content.style.transition = 'height 300ms ease-out, opacity 300ms ease-out';

        // Force reflow para que el navegador aplique los estilos iniciales
        content.offsetHeight;

        // Estado final
        content.style.height = targetHeight + 'px';
        content.style.opacity = '1';

        // Limpieza al finalizar
        const onTransitionEnd = (e) => {
            if (e.propertyName !== 'height') return;
            // Solo limpiamos si seguimos abiertos (por si hubo click rápido cerrar-abrir)
            if (details.hasAttribute('open') && content.style.height !== '0px') {
                content.style.height = 'auto'; // Liberamos altura para responsive
                content.style.opacity = '';
                content.style.transition = '';
            }
            content.removeEventListener('transitionend', onTransitionEnd);
        };

        content.addEventListener('transitionend', onTransitionEnd);
    }

    close(details, content) {
        // Fijamos la altura actual explícitamente (porque suele estar en 'auto' o '0px')
        // Si está en 'auto', necesitamos los pixels exactos para animar hacia 0.
        const startHeight = content.offsetHeight;
        
        content.style.height = startHeight + 'px';
        content.style.overflow = 'hidden';
        content.style.transition = 'height 300ms ease-in, opacity 300ms ease-in';
        
        // Force reflow
        content.offsetHeight;

        // Estado final
        content.style.height = '0px';
        content.style.opacity = '0';

        const onTransitionEnd = (e) => {
            if (e.propertyName !== 'height') return;
            // Solo removemos 'open' si terminamos de cerrar
            if (content.style.height === '0px') {
                details.removeAttribute('open');
                content.style.height = ''; 
                content.style.opacity = '';
                content.style.transition = '';
            }
            content.removeEventListener('transitionend', onTransitionEnd);
        };

        content.addEventListener('transitionend', onTransitionEnd);
    }

    closeOthers(currentDetails) {
        const allDetails = this.container.querySelectorAll('details');
        allDetails.forEach(other => {
            if (other !== currentDetails && other.hasAttribute('open')) {
                const content = other.querySelector('.faq-content');
                // Si ya se está cerrando (height -> 0), no interrumpimos.
                // Si está abierto (height auto o null), lo cerramos.
                if (content && content.style.height !== '0px') {
                    this.close(other, content);
                }
            }
        });
    }
}


