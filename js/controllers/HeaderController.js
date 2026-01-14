/**
 * Controlador del Header.
 * Maneja el estado del scroll, menús desplegables y scroll spy.
 */
export class HeaderController {
    constructor() {
        this.DOM = {
            header: document.querySelector(".site-header"),
            dropdownBtn: document.getElementById("desktop-services-btn"),
            dropdownMenu: document.getElementById("desktop-services-menu")
        };

        this.init();
    }

    init() {
        this.createBackdrop();
        this.initScrollEffect();
        this.initDropdowns();
        this.initScrollSpy();
    }

    createBackdrop() {
        this.backdrop = document.createElement('div');
        this.backdrop.id = 'desktop-menu-backdrop';
        this.backdrop.className = 'fixed inset-0 bg-black/60 z-[40] opacity-0 pointer-events-none transition-opacity duration-300';
        document.body.appendChild(this.backdrop);

        this.backdrop.addEventListener('click', () => this.closeDropdown());
    }

    /**
     * Cambia el estilo del header al hacer scroll.
     */
    initScrollEffect() {
        if (!this.DOM.header) return;

        const handleScroll = () => {
            const isScrolled = window.scrollY > 50;
            this.DOM.header.classList.toggle("header-scrolled", isScrolled);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Initial check
    }

    /**
     * Maneja la lógica del menú desplegable de servicios.
     */
    initDropdowns() {
        if (!this.DOM.dropdownBtn || !this.DOM.dropdownMenu) return;

        let hoverTimeout;

        // Mouse Enter (Button)
        this.DOM.dropdownBtn.addEventListener("mouseenter", () => {
            clearTimeout(hoverTimeout);
            this.openDropdown();
        });

        // Mouse Enter (Menu)
        this.DOM.dropdownMenu.addEventListener("mouseenter", () => {
            clearTimeout(hoverTimeout);
        });

        // Mouse Leave (Button)
        this.DOM.dropdownBtn.addEventListener("mouseleave", () => {
             hoverTimeout = setTimeout(() => this.closeDropdown(), 300);
        });

        // Mouse Leave (Menu)
        this.DOM.dropdownMenu.addEventListener("mouseleave", () => {
             hoverTimeout = setTimeout(() => this.closeDropdown(), 300);
        });

        // Click (Toggle)
        this.DOM.dropdownBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            this.toggleDropdown();
        });

        // Escape Key
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") this.closeDropdown();
        });
    }

    toggleDropdown() {
        const isHidden = this.DOM.dropdownMenu.classList.contains("hidden");
        if (isHidden) {
            this.openDropdown();
        } else {
            this.closeDropdown();
        }
    }

    openDropdown() {
        if (!this.DOM.dropdownMenu.classList.contains("hidden")) return;

        this.DOM.dropdownMenu.classList.remove("hidden");
        this.DOM.dropdownBtn.setAttribute("aria-expanded", "true");
        
        // Activar Backdrop
        if (this.backdrop) {
            this.backdrop.classList.remove('pointer-events-none', 'opacity-0');
            // document.body.style.overflow = 'hidden'; // Scroll locking removed to prevent jump
        }
    }

    closeDropdown() {
        if (this.DOM.dropdownMenu.classList.contains("hidden")) return;

        this.DOM.dropdownMenu.classList.add("hidden");
        this.DOM.dropdownBtn.setAttribute("aria-expanded", "false");

        // Desactivar Backdrop
        if (this.backdrop) {
            this.backdrop.classList.add('opacity-0', 'pointer-events-none');
            // document.body.style.overflow = ''; // Scroll locking removed
        }
    }

    isClickInsideDropdown(target) {
        return this.DOM.dropdownBtn.contains(target) || this.DOM.dropdownMenu.contains(target);
    }

    /**
     * Actualiza el enlace activo del menú según la sección visible.
     */
    initScrollSpy() {
        const sections = document.querySelectorAll("main section[id], footer[id]");
        const navLinks = document.querySelectorAll("header nav .desktop-menu a");

        if (sections.length === 0 || navLinks.length === 0) return;

        const handleScrollSpy = () => {
            const scrollPosition = window.scrollY + 150;
            
            sections.forEach((section) => {
                const { offsetTop, offsetHeight, id } = section;
                if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                    this.updateActiveLink(navLinks, id);
                }
            });
        };

        window.addEventListener("scroll", handleScrollSpy);
        handleScrollSpy();
    }

    updateActiveLink(navLinks, sectionId) {
        navLinks.forEach((link) => link.classList.remove("nav-link-active"));
        
        const activeLink = document.querySelector(`header nav .desktop-menu a[href*="${sectionId}"]`);
        if (activeLink) {
            activeLink.classList.add("nav-link-active");
        }
    }
}
