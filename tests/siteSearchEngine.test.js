import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { searchSite, findHighlightRanges, tokenize, normalize } from '../js/utils/siteSearchEngine.js';
import { searchIndex } from '../js/data/searchIndex.js';

/** @typedef {import('../js/utils/siteSearchEngine.js').SearchEntry} SearchEntry */

/**
 * @param {'pagina'|'servicio'|'articulo'} type
 * @param {string} title
 * @param {string} subtitle
 * @returns {SearchEntry}
 */
function entry(type, title, subtitle) {
    return { type, title, subtitle, link: '', titleWords: tokenize(title), haystack: normalize(`${title} ${subtitle}`) };
}

const fixture = [
    entry('pagina', 'Balayage y Mechas', 'Peluquería'),
    entry('servicio', 'Balayage', 'Peluquería'),
    entry('servicio', 'Babylights / Iluminaciones', 'Peluquería'),
    entry('servicio', 'Depilación Cejas y Bigote (Cera)', 'Estética'),
    entry('servicio', 'Depilación Axilas (Cera)', 'Estética'),
    entry('pagina', 'Cejas y Pestañas', 'Estética'),
    entry('articulo', 'Uñas acrílicas vs polygel', 'Uñas')
];

const titles = (/** @type {string} */ query, index = fixture) => searchSite(index, query).map(r => r.entry.title);

test('ignora tildes y mayúsculas', () => {
    assert.deepEqual(titles('DEPILACION axilas'), ['Depilación Axilas (Cera)']);
});

test('tolera una errata en lo que se teclea', () => {
    assert.deepEqual(titles('balayaje').slice(0, 2), ['Balayage y Mechas', 'Balayage']);
});

test('la página del servicio va antes que la fila de su tabla', () => {
    assert.equal(titles('balayage')[0], 'Balayage y Mechas');
});

test('entiende sinónimos y plurales: «mechas rubias» llega a las iluminaciones', () => {
    assert.ok(titles('mechas rubias').includes('Babylights / Iluminaciones'));
});

test('un término que no está en ninguna parte se descarta en vez de vaciar la búsqueda', () => {
    assert.equal(titles('balayage bonito')[0], 'Balayage y Mechas');
});

test('las palabras vacías no cuentan: «precio» no exige nada', () => {
    assert.deepEqual(titles('precio balayage'), titles('balayage'));
    assert.deepEqual(titles('precio'), []);
});

test('«cejas» no encuentra «cera»: las erratas no se aplican a variantes derivadas', () => {
    assert.ok(!titles('cejas').includes('Depilación Axilas (Cera)'));
});

test('sin coincidencias devuelve una lista vacía', () => {
    assert.deepEqual(titles('micropigmentacion'), []);
});

test('el resaltado respeta las tildes del título', () => {
    const title = 'Depilación Corporal';
    const [[start, end]] = findHighlightRanges(title, ['depilacion']);
    assert.equal([...title].slice(start, end).join(''), 'Depilación');
});

test('el resaltado marca solo el prefijo tecleado', () => {
    assert.deepEqual(findHighlightRanges('Uñas acrílicas', ['acri']), [[5, 9]]);
});

test('índice real: cada entrada enlaza a una página que existe', () => {
    const missing = searchIndex
        .filter(e => {
            if (!e.link || e.link.includes('null')) return true;
            const route = e.link.replace(/^\//, '');
            const file = route.endsWith('/') ? `${route}index.html` : `${route}.html`;
            return !existsSync(new URL(`../${file}`, import.meta.url));
        })
        .map(e => `${e.title} → ${e.link}`);
    assert.deepEqual(missing, []);
});

test('índice real: ningún servicio sale repetido con el mismo título', () => {
    const services = searchIndex.filter(e => e.type === 'servicio').map(e => normalize(e.title));
    assert.equal(new Set(services).size, services.length);
});
