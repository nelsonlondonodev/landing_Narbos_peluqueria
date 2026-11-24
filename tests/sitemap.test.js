import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import articles from '../js/data/articles.js';
import { articleLastmod, buildSitemap } from '../scripts/generate-sitemap.js';

const entradas = buildSitemap().xml.match(/<url>[\s\S]*?<\/url>/g) ?? [];
const esArticulo = entrada => entrada.includes('/blog/articles/');

test('cada artículo lleva como lastmod el dateModified de su HTML', () => {
    assert.equal(entradas.filter(esArticulo).length, articles.length);
    for (const { link } of articles) {
        const ruta = link.replace(/^\//, '').replace(/\.html$/, '');
        const html = fs.readFileSync(new URL(`../${ruta}.html`, import.meta.url), 'utf8');
        const modificado = html.match(/"dateModified":\s*"([^"T]+)/)?.[1];
        const entrada = entradas.find(item => item.includes(`/${ruta}</loc>`));
        assert.ok(modificado, ruta);
        assert.ok(entrada?.includes(`<lastmod>${modificado}</lastmod>`), ruta);
    }
});

test('sin dateModified se usa isoDate', () => {
    assert.equal(articleLastmod('<html></html>', '2026-07-18'), '2026-07-18');
});

test('las páginas fijas no llevan lastmod', () => {
    const fijas = entradas.filter(entrada => !esArticulo(entrada));
    assert.ok(fijas.length > 0);
    assert.deepEqual(fijas.filter(entrada => entrada.includes('<lastmod>')), []);
});
