/**
 * ThemeService
 * Handles theme switching (dark/light/auto) and persistence.
 */
export class ThemeService {
    constructor() {
        // Desktop Icons
        this.themeToggleBtn = document.getElementById("theme-toggle");
        this.themeToggleDarkIcon = document.getElementById("theme-toggle-dark-icon");
        this.themeToggleLightIcon = document.getElementById("theme-toggle-light-icon");
        this.themeToggleAutoIcon = document.getElementById("theme-toggle-auto-icon");

        // Mobile Icons
        this.themeToggleBtnMobile = document.getElementById("theme-toggle-mobile");
        this.themeToggleDarkIconMobile = document.getElementById("theme-toggle-dark-icon-mobile");
        this.themeToggleLightIconMobile = document.getElementById("theme-toggle-light-icon-mobile");
        this.themeToggleAutoIconMobile = document.getElementById("theme-toggle-auto-icon-mobile");

        this.init();
    }

    init() {
        // Retry mechanism for dynamic elements
        if (!this.themeToggleBtn && !this.themeToggleBtnMobile) {
            // Try fetching again in case DOM wasn't ready (though it should be)
            this.themeToggleBtn = document.getElementById("theme-toggle");
            this.themeToggleDarkIcon = document.getElementById("theme-toggle-dark-icon");
            this.themeToggleLightIcon = document.getElementById("theme-toggle-light-icon");
            this.themeToggleAutoIcon = document.getElementById("theme-toggle-auto-icon");

            this.themeToggleBtnMobile = document.getElementById("theme-toggle-mobile");
            this.themeToggleDarkIconMobile = document.getElementById("theme-toggle-dark-icon-mobile");
            this.themeToggleLightIconMobile = document.getElementById("theme-toggle-light-icon-mobile");
            this.themeToggleAutoIconMobile = document.getElementById("theme-toggle-auto-icon-mobile");
        }

        if (!this.themeToggleBtn && !this.themeToggleBtnMobile) {
            console.warn("ThemeService: Toggle buttons still not found after retry. Theme switching disabled.");
            return;
        }

        // Bind Events with error handling
        try {
            if (this.themeToggleBtn) {
                this.themeToggleBtn.addEventListener("click", (e) => {
                    e.preventDefault(); 
                    console.log("Desktop Theme Toggle Clicked");
                    this.cycleTheme();
                });
            }
            if (this.themeToggleBtnMobile) {
                this.themeToggleBtnMobile.addEventListener("click", (e) => {
                    e.preventDefault();
                    console.log("Mobile Theme Toggle Clicked");
                    this.cycleTheme();
                });
            }

            // System preference listener
            window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => this.applyTheme());

            // Initial application
            console.log("ThemeService initialized. Applying initial theme...");
            this.applyTheme();
        } catch (err) {
            console.error("ThemeService Error:", err);
        }
    }

    applyTheme() {
        const theme = localStorage.getItem("theme") || "auto";
        const allIcons = [
            this.themeToggleDarkIcon, this.themeToggleLightIcon, this.themeToggleAutoIcon,
            this.themeToggleDarkIconMobile, this.themeToggleLightIconMobile, this.themeToggleAutoIconMobile
        ];
        
        // Hide all icons first
        allIcons.forEach((icon) => {
            if (icon) icon.classList.add("hidden");
        });

        if (theme === "dark") {
            document.documentElement.classList.add("dark");
            this.showIcon(this.themeToggleLightIcon);
            this.showIcon(this.themeToggleLightIconMobile);
        } else if (theme === "light") {
            document.documentElement.classList.remove("dark");
            this.showIcon(this.themeToggleDarkIcon);
            this.showIcon(this.themeToggleDarkIconMobile);
        } else {
            // Auto
            if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
            this.showIcon(this.themeToggleAutoIcon);
            this.showIcon(this.themeToggleAutoIconMobile);
        }
        // Force UI updates via custom event to avoid conflicts with browser extensions listening to 'scroll'
        window.dispatchEvent(new CustomEvent('themeChanged'));
        console.log(`Theme Applied: ${theme}`);
    }

    showIcon(iconElement) {
        if (iconElement) {
            iconElement.classList.remove("hidden");
        }
    }

    cycleTheme() {
        const currentTheme = localStorage.getItem("theme") || "auto";
        const nextTheme = currentTheme === "light" ? "dark" : currentTheme === "dark" ? "auto" : "light";
        localStorage.setItem("theme", nextTheme);
        this.applyTheme();
    }
}
