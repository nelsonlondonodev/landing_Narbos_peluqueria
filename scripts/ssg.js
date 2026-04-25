import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { JSDOM } from 'jsdom';

// Importación de componentes y datos
import { ServiceCard } from '../js/components/ServiceCard.js';
import { servicesData } from '../js/data/servicesData.js';
import { hairSalonServices } from '../js/data/hairSalonServices.js';
import { getNavbarHTML } from '../js/components/Navbar.js';
import { getFooterHTML } from '../js/components/Footer.js';
import { getHomeModalsHTML } from '../js/components/HomeModals.js';
import { resolveRoute, resolveAsset } from '../js/config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.join(__dirname, '../dist');

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
                // La key se deriva del nombre del archivo o la carpeta
                key: path.basename(file, '.html') === 'index' 
                     ? (path.basename(path.dirname(filePath)) === 'dist' ? 'home' : path.basename(path.dirname(filePath)))
                     : path.basename(file, '.html')
            });
        }
    });
    return fileList;
}

async function getPagesConfig() {
    console.log('🔍 Escaneando archivos HTML para procesamiento...');
    return getAllHtmlFiles(DIST_DIR);
}

/**
 * Resuelve el prefijo de ruta relativa según la profundidad del archivo.
 */
function getRelativePrefix(filePath) {
    const dir = path.dirname(filePath);
    if (dir === '.' || dir === '') return './';
    const depth = dir.split(/[/\\]/).length;
    return '../'.repeat(depth);
}

/**
 * Inyecta Navbar y Footer en el DOM.
 */
function injectBaseLayout(document, prefix, isHome = false) {
    const navbar = document.getElementById('navbar-root');
    const footer = document.getElementById('footer-root');

    if (navbar) navbar.innerHTML = getNavbarHTML(prefix, isHome);
    if (footer) footer.innerHTML = getFooterHTML(prefix);
}

/**
 * Inyecta Metadatos SEO (Title, Meta Description, Canonical)
 */
async function injectSEO(document, pageKey, pagePath) {
    if (!pageKey) return;
    
    const { pagesData } = await import('../js/data/pagesData.js');
    const config = pagesData[pageKey];
    if (!config) return;

    // 1. Title
    const titleTag = document.querySelector('title') || document.createElement('title');
    if (config.metaTitle) {
        titleTag.textContent = config.metaTitle;
    } else if (config.hero?.title) {
        titleTag.textContent = `${config.hero.title} | Narbo's Salón`;
    }
    if (!titleTag.parentNode) document.head.appendChild(titleTag);

    // 2. Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.name = "description";
        document.head.appendChild(metaDesc);
    }
    if (config.metaDescription) {
        metaDesc.content = config.metaDescription;
    } else if (config.hero?.subtitle) {
        metaDesc.content = config.hero.subtitle;
    }

    // 3. Canonical Tag (Clean URLs)
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = "canonical";
        document.head.appendChild(canonical);
    }
    
    // Normalizar URL canónica
    let cleanPath = pagePath.replace('index.html', '').replace('.html', '');
    if (cleanPath === '' || cleanPath === '/') cleanPath = '';
    else if (!cleanPath.startsWith('/')) cleanPath = '/' + cleanPath;
    
    // Asegurar slash final para directorios si no es la home
    if (cleanPath && !cleanPath.endsWith('/')) cleanPath += '/';
    
    canonical.href = `https://narbossalon.com${cleanPath}`;
    
    console.log(`   🔍 SEO inyectado: ${titleTag.textContent}`);
}

/**
 * Inyecta Hero section basado en pagesData.
 */
async function injectHero(document, pageKey, prefix) {
    const heroRoot = document.getElementById('hero-root');
    if (!heroRoot || !pageKey) return;

    const { pagesData } = await import('../js/data/pagesData.js');
    if (pagesData[pageKey] && pagesData[pageKey].hero) {
        const heroData = { ...pagesData[pageKey].hero };
        if (heroData.imageSrc && !heroData.imageSrc.startsWith('http')) {
            heroData.imageSrc = prefix + heroData.imageSrc;
        }
        if (heroData.imageSrcMobile && !heroData.imageSrcMobile.startsWith('http')) {
            heroData.imageSrcMobile = prefix + heroData.imageSrcMobile;
        }
        const { getHeroHTML } = await import('../js/components/HeroSection.js');
        heroRoot.innerHTML = getHeroHTML(heroData);
        console.log(`   ✨ Hero inyectado (key: ${pageKey})`);
    }
}

/**
 * Inyecta la grilla de servicios correspondiente.
 */
async function injectServices(document, pageKey, prefix) {
    let gridId = 'services-grid';
    if (pageKey === 'barberia') gridId = 'barber-services-grid';
    else if (pageKey === 'peluqueria') gridId = 'hair-services-grid';
    else if (pageKey === 'estetica') gridId = 'aesthetics-services-static';
    else if (pageKey === 'maquillaje') gridId = 'makeup-services-grid';

    const grid = document.getElementById(gridId) || document.getElementById('services-grid');
    
    if (!grid) return;

    grid.innerHTML = '';
    let servicesSource = [];

    if (pageKey === 'barberia') {
        const { barberServices } = await import('../js/data/barberServices.js');
        servicesSource = barberServices;
    } else if (pageKey === 'peluqueria') {
        const { hairSalonServices } = await import('../js/data/hairSalonServices.js');
        servicesSource = hairSalonServices;
    } else if (pageKey === 'estetica') {
        const { estheticsServices } = await import('../js/data/estheticsServices.js');
        servicesSource = estheticsServices;
    } else if (pageKey === 'maquillaje') {
        const { makeupServices } = await import('../js/data/makeupServices.js');
        servicesSource = makeupServices;
    } else {
        const { servicesData } = await import('../js/data/servicesData.js');
        servicesSource = servicesData;
    }

    if (servicesSource.length > 0) {
        servicesSource.forEach(data => {
            const processedData = {
                ...data,
                link: resolveRoute(data.link, prefix),
                image: data.image.startsWith('http') ? data.image : prefix + data.image.replace(/^\//, '')
            };
            const card = new ServiceCard(processedData);
            grid.appendChild(card.render());
        });
        console.log(`   ✨ Servicios inyectados en #${grid.id}`);
    }
}

/**
 * Inyecta la grilla de artículos correspondientes (si es blog).
 */
async function injectArticles(document, pageKey, prefix) {
    if (pageKey !== 'blog') return;
    
    const grid = document.getElementById('articles-grid');
    if (!grid) return;

    grid.innerHTML = '';
    
    const { default: articles } = await import('../js/data/articles.js');
    const { ArticleCard } = await import('../js/components/ArticleCard.js');
    
    if (articles && articles.length > 0) {
        const sortedArticles = [...articles].sort((a, b) => new Date(b.isoDate) - new Date(a.isoDate));
        sortedArticles.forEach(data => {
            const processedData = {
                ...data,
                link: resolveRoute(data.link, prefix),
                image: data.image.startsWith('http') ? data.image : prefix + data.image.replace(/^\//, '')
            };
            const card = new ArticleCard(processedData);
            grid.appendChild(card.render());
        });
        console.log(`   ✨ Artículos inyectados estáticamente en #articles-grid`);
    }
}

/**
 * Asegura los metadatos críticos en el head.
 */
function ensureCriticalMeta(document) {
    if (!document.querySelector('meta[charset]')) {
        const meta = document.createElement('meta');
        meta.setAttribute('charset', 'UTF-8');
        document.head.prepend(meta);
    }
    if (!document.querySelector('meta[name="viewport"]')) {
        const meta = document.createElement('meta');
        meta.name = "viewport";
        meta.content = "width=device-width, initial-scale=1.0";
        document.head.appendChild(meta);
    }
}

/**
 * Procesa una sola página para SSG.
 */
async function processPage(pageConfig) {
    const fullPath = path.join(DIST_DIR, pageConfig.path);
    if (!fs.existsSync(fullPath)) return;

    console.log(`📄 Procesando: ${pageConfig.path}`);
    const html = fs.readFileSync(fullPath, 'utf8');
    const dom = new JSDOM(html);
    const document = dom.window.document;

    // Entorno global para componentes que usen document/window
    global.document = document;
    global.window = dom.window;
    global.HTMLElement = dom.window.HTMLElement;

    const prefix = getRelativePrefix(pageConfig.path);
    
    ensureCriticalMeta(document);
    injectBaseLayout(document, prefix, pageConfig.isHome);
    
    if (pageConfig.isHome) {
        const modals = document.getElementById('modals-root');
        if (modals) modals.innerHTML = getHomeModalsHTML();
    }

    await injectHero(document, pageConfig.key, prefix);
    await injectServices(document, pageConfig.key, prefix);
    await injectArticles(document, pageConfig.key, prefix);
    await injectSEO(document, pageConfig.key, pageConfig.path);

    fs.writeFileSync(fullPath, dom.serialize(), 'utf8');
}

/**
 * Orquestador principal de SSG.
 */
async function runSSG() {
    console.log('\n🚀 Iniciando SSG (Static Site Generation)...');
    
    const pages = await getPagesConfig();
    
    for (const page of pages) {
        try {
            await processPage(page);
        } catch (err) {
            console.error(`❌ Error procesando ${page.path}:`, err.message);
        }
    }

    console.log('\n✅ SSG finalizado con éxito.\n');
}

runSSG().catch(err => console.error('❌ Error crítico en SSG:', err));
