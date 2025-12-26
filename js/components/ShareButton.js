/**
 * Componente de Botón de Compartir
 * Utiliza Web Share API con fallback robusto al portapapeles.
 */
export class ShareButton {
    constructor() {
        this.init();
    }

    init() {
        const shareContainers = document.querySelectorAll('.share-button-container');
        
        shareContainers.forEach(container => {
            const url = container.dataset.url || window.location.href;
            const title = container.dataset.title || document.title;
            const text = container.dataset.text || '¡Mira este artículo!';

            // Crear botón con estilos explícitos de Tailwind
            const button = document.createElement('button');
            // Añadimos cursor-pointer, colores de marca y transición suave
            button.className = 'group inline-flex items-center gap-2 px-6 py-3 bg-brand-green hover:bg-brand-gray-dark text-white rounded-full transition-all duration-300 shadow-md hover:shadow-lg font-bold text-sm cursor-pointer transform hover:-translate-y-1';
            
            // Tooltip nativo
            button.title = `Compartir: ${title}`;
            
            button.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                <span class="font-sans">Compartir Artículo</span>
            `;

            // Lógica de compartir mejorada
            button.addEventListener('click', async () => {
                const originalText = button.querySelector('span').textContent;

                // Función helper para copiar
                const copyToClipboard = async () => {
                    try {
                        await navigator.clipboard.writeText(url);
                        button.querySelector('span').textContent = '¡Enlace Copiado!';
                        button.classList.add('bg-brand-medium'); // Feedback visual
                        setTimeout(() => {
                            button.querySelector('span').textContent = originalText;
                            button.classList.remove('bg-brand-medium');
                        }, 2000);
                    } catch (clipboardErr) {
                        console.error('Error al copiar:', clipboardErr);
                        alert('No pudimos copiar el enlace. Por favor hazlo manualmente.');
                    }
                };

                // Intentar Web Share API primero
                if (navigator.share) {
                    try {
                        await navigator.share({
                            title: title,
                            text: text,
                            url: url
                        });
                    } catch (err) {
                        // Si el usuario cancela o hay error, no hacemos nada O caemos al fallback si no fue cancelación de usuario
                        // AbortError suele ser cancelación de usuario.
                        if (err.name !== 'AbortError') {
                            console.log('Web Share falló, intentando clipboard...', err);
                            await copyToClipboard();
                        } else {
                            console.log('Usuario canceló compartir.');
                        }
                    }
                } else {
                    // Fallback directo si no hay API
                    await copyToClipboard();
                }
            });

            container.innerHTML = ''; // Limpiar por si acaso
            container.appendChild(button);
        });
    }
}
