/**
 * GoogleMapsService.js
 * Servicio de conexión con Google Places API para sincronización de horarios en tiempo real.
 * Implementa lógica de caché y fallback para optimizar rendimiento y SEO.
 */

import { PLACE_ID, TIME_ZONE } from '../data/place-config.js';

export class GoogleMapsService {
    constructor(apiKey = null) {
        this.apiKey = apiKey;
        this.cacheDuration = 12 * 60 * 60 * 1000; // 12 horas en milisegundos
    }

    /**
     * La clave del caché lleva la fecha local de Bogotá: así los periodos de
     * `currentOpeningHours` (que vienen fechados) nunca sobreviven al cambio de día
     * y un festivo no se arrastra a la jornada siguiente.
     * @returns {string}
     */
    get cacheKey() {
        const today = new Intl.DateTimeFormat('en-CA', { timeZone: TIME_ZONE }).format(new Date());
        return `narbos_hours_cache_${today}`;
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
                // Fallback silencioso en producción para mantener la consola limpia de cara a Lighthouse
                if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
                    console.warn('⚠️ Fallo consulta a Google, usando fallback estático:', error.message);
                }
                return null;
            }
        }
        return null;
    }

    /**
     * Consulta real a la API de Google Places (New API)
     */
    async _fetchFromGoogle() {
        const fields = 'currentOpeningHours,regularOpeningHours';
        const url = `https://places.googleapis.com/v1/places/${PLACE_ID}?languageCode=es&fields=${fields}&key=${this.apiKey}`;

        const response = await fetch(url);
        if (!response.ok) throw new Error(`Google respondió ${response.status}`);

        const data = await response.json();
        const processedData = this._processGoogleData(data);

        this._setCache(processedData);
        return processedData;
    }

    /**
     * Procesa los datos crudos de Google al formato de Narbo's.
     *
     * `currentOpeningHours` describe la semana en curso y trae cada periodo fechado,
     * por lo que ya refleja los horarios especiales de festivos configurados en la
     * ficha de Google. `regularOpeningHours` queda como red de seguridad.
     */
    _processGoogleData(data) {
        const current = data.currentOpeningHours || {};
        const regular = data.regularOpeningHours || {};

        return {
            lastSync: new Date().toISOString(),
            source: 'Google Live API',
            openNow: current.openNow ?? null,
            periods: current.periods || regular.periods || [],
            regularPeriods: regular.periods || [],
            weekdayText: current.weekdayDescriptions || regular.weekdayDescriptions || []
        };
    }

    _getCache() {
        try {
            const cache = localStorage.getItem(this.cacheKey);
            if (!cache) return null;

            const { data, timestamp } = JSON.parse(cache);
            if (Date.now() - timestamp > this.cacheDuration) {
                localStorage.removeItem(this.cacheKey);
                return null;
            }
            return data;
        } catch (error) {
            return null;
        }
    }

    _setCache(data) {
        try {
            localStorage.setItem(this.cacheKey, JSON.stringify({
                data,
                timestamp: Date.now()
            }));
        } catch (error) {
            // Modo privado o cuota llena: seguimos sin caché.
        }
    }
}
