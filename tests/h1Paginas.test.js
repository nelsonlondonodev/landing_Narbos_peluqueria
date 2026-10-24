import { test } from 'node:test';
import assert from 'node:assert/strict';
import { pagesData } from '../js/data/pagesData.js';

/**
 * El texto de cada H1 que pinta `HeroSection`, tal como lo lee Google. Los heroes se
 * rehacen a menudo (diseño, clases, a dos líneas, con «|» en sr-only…) y el H1 es lo que
 * más pesa en el SEO de cada página: si una de estas pruebas falla sin haber querido
 * cambiar el H1, es un cambio accidental. Si se cambia a propósito, se actualiza aquí.
 */
const H1_ESPERADOS = Object.freeze({
    home: "Peluquería y spa en Chía | Narbo's Salón Spa",
    nosotros: 'Nuestra Historia desde 2013',
    contacto: 'Contacto y horarios',
    peluqueria: 'Peluquería en Chía: cortes, color y balayage',
    estetica: 'Estética, Masajes y Spa en Chía',
    maquillaje: 'Maquillaje profesional en Chía',
    barberia: 'Barbería exclusiva en Chía',
    'depilacion-corporal': 'Depilación Corporal con Cera'
});

/** Texto visible y legible por buscadores: sin etiquetas, con &nbsp; como espacio. */
function textoDeH1(html) {
    return html.replace(/&nbsp;/g, ' ').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

for (const [pagina, esperado] of Object.entries(H1_ESPERADOS)) {
    test(`H1 de ${pagina}`, () => {
        assert.equal(textoDeH1(pagesData[pagina]?.hero?.title ?? ''), esperado);
    });
}
