import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { JSDOM } from 'jsdom';

// Un `</div>` de más cierra el contenedor de la página y, con él, <main>: lo que viene
// detrás queda fuera del landmark y del contenedor que evita el scroll horizontal, y en el
// navegador no se nota a simple vista. Pasó en la home al rehacer el hero y llevaba meses
// pasando en la FAQ de nosotros.
const RAIZ = fileURLToPath(new URL('..', import.meta.url));
const IGNORADAS = new Set(['node_modules', 'dist', '.git', '_templates', 'seo_tracking', 'supabase', 'tests']);

function paginas(dir = RAIZ) {
    return readdirSync(dir).flatMap(nombre => {
        const ruta = join(dir, nombre);
        if (statSync(ruta).isDirectory()) return IGNORADAS.has(nombre) ? [] : paginas(ruta);
        return nombre.endsWith('.html') ? [ruta] : [];
    });
}

for (const ruta of paginas()) {
    const pagina = relative(RAIZ, ruta);
    test(`${pagina}: sus secciones viven dentro de <main>`, () => {
        const { document } = new JSDOM(readFileSync(ruta, 'utf8')).window;
        const main = document.querySelector('main');
        assert.ok(main, 'la página no tiene <main>');
        const fuera = [...document.querySelectorAll('section')]
            .filter(section => !main.contains(section))
            .map(section => section.id || section.className.slice(0, 40));
        assert.deepEqual(fuera, []);
    });
}
