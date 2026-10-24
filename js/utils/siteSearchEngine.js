/**
 * Motor del buscador interno: normalización, sinónimos, erratas y puntuación.
 *
 * Es puro a propósito: recibe el índice como parámetro y no toca el DOM, así que se
 * prueba en Node (`pnpm test`) con entradas inventadas, sin cargar los catálogos.
 */

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
 * @typedef {Object} SearchResult
 * @property {SearchEntry} entry
 * @property {number} score
 * @property {string[]} matchedTerms - Lo que hay que resaltar en el título.
 */

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

// A igual coincidencia, mejor la página del servicio que una fila suelta de su tabla.
/** @type {Readonly<Record<SearchEntryType, number>>} */
const TYPE_BONUS = Object.freeze({ pagina: 3, servicio: 1, articulo: 0 });

// Lo que separa una palabra de otra, ya normalizado el texto.
const WORD_CHAR = /[a-z0-9]/;
const NON_WORD = /[^a-z0-9]+/;

/**
 * Pasa a minúsculas y quita tildes, para que «depilacion» encuentre «Depilación».
 * @param {string} text
 * @returns {string}
 */
export function normalize(text) {
    return text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}

/**
 * Normaliza y parte en palabras.
 * @param {string} text
 * @returns {string[]}
 */
export function tokenize(text) {
    return normalize(text).split(NON_WORD).filter(Boolean);
}

/**
 * Distancia de edición acotada: corta en cuanto se pasa de `max`, que es lo único
 * que importa para tolerar una errata («balayaje», «masage»).
 * @param {string} a
 * @param {string} b
 * @param {number} max
 * @returns {boolean}
 */
function isWithinDistance(a, b, max) {
    if (Math.abs(a.length - b.length) > max) return false;
    let previous = Array.from({ length: b.length + 1 }, (_, i) => i);
    for (let i = 1; i <= a.length; i++) {
        const current = [i];
        let rowMin = i;
        for (let j = 1; j <= b.length; j++) {
            const cost = a[i - 1] === b[j - 1] ? 0 : 1;
            current[j] = Math.min(previous[j] + 1, current[j - 1] + 1, previous[j - 1] + cost);
            rowMin = Math.min(rowMin, current[j]);
        }
        if (rowMin > max) return false;
        previous = current;
    }
    return previous[b.length] <= max;
}

/**
 * Lo que se prueba por cada término: él mismo, sus sinónimos y su singular con los
 * suyos («rubias» llega a «rubia» y de ahí a balayage). El primero es siempre el
 * término tal cual.
 * @param {string} term
 * @returns {string[]}
 */
function getVariants(term) {
    const singular = term.length > 4 && term.endsWith('s') ? term.slice(0, -1) : null;
    return [...new Set([
        term,
        ...(synonyms[term] ?? []),
        ...(singular ? [singular, ...(synonyms[singular] ?? [])] : [])
    ])];
}

/**
 * Puntúa un término contra una entrada. Devuelve 0 si no aparece de ninguna forma.
 * @param {SearchEntry} entry
 * @param {string} term
 * @returns {{ score: number, matched: string|null }}
 */
function scoreTerm(entry, term) {
    let best = { score: 0, matched: /** @type {string|null} */ (null) };

    getVariants(term).forEach((variant, index) => {
        const isTyped = index === 0;
        let score = 0;
        let matched = null;

        if (entry.titleWords.some(word => word.startsWith(variant))) {
            score = 10;
            matched = variant;
        } else if (entry.haystack.includes(variant)) {
            score = 5;
        } else if (isTyped && variant.length >= 4) {
            // Erratas solo sobre lo que se tecleó: sobre una variante derivada, «ceja»
            // (de «cejas») acaba encontrando «cera».
            const maxDistance = variant.length >= 7 ? 2 : 1;
            const closeWord = entry.titleWords.find(word => isWithinDistance(word, variant, maxDistance));
            if (closeWord) {
                score = 6;
                matched = closeWord;
            }
        }

        // El término tal cual pesa más que un sinónimo suyo.
        const weighted = isTyped ? score : score * 0.8;
        if (weighted > best.score) best = { score: weighted, matched };
    });

    return best;
}

/**
 * Busca en el índice. Cada término tiene que aparecer en la entrada (por sí mismo, por
 * un sinónimo o con una errata): «uñas acrílicas» no debe devolver cualquier uña. La
 * excepción es el término que no aparece en ninguna entrada, que se descarta: así
 * «mechas rubias bonitas» busca mechas en vez de no devolver nada.
 * @param {ReadonlyArray<SearchEntry>} index
 * @param {string} query
 * @returns {SearchResult[]} Ordenados de más a menos relevante.
 */
export function searchSite(index, query) {
    const terms = tokenize(query).filter(term => !stopWords.has(term));
    if (terms.length === 0) return [];

    const scored = index.map(entry => ({ entry, scores: terms.map(term => scoreTerm(entry, term)) }));
    const usefulTerms = terms
        .map((_, i) => i)
        .filter(i => scored.some(({ scores }) => scores[i].score > 0));
    if (usefulTerms.length === 0) return [];

    /** @type {SearchResult[]} */
    const results = [];
    for (const { entry, scores } of scored) {
        const termScores = usefulTerms.map(i => scores[i]);
        if (termScores.some(({ score }) => score === 0)) continue;
        results.push({
            entry,
            score: termScores.reduce((sum, { score }) => sum + score, 0) + TYPE_BONUS[entry.type],
            matchedTerms: termScores.flatMap(({ matched }) => (matched ? [matched] : []))
        });
    }
    return results.sort((a, b) => b.score - a.score);
}

/**
 * Tramos del título que hay que resaltar: el principio de cada palabra que empieza por
 * un término encontrado. Va carácter a carácter porque el término está normalizado y
 * el título no: «depilacion» tiene que marcar «Depilación» entera, con su tilde.
 * @param {string} title
 * @param {string[]} terms - Términos normalizados, como `matchedTerms`.
 * @returns {Array<[number, number]>} Pares `[inicio, fin)` sobre `[...title]`.
 */
export function findHighlightRanges(title, terms) {
    const normalizedChars = [...title].map(char => normalize(char));
    const isWordChar = (/** @type {number} */ i) => WORD_CHAR.test(normalizedChars[i] ?? '');
    /** @type {Array<[number, number]>} */
    const ranges = [];

    for (let start = 0; start < normalizedChars.length; start++) {
        if (!isWordChar(start) || isWordChar(start - 1)) continue;
        let end = start;
        while (isWordChar(end)) end++;
        const word = normalizedChars.slice(start, end).join('');
        const term = terms.find(t => word.startsWith(t));
        if (term) ranges.push([start, start + term.length]);
    }
    return ranges;
}
