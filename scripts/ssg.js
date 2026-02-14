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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.join(__dirname, '../dist');

/**
 * Configuración dinámica de rutas para SSG
 */
async function getPagesConfig() {
    const basePages = [
        { path: 'index.html', isHome: true, key: 'home' },
        { path: 'peluqueria/index.html', key: 'peluqueria' },
        { path: 'servicios/barberia/index.html', key: 'barberia' },
        { path: 'nosotros.html', key: 'nosotros' },
        { path: 'contacto.html', key: 'contacto' },
        { path: 'blog/index.html', key: 'blog' },
        
        // Peluquería Específicos
        { path: 'servicios/peluqueria/index.html', key: 'peluqueria' },
        { path: 'servicios/peluqueria/balayage-mechas.html', key: 'balayage-mechas' },
        { path: 'servicios/peluqueria/color-tinturas-cabello.html', key: 'color-tinturas-cabello' },
        { path: 'servicios/peluqueria/cortes-de-pelo.html', key: 'cortes-de-pelo' },
        { path: 'servicios/peluqueria/tratamientos-capilares.html', key: 'tratamientos-capilares' },

        // Estética Específicos
        { path: 'servicios/estetica/index.html', key: 'estetica' },
        { path: 'servicios/estetica/limpieza-facial.html', key: 'limpieza-facial' },
        { path: 'servicios/estetica/spa-facial-integral.html', key: 'spa-facial-integral' },
        { path: 'servicios/estetica/cejas-y-pestanas.html', key: 'cejas-y-pestanas' },
        { path: 'servicios/estetica/masajes-relajantes.html', key: 'masajes-relajantes' },

        // Uñas Específicos
        { path: 'servicios/unas-spa/index.html', key: 'unas-spa' },
        { path: 'servicios/unas-spa/manicure-pedicure.html', key: 'manicure-pedicure' },
        { path: 'servicios/unas-spa/unas-acrilicas-gel.html', key: 'unas-acrilicas-gel' },

        // Rutas legacy o alias
        { path: 'cortes-de-pelo-en-chia.html', key: 'cortes-de-pelo' },
        { path: 'balayage-y-color-en-chia.html', key: 'balayage-mechas' },
        { path: 'tratamientos-capilares-chia.html', key: 'tratamientos-capilares' }
    ];

    // Detectar automáticamente artículos del blog
    const articlesDir = path.join(DIST_DIR, 'blog/articles');
    if (fs.existsSync(articlesDir)) {
        const articles = fs.readdirSync(articlesDir)
            .filter(file => file.endsWith('.html'))
            .map(file => ({ path: `blog/articles/${file}` }));
        return [...basePages, ...articles];
    }

    return basePages;
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
        const { getHeroHTML } = await import('../js/components/HeroSection.js');
        heroRoot.innerHTML = getHeroHTML(heroData);
        console.log(`   ✨ Hero inyectado (key: ${pageKey})`);
    }
}

/**
 * Inyecta la grilla de servicios correspondiente.
 */
async function injectServices(document, pageKey, prefix) {
    const gridId = pageKey === 'barberia' ? 'barber-services-grid' : 'hair-services-grid';
    const grid = document.getElementById(gridId) || document.getElementById('services-grid');
    
    if (!grid) return;

    grid.innerHTML = '';
    let servicesSource = servicesData; // Default home

    if (pageKey === 'barberia') {
        const { barberServices } = await import('../js/data/barberServices.js');
        servicesSource = barberServices;
    } else if (pageKey === 'peluqueria') {
        servicesSource = hairSalonServices;
    }

    servicesSource.forEach(data => {
        const processedData = {
            ...data,
            link: data.link.startsWith('http') ? data.link : prefix + data.link.replace(/^\//, ''),
            image: data.image.startsWith('http') ? data.image : prefix + data.image.replace(/^\//, '')
        };
        const card = new ServiceCard(processedData);
        grid.appendChild(card.render());
    });
    console.log(`   ✨ Servicios inyectados en #${grid.id}`);
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
