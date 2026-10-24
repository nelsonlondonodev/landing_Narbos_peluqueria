import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calcularEstadoNegocio, formatearHora, momentoEnZona } from '../js/utils/estadoNegocio.js';

/** @typedef {import('../js/utils/estadoNegocio.js').Periodo} Periodo */

// Horario semanal de Narbo's: lunes a sábado de 7:00 a 20:00, domingo cerrado.
/** @type {Periodo[]} */
const semanal = [1, 2, 3, 4, 5, 6].map(day => ({
    open: { day, hour: 7, minute: 0 },
    close: { day, hour: 20, minute: 0 }
}));

/**
 * Periodos fechados como los de `currentOpeningHours`: una semana desde `inicio`.
 * @param {[number, number, number]} inicio - [año, mes, día]
 * @param {Record<string, {open: [number, number], close: [number, number]} | null>} [excepciones]
 *   Por fecha «AAAA-MM-DD»: null = cerrado, o el horario especial de ese día.
 */
function semanaFechada([year, month, day], excepciones = {}) {
    const periodos = [];
    for (let i = 0; i < 7; i++) {
        const d = new Date(Date.UTC(year, month - 1, day + i));
        const fecha = { year: d.getUTCFullYear(), month: d.getUTCMonth() + 1, day: d.getUTCDate() };
        const clave = `${fecha.year}-${String(fecha.month).padStart(2, '0')}-${String(fecha.day).padStart(2, '0')}`;
        const dow = d.getUTCDay();
        if (clave in excepciones) {
            const e = excepciones[clave];
            if (e) periodos.push({ open: { day: dow, hour: e.open[0], minute: e.open[1], date: fecha }, close: { day: dow, hour: e.close[0], minute: e.close[1], date: fecha } });
            continue;
        }
        if (dow === 0) continue;
        periodos.push({ open: { day: dow, hour: 7, minute: 0, date: fecha }, close: { day: dow, hour: 20, minute: 0, date: fecha } });
    }
    return periodos;
}

const momento = (year, month, day, hour, minute = 0) => ({ year, month, day, hour, minute });
// Octubre de 2026: el lunes es 26, el sábado 31 y el domingo 25.
const etiqueta = (ahora, periodos = semanal, regulares = semanal) =>
    calcularEstadoNegocio({ periodos, regulares, ahora }).etiqueta;

test('abierto: dice hasta qué hora', () => {
    const estado = calcularEstadoNegocio({ periodos: semanal, ahora: momento(2026, 10, 26, 10, 30) });
    assert.equal(estado.abierto, true);
    assert.equal(estado.etiqueta, 'ABIERTO · HASTA LAS 8:00 P. M.');
});

test('de madrugada, ya empezado el día: abre hoy', () => {
    assert.equal(etiqueta(momento(2026, 10, 27, 0, 30)), 'ABRE HOY A LAS 7:00 A. M.');
    assert.equal(etiqueta(momento(2026, 10, 27, 6, 59)), 'ABRE HOY A LAS 7:00 A. M.');
});

test('al cerrar entre semana: abre mañana, con el día', () => {
    assert.equal(etiqueta(momento(2026, 10, 26, 20, 0)), 'ABRE MAÑANA MARTES A LAS 7:00 A. M.');
    assert.equal(etiqueta(momento(2026, 10, 30, 23, 59)), 'ABRE MAÑANA SÁBADO A LAS 7:00 A. M.');
});

test('sábado por la noche: abre el lunes, no «mañana»', () => {
    assert.equal(etiqueta(momento(2026, 10, 31, 21, 0)), 'ABRE EL LUNES A LAS 7:00 A. M.');
});

test('domingo a cualquier hora: abre mañana lunes', () => {
    assert.equal(etiqueta(momento(2026, 10, 25, 0, 10)), 'ABRE MAÑANA LUNES A LAS 7:00 A. M.');
    assert.equal(etiqueta(momento(2026, 10, 25, 15, 0)), 'ABRE MAÑANA LUNES A LAS 7:00 A. M.');
});

test('lunes festivo cerrado: el sábado por la noche y el domingo anuncian el martes', () => {
    // El 2 de noviembre de 2026 (lunes) es festivo en Colombia.
    const periodos = semanaFechada([2026, 10, 31], { '2026-11-02': null });
    assert.equal(etiqueta(momento(2026, 10, 31, 21, 0), periodos), 'ABRE EL MARTES A LAS 7:00 A. M.');
    assert.equal(etiqueta(momento(2026, 11, 1, 12, 0), periodos), 'ABRE EL MARTES A LAS 7:00 A. M.');
});

test('el propio festivo: lo dice y anuncia mañana', () => {
    const periodos = semanaFechada([2026, 11, 2], { '2026-11-02': null });
    assert.equal(etiqueta(momento(2026, 11, 2, 11, 0), periodos), 'FESTIVO · ABRE MAÑANA MARTES A LAS 7:00 A. M.');
});

test('festivo con horario especial: la hora que da Google, y la nota cuando abre', () => {
    const periodos = semanaFechada([2026, 10, 31], { '2026-11-02': { open: [9, 0], close: [15, 0] } });
    assert.equal(etiqueta(momento(2026, 11, 1, 18, 0), periodos), 'ABRE MAÑANA LUNES A LAS 9:00 A. M.');
    const enElFestivo = calcularEstadoNegocio({ periodos, regulares: semanal, ahora: momento(2026, 11, 2, 10, 0) });
    assert.equal(enElFestivo.etiqueta, 'ABIERTO · HASTA LAS 3:00 P. M.');
    assert.equal(enElFestivo.nota, 'Hoy: horario especial 9:00 a. m. – 3:00 p. m.');
});

test('fuera de la ventana fechada se usa el horario semanal', () => {
    // Semana fechada que acaba el sábado: el lunes siguiente sale del semanal.
    const periodos = semanaFechada([2026, 10, 25]);
    assert.equal(etiqueta(momento(2026, 10, 31, 21, 0), periodos), 'ABRE EL LUNES A LAS 7:00 A. M.');
});

test('cambio de mes y de año con periodos fechados', () => {
    // Sábado 31 de octubre, después de cerrar, y el domingo 1 de noviembre.
    const octubre = semanaFechada([2026, 10, 29]);
    assert.equal(etiqueta(momento(2026, 10, 31, 22, 0), octubre), 'ABRE EL LUNES A LAS 7:00 A. M.');
    // Jueves 31 de diciembre de 2026, de noche: el 1 de enero (viernes) es festivo.
    const fin = semanaFechada([2026, 12, 31], { '2027-01-01': null });
    assert.equal(etiqueta(momento(2026, 12, 31, 21, 0), fin), 'ABRE EL SÁBADO A LAS 7:00 A. M.');
});

test('día con dos tramos: entre ellos, abre hoy a la hora del segundo', () => {
    const partido = [{ open: { day: 1, hour: 7, minute: 0 }, close: { day: 1, hour: 12, minute: 0 } },
        { open: { day: 1, hour: 14, minute: 30 }, close: { day: 1, hour: 20, minute: 0 } }];
    assert.equal(etiqueta(momento(2026, 10, 26, 13, 0), partido, partido), 'ABRE HOY A LAS 2:30 P. M.');
});

test('sin ningún horario: cerrado, sin inventar una apertura', () => {
    assert.equal(etiqueta(momento(2026, 10, 26, 10, 0), [], []), 'CERRADO AHORA');
});

test('formato de hora colombiano', () => {
    assert.equal(formatearHora({ hour: 0, minute: 0 }), '12:00 a. m.');
    assert.equal(formatearHora({ hour: 12, minute: 5 }), '12:05 p. m.');
    assert.equal(formatearHora({ hour: 20, minute: 0 }), '8:00 p. m.');
});

test('la hora se calcula en Bogotá, no en la zona del visitante', () => {
    // 2026-10-26 03:30 UTC = domingo 25 a las 22:30 en Bogotá (UTC-5).
    assert.deepEqual(momentoEnZona('America/Bogota', new Date(Date.UTC(2026, 9, 26, 3, 30))),
        { year: 2026, month: 10, day: 25, hour: 22, minute: 30 });
});
