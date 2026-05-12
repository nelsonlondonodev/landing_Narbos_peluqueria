import { siteConfig, resolveRoute, resolveAsset } from '../config.js';

/**
 * Configuración de la librería y recursos externos.
 */
const CC_RESOURCES = {
    JS_URL: 'https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@v3.0.1/dist/cookieconsent.umd.js',
    CSS_URL: 'https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@v3.0.1/dist/cookieconsent.css',
    GEO_API_URL: 'https://freeipapi.com/api/json'
};

/**
 * Países bajo regulación estricta (UE/EEA/CH/GB).
 */
const REGULATED_COUNTRIES = [
    'AT', 'BE', 'BG', 'CY', 'CZ', 'DE', 'DK', 'EE', 'ES', 'FI', 'FR', 'GR', 'HR', 'HU', 
    'IE', 'IT', 'LT', 'LU', 'LV', 'MT', 'NL', 'PL', 'PT', 'RO', 'SE', 'SI', 'SK', 'GB', 'CH', 'LI', 'NO'
];

/**
 * CookieConsentService - Gestiona el banner de cookies y el cumplimiento legal (GDPR).
 */
class CookieConsentService {
    constructor(analyticsService) {
        this.analyticsService = analyticsService;
        this.isInitialized = false;
        this.logoUrl = resolveAsset('images/brand/logo_narbos.webp');
    }

    /**
     * Punto de entrada principal. Determina si se requiere el banner según la ubicación.
     */
    async init() {
        if (this.isInitialized) return;

        const consentDecision = localStorage.getItem('cc_cookie');
        
        if (consentDecision) {
            await this._boot();
            return;
        }

        try {
            const isRegulated = await this._isRegulatedZone();
            
            if (isRegulated) {
                this.analyticsService.setConsentRequired(true);
                await this._boot();
            } else {
                this._activateAnalyticsWithoutBanner();
            }
        } catch (error) {
            console.warn('[CookieService] Fallo en Geo-Targeting, aplicando política por defecto.');
            this.analyticsService.init();
        }

        this.isInitialized = true;
    }

    /**
     * Carga recursos y configura la librería.
     */
    async _boot() {
        await this._loadResources();
        this._applyCustomStyles();
        this._run();
    }

    /**
     * Activa analíticas directamente para zonas no reguladas.
     */
    _activateAnalyticsWithoutBanner() {
        this.analyticsService.setConsentRequired(false);
        this.analyticsService.init();
    }

    /**
     * Detección geográfica híbrida (Zona Horaria + IP).
     */
    async _isRegulatedZone() {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (tz.startsWith('Europe/')) return true;

        const response = await fetch(CC_RESOURCES.GEO_API_URL);
        const { countryCode } = await response.json();
        return REGULATED_COUNTRIES.includes(countryCode);
    }

    /**
     * Inyecta dependencias externas (JS y CSS).
     */
    _loadResources() {
        return new Promise((resolve) => {
            if (window.CookieConsent) return resolve();

            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = CC_RESOURCES.CSS_URL;
            document.head.appendChild(link);

            const script = document.createElement('script');
            script.src = CC_RESOURCES.JS_URL;
            script.onload = resolve;
            document.head.appendChild(script);
        });
    }

    /**
     * Ejecuta la inicialización de la librería con la configuración de Narbo's.
     */
    _run() {
        const cc = window.CookieConsent;
        const handleConsent = () => {
            if (cc.acceptedCategory('analytics')) {
                this.analyticsService.enable();
            }
        };

        cc.run({
            guiOptions: {
                consentModal: { layout: 'box', position: 'bottom right', equalWeightButtons: true, flipButtons: false },
                preferencesModal: { layout: 'box', equalWeightButtons: true }
            },
            categories: {
                necessary: { readOnly: true },
                analytics: {}
            },
            language: {
                default: 'es',
                translations: {
                    es: this._getTranslations()
                }
            },
            onFirstConsent: handleConsent,
            onChange: handleConsent,
            onConsent: handleConsent
        });
    }

    /**
     * Retorna los textos legales para el banner.
     */
    _getTranslations() {
        return {
            consentModal: {
                title: `<img src="${this.logoUrl}" alt="Logo Narbo's" class="cc__logo-img"> <br> Respetamos tu privacidad`,
                description: this._getConsentModalHTML(),
                acceptAllBtn: 'Aceptar Todo',
                acceptNecessaryBtn: 'Rechazar',
                showPreferencesBtn: 'Configurar'
            },
            preferencesModal: {
                title: 'Centro de Preferencias de Privacidad',
                acceptAllBtn: 'Aceptar Todo',
                acceptNecessaryBtn: 'Rechazar todo',
                savePreferencesBtn: 'Guardar configuración',
                closeIconLabel: 'Cerrar',
                sections: [
                    { title: 'Uso de Cookies', description: 'Garantizamos el funcionamiento básico y medimos el uso de la web.' },
                    { title: 'Cookies Necesarias', description: 'Esenciales para el sitio.', linkedCategory: 'necessary' },
                    { title: 'Análisis', description: 'Nos ayudan a mejorar.', linkedCategory: 'analytics' }
                ]
            }
        };
    }

    /**
     * Genera el bloque de HTML para los controles del banner inicial.
     */
    _getConsentModalHTML() {
        return `
            <p class="cc__text">Narbos Salón utiliza cookies para mejorar tu experiencia. Elige qué cookies permites:</p>
            <div class="cc__custom-categories">
                <div class="cc__custom-category">
                    <input type="checkbox" checked disabled id="cat-necessary">
                    <label for="cat-necessary">Necesarias</label>
                </div>
                <div class="cc__custom-category">
                    <input type="checkbox" checked id="cat-analytics" onchange="window.CookieConsent.setCategory('analytics', this.checked)">
                    <label for="cat-analytics">Estadísticas</label>
                </div>
            </div>
            <p class="cc__subtext">Consulta nuestra <a href="${resolveRoute('legal/cookies')}" class="cc__link">Política de Cookies</a>.</p>
        `;
    }

    /**
     * Aplica el diseño Premium Glassmorphism con colores de marca.
     */
    _applyCustomStyles() {
        const style = document.createElement('style');
        style.innerHTML = `
            #cc-main {
                --cc-bg: rgba(255, 255, 255, 0.65);
                --cc-primary-color: #364041;
                --cc-secondary-color: #6B755A;
                --cc-btn-primary-bg: #6B755A;
                --cc-btn-primary-hover-bg: #555d48;
                --cc-btn-primary-color: #ffffff;
                --cc-btn-secondary-bg: #6B755A;
                --cc-btn-secondary-hover-bg: #555d48;
                --cc-btn-secondary-color: #ffffff;
                --cc-btn-secondary-border-color: transparent;
                --cc-font-family: 'Montserrat', sans-serif;
                --cc-modal-border-radius: 2rem;
                --cc-btn-border-radius: 50px;
            }
            .cc__logo-img { height: 40px; width: auto; margin-bottom: 1rem; display: block; }
            .cc__text { margin-bottom: 1.5rem; font-size: 0.9rem; line-height: 1.5; }
            .cc__subtext { margin-top: 1.5rem; font-size: 0.8rem; }
            .cc__link { color: #6B755A !important; font-weight: bold; text-decoration: underline; transition: opacity 0.2s; }
            .cc__link:hover { opacity: 0.8; }

            .cc__custom-categories {
                display: flex; flex-direction: column; gap: 0.75rem;
                background: rgba(107, 117, 90, 0.05); padding: 1.25rem;
                border-radius: 1.5rem; border: 1px solid rgba(107, 117, 90, 0.1);
            }
            .cc__custom-category { display: flex; align-items: center; gap: 0.75rem; font-weight: 600; font-size: 0.85rem; color: #364041; }
            .cc__custom-category input[type="checkbox"] {
                appearance: none; width: 34px; height: 20px; background: #ddd; border-radius: 20px; position: relative; cursor: pointer; transition: background 0.3s;
            }
            .cc__custom-category input[type="checkbox"]:checked { background: #6B755A; }
            .cc__custom-category input[type="checkbox"]::before {
                content: ""; position: absolute; width: 14px; height: 14px; background: white; border-radius: 50%; top: 3px; left: 3px; transition: transform 0.3s;
            }
            .cc__custom-category input[type="checkbox"]:checked::before { transform: translateX(14px); }
            .cc__custom-category input[type="checkbox"]:disabled { opacity: 0.5; cursor: not-allowed; }

            #cc-main .cm {
                backdrop-filter: blur(25px) saturate(180%); -webkit-backdrop-filter: blur(25px) saturate(180%);
                border: 1px solid rgba(255, 255, 255, 0.4); box-shadow: 0 20px 50px rgba(0,0,0,0.1); max-width: 320px !important;
            }
            #cc-main .cm__title { font-family: 'Playfair Display', serif !important; font-size: 1.4rem !important; color: #364041 !important; line-height: 1.2; }
            #cc-main .cm__btn { font-weight: 700 !important; letter-spacing: 0.5px !important; }
            #cc-main .cm__btn[data-role="show_preferences"] {
                background: transparent !important; color: #6B755A !important; border: 1px solid #6B755A !important; margin-top: 0.5rem !important;
            }
            #cc-main .cm__btn[data-role="show_preferences"]:hover { background: rgba(107, 117, 90, 0.1) !important; }
        `;
        document.head.appendChild(style);
    }
}

export { CookieConsentService };
