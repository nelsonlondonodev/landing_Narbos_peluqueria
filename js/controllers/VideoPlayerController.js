/**
 * VideoPlayerController
 * Manages custom video player interactions (play/pause overlay buttons).
 */
export class VideoPlayerController {
    constructor() {
        this.initVideoPlayer();
    }

    initVideoPlayer() {
        const videoContainer = document.getElementById("video-container");
        if (!videoContainer) return;

        const promoVideo = document.getElementById("promo-video");
        const videoPlayButton = document.getElementById("video-play-button");

        if (!promoVideo || !videoPlayButton) return;

        videoContainer.addEventListener("click", () => {
            if (promoVideo.paused) {
                promoVideo.play();
            } else {
                promoVideo.pause();
            }
        });

        promoVideo.addEventListener("play", () => {
            videoPlayButton.classList.add("hidden");
        });

        promoVideo.addEventListener("pause", () => {
            videoPlayButton.classList.remove("hidden");
        });

        promoVideo.addEventListener("ended", () => {
            videoPlayButton.classList.remove("hidden");
        });
    }
}
