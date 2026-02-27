/**
 * AnalyticsService - Handles Google Analytics deferred loading.
 * Optimized for performance (TBT, LCP) and maintainability.
 */
class AnalyticsService {
    constructor(measurementId) {
        this.measurementId = measurementId;
        this.gaLoaded = false;

        // Initialize dataLayer and gtag shim immediately to avoid "reference errors"
        // if other scripts call gtag() before the GA library is loaded.
        if (typeof window !== 'undefined') {
            window.dataLayer = window.dataLayer || [];
            window.gtag = window.gtag || function() {
                window.dataLayer.push(arguments);
            };
        }
    }

    /**
     * Initializes the GA loading with deferral strategies.
     */
    init() {
        if (this.gaLoaded) return;

        // 1. Idle Load (Low priority)
        if (window.requestIdleCallback) {
            requestIdleCallback(() => this.load(), { timeout: 4000 });
        } else {
            setTimeout(() => this.load(), 4000);
        }

        // 2. Interaction Load (Priority on user intent)
        this.addInteractionListeners();
    }

    /**
     * Injects the GA scripts into the document.
     */
    load() {
        if (this.gaLoaded) return;
        this.gaLoaded = true;

        // Inject script tag
        const script = document.createElement('script');
        script.src = `https://www.googletagmanager.com/gtag/js?id=${this.measurementId}`;
        script.async = true;
        document.head.appendChild(script);

        // Initialize GA tracking

        gtag('js', new Date());
        gtag('config', this.measurementId);
        
        // console.log(`[AnalyticsService] GA Loaded (${this.measurementId})`);
    }

    /**
     * Attaches event listeners for first interaction.
     */
    addInteractionListeners() {
        const events = ['scroll', 'touchstart', 'mousemove', 'click'];
        const handler = () => {
            this.load();
            events.forEach(evt => document.removeEventListener(evt, handler));
        };

        events.forEach(evt => 
            document.addEventListener(evt, handler, { once: true, passive: true })
        );
    }
}

export { AnalyticsService };
