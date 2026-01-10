import { translations } from '../data/translations.js';

export class TranslationService {
    constructor() {
        if (TranslationService.instance) {
            return TranslationService.instance;
        }
        TranslationService.instance = this;

        this.currentLang = 'es'; // Default
        this.translations = translations;
    }

    init() {
        this.loadPreference();
        this.applyTranslations();
        console.log(`TranslationService initialized. Language: ${this.currentLang}`);
    }

    loadPreference() {
        const storedLang = localStorage.getItem('user-lang');
        if (storedLang && ['es', 'en'].includes(storedLang)) {
            this.currentLang = storedLang;
        } else {
            // Detect browser language
            const browserLang = navigator.language.split('-')[0];
            this.currentLang = ['es', 'en'].includes(browserLang) ? browserLang : 'es';
        }
        // Save computed preference to normalize
        localStorage.setItem('user-lang', this.currentLang);
        
        // Set html lang attribute
        document.documentElement.lang = this.currentLang;
    }

    setLanguage(lang) {
        if (!['es', 'en'].includes(lang)) return;
        
        this.currentLang = lang;
        localStorage.setItem('user-lang', lang);
        document.documentElement.lang = lang;
        
        this.applyTranslations();
        
        // Dispatch event for other components (like Navbar) to update UI state if needed
        window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
    }

    toggleLanguage() {
        const newLang = this.currentLang === 'es' ? 'en' : 'es';
        this.setLanguage(newLang);
    }

    getTranslation(key) {
        return this.translations[this.currentLang][key] || key;
    }

    applyTranslations() {
        const elements = document.querySelectorAll('[data-i18n]');
        
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.getTranslation(key);
            
            if (translation) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    if (element.hasAttribute('placeholder')) {
                        element.placeholder = translation;
                    }
                } else {
                     element.textContent = translation;
                }
            }
        });
        
        // Update Switcher Buttons Text
         this.updateSwitcherUI();
    }
    
    updateSwitcherUI() {
        const nextLang = this.currentLang === 'es' ? 'EN' : 'ES';
        const buttons = document.querySelectorAll('#lang-toggle-desktop, #lang-toggle-mobile, .lang-toggle-mobile-internal');
        
        buttons.forEach(btn => {
            if (btn.classList.contains('lang-toggle-mobile-internal')) {
                 btn.textContent = this.currentLang === 'es' ? 'Switch to English' : 'Cambiar a Español';
            } else {
                btn.textContent = nextLang;
            }
        });
        
        // Update HTML lang attribute
        document.documentElement.lang = this.currentLang;
    }

    bindSwitchers() {
        const buttons = document.querySelectorAll('#lang-toggle-desktop, #lang-toggle-mobile, .lang-toggle-mobile-internal');
        buttons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleLanguage();
            });
        });
    }

    getCurrentLang() {
        return this.currentLang;
    }
}
