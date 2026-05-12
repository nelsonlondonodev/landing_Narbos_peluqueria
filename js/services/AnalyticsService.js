/**
 * AnalyticsService - Handles Google Analytics deferred loading.
 * Optimized for performance (TBT, LCP) and maintainability.
 */
class AnalyticsService {
    constructor(measurementId) {
        this.measurementId = measurementId;
        this.gaLoaded = false;
        this.consentRequired = false; // Por defecto asumimos que no, hasta que se detecte zona regulada

        if (typeof window !== 'undefined') {
            window.dataLayer = window.dataLayer || [];
            window.gtag = window.gtag || function() {
                window.dataLayer.push(arguments);
            };
        }
    }

    /**
     * Define si se requiere consentimiento previo antes de cargar.
     */
    setConsentRequired(required) {
        this.consentRequired = required;
    }

    /**
     * Inicializa el servicio. Si se requiere consentimiento, espera a que se llame a enable().
     */
    init() {
        if (this.gaLoaded) return;

        // Si no se requiere consentimiento (fuera de la UE), cargamos normalmente con estrategia idle
        if (!this.consentRequired) {
            this._scheduleLoad();
            this.addInteractionListeners();
        }
    }

    /**
     * Activa manualmente la carga de GA (llamado desde el banner de cookies).
     */
    enable() {
        if (this.gaLoaded) return;
        this._loadNow();
    }

    _scheduleLoad() {
        if (window.requestIdleCallback) {
            requestIdleCallback(() => this._loadNow(), { timeout: 4000 });
        } else {
            setTimeout(() => this._loadNow(), 4000);
        }
    }

    _loadNow() {
        if (this.gaLoaded) return;
        this.gaLoaded = true;

        const script = document.createElement('script');
        script.src = `https://www.googletagmanager.com/gtag/js?id=${this.measurementId}`;
        script.async = true;
        document.head.appendChild(script);

        gtag('js', new Date());
        gtag('config', this.measurementId);
    }

    addInteractionListeners() {
        const events = ['scroll', 'touchstart', 'mousemove', 'click'];
        const handler = () => {
            if (!this.consentRequired) {
                this._loadNow();
            }
            events.forEach(evt => document.removeEventListener(evt, handler));
        };

        events.forEach(evt => 
            document.addEventListener(evt, handler, { once: true, passive: true })
        );
    }
}

export { AnalyticsService };
