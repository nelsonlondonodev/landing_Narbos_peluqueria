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
    'barberia': { source: barberServices, gridId: 'barber-services-grid' },
    'peluqueria': { source: hairSalonServices, gridId: 'hair-services-grid' },
    'estetica': { source: estheticsServices, gridId: 'aesthetics-services-static' },
    'maquillaje': { source: makeupServices, gridId: 'makeup-services-grid' },
    'default': { source: servicesData, gridId: 'services-grid' }
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
            link: resolveRoute(data.link, prefix),
            image: resolveAsset(data.image, prefix)
        };
        grid.appendChild(new ServiceCard(processedData).render());
    });
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
    injectArticles(document, pageConfig.key, prefix);
    injectSEO(document, pageConfig.key, pageConfig.path);

    fs.writeFileSync(fullPath, dom.serialize(), 'utf8');
}

/**
 * Orquestador principal de SSG.
 */
async function runSSG() {
    console.log('\n🚀 Iniciando SSG (Static Site Generation)...');
    const pages = getAllHtmlFiles(DIST_DIR);
    
    for (const page of pages) {
        try {
            await processPage(page);
            console.log(`✅ Procesado: ${page.path}`);
        } catch (err) {
            console.error(`❌ Error en ${page.path}:`, err.message);
        }
    }
    console.log('\n✨ SSG finalizado con éxito.\n');
}

runSSG().catch(err => console.error('❌ Error crítico en SSG:', err));

