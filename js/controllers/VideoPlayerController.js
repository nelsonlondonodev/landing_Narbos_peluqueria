/**
 * Controlador del Reproductor de Video.
 * Maneja las interacciones del video personalizado (botones play/pause overlays).
 */
export class VideoPlayerController {
    constructor() {
        this.DOM = {
            container: document.getElementById("video-container"),
            video: document.getElementById("promo-video"),
            btn: document.getElementById("video-play-button")
        };

        this.init();
    }

    init() {
        if (!this.DOM.container || !this.DOM.video || !this.DOM.btn) return;

        this.bindEvents();
    }

    bindEvents() {
        // Toggle play al hacer clic en el contenedor
        this.DOM.container.addEventListener("click", () => this.togglePlay());

        // Actualizar UI según estado del video
        this.DOM.video.addEventListener("play", () => this.updateUI(true));
        this.DOM.video.addEventListener("pause", () => this.updateUI(false));
        this.DOM.video.addEventListener("ended", () => this.updateUI(false));
    }

    togglePlay() {
        if (this.DOM.video.paused) {
            this.DOM.video.play();
        } else {
            this.DOM.video.pause();
        }
    }

    /**
     * Actualiza la interfaz (botón play) según si está reproduciendo.
     * @param {boolean} isPlaying 
     */
    updateUI(isPlaying) {
        if (isPlaying) {
            this.DOM.btn.classList.add("hidden");
        } else {
            this.DOM.btn.classList.remove("hidden");
        }
    }
}
