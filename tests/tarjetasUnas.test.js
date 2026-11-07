import test from 'node:test';
import assert from 'node:assert/strict';
import { nailsCardsFor, nailsServices } from '../js/data/nailsServices.js';

test('el hub de uñas resume cada servicio y lleva a su subpágina', () => {
    const tarjetas = nailsCardsFor('unas-spa');

    assert.equal(tarjetas.length, 10);
    assert.equal(tarjetas[0].link, 'servicios/unas-spa/manicure-pedicure');
    assert.equal(tarjetas[4].link, 'servicios/unas-spa/unas-acrilicas-gel');
    assert.ok(tarjetas.every(tarjeta => !tarjeta.reserva));
    assert.deepEqual(tarjetas.map(tarjeta => tarjeta.description), nailsServices.map(servicio => servicio.summary));
});

test('las subpáginas de uñas agendan sus servicios y no pierden ningún texto', () => {
    const tarjetas = [...nailsCardsFor('manicure-pedicure'), ...nailsCardsFor('unas-acrilicas-gel')];

    assert.equal(nailsCardsFor('manicure-pedicure').length, 8);
    assert.equal(nailsCardsFor('unas-acrilicas-gel').length, 2);
    assert.ok(tarjetas.every(tarjeta => tarjeta.reserva && !tarjeta.link && tarjeta.duration));

    for (const servicio of nailsServices) {
        const tarjeta = tarjetas.find(({ title }) => title === servicio.title);
        assert.ok(tarjeta.description.includes(servicio.summary), servicio.title);
        assert.ok(tarjeta.description.includes(servicio.description), servicio.title);
    }
});

test('la foto con texto alternativo propio lo conserva', () => {
    const pedicura = nailsCardsFor('manicure-pedicure').find(tarjeta => tarjeta.title === 'Pedicura Tradicional');
    assert.equal(pedicura.imageAlt, "Pedicura profesional spa en Narbo's Chía");
});
