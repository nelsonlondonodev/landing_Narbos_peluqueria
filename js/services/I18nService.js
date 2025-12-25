/**
 * I18nService
 * Handles language loading, caching, and DOM updates for internationalization.
 */
export class I18nService {
    constructor() {
        this.currentLang = localStorage.getItem("language") || "es";
        this.translations = {};
        
        // DOM Elements
        this.langToggleDesktop = document.getElementById("lang-toggle-desktop");
        this.langToggleMobile = document.getElementById("lang-toggle-mobile");
        
        this.init();
    }

    async init() {
        // Skip initialization if toggles are missing (e.g., on specific pages or if hidden)
        // Or if we are on a blog page where we decided to hide language toggle
        if (this.isBlogPage()) {
            this.hideToggles();
            return;
        }

        if (!this.langToggleDesktop && !this.langToggleMobile) return;

        // Bind events
        if (this.langToggleDesktop) this.langToggleDesktop.onclick = () => this.toggleLanguage();
        if (this.langToggleMobile) this.langToggleMobile.onclick = () => this.toggleLanguage();

        // Initial load
        await this.loadTranslations(this.currentLang);
        

    }

    isBlogPage() {
        return window.location.pathname.includes('/blog/');
    }

    hideToggles() {
        if (this.langToggleDesktop) this.langToggleDesktop.style.display = 'none';
        if (this.langToggleMobile) this.langToggleMobile.style.display = 'none';
    }

    getBasePath() {
        const path = window.location.pathname;
        if (path.includes('/blog/articles/')) {
            return '../../';
        } else if (path.includes('/blog/')) {
            return '../';
        }
        return './';
    }

    async toggleLanguage() {
        const newLang = this.currentLang === "es" ? "en" : "es";
        this.currentLang = newLang;
        localStorage.setItem("language", newLang);
        await this.loadTranslations(newLang);
    }

    async loadTranslations(lang) {
        const basePath = this.getBasePath();
        try {
            const response = await fetch(`${basePath}lang/${lang}.json?v=1.1`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.translations = await response.json();
            this.updateDOM(lang);
        } catch (error) {
            console.error("I18nService: Could not load translation file:", error);
            // Fallback to Spanish if loading fails
            if (lang !== 'es') {
                await this.loadTranslations('es');
            }
        }
    }

    updateDOM(lang) {
        document.documentElement.lang = lang;

        // Update Text Content
        document.querySelectorAll("[data-key]").forEach((elem) => {
            const key = elem.getAttribute("data-key");
            if (this.translations[key]) {
                elem.innerHTML = this.translations[key];
            }
        });

        // Update Alt Attributes
        document.querySelectorAll("[data-key-alt]").forEach((elem) => {
            const key = elem.getAttribute("data-key-alt");
            if (this.translations[key]) {
                elem.setAttribute("alt", this.translations[key]);
            }
        });

        // Update Meta Tags
        const metaDescription = document.getElementById("meta-description");
        if (metaDescription && this.translations.metaDescription) {
            metaDescription.setAttribute("content", this.translations.metaDescription);
        }
        
        if (this.translations.metaTitle) {
            document.title = this.translations.metaTitle;
        }

        this.updateToggleButtons(lang);
    }

    updateToggleButtons(currentLang) {
        const targetLang = currentLang === "es" ? "en" : "es";
        const flagCode = targetLang === "es" ? "es" : "gb";
        
        const buttonHTML = `
            <img src="https://flagcdn.com/w20/${flagCode}.png" srcset="https://flagcdn.com/w40/${flagCode}.png 2x" alt="${targetLang.toUpperCase()}" class="w-5 h-auto mr-2">
            ${targetLang.toUpperCase()}
        `;

        if (this.langToggleDesktop) this.langToggleDesktop.innerHTML = buttonHTML;
        if (this.langToggleMobile) this.langToggleMobile.innerHTML = buttonHTML;
    }
}
