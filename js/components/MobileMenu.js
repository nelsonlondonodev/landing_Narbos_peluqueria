/**
 * MobileMenu Component
 * Handles the logic for the mobile navigation menu.
 * Adheres to SRP: Only handles the menu state (open/close).
 */
/**
 * Componente Menú Móvil.
 * Maneja la apertura, cierre y accesibilidad del menú de navegación lateral.
 * Ahora también gestiona el acordeón de servicios.
 */
export class MobileMenu {
    constructor() {
        // Initial DOM elements that are critical for the menu to function.
        // Other elements are re-mapped in init() after basic checks.
        this.DOM = {
            menuBtn: document.getElementById("menu-btn"),
            mobileMenu: document.getElementById("mobile-menu"),
            backdrop: document.getElementById("menu-backdrop"),
            openIcon: null, // Will be mapped in init()
            closeIcon: null, // Will be mapped in init()
            internalCloseBtn: null, // Will be mapped in init()
            links: null, // Will be mapped in init()
            serviceToggles: null // Will be mapped in init()
        };
        
        this.isOpen = false;
        this.init();
    }

    /**
     * Inicializa el componente.
     * Realiza reintentos silenciosos si los elementos DOM principales no están presentes.
     */
    init(retries = 0) {
        // Re-check critical elements on each retry
        this.DOM.menuBtn = document.getElementById("menu-btn");
        this.DOM.mobileMenu = document.getElementById("mobile-menu");
        this.DOM.backdrop = document.getElementById("menu-backdrop");

        // If critical elements are missing, retry silently
        if (!this.DOM.menuBtn || !this.DOM.mobileMenu) {
            if (retries < 5) { // Retry up to 5 times (approx 1.5s total)
                setTimeout(() => this.init(retries + 1), 300);
                return;
            }
            return; // Fallo silencioso (evita ruido en consola)
        }

        // Re-mapear el resto de elementos ahora que sabemos que el menú existe
        this.DOM.openIcon = document.getElementById("menu-open-icon");
        this.DOM.closeIcon = document.getElementById("menu-close-icon");
        this.DOM.internalCloseBtn = document.getElementById("internal-close-btn");
        this.DOM.links = document.querySelectorAll("#mobile-menu a");
        this.DOM.serviceToggles = document.querySelectorAll(".mobile-services-toggle");

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

        // Toggle del Acordeón de Servicios
        this.DOM.serviceToggles.forEach(btn => {
            btn.onclick = (e) => {
                const content = btn.nextElementSibling;
                const icon = btn.querySelector('svg');
                
                content.classList.toggle('hidden');
                icon.classList.toggle('rotate-180');
            };
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
