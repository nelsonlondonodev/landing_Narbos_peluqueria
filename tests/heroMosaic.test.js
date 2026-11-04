import { test } from 'node:test';
import assert from 'node:assert/strict';
import { getHeroMosaicHTML } from '../js/components/HeroMosaic.js';
import { posicionRelativa } from '../js/components/HeroMosaicParallax.js';

const caja = { left: 100, top: 200, width: 400, height: 200 };

test('el centro de la caja es el origen y las esquinas valen ±1', () => {
    assert.deepEqual(posicionRelativa({ clientX: 300, clientY: 300 }, caja), { x: 0, y: 0 });
    assert.deepEqual(posicionRelativa({ clientX: 100, clientY: 400 }, caja), { x: -1, y: 1 });
});

test('fuera de la caja la posición se queda en el borde', () => {
    assert.deepEqual(posicionRelativa({ clientX: 900, clientY: 0 }, caja), { x: 1, y: -1 });
});

test('todas las teselas declaran profundidad y solo la primera es candidata a LCP', () => {
    const html = getHeroMosaicHTML({ image: 'a.webp', alt: 'Foto', width: 800, height: 600 });
    assert.equal(html.match(/--z:\d+/g).length, 6);
    assert.equal(html.match(/fetchpriority="high"/g).length, 1);
    assert.equal(html.match(/alt="Foto"/g).length, 1);
});
