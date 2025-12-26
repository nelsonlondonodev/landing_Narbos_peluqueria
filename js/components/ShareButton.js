/**
 * Componente de Botón de Compartir
 * Utiliza Web Share API si está disponible, o copia al portapapeles como fallback.
 */
export class ShareButton {
    constructor() {
        this.init();
    }

    init() {
        // Buscar todos los contenedores de botones de compartir
        const shareContainers = document.querySelectorAll('.share-button-container');
        
        shareContainers.forEach(container => {
            const url = container.dataset.url || window.location.href;
            const title = container.dataset.title || document.title;
            const text = container.dataset.text || '¡Mira este artículo de Narbo\'s Salón Spa!';

            const button = document.createElement('button');
            button.className = 'inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-full transition-colors duration-300 font-medium text-sm';
            
            // Usamos backticks correctamente para el template string
            button.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                <span>Compartir</span>
            `;

            button.addEventListener('click', async () => {
                if (navigator.share) {
                    try {
                        await navigator.share({
                            title: title,
                            text: text,
                            url: url
                        });
                    } catch (err) {
                        console.log('Error al compartir:', err);
                    }
                } else {
                    // Fallback: Copiar al portapapeles
                    try {
                        await navigator.clipboard.writeText(url);
                        const originalText = button.querySelector('span').textContent;
                        button.querySelector('span').textContent = '¡Enlace Copiado!';
                        setTimeout(() => {
                            button.querySelector('span').textContent = originalText;
                        }, 2000);
                    } catch (err) {
                        console.error('Error al copiar:', err);
                    }
                }
            });

            container.appendChild(button);
        });
    }
}