/**
 * Componente de Botón de Compartir.
 * Utiliza Web Share API con fallback robusto al portapapeles.
 */
export class ShareButton {
    constructor() {
        this.init();
    }

    /**
     * Inicializa los botones de compartir en el DOM.
     */
    init() {
        const shareContainers = document.querySelectorAll('.share-button-container');
        shareContainers.forEach(container => this.mountButton(container));
    }

    /**
     * Monta un botón de compartir en el contenedor especificado.
     * @param {HTMLElement} container 
     */
    mountButton(container) {
        const config = {
            url: container.dataset.url || window.location.href,
            title: container.dataset.title || document.title,
            text: container.dataset.text || '¡Mira este artículo!'
        };

        const button = this.createButtonElement(config.title);
        
        button.addEventListener('click', () => this.handleShare(button, config));

        container.innerHTML = '';
        container.appendChild(button);
    }

    /**
     * Crea el elemento HTML del botón.
     * @param {string} title 
     * @returns {HTMLButtonElement}
     */
    createButtonElement(title) {
        const button = document.createElement('button');
        button.className = 'group inline-flex items-center gap-2 px-6 py-3 bg-brand-green hover:bg-brand-gray-dark text-white rounded-full transition-all duration-300 shadow-md hover:shadow-lg font-bold text-sm cursor-pointer transform hover:-translate-y-1';
        button.title = `Compartir: ${title}`;
        
        button.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            <span class="font-sans">Compartir artículo</span>
        `;
        
        return button;
    }

    /**
     * Maneja la lógica de compartir (API vs Clipboard).
     * @param {HTMLButtonElement} button 
     * @param {Object} config 
     */
    async handleShare(button, config) {
        if (navigator.share) {
            try {
                await navigator.share(config);
            } catch (err) {
                if (err.name !== 'AbortError') {
                    console.warn('Web Share API falló, usando clipboard...', err);
                    await this.copyToClipboard(button, config.url);
                }
            }
        } else {
            await this.copyToClipboard(button, config.url);
        }
    }

    /**
     * Copia la URL al portapapeles y da feedback visual.
     * @param {HTMLButtonElement} button 
     * @param {string} url 
     */
    async copyToClipboard(button, url) {
        const textSpan = button.querySelector('span');
        const originalText = textSpan.textContent;

        try {
            await navigator.clipboard.writeText(url);
            this.showFeedback(button, textSpan, '¡Enlace copiado!');
            setTimeout(() => this.resetFeedback(button, textSpan, originalText), 2000);
        } catch (err) {
            console.error('Error al copiar:', err);
            alert('No pudimos copiar el enlace. Por favor hazlo manualmente.');
        }
    }

    showFeedback(button, textSpan, message) {
        textSpan.textContent = message;
        button.classList.add('bg-brand-medium');
    }

    resetFeedback(button, textSpan, originalText) {
        textSpan.textContent = originalText;
        button.classList.remove('bg-brand-medium');
    }
}
