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
        this.initScrollEffect();
        this.initDropdowns();
        this.initScrollSpy();
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

        // Toggle Click
        this.DOM.dropdownBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            this.toggleDropdown();
        });

        // Click Outside
        document.addEventListener("click", (e) => {
            if (!this.isClickInsideDropdown(e.target)) {
                this.closeDropdown();
            }
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
        this.DOM.dropdownMenu.classList.remove("hidden");
        this.DOM.dropdownBtn.setAttribute("aria-expanded", "true");
    }

    closeDropdown() {
        this.DOM.dropdownMenu.classList.add("hidden");
        this.DOM.dropdownBtn.setAttribute("aria-expanded", "false");
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
