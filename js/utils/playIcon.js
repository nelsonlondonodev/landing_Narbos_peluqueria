/**
 * Círculo verde con el triángulo de reproducción que va sobre la miniatura de un vídeo.
 *
 * Es solo el icono: el disparador es el elemento `.youtube-modal-trigger` que lo
 * envuelve o lo cubre, y el `group-hover` responde al `group` de ese contenedor.
 *
 * @returns {string} HTML del icono.
 */
export function getPlayIconHTML() {
    return `
        <div class="w-16 h-16 bg-brand-green/90 text-white rounded-full flex items-center justify-center shadow-2xl transform transition-all duration-300 group-hover:scale-125 group-hover:bg-brand-green ring-4 ring-white/20">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 ml-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
            </svg>
        </div>
    `;
}
