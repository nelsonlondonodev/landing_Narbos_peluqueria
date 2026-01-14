/**
 * Servicio de Traducción (I18n).
 * Gestiona el idioma actual, persistencia y actualización del DOM.
 * @singleton
 */
import { translations } from '../data/translations.js';

export class TranslationService {
    constructor() {
        if (TranslationService.instance) {
            return TranslationService.instance;
        }
        TranslationService.instance = this;

        this.currentLang = 'es';
        this.translations = translations;
    }

    /**
     * Inicializa el servicio, carga preferencias y aplica traducciones.
     */
    init() {
        this.loadPreference();
        this.applyTranslations();
        this.bindSwitchers();
    }

    /**
     * Carga el idioma preferido del LocalStorage o navegador.
     */
    loadPreference() {
        const storedLang = localStorage.getItem('user-lang');
        const browserLang = navigator.language.split('-')[0];
        
        // Prioridad: LocalStorage > Navegador > 'es'
        if (this.isValidLang(storedLang)) {
            this.currentLang = storedLang;
        } else if (this.isValidLang(browserLang)) {
            this.currentLang = browserLang;
        } else {
            this.currentLang = 'es';
        }

        this.saveState();
    }

    /**
     * Establece el idioma manualmente y actualiza la UI.
     * @param {'es'|'en'} lang 
     */
    setLanguage(lang) {
        if (!this.isValidLang(lang)) return;

        this.currentLang = lang;
        this.saveState();
        this.applyTranslations();
        
        window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
    }

    toggleLanguage() {
        const newLang = this.currentLang === 'es' ? 'en' : 'es';
        this.setLanguage(newLang);
    }

    /**
     * Retorna el texto traducido para una clave dada.
     * @param {string} key 
     * @returns {string} Texto traducido o la clave si no existe.
     */
    getTranslation(key) {
        return this.translations[this.currentLang][key] || key;
    }

    /**
     * Actualiza todos los elementos con atributo [data-i18n].
     */
    applyTranslations() {
        const elements = document.querySelectorAll('[data-i18n]');
        
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.getTranslation(key);
            
            if (translation) {
                this.updateElementContent(element, translation);
            }
        });
        
        this.updateSwitcherUI();
    }

    updateElementContent(element, text) {
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            if (element.hasAttribute('placeholder')) {
                element.placeholder = text;
            }
        } else {
            element.textContent = text;
        }
    }
    
    /**
     * Actualiza el texto de los botones cambiadores de idioma.
     */
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

    saveState() {
        localStorage.setItem('user-lang', this.currentLang);
        document.documentElement.lang = this.currentLang;
    }

    isValidLang(lang) {
        return ['es', 'en'].includes(lang);
    }

    getCurrentLang() {
        return this.currentLang;
    }
}
