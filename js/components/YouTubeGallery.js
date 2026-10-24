import { siteConfig } from '../config.js';
import { getPlayIconHTML } from '../utils/playIcon.js';
import { escapeHTML } from '../utils/escapeHTML.js';

/** @typedef {import('../data/videoData.js').VideoItem} VideoItem */

// Cada tarjeta en la fila del móvil: no encoge, ocupa el 85 % y encaja al soltar.
const MOBILE_SLIDE = 'max-md:shrink-0 max-md:w-[85%] snap-start';

/**
 * Galería de vídeos de la home.
 *
 * En móvil es una fila con scroll lateral y en escritorio una parrilla. Apilados a
 * ancho completo, los 11 vídeos sumaban unos 2.400 px de scroll en el móvil, y Clarity
 * mostraba que la mitad de las visitas se iba en esa zona sin llegar a las reseñas.
 */
export class YouTubeGallery {
    /**
     * @param {string} containerId - ID del contenedor.
     * @param {VideoItem[]} videos - Vídeos del catálogo, del más antiguo al más reciente.
     */
    constructor(containerId, videos = []) {
        this.container = document.getElementById(containerId);
        this.videos = videos;
        this.gridId = 'youtube-video-grid';
        this.youtubeUrl = siteConfig.socialLinks.find(l => l.name === 'YouTube')?.url || 'https://youtube.com';
    }

    /**
     * Renders the gallery into the container.
     */
    render() {
        if (!this.container) return;

        this.container.innerHTML = this._getLayout();
    }

    // --- Private Methods ---

    /**
     * Returns the main section layout.
     * @private
     */
    _getLayout() {
        return `
            <div class="container mx-auto px-6 max-w-screen-xl">
                ${this._renderHeader()}
                ${this._renderGrid()}
                ${this._renderFooterButton()}
            </div>
        `;
    }

    /**
     * Renders the section header.
     * @private
     */
    _renderHeader() {
        return `
            <div class="text-center mb-8 md:mb-12" data-animation="fadeInUp">
                <h2 class="text-3xl md:text-4xl font-serif font-bold mb-4 text-brand-gray-dark">
                    Nuestras <span class="text-brand-green">Transformaciones</span> en Video
                </h2>
                <p class="text-lg text-brand-gray-dark/70 max-w-2xl mx-auto">
                    Mira el arte detrás de cada servicio. Desde cambios extremos de color hasta rituales de bienestar.
                </p>
            </div>
        `;
    }

    /**
     * Renders the video grid.
     * @private
     */
    _renderGrid() {
        const hasVideos = this.videos.length > 0;
        // En móvil la fila sale del margen del contenedor (-mx-6 px-6) para llegar al
        // borde de la pantalla, y la tarjeta siguiente asoma para que se vea que hay más.
        // El `pb-8` es para la sombra: un contenedor con scroll recorta lo que sobresale.
        return `
            <div class="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-px-6 -mx-6 px-6 pb-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
                        md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 md:overflow-visible md:mx-0 md:px-0 md:pb-0" id="${this.gridId}">
                ${hasVideos
                    ? [...this.videos].reverse().map((video, index) => this._getVideoCard(video, index === 0)).join('')
                    : this._getEmptyState()}
            </div>
        `;
    }

    /**
     * Renders the call-to-action button.
     * @private
     */
    _renderFooterButton() {
        return `
            <div class="mt-2 md:mt-16 text-center">
                <a href="${this.youtubeUrl}" target="_blank" 
                   class="inline-flex items-center gap-3 px-8 py-3 bg-brand-green text-white font-bold rounded-full hover:bg-brand-green-dark transition-all duration-300 shadow-lg hover:shadow-xl group">
                    <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24">
                        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                    </svg>
                    <span>Visitar nuestro canal</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                </a>
            </div>
        `;
    }

    /**
     * Tarjeta de un vídeo: solo la miniatura, el reproductor se carga al abrirla.
     *
     * La abre el disparador global de `App.initVideoTriggers`, como en `VideoSection`, y
     * `data-clarity-event` le dice qué evento mandar con el ID del vídeo: el mapa de
     * clics de Clarity no dice cuál se abrió, y la galería se pinta en diferido y no
     * sale en su captura.
     * @param {VideoItem} video
     * @param {boolean} isLatest - El más reciente lleva la insignia de última publicación.
     * @private
     */
    _getVideoCard(video, isLatest) {
        const { id: videoId, title, thumbnailUrl } = video;

        return `
            <button type="button"
                 class="video-card youtube-modal-trigger block p-0 text-left relative aspect-video bg-black rounded-2xl overflow-hidden shadow-xl border-4 border-white group cursor-pointer ${MOBILE_SLIDE}"
                 data-video-id="${videoId}" data-clarity-event="video_galeria_home"
                 aria-label="Ver vídeo: ${escapeHTML(title)}">

                ${isLatest ? '<div class="badge-latest">Última publicación</div>' : ''}

                <!-- Thumbnail with hover effect -->
                <img src="${thumbnailUrl}" alt="" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-70 group-hover:opacity-100">
                
                <!-- Play Button Overlay -->
                <div class="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/0 transition-colors duration-300">
                    ${getPlayIconHTML()}
                </div>

                <!-- Glassmorphism Badge -->
                <div class="absolute bottom-4 left-4 px-3 py-1 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 text-white text-xs font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Ver video
                </div>
            </button>
        `;
    }

    /**
     * Generates HTML for empty state (placeholders).
     * @private
     */
    _getEmptyState() {
        return Array(3).fill(0).map(() => `
            <div class="${MOBILE_SLIDE} aspect-video bg-brand-light/20 rounded-2xl animate-pulse flex flex-col items-center justify-center border-2 border-dashed border-brand-green/30">
                <svg class="w-12 h-12 text-brand-green/40 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span class="text-brand-gray-dark/40 font-medium">Próximamente</span>
            </div>
        `).join('');
    }
}
