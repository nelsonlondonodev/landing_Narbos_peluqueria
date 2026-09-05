import { resolveRoute, resolveAsset } from '../config.js';

/**
 * Recursos de la librería, autohospedados en `vendor/` (ver su README).
 * La versión viaja en el nombre del fichero: `versionAssets` no entra en
 * subdirectorios, así que el nombre es su propio cache busting.
 *
 * Las rutas se escriben enteras a propósito, sin interpolar la versión: esbuild
 * minifica la constante a una letra y deja el template sin resolver, y entonces
 * `checkVendoredConsent` ya no puede comprobar que el fichero que el bundle pide
 * existe en dist —que es justo lo que impide que el banner desaparezca sin avisar—.
 */
const CC_RESOURCES = {
    JS_PATH: 'vendor/cookieconsent/cookieconsent-3.0.1.umd.js',
    CSS_PATH: 'vendor/cookieconsent/cookieconsent-3.0.1.css'
};

/**
 * Zonas horarias bajo regulación estricta (UE/EEA/CH/GB) que no empiezan por
 * `Europe/`. Son territorios a los que el RGPD sí alcanza: las Canarias son España,
 * Madeira y Azores son Portugal, los departamentos de ultramar son Francia, y
 * Chipre e Islandia declaran su zona fuera de `Europe/`.
 */
const REGULATED_TIMEZONES = new Set([
    'Atlantic/Canary', 'Atlantic/Madeira', 'Atlantic/Azores', 'Atlantic/Reykjavik',
    'Asia/Nicosia', 'Asia/Famagusta',
    'America/Guadeloupe', 'America/Martinique', 'America/Cayenne',
    'Indian/Reunion', 'Indian/Mayotte'
]);

/**
 * CookieConsentService - Gestiona el banner de cookies y el cumplimiento legal (GDPR).
 */
class CookieConsentService {
    constructor(analyticsService, appRoot = '') {
        this.analyticsService = analyticsService;
        this.appRoot = appRoot;
        this.isInitialized = false;
        this.logoUrl = resolveAsset('images/brand/logo_narbos.webp', appRoot);
    }

    /**
     * Punto de entrada principal. Determina si se requiere el banner según la ubicación.
     */
    async init() {
        if (this.isInitialized) return;

        this.isInitialized = true;

        // Con decisión guardada no hace falta mirar la zona: basta con levantar la
        // librería para que respete lo que el visitante ya eligió.
        if (localStorage.getItem('cc_cookie')) {
            await this._bootSeguro();
            return;
        }

        if (!this._isRegulatedZone()) {
            this._activateAnalyticsWithoutBanner();
            return;
        }

        this.analyticsService.setConsentRequired(true);
        await this._bootSeguro();
    }

    /**
     * Levanta el banner sin que un fallo de carga tumbe la inicialización.
     *
     * Ante el error no se activa nada: antes caía en una «política por defecto» que
     * encendía las analíticas precisamente para quien no había podido decir que sí.
     */
    async _bootSeguro() {
        try {
            await this._boot();
        } catch (error) {
            console.error('[CookieService] No se pudo cargar el banner:', error.message);
        }
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
     * Detección por zona horaria, resuelta en el navegador.
     *
     * Antes se consultaba `freeipapi.com` cuando la zona no era `Europe/*`, lo que
     * mandaba la IP del visitante —dato personal— a un tercero que no figura en la
     * política de cookies, y además antes de que hubiera consentido nada: justo lo
     * que el banner existe para pedir. La zona horaria da la misma respuesta sin
     * salir del dispositivo.
     *
     * El coste es que una zona mal configurada o una VPN despistan a la detección.
     * Se acepta porque falla hacia el lado seguro en el caso que importa: `Europe/*`
     * cubre a los visitantes europeos reales, y un falso positivo solo enseña un
     * banner de más.
     */
    _isRegulatedZone() {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
        return tz.startsWith('Europe/') || REGULATED_TIMEZONES.has(tz);
    }

    /**
     * Inyecta la librería del banner desde `vendor/`, sin salir del dominio.
     */
    _loadResources() {
        return new Promise((resolve, reject) => {
            if (window.CookieConsent) return resolve();

            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = resolveAsset(CC_RESOURCES.CSS_PATH, this.appRoot);
            document.head.appendChild(link);

            const script = document.createElement('script');
            script.src = resolveAsset(CC_RESOURCES.JS_PATH, this.appRoot);
            script.onload = resolve;
            // Sin esto, un 404 deja la promesa pendiente para siempre y el banner
            // no aparece nunca, en silencio. Es el fallo que peor se detecta.
            script.onerror = () => reject(new Error(`No se pudo cargar ${script.src}`));
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
            <p class="cc__subtext">Consulta nuestra <a href="${resolveRoute('legal/cookies', this.appRoot)}" class="cc__link">Política de Cookies</a>.</p>
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
