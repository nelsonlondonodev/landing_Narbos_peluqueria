import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import articles from '../js/data/articles.js';
import { SITE_URL } from '../js/config.js';
import { getHtmlFiles, normalizeUrlPath } from './utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROJECT_ROOT = path.join(__dirname, '../');
const SITEMAP_PATH = path.join(__dirname, '../sitemap.xml');

/**
 * Fecha de `lastmod` de un artículo: la de `dateModified` de su JSON-LD, que es la que se
 * actualiza al revisarlo. `isoDate` es la de publicación y solo queda de reserva.
 * @param {string} html
 * @param {string} [isoDate]
 * @returns {string | undefined}
 */
export function articleLastmod(html, isoDate) {
    return html.match(/"dateModified"\s*:\s*"(\d{4}-\d{2}-\d{2})/)?.[1] ?? isoDate;
}

/**
 * @param {{ loc: string, lastmod?: string, priority: string }} entry
 * @returns {string}
 */
function urlEntry({ loc, lastmod, priority }) {
    const lastmodLine = lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : '';
    return `
  <url>
    <loc>${loc}</loc>${lastmodLine}
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

/**
 * Construye el XML del sitemap.
 *
 * Las páginas fijas van sin `lastmod`: su contenido sale de `pagesData` y `masterPrices`,
 * así que ni la fecha del build ni la del HTML en git dicen cuándo cambiaron, y Google
 * deja de hacer caso a un `lastmod` que no es fiable.
 * @returns {{ xml: string, urlCount: number }}
 */
export function buildSitemap() {
    const allHtmlFiles = getHtmlFiles(PROJECT_ROOT);
    const priorityMap = {
        'index.html': '1.0',
        'contacto.html': '0.9',
        'nosotros.html': '0.9',
        '/blog/': '0.9'
    };

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    let urlCount = 0;

    // 1. Procesar archivos físicos
    allHtmlFiles.forEach(file => {
        if (file.includes('blog/articles/') || file.includes('legal/') || file === '404.html') return;

        // Una página con `noindex` no va al sitemap: incluirla es pedirle a Google que
        // indexe lo que la propia página le prohíbe indexar. `limpieza-facial` es un
        // sello de redirección hacia `spa-facial-integral` —noindex, canónica y meta
        // refresh— y llevaba meses anunciándose en el sitemap, que es la «Excluida por
        // una etiqueta noindex» que reporta Search Console.
        const html = fs.readFileSync(path.join(PROJECT_ROOT, file), 'utf8');
        if (/<meta[^>]+name=["']robots["'][^>]+noindex/i.test(html)) return;

        const urlPath = normalizeUrlPath(file);
        const priority = priorityMap[file] || '0.8';
        const loc = `${SITE_URL}${urlPath}`;
        
        xml += urlEntry({ loc, priority });
        urlCount++;
    });

    // 2. Agregar artículos del blog
    articles.forEach(article => {
        const link = article.link.replace(/^\/?/, '/').replace(/\.html$/, '');
        const htmlPath = path.join(PROJECT_ROOT, `${link}.html`);
        const html = fs.existsSync(htmlPath) ? fs.readFileSync(htmlPath, 'utf8') : '';
        xml += urlEntry({
            loc: `${SITE_URL}${link}`,
            lastmod: articleLastmod(html, article.isoDate),
            priority: '0.8'
        });
        urlCount++;
    });

    xml += `\n</urlset>`;
    return { xml, urlCount };
}

function generateSitemap() {
    console.log('🚀 Generando sitemap.xml...');
    const { xml, urlCount } = buildSitemap();

    try {
        fs.writeFileSync(SITEMAP_PATH, xml, 'utf8');
        console.log(`✅ sitemap.xml generado exitosamente con ${urlCount} URLs.`);
    } catch (error) {
        console.error('❌ Error al escribir sitemap.xml:', error);
    }
}

if (process.argv[1] === __filename) generateSitemap();
