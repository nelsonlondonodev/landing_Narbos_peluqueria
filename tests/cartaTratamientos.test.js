import test from 'node:test';
import assert from 'node:assert/strict';
import { hairCartaFor, hairOfferSchema, hairOffersFor, hairServicesFor, hairSubpageForCategory } from '../js/data/hairPageServices.js';
import { searchIndex } from '../js/data/searchIndex.js';

const PAGINA = 'tratamientos-capilares';

test('la carta de tratamientos trae sus dos grupos con precio', () => {
    const { groups } = hairCartaFor(PAGINA);

    assert.deepEqual(groups.map(grupo => grupo.items.length), [5, 8]);
    assert.ok(groups.flatMap(grupo => grupo.items).every(item => /\$\d/.test(item.price)));
});

test('una página sin carta no devuelve carta', () => {
    assert.equal(hairCartaFor('cortes-de-pelo'), null);
});

test('la carta se declara en las ofertas, pero no entra en el grid de tarjetas', () => {
    const tarjetas = hairServicesFor(PAGINA);
    const itemsCarta = hairCartaFor(PAGINA).groups.flatMap(grupo => grupo.items);

    assert.ok(tarjetas.length > 0);
    assert.deepEqual(hairOffersFor(PAGINA), [...tarjetas, ...itemsCarta]);
});

test('la oferta del schema lleva el importe solo cuando el precio trae cifras', () => {
    const conPrecio = hairOfferSchema({ title: 'Quinoa 911', description: '<strong>Repara</strong>', price: 'Desde $120.000' });
    const sinPrecio = hairOfferSchema({ title: 'Cortina Invisible', description: 'Texto', price: 'Según valoración' });

    assert.equal(conPrecio.price, '120000');
    assert.equal(conPrecio.priceCurrency, 'COP');
    assert.equal(conPrecio.itemOffered.description, 'Repara');
    assert.equal('price' in sinPrecio, false);
    assert.equal('priceCurrency' in sinPrecio, false);
});

test('las páginas sin carta ofrecen lo mismo que sus tarjetas', () => {
    assert.deepEqual(hairOffersFor('cortes-de-pelo'), hairServicesFor('cortes-de-pelo'));
});

test('el buscador lleva los tratamientos de la carta a su página', () => {
    assert.equal(hairSubpageForCategory('tratamientos-intensivos'), PAGINA);

    const entrada = searchIndex.find(item => item.title === 'Quinoa 911');
    assert.equal(entrada.link, `servicios/peluqueria/${PAGINA}`);
    assert.equal(entrada.meta, '$120.000');
});
