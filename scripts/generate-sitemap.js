import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import articles from '../js/data/articles.js';
import { getHtmlFiles, normalizeUrlPath } from './utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROJECT_ROOT = path.join(__dirname, '../');
const SITEMAP_PATH = path.join(__dirname, '../sitemap.xml');
const BASE_URL = 'https://narbossalon.com';
const TODAY = new Date().toISOString().split('T')[0];

/**
 * Genera el XML del sitemap dinámicamente
 */
function generateSitemap() {
    console.log('🚀 Generando sitemap.xml...');

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

        const urlPath = normalizeUrlPath(file);
        const priority = priorityMap[file] || '0.8';
        const loc = `${BASE_URL}${urlPath}`;
        
        xml += `
  <url>
    <loc>${loc}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
  </url>`;
        urlCount++;
    });

    // 2. Agregar artículos del blog
    articles.forEach(article => {
        let link = article.link.startsWith('/') ? article.link : `/${article.link}`;
        if (link.endsWith('.html')) link = link.slice(0, -5);
        
        xml += `
  <url>
    <loc>${BASE_URL}${link}</loc>
    <lastmod>${article.isoDate || TODAY}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
        urlCount++;
    });

    xml += `\n</urlset>`;

    try {
        fs.writeFileSync(SITEMAP_PATH, xml, 'utf8');
        console.log(`✅ sitemap.xml generado exitosamente con ${urlCount} URLs.`);
    } catch (error) {
        console.error('❌ Error al escribir sitemap.xml:', error);
    }
}

generateSitemap();
