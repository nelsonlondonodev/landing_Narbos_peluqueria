/**
 * MobileMenu Component
 * Handles the logic for the mobile navigation menu.
 * Adheres to SRP: Only handles the menu state (open/close).
 */
export class MobileMenu {
    constructor() {
        this.menuBtn = document.getElementById("menu-btn");
        this.mobileMenu = document.getElementById("mobile-menu");
        this.backdrop = document.getElementById("menu-backdrop");
        this.openIcon = document.getElementById("menu-open-icon");
        this.closeIcon = document.getElementById("menu-close-icon");
        this.internalCloseBtn = document.getElementById("internal-close-btn");
        this.links = document.querySelectorAll("#mobile-menu a");
        
        this.isOpen = false;

        this.init();
    }

    init() {
        if (!this.menuBtn || !this.mobileMenu) {
            console.warn("MobileMenu: Critical elements not found in DOM.");
            return;
        }

        // Move to body to avoid stacking context issues (backdrop-filter/transform on parent)
        // This ensures 'position: fixed' relates to the viewport, not the header.
        if (this.mobileMenu.parentElement !== document.body) {
            document.body.appendChild(this.mobileMenu);
        }

        if (this.backdrop && this.backdrop.parentElement !== document.body) {
            document.body.appendChild(this.backdrop);
        }

        // Force initial visual state to be closed
        this.mobileMenu.classList.add("translate-x-full");

        // Clean event binding
        this.menuBtn.onclick = (e) => {
            e.stopPropagation();
            this.toggle();
        };

        if (this.backdrop) {
            this.backdrop.onclick = () => this.close();
        }

        if (this.internalCloseBtn) {
            this.internalCloseBtn.onclick = () => this.close();
        }

        // Close on link click
        this.links.forEach(link => {
            link.addEventListener('click', () => this.close());
        });

        // Close on resize (logic only)
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768 && this.isOpen) {
                this.close();
            }
        });
        

    }

    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    open() {
        if (this.isOpen) return;
        

        this.mobileMenu.classList.remove("translate-x-full");
        document.body.classList.add("mobile-menu-open");
        
        if (this.backdrop) this.backdrop.classList.remove("hidden");
        if (this.openIcon) this.openIcon.classList.add("hidden");
        if (this.closeIcon) this.closeIcon.classList.remove("hidden");

        this.isOpen = true;
    }

    close() {
        if (!this.isOpen) return;


        this.mobileMenu.classList.add("translate-x-full");
        document.body.classList.remove("mobile-menu-open");
        
        if (this.backdrop) this.backdrop.classList.add("hidden");
        if (this.openIcon) this.openIcon.classList.remove("hidden");
        if (this.closeIcon) this.closeIcon.classList.add("hidden");

        this.isOpen = false;
    }
}
