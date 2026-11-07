import test from 'node:test';
import assert from 'node:assert/strict';
import { hairOffersFor, hairServicesFor } from '../js/data/hairPageServices.js';
import { searchIndex } from '../js/data/searchIndex.js';

const titulos = pagina => hairServicesFor(pagina).map(servicio => servicio.title);

test('balayage y color no comparten tarjetas', () => {
    assert.deepEqual(titulos('balayage-mechas'), ['Balayage', 'Babylights / Iluminaciones']);
    assert.deepEqual(titulos('color-tinturas-cabello'), ['Aplicación de tintes', 'Retoque de Raíz']);
});

test('cada página declara solo sus servicios', () => {
    assert.equal(hairOffersFor('balayage-mechas').length, 2);
    assert.equal(hairOffersFor('color-tinturas-cabello').length, 2);
});

test('el buscador lleva cada servicio a su página', () => {
    const enlace = titulo => searchIndex.find(item => item.title === titulo)?.link;

    assert.equal(enlace('Babylights / Iluminaciones'), 'servicios/peluqueria/balayage-mechas');
    assert.equal(enlace('Retoque de Raíz'), 'servicios/peluqueria/color-tinturas-cabello');
});
