/**
 * Miga de pan de cada página: una sola definición para la visible y para su
 * `BreadcrumbList`. Antes la pintaban por JS cinco scripts distintos, después de la
 * primera pintura (empujaba el hero y subía el CLS), y el JSON-LD estático de veintidós
 * páginas llevaba otros nombres («Balayage Mechas», «Cortes De Pelo»).
 */

const ORIGEN = 'https://narbossalon.com/';

/** Nombre visible de cada sección, por la carpeta de su URL. */
export const SECCIONES = Object.freeze({
    peluqueria: 'Peluquería',
    estetica: 'Estética',
    'unas-spa': 'Uñas y Spa',
    maquillaje: 'Maquillaje',
    barberia: 'Barbería'
});

/**
 * @typedef {Object} Miga
 * @property {string} nombre
 * @property {string} ruta - Relativa a la raíz y sin `.html`, como la URL publicada
 *   (`servicios/peluqueria/`, `servicios/peluqueria/balayage-mechas`, `blog/`).
 */

/**
 * Niveles de la miga de una página: Inicio > sección > página. La sección sale de la
 * URL; el nombre de la página, del `data-breadcrumb` de su H1.
 *
 * @param {string} ruta - Ruta del fichero o de la URL (`servicios/peluqueria/index.html`,
 *   `/blog/articles/x`).
 * @param {string|null|undefined} nombrePagina - Último nivel; sin él la miga acaba en
 *   la sección.
 * @returns {Miga[]} Vacío si la página no lleva miga (home, contacto, nosotros…).
 */
export function migasDePagina(ruta, nombrePagina) {
    const limpia = ruta.replace(/^\/+/, '').replace(/\.html$/, '').replace(/(^|\/)index$/, '$1');

    const servicio = limpia.match(/^servicios\/([^/]+)\/(.*)$/);
    if (servicio && SECCIONES[servicio[1]]) {
        const [, seccion, pagina] = servicio;
        const migas = [{ nombre: 'Inicio', ruta: '' }, { nombre: SECCIONES[seccion], ruta: `servicios/${seccion}/` }];
        if (pagina && nombrePagina) migas.push({ nombre: nombrePagina, ruta: limpia });
        return migas;
    }

    if (/^blog\/articles\/[^/]+$/.test(limpia) && nombrePagina) {
        return [{ nombre: 'Inicio', ruta: '' }, { nombre: 'Blog', ruta: 'blog/' }, { nombre: nombrePagina, ruta: limpia }];
    }

    return [];
}

/**
 * Los mismos niveles como `itemListElement` de un `BreadcrumbList`.
 * @param {Miga[]} migas
 */
export function itemsDeBreadcrumbList(migas) {
    return migas.map(({ nombre, ruta }, indice) => ({
        '@type': 'ListItem',
        position: indice + 1,
        name: nombre,
        item: ORIGEN + ruta
    }));
}
