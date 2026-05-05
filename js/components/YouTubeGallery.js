import { siteConfig } from '../config.js';
import { VideoModal } from './VideoModal.js';

/**
 * YouTubeGallery Component
 * Renders a grid of YouTube videos with premium styling and Lightbox support.
 */
export class YouTubeGallery {
    /**
     * @param {string} containerId - The ID of the container element.
     * @param {Array<string>} videoIds - Array of YouTube video IDs.
     */
    constructor(containerId, videoIds = []) {
        this.container = document.getElementById(containerId);
        this.videoIds = videoIds;
        this.youtubeUrl = siteConfig.socialLinks.find(l => l.name === 'YouTube')?.url || 'https://youtube.com';
        this.modal = new VideoModal();
    }

    /**
     * Renders the gallery into the container.
     */
    render() {
        if (!this.container) return;

        this.container.innerHTML = `
            <div class="container mx-auto px-6 max-w-screen-xl">
                ${this._renderHeader()}
                ${this._renderGrid()}
                ${this._renderFooterButton()}
            </div>
        `;

        this._attachEvents();
    }

    /**
     * Renders the section header.
     * @private
     */
    _renderHeader() {
        return `
            <div class="text-center mb-12" data-animation="fadeInUp">
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
        const hasVideos = this.videoIds && this.videoIds.length > 0;
        return `
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="youtube-video-grid">
                ${hasVideos 
                    ? this.videoIds.map(id => this._getVideoCard(id)).join('') 
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
            <div class="mt-16 text-center">
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
     * Genera el HTML de una tarjeta de video individual (Fachada).
     * @private
     */
    _getVideoCard(videoId) {
        // Thumbnail de alta calidad de YouTube
        const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
        
        return `
            <div class="video-card relative aspect-video bg-black rounded-2xl overflow-hidden shadow-xl border-4 border-white group cursor-pointer" 
                 data-video-id="${videoId}">
                <!-- Thumbnail -->
                <img src="${thumbnailUrl}" alt="Narbo's Salon Video" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-70 group-hover:opacity-100">
                
                <!-- Play Button Overlay -->
                <div class="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/0 transition-colors duration-300">
                    <div class="w-16 h-16 bg-brand-green/90 text-white rounded-full flex items-center justify-center shadow-2xl transform transition-all duration-300 group-hover:scale-125 group-hover:bg-brand-green ring-4 ring-white/20">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </div>
                </div>

                <!-- Glassmorphism Badge -->
                <div class="absolute bottom-4 left-4 px-3 py-1 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 text-white text-xs font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Ver video
                </div>
            </div>
        `;
    }

    /**
     * Adjunta los eventos de clic a las tarjetas de video.
     * @private
     */
    _attachEvents() {
        const grid = this.container.querySelector('#youtube-video-grid');
        if (!grid) return;

        // Limpiar cualquier listener previo si fuera necesario (aunque innerHTML ya lo hace)
        grid.onclick = (e) => {
            const card = e.target.closest('.video-card');
            if (card) {
                const videoId = card.getAttribute('data-video-id');
                if (videoId) {
                    console.log(`[YouTubeGallery] Abriendo video: ${videoId}`);
                    this.modal.open(videoId);
                }
            }
        };
    }

    /**
     * Generates HTML for empty state (placeholders).
     * @private
     */
    _getEmptyState() {
        return Array(3).fill(0).map(() => `
            <div class="aspect-video bg-brand-light/20 rounded-2xl animate-pulse flex flex-col items-center justify-center border-2 border-dashed border-brand-green/30">
                <svg class="w-12 h-12 text-brand-green/40 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span class="text-brand-gray-dark/40 font-medium">Próximamente</span>
            </div>
        `).join('');
    }
}
