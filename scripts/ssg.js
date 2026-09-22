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
import { masterPrices } from '../js/data/masterPrices.js';
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
/**
 * Sustituye los tokens que una meta puede tomar de un dato que se sincroniza.
 *
 * `{{reviewCount}}` sale de `google-reviews.js`, que el build actualiza contra Google
 * en cada corrida. Escribir «350 opiniones» a mano en `pagesData` habría creado otra
 * copia que se queda vieja en silencio en cuanto entre la opinión 351, que es la misma
 * deriva de la URL de WhatsApp en `ContactForm` y de los precios de las tarjetas.
 */
function resolverTokens(texto) {
    return texto.replace(/\{\{reviewCount\}\}/g, String(googleReviews.userRatingCount));
}

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
    metaDesc.content = resolverTokens(stripHtml(config.metaDescription || config.hero?.subtitle || ''));

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
/**
 * Propaga el title y la description finales a las etiquetas de Open Graph y Twitter.
 *
 * El SSG reescribe `<title>` y `meta[name=description]` desde `pagesData`, pero og y
 * twitter se escribían a mano en cada HTML, así que cada vez que se afinaba un title
 * quedaban atrás sin que nadie lo viera: no se ven en la página, solo al compartir el
 * enlace. Eran 17 de 44 páginas, la home incluida, que anunciaba en WhatsApp un
 * título retirado hacía meses —con «Salon» sin tilde—, y WhatsApp es el canal por el
 * que se reserva.
 *
 * Va fuera de `injectSEO` a propósito: esa sale temprano cuando la página no está en
 * `pagesData`, que es el caso de los 23 artículos del blog, y son parte del problema.
 * Aquí se lee lo que el documento ya tiene, venga de donde venga.
 */
function sincronizarMetadatosSociales(document) {
    const title = document.querySelector('title')?.textContent?.trim();
    const description = document.querySelector('meta[name="description"]')?.content?.trim();

    // Si la etiqueta no existe se crea. Saltársela en silencio era el mismo fallo en
    // pequeño: `nosotros` y `contacto` se publicaban sin bloque de Twitter y la
    // sincronización pasaba por encima sin decir nada. Estas cuatro las compone el SSG
    // desde el title y la description finales, así que puede escribirlas de cero; las
    // que no puede inventarse —url, image y el tipo de tarjeta— las vigila
    // `checkMetadatosSociales`.
    const propagar = (propiedad, valor) => {
        if (!valor) return;
        let etiqueta = document.querySelector(`meta[property="${propiedad}"]`);
        if (!etiqueta) {
            etiqueta = document.createElement('meta');
            etiqueta.setAttribute('property', propiedad);
            document.head.appendChild(etiqueta);
        }
        etiqueta.content = valor;
    };

    propagar('og:title', title);
    propagar('twitter:title', title);
    propagar('og:description', description);
    propagar('twitter:description', description);
}

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
    sincronizarMetadatosSociales(document);

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
 * Aborta si vuelven las dos combinaciones de color que Lighthouse marcó por
 * contraste insuficiente.
 *
 * `text-brand-gray-dark/60` sobre blanco da 3.40 y `text-red-500` sobre `bg-gray-50`
 * da 3.60; AA pide 4.5 para texto normal. Se cambiaron por `/80` (5.86) y
 * `text-brand-red` (9.58). Las dos venían copiadas en varios ficheros —el conteo de
 * opiniones estaba en la home, en nosotros, en el badge del hero de las veinte
 * páginas y en el legal del formulario—, así que reaparecen con facilidad al copiar
 * un bloque existente.
 *
 * No es un auditor de contraste: solo impide que vuelvan estas dos. El `<svg>` de
 * `cabello-sabana-*` se queda en `text-red-500` a propósito, porque como icono le
 * basta con 3:1 y da 3.76.
 */
function checkContrasteConocido() {
    const COMBINACIONES = [
        { clase: 'text-brand-gray-dark/60', ratio: '3.40', alternativa: 'text-brand-gray-dark/80' },
        { clase: 'text-red-500', ratio: '3.60', alternativa: 'text-brand-red' }
    ];
    const issues = [];

    forEachDistPage((relPath, html) => {
        for (const { clase, ratio, alternativa } of COMBINACIONES) {
            // El icono del blog es el único uso legítimo que queda de text-red-500.
            const usos = html.split(clase).length - 1;
            const enIconos = clase === 'text-red-500'
                ? (html.match(/<svg[^>]*text-red-500/g) || []).length
                : 0;
            if (usos > enIconos) {
                issues.push(`${relPath} — ${clase} (${ratio}:1, AA pide 4.5) → usar ${alternativa}`);
            }
        }
    });

    return issues;
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
 * Resuelve una ruta con puntos dentro de `masterPrices`: 'esthetics.corporal.X'.
 */
function precioMaestro(ruta) {
    return ruta.split('.').reduce(
        (nodo, clave) => (nodo == null ? undefined : nodo[clave]),
        masterPrices
    );
}

/**
 * Todos los precios de la lista maestra, en dígitos.
 *
 * '$120.000' en `masterPrices` y "120000" en el JSON-LD son el mismo precio escrito
 * de dos formas, así que la comparación se hace sobre la única parte que comparten.
 */
function catalogoDePrecios() {
    const precios = new Set();
    const recorrer = nodo => {
        if (typeof nodo === 'string') { precios.add(nodo.replace(/\D/g, '')); return; }
        if (nodo && typeof nodo === 'object') Object.values(nodo).forEach(recorrer);
    };
    recorrer(masterPrices);
    return precios;
}

/**
 * Aborta si un precio visible no coincide con el de `masterPrices` en su ruta.
 *
 * Los artículos del blog no pasan por `pagesData` ni por el SSG: su HTML es estático,
 * así que un precio escrito ahí es una copia que nadie vuelve a mirar.
 * `guia-relajacion` es la página con más tráfico del blog —4.389 impresiones en el
 * trimestre—, o sea que la copia que se queda vieja es justo la que más gente lee.
 *
 * Cada `data-precio` nombra su ruta en la lista maestra, así que aquí la comparación
 * es exacta: o dice lo mismo, o el build nombra los dos valores.
 */
function checkPreciosVisibles() {
    const ETIQUETA_RE = /<span[^>]*data-precio="([^"]+)"[^>]*>([^<]*)<\/span>/g;
    const issues = [];

    forEachDistPage((relPath, html) => {
        for (const [, ruta, visible] of html.matchAll(ETIQUETA_RE)) {
            const esperado = precioMaestro(ruta);

            if (typeof esperado !== 'string') {
                issues.push(`${relPath} — data-precio="${ruta}" no existe en masterPrices`);
                continue;
            }

            if (visible.trim() !== esperado) {
                issues.push(`${relPath} — ${ruta}: dice "${visible.trim()}" y masterPrices tiene "${esperado}"`);
            }
        }
    });

    return issues;
}

/**
 * Aborta si un `Offer` del JSON-LD publica un precio que ya no existe en la lista.
 *
 * En el marcado no hay ruta que seguir —el `Offer` solo trae el número—, así que
 * esto es una comprobación de pertenencia, no de correspondencia: no verifica que
 * cada servicio tenga el suyo, porque dos servicios pueden costar lo mismo. Lo que
 * caza es el caso real: se sube una tarifa en `masterPrices` y el JSON-LD sigue
 * anunciando la vieja, que ya no existe en ningún sitio.
 *
 * Con eso aparecieron los tres precios huérfanos que llevaban publicados desde antes:
 * el `price: "0"` de maquillaje de novias —que declaraba el servicio como gratuito— y
 * el corte y el arreglo de barba, que nunca llegaron a la lista maestra.
 */
function checkPreciosMarcado() {
    const OFFER_PRICE_RE = /"price"\s*:\s*"(\d+)"/g;
    const catalogo = catalogoDePrecios();
    const issues = [];

    forEachDistPage((relPath, html) => {
        for (const [, precio] of html.matchAll(OFFER_PRICE_RE)) {
            if (!catalogo.has(precio)) {
                issues.push(`${relPath} — Offer con price "${precio}", que no está en masterPrices`);
            }
        }
    });

    return issues;
}

/**
 * Aborta si una página se publica sin `<title>`, o si dos comparten el mismo.
 *
 * `injectSEO` compone el title como `metaTitle || hero.title`, así que una entrada de
 * `pagesData` escrita con otras claves deja las dos ramas en `undefined` y el title se
 * escribe vacío. Pasó en dos páginas y nadie lo vio en meses: en el navegador se ven
 * perfectas, el fallo solo está en el `<head>`. `tratamientos-capilares` usaba `title`
 * y `description` sueltos y acabó en la posición 45 con 90 impresiones;
 * `unas-acrilicas-gel` no tenía ninguna de las dos.
 *
 * El duplicado se vigila por lo contrario: la home y el hub de peluquería abrían los
 * dos por «Peluquería … Chía», Google se quedaba con la home y mandaba al hub a la
 * página 2 de resultados. Dos páginas con el mismo title compiten entre ellas.
 *
 * Las páginas legales y el 404 quedan fuera: no se indexan y su title da igual.
 */
function checkTitles() {
    const EXENTAS = /^(404\.html|legal\/)/;
    const issues = [];
    const vistos = new Map();

    forEachDistPage((relPath, html) => {
        if (EXENTAS.test(relPath)) return;

        const title = (html.match(/<title>([\s\S]*?)<\/title>/) || [, ''])[1].trim();

        if (!title) {
            issues.push(`${relPath} — se publica sin <title>; revisa que su entrada de pagesData use metaTitle`);
            return;
        }

        if (vistos.has(title)) {
            issues.push(`${relPath} — mismo title que ${vistos.get(title)}: "${title}"`);
            return;
        }

        vistos.set(title, relPath);
    });

    return issues;
}

/**
 * Aborta si una página indexable se publica sin sus etiquetas de Open Graph o Twitter.
 *
 * `sincronizarMetadatosSociales` compone og:title, og:description y sus dos gemelas de
 * Twitter desde el title y la description finales, pero el resto —la url canónica, la
 * imagen y el tipo de tarjeta— vive en el HTML de cada página y el SSG no puede
 * inventárselo. Nadie lo vigilaba: `nosotros` y `contacto` llevaban publicándose sin
 * bloque de Twitter entero, y al no tener `twitter:card` se comparten con miniatura
 * pequeña en vez de imagen grande. En la página no se nota; solo al pegar el enlace.
 *
 * Las mismas exentas que `checkTitles`: las legales y el 404 no se comparten.
 */
function checkMetadatosSociales() {
    const EXENTAS = /^(404\.html|legal\/)/;
    const REQUERIDAS = [
        'og:title', 'og:description', 'og:image', 'og:url',
        'twitter:card', 'twitter:title', 'twitter:description', 'twitter:image'
    ];
    const issues = [];

    forEachDistPage((relPath, html) => {
        if (EXENTAS.test(relPath)) return;

        const faltan = REQUERIDAS.filter(
            propiedad => !new RegExp(`property=["']${propiedad}["']`).test(html)
        );

        if (faltan.length) {
            issues.push(`${relPath} — sin ${faltan.join(', ')}`);
        }
    });

    return issues;
}

/**
 * Aborta si una entrada de `pagesData` no declara `metaTitle` y `metaDescription`.
 *
 * `injectSEO` compone el title como `metaTitle || hero.title` y la description como
 * `metaDescription || hero.subtitle`, así que una entrada sin esas claves publica su
 * hero como metadatos de SEO sin que nadie lo vea: en la página se lee como el
 * titular que es, y el fallo solo está en el fragmento de Google. Eran cuatro de
 * veinte, y entre ellas el hub de barbería, que con 1.518 impresiones anunciaba «El
 * espacio que mereces para cuidar tu imagen» —ni Chía, ni Cajicá, ni el servicio—.
 *
 * Es el mismo fallo que dejó a `tratamientos-capilares` sin `<title>`: entradas
 * escritas con otra forma que el resto. `checkTitles` caza el title vacío una vez
 * publicado; esta caza la causa antes, y cubre también la description, que nunca
 * queda vacía porque el hero siempre tiene subtítulo.
 */
function checkMetadatosPagesData() {
    return Object.entries(pagesData)
        .filter(([, config]) => !config.metaTitle || !config.metaDescription)
        .map(([clave, config]) => {
            const faltan = [
                !config.metaTitle && 'metaTitle',
                !config.metaDescription && 'metaDescription'
            ].filter(Boolean);
            return `pagesData['${clave}'] — sin ${faltan.join(' ni ')}`;
        });
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
            titulo: 'Texto con contraste por debajo de AA',
            issues: checkContrasteConocido(),
            motivo: 'Lighthouse ya marcó estas combinaciones: con menos de 4.5:1 el texto pequeño resulta ilegible para mucha gente.'
        },
        {
            titulo: 'Consulta a un servicio de geo-IP antes del consentimiento',
            issues: checkGeoIpLookup(),
            motivo: 'manda la IP del visitante a un tercero que no está en la política de cookies, y antes de que haya aceptado nada.'
        },
        {
            titulo: 'Entradas de pagesData que publican su hero como metadatos',
            issues: checkMetadatosPagesData(),
            motivo: 'sin metaTitle y metaDescription el fragmento de Google lo escribe el hero, que está redactado para quien ya entró en la página.'
        },
        {
            titulo: 'Páginas sin las etiquetas de Open Graph o Twitter completas',
            issues: checkMetadatosSociales(),
            motivo: 'el enlace se comparte sin imagen grande ni tarjeta, y WhatsApp es el canal por el que se reserva.'
        },
        {
            titulo: 'Páginas sin title o con el title repetido',
            issues: checkTitles(),
            motivo: 'sin title Google se inventa el fragmento, y dos páginas con el mismo compiten entre ellas en vez de sumar.'
        },
        {
            titulo: 'Precios visibles que no cuadran con masterPrices',
            issues: checkPreciosVisibles(),
            motivo: 'el artículo anuncia una tarifa que ya se cambió en la lista maestra, y quien la lee llega al salón esperando ese precio.'
        },
        {
            titulo: 'Offers del JSON-LD con un precio que ya no existe',
            issues: checkPreciosMarcado(),
            motivo: 'ese número es el que Google publica en el fragmento de producto, donde se lee antes de entrar en la página.'
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

