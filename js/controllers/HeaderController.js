/**
 * HeaderController
 * Manages header interactions: scroll state, dropdowns, and scroll spy.
 */
export class HeaderController {
    constructor() {
        this.initHeaderScroll();
        this.initNavbarDropdown();
        this.initScrollSpy();
    }

    initHeaderScroll() {
        const header = document.querySelector(".site-header");
        if (!header) return;

        const updateHeaderState = () => {
            if (window.scrollY > 50) {
                header.classList.add("header-scrolled");
            } else {
                header.classList.remove("header-scrolled");
            }
        };

        window.addEventListener("scroll", updateHeaderState);
        // Initial check
        updateHeaderState();
    }

    initNavbarDropdown() {
        const btn = document.getElementById("desktop-services-btn");
        const menu = document.getElementById("desktop-services-menu");

        if (!btn || !menu) return;

        // Toggle on click
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const isHidden = menu.classList.contains("hidden");
            
            if (isHidden) {
                menu.classList.remove("hidden");
                btn.setAttribute("aria-expanded", "true");
            } else {
                menu.classList.add("hidden");
                btn.setAttribute("aria-expanded", "false");
            }
        });

        // Close when clicking outside
        document.addEventListener("click", (e) => {
            if (!btn.contains(e.target) && !menu.contains(e.target)) {
                menu.classList.add("hidden");
                btn.setAttribute("aria-expanded", "false");
            }
        });

        // Keyboard support (Escape key)
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && !menu.classList.contains("hidden")) {
                menu.classList.add("hidden");
                btn.setAttribute("aria-expanded", "false");
            }
        });
    }

    initScrollSpy() {
        const sections = document.querySelectorAll("main section[id], footer[id]");
        const navLinks = document.querySelectorAll("header nav .desktop-menu a");

        if (sections.length === 0 || navLinks.length === 0) return;

        const onScroll = () => {
            const scrollPosition = window.scrollY + 150;
            sections.forEach((section) => {
                if (
                    scrollPosition >= section.offsetTop &&
                    scrollPosition < section.offsetTop + section.offsetHeight
                ) {
                    navLinks.forEach((link) => {
                        link.classList.remove("nav-link-active");
                    });
                    const correspondingLink = document.querySelector(
                        `header nav .desktop-menu a[href*="${section.id}"]`
                    );
                    if (correspondingLink) {
                        correspondingLink.classList.add("nav-link-active");
                    }
                }
            });
        };
        window.addEventListener("scroll", onScroll);
        // Initial check
        onScroll();
    }
}
