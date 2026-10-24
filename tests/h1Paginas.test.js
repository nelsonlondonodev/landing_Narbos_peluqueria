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
    'depilacion-corporal': 'Depilación Corporal con Cera',
    'barberia-cortes-hombre': 'Cortes de Hombre y Arreglo de Barba en Chía',
    'limpieza-facial': 'Limpieza Facial Profunda en Chía',
    'masajes-relajantes': 'Masajes en Chía',
    'spa-facial-integral': 'Spa Facial y Estética en Chía',
    'balayage-mechas': 'Balayage y Color en Chía',
    'color-tinturas-cabello': 'Tinturas y Color en Chía',
    'cortes-de-pelo': 'Cortes de Pelo en Chía y Cajicá | Estilo y Tendencia',
    'extensiones-cabello': 'Extensiones de cabello natural en Chía',
    'tratamientos-capilares': 'Tratamientos Capilares y Recuperación',
    'unas-spa': 'Salón de Uñas en Chía',
    'manicure-pedicure': 'Manicure y Pedicure Spa en Chía',
    'unas-acrilicas-gel': 'Uñas Acrílicas y Gel en Chía: Diseños que Enamoran'
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
