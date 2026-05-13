/**
 * VideoModal Component - Professional Version (Refactored)
 * Handles YouTube video playback with guaranteed visibility and performance.
 */
export class VideoModal {
    constructor() {
        this.modalId = 'video-modal-overlay';
        this.containerId = 'video-modal-container';
        this.iframeId = 'modal-youtube-iframe';
        this.isOpen = false;
    }

    /**
     * Opens the modal with the specified YouTube video.
     * @param {string} videoId - The YouTube video ID.
     */
    open(videoId) {
        if (this.isOpen) return;

        this._prepareDOM(videoId);
        this._lockScroll();
        this._animateIn();
        this._initVideo(videoId);
        
        this.isOpen = true;
    }

    /**
     * Closes the modal and restores the environment.
     */
    close() {
        const overlay = document.getElementById(this.modalId);
        if (!overlay) return this._unlockScroll();

        this._animateOut(overlay);
        this._stopVideo(overlay);

        setTimeout(() => {
            this._cleanup(overlay);
        }, 300);
    }

    // --- Private Methods (Atomic Operations) ---

    /**
     * Prepares the DOM by cleaning existing instances and injecting the new one.
     * @private
     */
    _prepareDOM(videoId) {
        this._destroyExisting();
        const overlay = this._createOverlay(videoId);
        document.body.appendChild(overlay);
        this._attachEvents(overlay);
    }

    /**
     * Creates the overlay element.
     * @private
     */
    _createOverlay(videoId) {
        const overlay = document.createElement('div');
        overlay.id = this.modalId;
        overlay.className = 'fixed inset-0 z-[9999] hidden items-center justify-center bg-black/95 backdrop-blur-md opacity-0 transition-opacity duration-300 px-4 pointer-events-auto';
        overlay.innerHTML = this._getTemplate(videoId);
        return overlay;
    }

    /**
     * Handles the entrance animations and reflow.
     * @private
     */
    _animateIn() {
        const overlay = document.getElementById(this.modalId);
        const container = document.getElementById(this.containerId);
        
        if (!overlay || !container) return;

        overlay.classList.replace('hidden', 'flex');
        void overlay.offsetWidth; // Force Reflow

        requestAnimationFrame(() => {
            overlay.classList.add('opacity-100');
            container.classList.remove('scale-95', 'opacity-0');
            container.classList.add('scale-100', 'opacity-100');
        });
    }

    /**
     * Handles exit animations.
     * @private
     */
    _animateOut(overlay) {
        overlay.classList.replace('opacity-100', 'opacity-0');
        const container = overlay.querySelector(`#${this.containerId}`);
        if (container) {
            container.classList.replace('scale-100', 'scale-95');
        }
    }

    /**
     * Safely loads the YouTube iframe.
     * @private
     */
    _initVideo(videoId) {
        const iframe = document.getElementById(this.iframeId);
        if (!iframe) return;

        // Optimized for mobile: direct source assignment without pointer-events blocking
        // to ensure immediate user interaction capability.
        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1&enablejsapi=1`;
    }

    /**
     * Stops video playback by clearing the src.
     * @private
     */
    _stopVideo(overlay) {
        const iframe = overlay.querySelector(`#${this.iframeId}`);
        if (iframe) iframe.src = '';
    }

    /**
     * Cleans up the modal from the DOM and state.
     * @private
     */
    _cleanup(overlay) {
        overlay.remove();
        this._unlockScroll();
        this.isOpen = false;
    }

    /**
     * Locks body scroll.
     * @private
     */
    _lockScroll() {
        document.body.style.overflow = 'hidden';
    }

    /**
     * Unlocks body scroll.
     * @private
     */
    _unlockScroll() {
        document.body.style.overflow = '';
    }

    /**
     * Destroys any existing modal element.
     * @private
     */
    _destroyExisting() {
        const existing = document.getElementById(this.modalId);
        if (existing) existing.remove();
    }

    /**
     * Attaches click and key events.
     * @private
     */
    _attachEvents(overlay) {
        const closeBtn = overlay.querySelector('#close-video-modal');

        closeBtn.onclick = (e) => {
            e.stopPropagation();
            this.close();
        };

        overlay.onclick = (e) => {
            if (e.target.id === this.modalId) this.close();
        };

        const keyHandler = (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
                document.removeEventListener('keydown', keyHandler);
            }
        };
        document.addEventListener('keydown', keyHandler);
    }

    /**
     * Returns the HTML template for the modal content.
     * @private
     */
    _getTemplate(videoId) {
        return `
            <div class="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] transform scale-95 opacity-0 transition-all duration-500 ease-out will-change-transform" id="${this.containerId}">
                <!-- YouTube Iframe - Positioned absolute to fill the aspect-video container robustly -->
                <iframe 
                    id="${this.iframeId}"
                    class="absolute inset-0 w-full h-full z-10"
                    src="" 
                    title="YouTube video player" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowfullscreen
                    loading="eager">
                </iframe>

                <!-- Close Button - Placed after iframe in DOM with high z-index for guaranteed accessibility -->
                <button id="close-video-modal" class="absolute top-4 right-4 z-50 p-3 bg-black/40 hover:bg-brand-green text-white rounded-full transition-all duration-300 backdrop-blur-md border border-white/20 group shadow-lg pointer-events-auto" aria-label="Cerrar video">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 group-hover:rotate-90 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        `;
    }
}
