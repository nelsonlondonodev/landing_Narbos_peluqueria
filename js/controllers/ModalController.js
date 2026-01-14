/**
 * Controlador de Modales.
 * Maneja la apertura, cierre y accesibilidad de ventanas modales.
 */
export class ModalController {
    constructor() {
        this.init();
    }

    init() {
        this.bindTriggers();
        this.bindCloseButtons();
        this.bindGlobalEvents();
    }

    /**
     * Asigna eventos a los elementos que abren modales.
     */
    bindTriggers() {
        const triggers = document.querySelectorAll("[data-modal-target]");
        
        triggers.forEach((trigger) => {
            const modalId = trigger.dataset.modalTarget;
            
            trigger.addEventListener("click", () => this.openModal(modalId));

            // Soporte accesibilidad teclado
            trigger.addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    this.openModal(modalId);
                }
            });
        });
    }

    /**
     * Asigna eventos a los botones de cierre dentro de los modales.
     */
    bindCloseButtons() {
        document.querySelectorAll('[id$="-modal"]').forEach((modal) => {
            const closeButton = modal.querySelector("[data-modal-close]");
            
            if (closeButton) {
                closeButton.addEventListener("click", () => this.closeModal(modal));
            }
            
            // Cerrar al hacer clic en el backdrop
            modal.addEventListener("click", (e) => {
                if (e.target === modal) this.closeModal(modal);
            });
        });
    }

    /**
     * Eventos globales (Escape key).
     */
    bindGlobalEvents() {
        window.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                const openModal = document.querySelector('[id$="-modal"]:not(.hidden)');
                if (openModal) this.closeModal(openModal);
            }
        });
    }

    openModal(modalId) {
        const modal = typeof modalId === 'string' ? document.getElementById(modalId) : modalId;
        if (!modal) return;

        modal.classList.remove("hidden");
        modal.classList.add('modal-animation');
        
        // Animación de contenido
        const content = modal.querySelector('div');
        if (content) {
            content.classList.add('modal-content-animation');
        }

        document.body.style.overflow = "hidden";
        document.body.classList.add('modal-open-layer-fix');
    }

    closeModal(modal) {
        if (!modal) return;

        modal.classList.add("hidden");
        modal.classList.remove('modal-animation');
        
        const content = modal.querySelector('div');
        if (content) {
            content.classList.remove('modal-content-animation');
        }

        document.body.style.overflow = "";
        document.body.classList.remove('modal-open-layer-fix');
    }
}
