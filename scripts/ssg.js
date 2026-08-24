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

    if (videoIssues.length > 0) {
        console.error('\n❌ Secciones de video mal cableadas:');
        videoIssues.forEach(issue => console.error(`   • ${issue}`));
        console.error('\n   El deploy se aborta: publicar un VideoObject sin su sección visible');
        console.error('   deja el marcado describiendo un video que no está en la página.');
        process.exit(1);
    }

    if (breadcrumbIssues.length > 0) {
        console.error('\n❌ Breadcrumbs que apuntan a páginas inexistentes:');
        breadcrumbIssues.forEach(issue => console.error(`   • ${issue}`));
        console.error('\n   El deploy se aborta: Google sigue esos niveles y encuentra un 403,');
        console.error('   que reintenta indefinidamente en vez de descartarlo.');
        process.exit(1);
    }

    console.log('\n✨ SSG finalizado con éxito.\n');
}

runSSG().catch(err => console.error('❌ Error crítico en SSG:', err));

