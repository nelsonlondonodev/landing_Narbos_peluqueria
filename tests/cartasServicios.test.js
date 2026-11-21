import test from 'node:test';
import assert from 'node:assert/strict';
import { cartaFor } from '../js/data/cartasServicios.js';
import { hairCartaFor } from '../js/data/hairPageServices.js';

const PAGINAS = ['unas-acrilicas-gel', 'manicure-pedicure', 'cejas-y-pestanas'];

test('uñas y cejas tienen carta, con precio en cada fila', () => {
    for (const pagina of PAGINAS) {
        const filas = cartaFor(pagina)?.groups.flatMap(grupo => grupo.items) ?? [];
        assert.ok(filas.length > 0, pagina);
        assert.ok(filas.every(fila => /\$\d/.test(fila.price ?? '')), pagina);
    }
});

test('peluquería sigue sacando su carta de hairPageServices', () => {
    assert.deepEqual(cartaFor('tratamientos-capilares'), hairCartaFor('tratamientos-capilares'));
    assert.equal(cartaFor('cortes-de-pelo'), null);
});
