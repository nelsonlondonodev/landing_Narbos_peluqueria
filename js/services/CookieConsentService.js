import { siteConfig, resolveRoute } from '../config.js';

/**
 * CookieConsentService - Gestiona el banner de cookies y el cumplimiento legal (GDPR).
 * Utiliza Geo-Targeting para mostrar el banner solo en zonas reguladas.
 */
class CookieConsentService {
    constructor(analyticsService) {
        this.analyticsService = analyticsService;
        this.libraryUrl = 'https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@v3.0.1/dist/cookieconsent.umd.js';
        this.cssUrl = 'https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@v3.0.1/dist/cookieconsent.css';
        this.geoApiUrl = 'https://freeipapi.com/api/json';
        this.regulatedCountries = [
            'AT', 'BE', 'BG', 'CY', 'CZ', 'DE', 'DK', 'EE', 'ES', 'FI', 'FR', 'GR', 'HR', 'HU', 
            'IE', 'IT', 'LT', 'LU', 'LV', 'MT', 'NL', 'PL', 'PT', 'RO', 'SE', 'SI', 'SK', 'GB', 'CH', 'LI', 'NO'
        ];
    }

    /**
     * Inicializa el flujo de consentimiento.
     */
    async init() {
        // Si ya hay una decisión guardada, cargamos la librería para gestionar los scripts permitidos
        const consentData = localStorage.getItem('cc_cookie');
        if (consentData) {
            await this._loadLibrary();
            this._configureAndRun();
            return;
        }

        // Si no hay decisión, verificamos geolocalización
        try {
            const isRegulated = await this._isRegulatedZone();
            
            if (isRegulated) {
                this.analyticsService.setConsentRequired(true);
                await this._loadLibrary();
                this._configureAndRun();
            } else {
                // Usuario fuera de la UE: activamos analítica sin banner
                this.analyticsService.setConsentRequired(false);
                this.analyticsService.init();
            }
        } catch (error) {
            // En caso de fallo de red en la detección, pecamos de precavidos y no mostramos banner 
            // (asumiendo que la mayoría del tráfico es Colombia), pero permitimos GA.
            console.warn('[CookieService] Fallo en Geo-Targeting, aplicando política por defecto.');
            this.analyticsService.init();
        }
    }

    /**
     * Determina si el usuario está en una zona que requiere banner de cookies.
     */
    async _isRegulatedZone() {
        // Verificación rápida por zona horaria como primer filtro
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (tz.startsWith('Europe/')) return true;

        // Verificación precisa por IP
        const response = await fetch(this.geoApiUrl);
        const data = await response.json();
        return this.regulatedCountries.includes(data.countryCode);
    }

    /**
     * Inyecta la librería CookieConsent v3 de forma asíncrona.
     */
    _loadLibrary() {
        return new Promise((resolve) => {
            if (window.CookieConsent) return resolve();

            // Cargar CSS
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = this.cssUrl;
            document.head.appendChild(link);

            // Cargar JS
            const script = document.createElement('script');
            script.src = this.libraryUrl;
            script.onload = resolve;
            document.head.appendChild(script);
        });
    }

    /**
     * Configura la librería con los colores y textos de Narbo's.
     */
    _configureAndRun() {
        const cc = window.CookieConsent;

        cc.run({
            guiOptions: {
                consentModal: {
                    layout: 'box',
                    position: 'bottom right',
                    equalWeightButtons: true,
                    flipButtons: false
                },
                preferencesModal: {
                    layout: 'box',
                    equalWeightButtons: true,
                    flipButtons: false
                }
            },

            categories: {
                necessary: {
                    readOnly: true
                },
                analytics: {}
            },

            language: {
                default: 'es',
                translations: {
                    es: {
                        consentModal: {
                            title: 'Respetamos tu privacidad',
                            description: 'Narbos Salón utiliza cookies para mejorar tu experiencia de navegación y ofrecerte contenidos personalizados. Al continuar, aceptas nuestra <a href="' + resolveRoute('legal/cookies') + '" class="cc__link">Política de Cookies</a>.',
                            acceptAllBtn: 'Aceptar Todo',
                            acceptNecessaryBtn: 'Rechazar',
                            showPreferencesBtn: 'Configurar'
                        },
                        preferencesModal: {
                            title: 'Centro de Preferencias de Privacidad',
                            acceptAllBtn: 'Aceptar Todo',
                            acceptNecessaryBtn: 'Rechazar todo',
                            savePreferencesBtn: 'Guardar configuración',
                            closeIconLabel: 'Cerrar modal',
                            sections: [
                                {
                                    title: 'Uso de Cookies',
                                    description: 'Utilizamos cookies para asegurar el funcionamiento básico de la web y mejorar tu experiencia.'
                                },
                                {
                                    title: 'Cookies Estrictamente Necesarias',
                                    description: 'Estas cookies son esenciales para el funcionamiento de la web.',
                                    linkedCategory: 'necessary'
                                },
                                {
                                    title: 'Cookies de Rendimiento y Análisis',
                                    description: 'Nos permiten medir el tráfico y mejorar nuestros servicios.',
                                    linkedCategory: 'analytics'
                                }
                            ]
                        }
                    }
                }
            },

            onFirstConsent: ({ cookie }) => {
                if (cc.acceptedCategory('analytics')) {
                    this.analyticsService.enable();
                }
            },

            onChange: ({ cookie, changedCategories }) => {
                if (cc.acceptedCategory('analytics')) {
                    this.analyticsService.enable();
                }
            },

            onConsent: ({ cookie }) => {
                if (cc.acceptedCategory('analytics')) {
                    this.analyticsService.enable();
                }
            }
        });

        // Aplicar estilos personalizados (Verde Narbos)
        this._applyCustomStyles();
    }

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
                --cc-btn-secondary-bg: rgba(255, 255, 255, 0.4);
                --cc-btn-secondary-hover-bg: rgba(107, 117, 90, 0.1);
                --cc-btn-secondary-border-color: #6B755A;
                --cc-font-family: 'Montserrat', sans-serif;
                --cc-modal-border-radius: 2rem;
                --cc-btn-border-radius: 50px;
            }
            .cc__link {
                color: #6B755A !important;
                font-weight: bold;
                text-decoration: underline;
                transition: opacity 0.2s;
            }
            .cc__link:hover {
                opacity: 0.8;
            }
            #cc-main .cm {
                backdrop-filter: blur(20px) saturate(180%);
                -webkit-backdrop-filter: blur(20px) saturate(180%);
                border: 1px solid rgba(255, 255, 255, 0.4);
                box-shadow: 0 20px 40px rgba(0,0,0,0.08);
            }
            #cc-main .cm__title {
                font-family: 'Playfair Display', serif !important;
                font-size: 1.5rem !important;
                color: #364041 !important;
            }
            #cc-main .cm__btn {
                font-weight: 700 !important;
                letter-spacing: 0.5px !important;
                text-transform: none !important;
            }
        `;
        document.head.appendChild(style);
    }
}

export { CookieConsentService };
