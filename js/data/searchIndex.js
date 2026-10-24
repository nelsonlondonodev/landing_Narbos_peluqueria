import { getMenuCategories } from './navigation.js';
import { hairPageServices } from './hairPageServices.js';
import { nailsServices } from './nailsServices.js';
import { estheticsServices } from './estheticsServices.js';
import { makeupServices } from './makeupServices.js';
import { barberServices } from './barberServices.js';
import articles from './articles.js';

/**
 * @typedef {'pagina'|'servicio'|'articulo'} SearchEntryType
 */

/**
 * @typedef {Object} SearchEntry
 * @property {SearchEntryType} type - Grupo en el que se pinta el resultado.
 * @property {string} title - Texto principal del resultado.
 * @property {string} subtitle - Sección o resumen que lo acompaña.
 * @property {string} [meta] - Precio y duración, solo en servicios.
 * @property {string} link - Ruta sin resolver, como en `navigation.js`.
 * @property {string[]} titleWords - Palabras normalizadas del título.
 * @property {string} haystack - Título y subtítulo normalizados.
 */

/**
 * Pasa a minúsculas y quita tildes, para que «depilacion» encuentre «Depilación».
 * @param {string} text
 * @returns {string}
 */
export function normalize(text) {
    return text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}

/**
 * Cómo lo dice la clienta frente a cómo lo llama la web. La clave es lo que se teclea
 * (normalizado); el valor, las palabras que sí aparecen en los títulos. Sin esto,
 * «tinte» no encuentra «Color y Tinturas» y «uñas» no llega a la manicura.
 * @type {Readonly<Record<string, string[]>>}
 */
export const synonyms = Object.freeze({
    tinte: ['tintes', 'tinturas', 'color'],
    tintura: ['tinturas', 'tintes', 'color'],
    tenir: ['tintes', 'color'],
    canas: ['tintes', 'canas', 'raiz'],
    mechas: ['balayage', 'iluminacion', 'babylights'],
    rayitos: ['balayage', 'iluminacion', 'babylights'],
    reflejos: ['balayage', 'iluminacion', 'babylights'],
    luces: ['iluminacion', 'babylights', 'balayage'],
    rubio: ['balayage', 'iluminacion'],
    rubia: ['balayage', 'iluminacion'],
    unas: ['manicura', 'pedicura', 'acrilicas', 'polygel'],
    manicure: ['manicura'],
    pedicure: ['pedicura'],
    gel: ['polygel', 'semipermanente'],
    semi: ['semipermanente'],
    depilar: ['depilacion'],
    cera: ['depilacion'],
    masajes: ['masaje'],
    relajante: ['masaje'],
    cara: ['facial'],
    rostro: ['facial'],
    limpieza: ['facial'],
    acne: ['facial', 'despigmentantes'],
    manchas: ['despigmentantes'],
    keratina: ['alisado'],
    liso: ['alisado'],
    alisar: ['alisado'],
    cortar: ['corte'],
    peluqueado: ['corte'],
    hombre: ['barberia', 'barba'],
    caballero: ['barberia', 'barba'],
    nino: ['infantil'],
    novia: ['novia', 'maquillaje'],
    boda: ['novia', 'maquillaje'],
    matrimonio: ['novia', 'maquillaje'],
    quince: ['maquillaje', 'social'],
    evento: ['maquillaje', 'social'],
    pelo: ['cabello', 'peluqueria'],
    largo: ['extensiones'],
    horario: ['contacto'],
    direccion: ['contacto'],
    ubicacion: ['contacto'],
    telefono: ['contacto'],
    cita: ['contacto'],
    reservar: ['contacto']
});

/**
 * Palabras que no distinguen un resultado de otro. «precio balayage» tiene que
 * buscar balayage, no exigir que el título diga «precio».
 */
export const stopWords = new Set([
    'de', 'del', 'la', 'el', 'las', 'los', 'en', 'para', 'con', 'y', 'un', 'una', 'a',
    'por', 'que', 'mi', 'precio', 'precios', 'cuanto', 'cuesta', 'vale', 'valor',
    'chia', 'cerca', 'narbos', 'salon'
]);

// Las páginas que no cuelgan del menú de servicios.
const extraPages = [
    { title: 'Nosotros', subtitle: 'Quiénes somos y opiniones', link: 'nosotros' },
    { title: 'Contacto', subtitle: 'Horario, dirección y reservas', link: 'contacto' },
    { title: 'Blog', subtitle: 'Consejos de belleza y cuidado', link: 'blog/' }
];

// Cada catálogo con su sección y, si sus enlaces no son rutas completas, cómo
// completarlos: los de uñas son relativos a su hub y los de maquillaje no traen.
const serviceCatalogs = [
    { items: hairPageServices, section: 'Peluquería' },
    { items: nailsServices, section: 'Uñas', resolveLink: (link) => `servicios/unas-spa/${link}` },
    { items: estheticsServices, section: 'Estética' },
    { items: makeupServices, section: 'Maquillaje', resolveLink: () => 'servicios/maquillaje/' },
    { items: barberServices, section: 'Barbería' }
];

/**
 * @param {Omit<SearchEntry, 'titleWords'|'haystack'>} entry
 * @returns {SearchEntry}
 */
function withSearchFields(entry) {
    const title = normalize(entry.title);
    return {
        ...entry,
        titleWords: title.split(/[^a-z0-9]+/).filter(Boolean),
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
            link: resolveLink ? resolveLink(item.link) : item.link
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
