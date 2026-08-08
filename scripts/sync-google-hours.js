import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PLACE_ID } from '../js/data/place-config.js';
import { loadEnv } from './load-env.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

loadEnv();

// CONFIGURACIÓN DE NARBO'S SALÓN SPA
const OUTPUT_FILE = path.join(__dirname, '../js/data/business-hours.js');

/**
 * Script de Sincronización de Horarios (Solución Ganadora)
 * Obtiene los horarios reales de Google Business Profile (Places API).
 * Si falla o no hay API Key, aplica un fallback estático para garantizar el build.
 */
async function syncHours() {
    console.log('🚀 Sincronizando horarios con Google Business Profile...');

    // 1. Horario Fallback / Predeterminado (para evitar fallas de compilación)
    const fallbackHours = {
        lastSync: new Date().toISOString(),
        source: 'Static Fallback (Local)',
        weekdayText: [], // Vacío para forzar el dibujo de schedule tradicional
        // Periodos recurrentes (day: 0 = domingo). Espejo del schedule de abajo.
        periods: [1, 2, 3, 4, 5, 6].map(day => ({
            open: { day, hour: 7, minute: 0 },
            close: { day, hour: 20, minute: 0 }
        })),
        schedule: [
            { day: 'Lunes', opens: '7:00 AM', closes: '8:00 PM', closed: false },
            { day: 'Martes', opens: '7:00 AM', closes: '8:00 PM', closed: false },
            { day: 'Miércoles', opens: '7:00 AM', closes: '8:00 PM', closed: false },
            { day: 'Jueves', opens: '7:00 AM', closes: '8:00 PM', closed: false },
            { day: 'Viernes', opens: '7:00 AM', closes: '8:00 PM', closed: false },
            { day: 'Sábado', opens: '7:00 AM', closes: '8:00 PM', closed: false },
            { day: 'Domingo', opens: 'Cerrado', closes: 'Cerrado', closed: true },
            { day: 'Festivos', opens: '9:00 AM', closes: '6:00 PM', closed: false }
        ]
    };

    let hoursData = { ...fallbackHours };
    // Clave BUILD: este script corre en Node (sin referrer), no sirve la clave web.
    const apiKey = process.env.GOOGLE_MAPS_API_KEY_BUILD;

    if (apiKey) {
        try {
            console.log('📡 Realizando consulta HTTP a Google Places API...');
            const url = `https://places.googleapis.com/v1/places/${PLACE_ID}?languageCode=es&fields=regularOpeningHours&key=${apiKey}`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Google API respondió con código ${response.status}`);
            }

            const data = await response.json();

            // Solo horario regular: este archivo es estático y currentOpeningHours
            // caduca al terminar la semana del build. Los festivos y cierres
            // excepcionales los resuelve GoogleMapsService en vivo desde el cliente.
            const hours = data.regularOpeningHours || {};

            if (hours.weekdayDescriptions && hours.weekdayDescriptions.length > 0) {
                hoursData = {
                    lastSync: new Date().toISOString(),
                    source: 'Google Places API (Sincronizado)',
                    weekdayText: hours.weekdayDescriptions,
                    periods: hours.periods || fallbackHours.periods,
                    schedule: fallbackHours.schedule // Mantenemos schedule para compatibilidad de fallback
                };
                console.log('✅ Datos de horarios obtenidos de Google exitosamente.');
            } else {
                console.warn('⚠️ La API de Google no retornó weekdayDescriptions. Usando fallback.');
            }
        } catch (error) {
            console.error('❌ Error al consultar la API de Google, aplicando fallback seguro:', error.message);
        }
    } else {
        console.log('ℹ️ No se detectó GOOGLE_MAPS_API_KEY_BUILD en el entorno. Usando fallback estático.');
    }

    try {
        const fileContent = `/**
 * AUTO-GENERATED FILE - DO NOT EDIT MANUALLY
 * Última sincronización con Google Business Profile: ${hoursData.lastSync}
 */
const businessHours = ${JSON.stringify(hoursData, null, 4)};

export default businessHours;
`;

        fs.writeFileSync(OUTPUT_FILE, fileContent, 'utf8');
        console.log('💾 Archivo js/data/business-hours.js escrito correctamente.');
    } catch (writeError) {
        console.error('❌ Error al escribir el archivo de horarios:', writeError.message);
    }
}

syncHours();
