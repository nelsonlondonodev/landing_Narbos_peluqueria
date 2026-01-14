/**
 * MobileMenu Component
 * Handles the logic for the mobile navigation menu.
 * Adheres to SRP: Only handles the menu state (open/close).
 */
/**
 * Componente Menú Móvil.
 * Maneja la apertura, cierre y accesibilidad del menú de navegación lateral.
 */
export class MobileMenu {
    constructor() {
        this.DOM = {
            menuBtn: document.getElementById("menu-btn"),
            mobileMenu: document.getElementById("mobile-menu"),
            backdrop: document.getElementById("menu-backdrop"),
            openIcon: document.getElementById("menu-open-icon"),
            closeIcon: document.getElementById("menu-close-icon"),
            internalCloseBtn: document.getElementById("internal-close-btn"),
            links: document.querySelectorAll("#mobile-menu a")
        };
        
        this.isOpen = false;
        this.init();
    }

    /**
     * Inicializa el componente.
     */
    init() {
        if (!this.DOM.menuBtn || !this.DOM.mobileMenu) {
            console.warn("MobileMenu: Critical elements not found in DOM.");
            return;
        }

        this.moveMenuToBody();
        this.resetInitialState();
        this.bindEvents();
    }

    /**
     * Mueve el menú y backdrop al final del body para evitar problemas de Stacking Context.
     */
    moveMenuToBody() {
        if (this.DOM.mobileMenu.parentElement !== document.body) {
            document.body.appendChild(this.DOM.mobileMenu);
        }

        if (this.DOM.backdrop && this.DOM.backdrop.parentElement !== document.body) {
            document.body.appendChild(this.DOM.backdrop);
        }
    }

    /**
     * Asegura que el menú inicie oculto visualmente.
     */
    resetInitialState() {
        this.DOM.mobileMenu.classList.add("translate-x-full");
    }

    /**
     * Asigna los event listeners.
     */
    bindEvents() {
        // Toggle desde el botón del header
        this.DOM.menuBtn.onclick = (e) => {
            e.stopPropagation();
            this.toggle();
        };

        // Cerrar desde backdrop
        if (this.DOM.backdrop) {
            this.DOM.backdrop.onclick = () => this.close();
        }

        // Cerrar desde botón interno (X)
        if (this.DOM.internalCloseBtn) {
            this.DOM.internalCloseBtn.onclick = () => this.close();
        }

        // Cerrar al hacer clic en un enlace
        this.DOM.links.forEach(link => {
            link.addEventListener('click', () => this.close());
        });

        // Cerrar al redimensionar a desktop
        window.addEventListener('resize', () => this.handleResize());
    }

    handleResize() {
        if (window.innerWidth >= 768 && this.isOpen) {
            this.close();
        }
    }

    toggle() {
        this.isOpen ? this.close() : this.open();
    }

    open() {
        if (this.isOpen) return;
        
        this.DOM.mobileMenu.classList.remove("translate-x-full");
        document.body.classList.add("mobile-menu-open");
        document.body.style.overflow = 'hidden'; // Prevenir scroll de fondo
        
        this.toggleElements(true);
        this.isOpen = true;
    }

    close() {
        if (!this.isOpen) return;

        this.DOM.mobileMenu.classList.add("translate-x-full");
        document.body.classList.remove("mobile-menu-open");
        document.body.style.overflow = ''; // Restaurar scroll
        
        this.toggleElements(false);
        this.isOpen = false;
    }

    /**
     * Alterna la visibilidad de iconos y backdrop.
     * @param {boolean} isOpening - True si se está abriendo el menú.
     */
    toggleElements(isOpening) {
        if (this.DOM.backdrop) {
            this.DOM.backdrop.classList.toggle("hidden", !isOpening);
        }
        
        if (this.DOM.openIcon) {
            this.DOM.openIcon.classList.toggle("hidden", isOpening);
        }
        
        if (this.DOM.closeIcon) {
            this.DOM.closeIcon.classList.toggle("hidden", !isOpening);
        }
    }
}
