import { getMenuCategories } from './navigation.js';
import { hairPageServices, hairSubpageForCategory } from './hairPageServices.js';
import { nailsServices } from './nailsServices.js';
import { estheticsServices } from './estheticsServices.js';
import { makeupServices } from './makeupServices.js';
import { barberServices } from './barberServices.js';
import articles from './articles.js';
import { normalize, tokenize } from '../utils/siteSearchEngine.js';

/** @typedef {import('../utils/siteSearchEngine.js').SearchEntry} SearchEntry */

// Las páginas que no cuelgan del menú de servicios.
const extraPages = [
    { title: 'Nosotros', subtitle: 'Quiénes somos y opiniones', link: 'nosotros' },
    { title: 'Contacto', subtitle: 'Horario, dirección y reservas', link: 'contacto' },
    { title: 'Blog', subtitle: 'Consejos de belleza y cuidado', link: 'blog/' }
];

// Cada catálogo con su sección y, si sus enlaces no son rutas completas, cómo
// completarlos: los de uñas son relativos a su hub, los de maquillaje no traen y en
// peluquería solo los traen los del hub; los de cada subpágina salen de su categoría.
const serviceCatalogs = [
    {
        items: hairPageServices,
        section: 'Peluquería',
        resolveLink: (/** @type {string|undefined} */ link, /** @type {{ category: string }} */ item) =>
            link ?? `servicios/peluqueria/${hairSubpageForCategory(item.category)}`
    },
    { items: nailsServices, section: 'Uñas', resolveLink: (/** @type {string} */ link) => `servicios/unas-spa/${link}` },
    { items: estheticsServices, section: 'Estética' },
    { items: makeupServices, section: 'Maquillaje', resolveLink: () => 'servicios/maquillaje/' },
    { items: barberServices, section: 'Barbería' }
];

/**
 * @param {Omit<SearchEntry, 'titleWords'|'haystack'>} entry
 * @returns {SearchEntry}
 */
function withSearchFields(entry) {
    return {
        ...entry,
        titleWords: tokenize(entry.title),
        haystack: normalize(`${entry.title} ${entry.subtitle}`)
    };
}

function buildPageEntries() {
    const fromMenu = getMenuCategories().flatMap(category => [
        { type: 'pagina', title: category.title, subtitle: 'Todos los servicios', link: category.link },
        ...category.items
            // «Todo en Maquillaje» repite el enlace de su categoría.
            .filter(item => item.link !== category.link)
            .map(item => ({ type: 'pagina', title: item.label, subtitle: category.title, link: item.link }))
    ]);
    return [...fromMenu, ...extraPages.map(page => ({ type: 'pagina', ...page }))];
}

function buildServiceEntries() {
    const seen = new Set();
    return serviceCatalogs.flatMap(({ items, section, resolveLink }) => items
        .map(item => ({
            type: 'servicio',
            title: item.title,
            subtitle: section,
            meta: [item.price, item.duration].filter(Boolean).join(' · '),
            link: resolveLink ? resolveLink(item.link, item) : item.link
        }))
        // Peluquería repite en su hub los servicios de cada subpágina, a veces con otro
        // enlace: dos «Balayage» seguidos en los resultados parecen un error.
        .filter(entry => {
            const key = normalize(entry.title);
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
        }));
}

function buildArticleEntries() {
    return articles.map(article => ({
        type: 'articulo',
        title: article.title,
        subtitle: article.category,
        link: article.link
    }));
}

/**
 * Índice del buscador interno. Se arma desde los mismos datos que pintan el menú, las
 * tarjetas de servicio y el blog, así que un servicio o un artículo nuevo aparece en
 * el buscador sin tocar este archivo.
 * @type {ReadonlyArray<SearchEntry>}
 */
export const searchIndex = Object.freeze([
    ...buildPageEntries(),
    ...buildServiceEntries(),
    ...buildArticleEntries()
].map(withSearchFields));
