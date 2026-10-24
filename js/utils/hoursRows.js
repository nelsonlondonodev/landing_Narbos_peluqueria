import { TIME_ZONE } from '../data/place-config.js';
import { momentoEnZona, diaDeLaSemana, sumarDias } from './estadoNegocio.js';

const DAY_INDEX = {
    domingo: 0, lunes: 1, martes: 2, 'miércoles': 3, jueves: 4, viernes: 5, 'sábado': 6
};
const MONTHS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

/**
 * Convierte el `weekdayText` de Google en filas listas para pintar.
 *
 * Los días con horario especial se marcan solo cuando Google los declara en
 * `specialDays`, caigan en el día de la semana que caigan. No se etiquetan como
 * festivo: la ficha no distingue un festivo de una jornada reducida (24 o 31 de
 * diciembre), así que «Horario especial» es lo único que siempre es cierto.
 *
 * `currentOpeningHours` cubre los siete días que empiezan hoy, de modo que cada
 * día de la semana corresponde a su próxima fecha, contando hoy, en Bogotá.
 *
 * @param {string[]} weekdayText - p. ej. «lunes: 9:00–18:00»
 * @param {string[]} [specialDates] - Fechas `YYYY-MM-DD` con horario especial
 * @param {Date} [now]
 * @returns {{day: string, time: string, closed: boolean, isSunday: boolean, special: boolean, dateLabel: string|null}[]}
 */
export function buildHoursRows(weekdayText, specialDates = [], now = new Date()) {
    const today = momentoEnZona(TIME_ZONE, now);
    const todayDow = diaDeLaSemana(today);

    return weekdayText.map(text => {
        const separator = text.indexOf(':');
        const day = text.slice(0, separator).trim();
        const time = text.slice(separator + 1).trim();
        const dow = DAY_INDEX[day.toLowerCase()];

        let special = false;
        let dateLabel = null;
        if (dow !== undefined && specialDates.length) {
            const date = sumarDias(today, (dow - todayDow + 7) % 7);
            const iso = `${date.year}-${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')}`;
            if (specialDates.includes(iso)) {
                special = true;
                dateLabel = `${date.day} ${MONTHS[date.month - 1]}`;
            }
        }

        return { day, time, closed: /cerrado/i.test(time), isSunday: dow === 0, special, dateLabel };
    });
}

/** Etiqueta en el tono dorado de la marca (brand-medium) para los días con horario especial. */
export const SPECIAL_BADGE_HTML =
    '<span class="ml-1 inline-block rounded-full bg-brand-medium/20 px-1.5 py-px align-middle text-[9px] font-semibold uppercase tracking-wide text-brand-medium">Horario especial</span>';

/**
 * Lista día a día para el bloque de horarios del footer. Los colores se heredan
 * del contenedor en lugar de fijarse, para que siga siendo legible si se
 * reutiliza fuera del footer.
 *
 * Va en rejilla de dos columnas (día a la derecha, hora a la izquierda) para que
 * los «:» queden alineados: centrar cada línea por separado dejaba un zigzag,
 * porque «lunes 12 oct» con su etiqueta mide el doble que «domingo».
 * @param {ReturnType<typeof buildHoursRows>} rows
 * @returns {string}
 */
export function hoursListHTML(rows) {
    const cells = rows.map(row => {
        const colorClass = row.special
            ? 'text-brand-medium'
            : (row.closed ? (row.isSunday ? 'opacity-60' : 'text-red-400') : '');
        const day = row.dateLabel ? `${row.day} ${row.dateLabel}` : row.day;
        const badge = row.special ? SPECIAL_BADGE_HTML : '';
        return `<span class="text-right">${day}${badge}:</span><span class="font-bold text-left ${colorClass}">${row.time}</span>`;
    }).join('');
    return `<div class="grid grid-cols-[auto_auto] gap-x-1.5 gap-y-1">${cells}</div>`;
}
