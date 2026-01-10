/**
 * ModalController
 * Handles generic modal interactions (open, close, accessibility).
 */
export class ModalController {
    constructor() {
        this.initModals();
    }

    initModals() {
        const openModalTriggers = document.querySelectorAll("[data-modal-target]");
        if (openModalTriggers.length === 0) return;

        const openModal = (modal) => {
            if (modal) {
                modal.classList.remove("hidden");
                // Add classes for animations if defined in CSS
                const content = modal.querySelector('div'); // Assuming first div is content
                if (content) {
                   content.classList.add('modal-content-animation');
                }
                modal.classList.add('modal-animation');
                
                document.body.style.overflow = "hidden";
            }
        };

        const closeModal = (modal) => {
            if (modal) {
                modal.classList.add("hidden");
                modal.classList.remove('modal-animation');
                 const content = modal.querySelector('div');
                if (content) {
                   content.classList.remove('modal-content-animation');
                }
                document.body.style.overflow = "";
            }
        };

        openModalTriggers.forEach((trigger) => {
            trigger.addEventListener("click", () => {
                const modal = document.getElementById(trigger.dataset.modalTarget);
                openModal(modal);
            });

            // Keyboard Accessibility Support
            trigger.addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    const modal = document.getElementById(trigger.dataset.modalTarget);
                    openModal(modal);
                }
            });
        });

        document.querySelectorAll('[id$="-modal"]').forEach((modal) => {
            const closeButton = modal.querySelector("[data-modal-close]");
            if (closeButton) {
                closeButton.addEventListener("click", () => closeModal(modal));
            }
            modal.addEventListener("click", (e) => {
                if (e.target === modal) closeModal(modal);
            });
        });

        window.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                const openModal = document.querySelector('[id$="-modal"]:not(.hidden)');
                closeModal(openModal);
            }
        });
    }
}
