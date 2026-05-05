/**
 * VideoModal Component - Professional Version
 * Handles YouTube video playback with guaranteed visibility and performance.
 */
export class VideoModal {
    constructor() {
        this.modalId = 'video-modal-overlay';
        this.isOpen = false;
    }

    /**
     * Opens the modal with the specified YouTube video.
     * @param {string} videoId - The YouTube video ID.
     */
    open(videoId) {
        if (this.isOpen) return;

        // 1. Clean any existing modal first
        this._destroyExisting();

        // 2. Render structure without the iframe src yet
        const overlay = this._renderBase(videoId);
        document.body.appendChild(overlay);

        // 3. Lock scroll safely
        document.body.style.overflow = 'hidden';
        this.isOpen = true;

        // 4. Force Reflow to ensure transition works
        void overlay.offsetWidth;

        // 5. Activate visibility and animation
        overlay.classList.remove('hidden');
        overlay.classList.add('flex');
        
        // Use requestAnimationFrame for smoother entry
        requestAnimationFrame(() => {
            overlay.classList.add('opacity-100');
            const container = overlay.querySelector('#video-modal-container');
            if (container) {
                container.classList.remove('scale-95', 'opacity-0');
                container.classList.add('scale-100', 'opacity-100');
            }
        });

        // 6. Load the iframe only AFTER the modal is starting to show
        // and disable pointer events on it during the 300ms transition
        const iframe = overlay.querySelector('#modal-youtube-iframe');
        iframe.style.pointerEvents = 'none';
        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1&enablejsapi=1`;

        setTimeout(() => {
            if (iframe) iframe.style.pointerEvents = 'auto';
        }, 500);

        this._attachEvents(overlay);
    }

    /**
     * Closes the modal and restores the environment.
     */
    close() {
        const overlay = document.getElementById(this.modalId);
        if (!overlay) {
            this._restoreEnvironment();
            return;
        }

        // 1. Fade out
        overlay.classList.remove('opacity-100');
        overlay.classList.add('opacity-0');
        
        const container = overlay.querySelector('#video-modal-container');
        if (container) {
            container.classList.remove('scale-100');
            container.classList.add('scale-95');
        }

        // 2. Stop audio immediately by removing iframe src
        const iframe = overlay.querySelector('#modal-youtube-iframe');
        if (iframe) iframe.src = '';

        // 3. Cleanup after animation
        setTimeout(() => {
            this._destroyExisting();
            this._restoreEnvironment();
        }, 300);
    }

    /**
     * Renders the base structure of the modal.
     * @private
     */
    _renderBase(videoId) {
        const overlay = document.createElement('div');
        overlay.id = this.modalId;
        // Start hidden and with pointer-events-none
        overlay.className = 'fixed inset-0 z-[9999] hidden items-center justify-center bg-black/95 backdrop-blur-md opacity-0 transition-opacity duration-300 px-4 pointer-events-auto';
        
        overlay.innerHTML = `
            <div class="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] transform scale-95 opacity-0 transition-all duration-500 ease-out" id="video-modal-container">
                <!-- Close Button -->
                <button id="close-video-modal" class="absolute top-4 right-4 z-[100] p-3 bg-white/10 hover:bg-brand-green text-white rounded-full transition-all duration-300 backdrop-blur-xl border border-white/20 group shadow-lg" aria-label="Cerrar video">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 group-hover:rotate-90 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <!-- Iframe Placeholder -->
                <iframe 
                    id="modal-youtube-iframe"
                    class="w-full h-full"
                    src="" 
                    title="YouTube video player" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowfullscreen>
                </iframe>
            </div>
        `;
        return overlay;
    }

    /**
     * Cleans up events and state.
     * @private
     */
    _restoreEnvironment() {
        document.body.style.overflow = '';
        this.isOpen = false;
    }

    /**
     * Destroys any existing modal element.
     * @private
     */
    _destroyExisting() {
        const existing = document.getElementById(this.modalId);
        if (existing) {
            existing.remove();
        }
    }

    /**
     * Attaches events for closing.
     * @private
     */
    _attachEvents(overlay) {
        const closeBtn = overlay.querySelector('#close-video-modal');

        closeBtn.onclick = (e) => {
            e.stopPropagation();
            this.close();
        };

        overlay.onclick = (e) => {
            if (e.target.id === this.modalId) {
                this.close();
            }
        };

        const keyHandler = (e) => {
            if (e.key === 'Escape') {
                this.close();
                document.removeEventListener('keydown', keyHandler);
            }
        };
        document.addEventListener('keydown', keyHandler);
    }
}
