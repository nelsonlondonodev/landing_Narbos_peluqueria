import { test } from 'node:test';
import assert from 'node:assert/strict';
import { migasDePagina, itemsDeBreadcrumbList } from '../js/utils/migas.js';

const nombres = (migas) => migas.map(m => m.nombre).join(' > ');

test('ficha de servicio: Inicio > sección > página', () => {
    const migas = migasDePagina('servicios/peluqueria/balayage-mechas.html', 'Balayage');
    assert.equal(nombres(migas), 'Inicio > Peluquería > Balayage');
    assert.deepEqual(migas.map(m => m.ruta), ['', 'servicios/peluqueria/', 'servicios/peluqueria/balayage-mechas']);
});

test('hub de sección: acaba en la sección, sin nombre de página', () => {
    assert.equal(nombres(migasDePagina('servicios/unas-spa/index.html', null)), 'Inicio > Uñas y Spa');
    assert.equal(nombres(migasDePagina('/servicios/barberia/', undefined)), 'Inicio > Barbería');
});

test('artículo del blog: Inicio > Blog > artículo', () => {
    assert.equal(nombres(migasDePagina('/blog/articles/cuidado-del-balayage', 'Cuidado Balayage')), 'Inicio > Blog > Cuidado Balayage');
});

test('páginas sin miga: home, contacto, nosotros, el índice del blog', () => {
    for (const ruta of ['index.html', 'contacto.html', 'nosotros.html', 'blog/index.html']) {
        assert.deepEqual(migasDePagina(ruta, 'X'), [], ruta);
    }
});

test('una ficha sin nombre de página no inventa el último nivel', () => {
    assert.equal(nombres(migasDePagina('servicios/estetica/masajes-relajantes.html', null)), 'Inicio > Estética');
});

test('BreadcrumbList: URLs absolutas como las canónicas, en orden', () => {
    const items = itemsDeBreadcrumbList(migasDePagina('servicios/peluqueria/balayage-mechas.html', 'Balayage'));
    assert.deepEqual(items.map(i => [i.position, i.name, i.item]), [
        [1, 'Inicio', 'https://narbossalon.com/'],
        [2, 'Peluquería', 'https://narbossalon.com/servicios/peluqueria/'],
        [3, 'Balayage', 'https://narbossalon.com/servicios/peluqueria/balayage-mechas']
    ]);
});
