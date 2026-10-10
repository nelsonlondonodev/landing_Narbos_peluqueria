import { TIME_ZONE } from '../data/place-config.js';

const DAY_INDEX = {
    domingo: 0, lunes: 1, martes: 2, 'miércoles': 3, jueves: 4, viernes: 5, 'sábado': 6
};
const MONTHS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
const DAY_MS = 24 * 60 * 60 * 1000;

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
    const [year, month, dayOfMonth] = new Intl.DateTimeFormat('en-CA', { timeZone: TIME_ZONE })
        .format(now).split('-').map(Number);
    const todayUtc = Date.UTC(year, month - 1, dayOfMonth);
    const todayDow = new Date(todayUtc).getUTCDay();

    return weekdayText.map(text => {
        const separator = text.indexOf(':');
        const day = text.slice(0, separator).trim();
        const time = text.slice(separator + 1).trim();
        const dow = DAY_INDEX[day.toLowerCase()];

        let special = false;
        let dateLabel = null;
        if (dow !== undefined && specialDates.length) {
            const date = new Date(todayUtc + ((dow - todayDow + 7) % 7) * DAY_MS);
            if (specialDates.includes(date.toISOString().slice(0, 10))) {
                special = true;
                dateLabel = `${date.getUTCDate()} ${MONTHS[date.getUTCMonth()]}`;
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
 * @param {ReturnType<typeof buildHoursRows>} rows
 * @returns {string}
 */
export function hoursListHTML(rows) {
    return rows.map(row => {
        const colorClass = row.special
            ? 'text-brand-medium'
            : (row.closed ? (row.isSunday ? 'opacity-60' : 'text-red-400') : '');
        const day = row.dateLabel ? `${row.day} ${row.dateLabel}` : row.day;
        const badge = row.special ? SPECIAL_BADGE_HTML : '';
        return `<p>${day}${badge}: <span class="font-bold ${colorClass}">${row.time}</span></p>`;
    }).join('');
}
