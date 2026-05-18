/**
 * GoogleMapsService.js
 * Servicio de conexión con Google Places API para sincronización de horarios en tiempo real.
 * Implementa lógica de caché y fallback para optimizar rendimiento y SEO.
 */

const PLACE_ID = 'ChIJtwq7egB5QI4RuteHxCidG7g';

export class GoogleMapsService {
    constructor(apiKey = null) {
        this.apiKey = apiKey;
        this.cacheKey = 'narbos_hours_cache';
        this.cacheDuration = 12 * 60 * 60 * 1000; // 12 horas en milisegundos
    }

    /**
     * Obtiene los horarios actuales desde Google o desde el caché local.
     */
    async getBusinessHours() {
        // 1. Intentar obtener del caché de usuario primero
        const cached = this._getCache();
        if (cached) return cached;

        // 2. Si no hay caché o expiró, y tenemos API Key, consultamos a Google
        if (this.apiKey) {
            try {
                return await this._fetchFromGoogle();
            } catch (error) {
                console.error('⚠️ Fallo consulta a Google, usando fallback estático:', error);
                return null;
            }
        }

        return null;
    }

    /**
     * Consulta real a la API de Google Places (New API)
     */
    async _fetchFromGoogle() {
        const url = `https://places.googleapis.com/v1/places/${PLACE_ID}?fields=regularOpeningHours,currentOpeningHours&key=${this.apiKey}`;
        
        const response = await fetch(url);
        if (!response.ok) throw new Error('Error en la respuesta de Google');

        const data = await response.json();
        const processedData = this._processGoogleData(data);

        this._setCache(processedData);
        return processedData;
    }

    /**
     * Procesa los datos crudos de Google al formato de Narbo's
     */
    _processGoogleData(data) {
        const hours = data.regularOpeningHours || {};
        return {
            lastSync: new Date().toISOString(),
            source: 'Google Live API',
            schedule: hours.periods || [], // Aquí mapearíamos al formato exacto de tu UI
            weekdayText: hours.weekdayDescriptions || []
        };
    }

    _getCache() {
        const cache = localStorage.getItem(this.cacheKey);
        if (!cache) return null;

        const { data, timestamp } = JSON.parse(cache);
        if (Date.now() - timestamp > this.cacheDuration) {
            localStorage.removeItem(this.cacheKey);
            return null;
        }
        return data;
    }

    _setCache(data) {
        localStorage.setItem(this.cacheKey, JSON.stringify({
            data,
            timestamp: Date.now()
        }));
    }
}
