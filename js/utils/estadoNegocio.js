/**
 * Estado de apertura del negocio y cuándo vuelve a abrir, a partir de los horarios de
 * Google. Es puro: recibe la hora y los periodos y no toca el DOM ni el reloj, así que
 * se prueba con cualquier fecha (`tests/estadoNegocio.test.js`).
 */

/**
 * @typedef {Object} PuntoHorario
 * @property {number} [day] - Día de la semana, 0 = domingo (periodos semanales).
 * @property {number} [hour]
 * @property {number} [minute]
 * @property {{ year: number, month: number, day: number }} [date] - Solo en los periodos
 *   fechados de `currentOpeningHours`, que ya traen festivos y horarios especiales.
 */

/**
 * @typedef {Object} Periodo
 * @property {PuntoHorario} open
 * @property {PuntoHorario} [close]
 */

/**
 * @typedef {Object} Fecha
 * @property {number} year
 * @property {number} month - 1-12.
 * @property {number} day
 */

/**
 * @typedef {Fecha & { hour: number, minute: number }} Momento
 */

/**
 * @typedef {Object} EstadoNegocio
 * @property {boolean} abierto
 * @property {string} etiqueta - Texto del badge, en mayúsculas.
 * @property {string|null} nota - Aviso de horario especial hoy, para el desplegable.
 */

const DIAS = ['DOMINGO', 'LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES', 'SÁBADO'];

// Con una semana basta: todo negocio que abra alguna vez abre dentro de ella.
const DIAS_DE_BUSQUEDA = 7;

/**
 * La hora actual en una zona horaria, por partes. Se calcula en la zona del negocio y
 * no en la del visitante: quien mira desde España ve el horario de Chía.
 * @param {string} timeZone
 * @param {Date} [fecha]
 * @returns {Momento}
 */
export function momentoEnZona(timeZone, fecha = new Date()) {
    const partes = new Intl.DateTimeFormat('en-US', {
        timeZone, year: 'numeric', month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: 'numeric', hour12: false
    }).formatToParts(fecha);
    const parte = (tipo) => parseInt(partes.find(p => p.type === tipo).value, 10);
    return {
        year: parte('year'),
        month: parte('month'),
        day: parte('day'),
        // Algunos motores devuelven «24» para la medianoche.
        hour: parte('hour') % 24,
        minute: parte('minute')
    };
}

/**
 * Hora legible a la colombiana: «7:00 a. m.», «12:30 p. m.».
 * @param {PuntoHorario} [punto]
 * @returns {string}
 */
export function formatearHora(punto) {
    const hora = punto?.hour ?? 0;
    const minutos = String(punto?.minute ?? 0).padStart(2, '0');
    const sufijo = hora >= 12 ? 'p. m.' : 'a. m.';
    return `${hora % 12 === 0 ? 12 : hora % 12}:${minutos} ${sufijo}`;
}

/**
 * @param {Fecha} fecha
 * @returns {number} 0 = domingo.
 */
export function diaDeLaSemana({ year, month, day }) {
    return new Date(Date.UTC(year, month - 1, day)).getUTCDay();
}

/**
 * @param {Fecha} fecha
 * @param {number} dias
 * @returns {Fecha}
 */
export function sumarDias({ year, month, day }, dias) {
    const d = new Date(Date.UTC(year, month - 1, day + dias));
    return { year: d.getUTCFullYear(), month: d.getUTCMonth() + 1, day: d.getUTCDate() };
}

/** @param {Fecha} fecha */
function claveFecha({ year, month, day }) {
    return year * 10000 + month * 100 + day;
}

/** @param {PuntoHorario} [punto] */
function enMinutos(punto) {
    return (punto?.hour ?? 0) * 60 + (punto?.minute ?? 0);
}

/**
 * Tramos de un día concreto, de hoy en adelante. Los periodos fechados mandan desde hoy
 * hasta el último día que cubren, y que un día no aparezca significa cerrado (p. ej. un
 * festivo). La ventana empieza hoy y no en el primer periodo: el día del festivo Google
 * no trae ninguno para hoy, y medirla desde el primero lo dejaba fuera y daba «abierto».
 * Más allá de la ventana, o si no hay fechados, se usa el horario semanal.
 * @param {Fecha} fecha - Hoy o un día posterior.
 * @param {Periodo[]} periodos
 * @param {Periodo[]} regulares
 * @returns {Periodo[]}
 */
function tramosDelDia(fecha, periodos, regulares) {
    const fechados = periodos.filter(p => p.open?.date);
    const clave = claveFecha(fecha);
    if (fechados.length > 0 && clave <= Math.max(...fechados.map(p => claveFecha(p.open.date)))) {
        return fechados.filter(p => claveFecha(p.open.date) === clave);
    }
    const semanales = periodos.some(p => p.open?.date) ? regulares : periodos;
    return semanales.filter(p => p.open?.day === diaDeLaSemana(fecha));
}

/** @param {Periodo[]} tramos */
function huella(tramos) {
    return tramos.map(p => `${enMinutos(p.open)}-${enMinutos(p.close)}`).sort().join('|');
}

/** @param {Periodo} tramo */
function cierreEnMinutos(tramo) {
    const abre = enMinutos(tramo.open);
    const cierra = enMinutos(tramo.close);
    // Un cierre a la misma hora o antes es pasada la medianoche.
    return cierra <= abre ? cierra + 24 * 60 : cierra;
}

/**
 * @param {Object} datos
 * @param {Periodo[]} datos.periodos - Fechados (`currentOpeningHours`) o semanales.
 * @param {Periodo[]} [datos.regulares] - Horario semanal habitual: sirve para detectar
 *   festivos y horarios especiales, y para los días fuera de la ventana fechada.
 * @param {Momento} datos.ahora - Hora del negocio (ver `momentoEnZona`).
 * @returns {EstadoNegocio}
 */
export function calcularEstadoNegocio({ periodos, regulares = [], ahora }) {
    const hoy = { year: ahora.year, month: ahora.month, day: ahora.day };
    const minutoActual = ahora.hour * 60 + ahora.minute;
    const tramosHoy = tramosDelDia(hoy, periodos, regulares);

    // Distinto del habitual de ese día de la semana: festivo o jornada especial.
    const regularesHoy = (regulares.length ? regulares : periodos)
        .filter(p => !p.open?.date && p.open?.day === diaDeLaSemana(hoy));
    const especialHoy = regularesHoy.length > 0 && huella(tramosHoy) !== huella(regularesHoy);

    const tramoAbierto = tramosHoy.find(p =>
        minutoActual >= enMinutos(p.open) && minutoActual < cierreEnMinutos(p));

    if (tramoAbierto) {
        return {
            abierto: true,
            etiqueta: `ABIERTO · HASTA LAS ${formatearHora(tramoAbierto.close).toUpperCase()}`,
            nota: especialHoy
                ? `Hoy: horario especial ${formatearHora(tramoAbierto.open)} – ${formatearHora(tramoAbierto.close)}`
                : null
        };
    }

    const prefijo = especialHoy && tramosHoy.length === 0 ? 'FESTIVO · ' : '';

    for (let dias = 0; dias <= DIAS_DE_BUSQUEDA; dias++) {
        const fecha = sumarDias(hoy, dias);
        const siguiente = tramosDelDia(fecha, periodos, regulares)
            .filter(p => dias > 0 || enMinutos(p.open) > minutoActual)
            .sort((a, b) => enMinutos(a.open) - enMinutos(b.open))[0];
        if (!siguiente) continue;

        const dia = DIAS[diaDeLaSemana(fecha)];
        const cuando = dias === 0 ? 'HOY' : dias === 1 ? `MAÑANA ${dia}` : `EL ${dia}`;
        return {
            abierto: false,
            etiqueta: `${prefijo}ABRE ${cuando} A LAS ${formatearHora(siguiente.open).toUpperCase()}`,
            nota: null
        };
    }

    return { abierto: false, etiqueta: `${prefijo}CERRADO AHORA`, nota: null };
}
