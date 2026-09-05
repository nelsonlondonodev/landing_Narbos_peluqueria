import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { JSDOM } from 'jsdom';

// Importación de componentes y datos (Pre-cargados)
import { ServiceCard } from '../js/components/ServiceCard.js';
import { getNavbarHTML } from '../js/components/Navbar.js';
import { getFooterHTML } from '../js/components/Footer.js';
import { getHomeModalsHTML } from '../js/components/HomeModals.js';
import { getHeroHTML } from '../js/components/HeroSection.js';
import { getVideoSectionHTML } from '../js/components/VideoSection.js';
import { resolveRoute, resolveAsset } from '../js/config.js';
import { pagesData } from '../js/data/pagesData.js';
import { getHeroBadgesHTML, getStarSpriteHTML } from '../js/components/HeroBadges.js';
import googleReviews from '../js/data/google-reviews.js';
import { servicesData } from '../js/data/servicesData.js';
import { barberServices } from '../js/data/barberServices.js';
import { hairSalonServices } from '../js/data/hairSalonServices.js';
import { estheticsServices } from '../js/data/estheticsServices.js';
import { makeupServices } from '../js/data/makeupServices.js';
import articles from '../js/data/articles.js';
import { ArticleCard } from '../js/components/ArticleCard.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.join(__dirname, '../dist');

/**
 * Registry de fuentes de datos para servicios por página.
 */
const SERVICE_SOURCE_REGISTRY = {
    'barberia': { source: barberServices, gridId: 'barber-services-grid', variant: 'standard' },
    'peluqueria': { source: hairSalonServices, gridId: 'hair-services-grid', variant: 'standard' },
    'estetica': { source: estheticsServices, gridId: 'aesthetics-services-static', variant: 'standard' },
    'maquillaje': { source: makeupServices, gridId: 'makeup-services-grid', variant: 'standard' },
    'default': { source: servicesData, gridId: 'services-grid', variant: 'overlay' }
};

/**
 * Escanea recursivamente el directorio dist para encontrar todos los archivos HTML.
 */
function getAllHtmlFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            if (file !== 'node_modules' && file !== '.git') {
                getAllHtmlFiles(filePath, fileList);
            }
        } else if (file.endsWith('.html') && !file.includes('_templates')) {
            const relativePath = path.relative(DIST_DIR, filePath);
            fileList.push({
                path: relativePath,
                isHome: relativePath === 'index.html',
                key: path.basename(file, '.html') === 'index' 
                     ? (path.basename(path.dirname(filePath)) === 'dist' ? 'home' : path.basename(path.dirname(filePath)))
                     : path.basename(file, '.html')
            });
        }
    });
    return fileList;
}

/**
 * Resuelve el prefijo de ruta relativa según la profundidad del archivo.
 */
function getRelativePrefix(filePath) {
    const dir = path.dirname(filePath);
    // path.dirname retorna '.' para archivos en la raíz
    if (dir === '.' || dir === '') return './';
    
    // Filtramos partes vacías para contar la profundidad real
    const depth = dir.split(/[/\\]/).filter(p => p && p !== '.').length;
    return '../'.repeat(depth);
}

/**
 * Elimina etiquetas HTML de un string.
 */
const stripHtml = (html) => (html ? html.replace(/<[^>]*>?/gm, '') : '');

/**
 * Inyecta Metadatos SEO.
 */
function injectSEO(document, pageKey, pagePath) {
    const config = pagesData[pageKey];
    if (!config) return;

    // 1. Title
    const titleTag = document.querySelector('title') || document.createElement('title');
    titleTag.textContent = stripHtml(config.metaTitle || (config.hero?.title ? `${config.hero.title} | Narbo's Salón` : ''));
    if (!titleTag.parentNode) document.head.appendChild(titleTag);

    // 2. Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.name = "description";
        document.head.appendChild(metaDesc);
    }
    metaDesc.content = stripHtml(config.metaDescription || config.hero?.subtitle || '');

    // 3. Canonical Tag
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = "canonical";
        document.head.appendChild(canonical);
    }
    
    let cleanPath = pagePath.replace('index.html', '').replace('.html', '');
    if (cleanPath === '' || cleanPath === '/') cleanPath = '';
    else if (!cleanPath.startsWith('/')) cleanPath = '/' + cleanPath;
    if (cleanPath && !cleanPath.endsWith('/')) cleanPath += '/';
    
    canonical.href = `https://narbossalon.com${cleanPath}`;
}

/**
 * Cuelga los badges de confianza del hero de cada página.
 *
 * Se anclan a `section#inicio` y no al componente `HeroSection`, porque solo ocho de
 * los dieciséis heroes salen de él: la home y siete fichas de servicio llevan el suyo
 * escrito a mano. `#inicio` sí lo tienen las dieciséis, y es el mismo `<section>`
 * posicionado del que ya colgaban en la home, así que las posiciones calibradas para
 * la foto al 85 % valen tal cual.
 *
 * El dato sale de `google-reviews.js` en cada build. Copiar el badge a mano en cada
 * página lo habría congelado: `sync-google-reviews.js` solo reescribe la calificación
 * visible en `index.html`, `nosotros.html` y la ficha de maquillaje.
 */
function injectHeroBadges(document, pageKey) {
    // La condición es `section#inicio` y no `pagesData[...].hero`: cuatro fichas
    // —tratamientos capilares y las tres de uñas y spa— tienen clave en `pagesData`
    // pero sin bloque `hero`, porque su hero nunca se migró al componente. Tienen la
    // sección igual que las demás, y con la condición anterior se quedaron sin badge.
    const seccion = document.querySelector('section#inicio');
    if (!seccion) return;

    const opciones = pagesData[pageKey]?.heroBadges;

    // La home ya trae el suyo escrito a mano en el HTML; se retira para que no queden
    // dos, y el generado ocupe su sitio.
    seccion.querySelectorAll('#hero-google-rating, #business-status-root').forEach(el => el.remove());

    seccion.insertAdjacentHTML('beforeend', getHeroBadgesHTML(opciones));

    // El `<use>` necesita su `<symbol>`: la home ya lo declara para el carrusel, el
    // resto de páginas no tenían ninguna estrella hasta ahora.
    if (opciones?.reviews !== false && !document.getElementById('star-icon')) {
        document.body.insertAdjacentHTML('afterbegin', getStarSpriteHTML());
    }
}

/**
 * Inyecta Hero section.
 */
function injectHero(document, pageKey, prefix) {
    const heroRoot = document.getElementById('hero-root');
    if (!heroRoot || !pageKey || !pagesData[pageKey]?.hero) return;

    const originalHero = pagesData[pageKey].hero;
    const heroData = {
        ...originalHero,
        imageSrc: resolveAsset(originalHero.imageSrc, prefix),
        imageSrcMobile: originalHero.imageSrcMobile ? resolveAsset(originalHero.imageSrcMobile, prefix) : undefined
    };

    heroRoot.innerHTML = getHeroHTML(heroData);

    // Inyección automatizada de preloads de LCP en el head para optimización de PageSpeed
    const head = document.head;
    if (head) {
        // Eliminar preloads de imágenes anteriores para evitar duplicados heredados
        const existingPreloads = head.querySelectorAll('link[rel="preload"][as="image"]');
        existingPreloads.forEach(el => el.remove());

        if (heroData.imageSrcMobile) {
            // Preload Móvil (max-width: 768px)
            const preloadMobile = document.createElement('link');
            preloadMobile.rel = 'preload';
            preloadMobile.setAttribute('as', 'image');
            preloadMobile.href = heroData.imageSrcMobile;
            preloadMobile.media = '(max-width: 768px)';
            preloadMobile.setAttribute('fetchpriority', 'high');
            preloadMobile.type = 'image/webp';
            head.insertBefore(preloadMobile, head.firstChild);

            // Preload Escritorio (min-width: 769px)
            const preloadDesktop = document.createElement('link');
            preloadDesktop.rel = 'preload';
            preloadDesktop.setAttribute('as', 'image');
            preloadDesktop.href = heroData.imageSrc;
            preloadDesktop.media = '(min-width: 769px)';
            preloadDesktop.setAttribute('fetchpriority', 'high');
            preloadDesktop.type = 'image/webp';
            head.insertBefore(preloadDesktop, head.firstChild);
        } else {
            // Preload global (si no hay variante móvil)
            const preloadDesktop = document.createElement('link');
            preloadDesktop.rel = 'preload';
            preloadDesktop.setAttribute('as', 'image');
            preloadDesktop.href = heroData.imageSrc;
            preloadDesktop.setAttribute('fetchpriority', 'high');
            preloadDesktop.type = 'image/webp';
            head.insertBefore(preloadDesktop, head.firstChild);
        }
    }
}

/**
 * Inyecta la grilla de servicios.
 */
function injectServices(document, pageKey, prefix) {
    const registry = SERVICE_SOURCE_REGISTRY[pageKey] || SERVICE_SOURCE_REGISTRY['default'];
    const grid = document.getElementById(registry.gridId) || document.getElementById('services-grid');
    
    if (!grid || !registry.source.length) return;

    grid.innerHTML = '';
    registry.source.forEach(data => {
        const processedData = {
            ...data,
            variant: data.variant || registry.variant, // Priorizar variante del dato si existe
            link: data.link ? resolveRoute(data.link, prefix) : undefined,
            image: resolveAsset(data.image, prefix),
            modalId: data.modal ? 'service-modal' : data.modalId
        };
        grid.appendChild(new ServiceCard(processedData).render());
    });
}

/**
 * Inyecta la sección de video de una página de servicio.
 *
 * El marcado tiene que salir estático: es el contenido que respalda el `VideoObject`
 * del JSON-LD, y si solo se pintara en cliente el rastreador vería una sección vacía
 * describiendo un video que no encuentra. Por eso devuelve el desajuste en vez de
 * ignorarlo: `runSSG` aborta el build antes que publicar esa situación.
 *
 * @returns {string|null} Descripción del problema, o null si todo encaja.
 */
function injectVideoSection(document, pageKey, pagePath) {
    const root = document.getElementById('video-section-root');
    const data = pagesData[pageKey]?.video;

    if (!root && !data) return null;

    if (root && !data) {
        return `${pagePath}: tiene #video-section-root pero '${pageKey}' no declara \`video\` en pagesData.`;
    }
    if (data && !root) {
        return `${pagePath}: '${pageKey}' declara \`video\` en pagesData pero falta el <div id="video-section-root">.`;
    }

    root.innerHTML = getVideoSectionHTML(data);
    return null;
}

/**
 * Inyecta la grilla de artículos (Blog).
 */
function injectArticles(document, pageKey, prefix) {
    if (pageKey !== 'blog') return;
    const grid = document.getElementById('articles-grid');
    if (!grid || !articles?.length) return;

    grid.innerHTML = '';
    [...articles].sort((a, b) => new Date(b.isoDate) - new Date(a.isoDate)).forEach(data => {
        const processedData = {
            ...data,
            link: resolveRoute(data.link, prefix),
            image: resolveAsset(data.image, prefix)
        };
        grid.appendChild(new ArticleCard(processedData).render());
    });
}

/**
 * Procesa una sola página para SSG.
 */
async function processPage(pageConfig) {
    const fullPath = path.join(DIST_DIR, pageConfig.path);
    if (!fs.existsSync(fullPath)) return;

    const html = fs.readFileSync(fullPath, 'utf8');
    const dom = new JSDOM(html);
    const { document } = dom.window;

    // Entorno global para componentes JSDOM
    global.document = document;
    global.window = dom.window;
    global.HTMLElement = dom.window.HTMLElement;

    const prefix = getRelativePrefix(pageConfig.path);
    
    // Inyección de Layout Base
    const navbar = document.getElementById('navbar-root');
    const footer = document.getElementById('footer-root');
    if (navbar) navbar.innerHTML = getNavbarHTML(prefix, pageConfig.isHome);
    if (footer) footer.innerHTML = getFooterHTML(prefix);
    
    if (pageConfig.isHome) {
        const modals = document.getElementById('modals-root');
        if (modals) modals.innerHTML = getHomeModalsHTML();
    }

    injectHero(document, pageConfig.key, prefix);
    injectHeroBadges(document, pageConfig.key);
    injectServices(document, pageConfig.key, prefix);
    const videoIssue = injectVideoSection(document, pageConfig.key, pageConfig.path);
    injectArticles(document, pageConfig.key, prefix);
    injectSEO(document, pageConfig.key, pageConfig.path);

    fs.writeFileSync(fullPath, dom.serialize(), 'utf8');

    return { videoIssue, breadcrumbIssues: checkBreadcrumbs(document, pageConfig.path) };
}

const SITE_ORIGIN = 'https://narbossalon.com';

/**
 * Resuelve una URL del sitio al fichero que la serviría en dist, replicando el
 * .htaccess: una ruta con barra final busca su index.html y una sin barra final
 * busca el .html homónimo.
 */
function resolveUrlToFile(url) {
    const route = url.slice(SITE_ORIGIN.length).split(/[?#]/)[0];
    const clean = route.replace(/^\//, '');
    if (clean === '') return path.join(DIST_DIR, 'index.html');
    return clean.endsWith('/')
        ? path.join(DIST_DIR, clean, 'index.html')
        : path.join(DIST_DIR, `${clean}.html`);
}

/**
 * El 403 de /servicios/ nació así: la página se retiró al crear los hubs de
 * categoría, pero cuatro BreadcrumbList siguieron declarándola como nivel
 * intermedio. Google los siguió durante meses hacia un directorio sin
 * index.html, y un 403 lo reintenta en vez de descartarlo.
 *
 * Un breadcrumb es una promesa de que cada nivel es una página real. Aquí se
 * comprueba contra dist, que es lo que se publica.
 *
 * @returns {string[]} Un mensaje por cada nivel que no resuelve a un fichero.
 */
function checkBreadcrumbs(document, pagePath) {
    const issues = [];

    for (const script of document.querySelectorAll('script[type="application/ld+json"]')) {
        let parsed;
        try {
            parsed = JSON.parse(script.textContent);
        } catch {
            issues.push(`${pagePath}: un bloque JSON-LD no parsea`);
            continue;
        }

        const nodes = parsed['@graph'] ?? (Array.isArray(parsed) ? parsed : [parsed]);
        for (const node of nodes) {
            if (node?.['@type'] !== 'BreadcrumbList') continue;
            for (const { item, name } of node.itemListElement ?? []) {
                if (typeof item !== 'string' || !item.startsWith(SITE_ORIGIN)) continue;
                if (fs.existsSync(resolveUrlToFile(item))) continue;
                issues.push(`${pagePath}: el nivel «${name}» apunta a ${item}, que no existe en dist`);
            }
        }
    }

    return issues;
}

/**
 * Orquestador principal de SSG.
 */
const JSON_LD_RE = /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g;

/**
 * Recorre los HTML publicados y entrega cada uno ya leído.
 *
 * Las guardas comprueban cosas distintas pero todas sobre lo mismo: lo que acaba en
 * dist, y no las páginas de `pagesData`, porque un fallo puede vivir en cualquiera de
 * las 47. Cada una traía su propio `walk` recursivo idéntico.
 *
 * @param {(relPath: string, html: string) => void} visitar
 */
function forEachDistFile(ext, visitar) {
    const walk = dir => {
        for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
            const full = path.join(dir, entry.name);
            if (entry.isDirectory()) { walk(full); continue; }
            if (!entry.name.endsWith(ext)) continue;
            visitar(path.relative(DIST_DIR, full), fs.readFileSync(full, 'utf8'));
        }
    };
    walk(DIST_DIR);
}

function forEachDistPage(visitar) {
    forEachDistFile('.html', visitar);
}

/**
 * Aborta si algún bundle vuelve a consultar un servicio de geo-IP.
 *
 * `_isRegulatedZone` decidía con `freeipapi.com` cuando la zona horaria no era
 * `Europe/*`: mandaba la IP del visitante —dato personal— a un tercero que no
 * figura en la política de cookies, y encima antes de que hubiera consentido nada,
 * que es justo lo que el banner existe para pedir. La zona horaria da la misma
 * respuesta sin salir del dispositivo.
 */
function checkGeoIpLookup() {
    const SERVICIOS = /freeipapi|ipapi\.co|ip-api\.com|ipinfo\.io|geolocation-db|geoplugin/;
    const issues = [];

    forEachDistFile('.js', (relPath, js) => {
        if (SERVICIOS.test(js)) issues.push(relPath);
    });

    return issues;
}

/**
 * Aborta si el banner de cookies vuelve a depender de un CDN, o si el fichero que
 * el bundle pide no está publicado.
 *
 * La librería se servía desde `cdn.jsdelivr.net/gh/...`, que resuelve un tag de git:
 * a diferencia de un tarball de npm, un tag se puede mover, así que el script que
 * pedía consentimiento en las 47 páginas podía cambiar de contenido sin que nadie
 * tocara el repo. Ahora vive en `vendor/` (ver su README) y no sale del dominio.
 *
 * La segunda comprobación es la que de verdad importa: si el fichero falta —una
 * versión que sube en el código y no en `vendor/`—, el banner no aparece y el sitio
 * deja de cumplir en la UE sin un solo error visible. Se recorren los bundles de
 * dist y no el fuente, porque es el JS ya empaquetado el que el navegador ejecuta.
 */
function checkVendoredConsent() {
    const issues = [];
    const RUTA_VENDOR = /vendor\/cookieconsent\/cookieconsent-[\d.]+\.(?:umd\.js|css)/g;
    const pedidas = new Set();

    forEachDistFile('.js', (relPath, js) => {
        if (js.includes('cookieconsent') && /cdn\.jsdelivr\.net|unpkg\.com|cdnjs\.cloudflare\.com/.test(js)) {
            issues.push(`${relPath} — vuelve a pedir la librería a un CDN`);
        }
        for (const ruta of js.match(RUTA_VENDOR) || []) pedidas.add(ruta);
    });

    if (pedidas.size === 0) {
        issues.push('ningún bundle referencia vendor/cookieconsent — el banner no se cargaría');
    }

    for (const ruta of pedidas) {
        if (!fs.existsSync(path.join(DIST_DIR, ruta))) {
            issues.push(`${ruta} — referenciada por el bundle pero ausente de dist`);
        }
    }

    return issues;
}

/**
 * Aborta si un HTML vuelve a pedir animate.css a cdnjs. Las cinco animaciones que
 * el sitio usa viven ahora en `css/input.css` y viajan dentro de styles.css: una
 * etiqueta nueva reintroduciría un origen externo entero —DNS, TCP y TLS— para
 * servir un CSS que ya está descargado. Se comprueba sobre dist, y no sobre las
 * páginas de pagesData, porque el CDN estaba en las 47 y no solo en las plantilladas.
 */
function checkExternalCdn() {
    const issues = [];

    forEachDistPage((relPath, html) => {
        if (html.includes('cdnjs.cloudflare.com')) issues.push(relPath);
    });

    return issues;
}

/**
 * Aborta si algún `uploadDate` publicado no es un ISO 8601 completo con zona horaria.
 *
 * Search Console avisó de las dos caras del mismo dato —«falta la zona horaria» y
 * «el valor de fecha y hora no es válido»— por un `uploadDate` que era solo el día.
 * Es el tercer desfase de estas fechas: antes fueron redondeos a las 08:00 y dos días
 * de más en `ImN8W2AXEJI`. `sync-video-dates.js` mantiene al día el catálogo, pero no
 * alcanza a los `VideoObject` escritos a mano, que es donde siempre se ha torcido.
 *
 * Se recorre dist entero, y no las páginas de `pagesData`, por lo mismo que el CDN:
 * un JSON-LD puede vivir en cualquiera de las 47.
 */
function checkUploadDates() {
    const ISO_CON_OFFSET = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})$/;
    const issues = [];

    // `uploadDate` aparece anidado a distinta profundidad: suelto en las fichas de
    // servicio y dentro de cada `ListItem` del `ItemList` de la home.
    const recorrer = (nodo, onFecha) => {
        if (Array.isArray(nodo)) { nodo.forEach(hijo => recorrer(hijo, onFecha)); return; }
        if (!nodo || typeof nodo !== 'object') return;
        for (const [clave, valor] of Object.entries(nodo)) {
            if (clave === 'uploadDate') onFecha(valor);
            else recorrer(valor, onFecha);
        }
    };

    forEachDistPage((relPath, html) => {
        for (const [, json] of html.matchAll(JSON_LD_RE)) {
            let parsed;
            try {
                parsed = JSON.parse(json);
            } catch {
                // `checkBreadcrumbs` ya reporta el JSON-LD que no parsea, y solo
                // recorre las páginas de pagesData: aquí se avisa de las demás.
                issues.push(`${relPath}: un bloque JSON-LD no parsea`);
                continue;
            }

            recorrer(parsed, fecha => {
                if (typeof fecha !== 'string' || !ISO_CON_OFFSET.test(fecha)) {
                    issues.push(`${relPath}: uploadDate «${fecha}» no es ISO 8601 con zona horaria`);
                }
            });
        }
    });

    return issues;
}

/**
 * Aborta si una calificación visible o marcada no coincide con la que trajo el sync.
 *
 * El badge del hero pasa de una página a dieciséis, y la calificación es el dato que
 * más caro sale equivocado: contradecir con el JSON-LD lo que el usuario ve escrito es
 * justo lo que Google penaliza. Aquí se comprueba que las tres fuentes —el badge, el
 * `ratingValue` y el `reviewCount`— digan lo mismo que `google-reviews.js`.
 *
 * Así se descubrió que la ficha de maquillaje declaraba 4.9 con 124 opiniones para el
 * mismo `@id` del negocio que el resto del sitio da como 5.0 con 339.
 */
function checkRatingConsistency() {
    const rating = Number(googleReviews.rating).toFixed(1);
    const count = String(googleReviews.userRatingCount);
    const issues = [];

    // Solo el del negocio: `@id` .../#organization. Una ficha puede declarar la
    // calificación de un servicio suelto, que es otra cosa y no se compara.
    const DEL_NEGOCIO = '"@id":\\s*"https:\\/\\/narbossalon\\.com\\/#organization"[\\s\\S]{0,1200}?';

    forEachDistPage((relPath, html) => {
        const comprobar = (re, esperado, que) => {
            for (const [, encontrado] of html.matchAll(re)) {
                if (encontrado !== esperado) {
                    issues.push(`${relPath}: ${que} dice ${encontrado} y el sync trae ${esperado}`);
                }
            }
        };

        comprobar(/data-google-rating[^>]*>([\d.]+)/g, rating, 'el badge');
        comprobar(new RegExp(`${DEL_NEGOCIO}"ratingValue":\\s*"([\\d.]+)"`, 'g'), rating, 'el aggregateRating del negocio');
        comprobar(new RegExp(`${DEL_NEGOCIO}"reviewCount":\\s*"(\\d+)"`, 'g'), count, 'el reviewCount del negocio');
    });

    return issues;
}

/**
 * Aborta si una página con hero se queda sin el badge de reseñas.
 *
 * Es el fallo que se coló en la primera pasada: la inyección se condicionó a que la
 * página tuviera bloque `hero` en `pagesData`, y cuatro fichas que no lo tienen
 * —tratamientos capilares y las tres de uñas y spa— salieron sin badge. Se descubrió
 * a ojo, mirando páginas de una en una, que es justo lo que una guarda evita.
 *
 * `section#inicio` es la definición de «página con hero»: la tienen las veinte y ningún
 * artículo del blog. Si alguna vez hace falta una sin badge, que salte esta guarda y se
 * decida a propósito.
 */
function checkHeroBadges() {
    const issues = [];

    forEachDistPage((relPath, html) => {
        if (!html.includes('id="inicio"')) return;
        if (html.includes('hero-google-rating')) return;
        issues.push(relPath);
    });

    return issues;
}

/**
 * Imprime todas las guardas que fallaron y corta el deploy una sola vez.
 *
 * Antes cada una traía su propio bloque idéntico de seis líneas y su propio
 * `process.exit(1)`, así que un build con dos problemas solo enseñaba el primero: se
 * arreglaba, se reconstruía, y aparecía el siguiente. Ahora salen juntos.
 *
 * @param {{titulo: string, issues: string[], motivo: string}[]} guardas
 */
function reportarGuardas(guardas) {
    const fallidas = guardas.filter(guarda => guarda.issues.length > 0);
    if (fallidas.length === 0) return;

    for (const { titulo, issues, motivo } of fallidas) {
        console.error(`\n❌ ${titulo}:`);
        issues.forEach(issue => console.error(`   • ${issue}`));
        console.error(`   ↳ ${motivo}`);
    }

    console.error('\n   El deploy se aborta.\n');
    process.exit(1);
}

async function runSSG() {
    console.log('\n🚀 Iniciando SSG (Static Site Generation)...');
    const pages = getAllHtmlFiles(DIST_DIR);
    const videoIssues = [];
    const breadcrumbIssues = [];

    for (const page of pages) {
        try {
            const { videoIssue, breadcrumbIssues: crumbs } = await processPage(page);
            if (videoIssue) videoIssues.push(videoIssue);
            breadcrumbIssues.push(...crumbs);
            console.log(`✅ Procesado: ${page.path}`);
        } catch (err) {
            console.error(`❌ Error en ${page.path}:`, err.message);
        }
    }

    reportarGuardas([
        {
            titulo: 'Secciones de video mal cableadas',
            issues: videoIssues,
            motivo: 'publicar un VideoObject sin su sección visible deja el marcado describiendo un video que no está en la página.'
        },
        {
            titulo: 'Breadcrumbs que apuntan a páginas inexistentes',
            issues: breadcrumbIssues,
            motivo: 'Google sigue esos niveles y encuentra un 403, que reintenta indefinidamente en vez de descartarlo.'
        },
        {
            titulo: 'VideoObject con uploadDate mal formada',
            issues: checkUploadDates(),
            motivo: 'Search Console marca como inválida toda fecha sin hora ni zona horaria, y el vídeo pierde su rich result.'
        },
        {
            titulo: 'Páginas con hero pero sin el badge de reseñas',
            issues: checkHeroBadges(),
            motivo: 'la prueba social se publica en unas páginas y en otras no, y la que falta solo se descubre mirándolas a ojo.'
        },
        {
            titulo: 'Calificaciones que no cuadran con el sync de Google',
            issues: checkRatingConsistency(),
            motivo: 'un número visible que contradice al JSON-LD es lo que Google trata como marcado engañoso.'
        },
        {
            titulo: 'Banner de cookies sin autohospedar',
            issues: checkVendoredConsent(),
            motivo: 'si la librería del consentimiento no se publica con el sitio, el banner desaparece en la UE sin dar un error.'
        },
        {
            titulo: 'Consulta a un servicio de geo-IP antes del consentimiento',
            issues: checkGeoIpLookup(),
            motivo: 'manda la IP del visitante a un tercero que no está en la política de cookies, y antes de que haya aceptado nada.'
        },
        {
            titulo: 'Páginas que vuelven a cargar animate.css desde cdnjs',
            issues: checkExternalCdn(),
            motivo: 'las animaciones ya viajan dentro de styles.css, y la etiqueta reintroduce un origen externo para servir lo ya descargado.'
        }
    ]);

    console.log('\n✨ SSG finalizado con éxito.\n');
}

runSSG().catch(err => console.error('❌ Error crítico en SSG:', err));

