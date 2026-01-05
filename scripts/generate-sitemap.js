import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import articles from '../js/data/articles.js';

const SITEMAP_PATH = path.join(__dirname, '../sitemap.xml');
const BASE_URL = 'https://narbossalon.com';
const TODAY = new Date().toISOString().split('T')[0];

/**
 * Genera el XML del sitemap dinámicamente
 */
function generateSitemap() {
    console.log('🚀 Generando sitemap.xml...');

    const staticPages = [
        { loc: '/', priority: '1.0', changefreq: 'monthly' },
        { loc: '/#servicios', priority: '0.8', changefreq: 'monthly' },
        { loc: '/#nosotros', priority: '0.7', changefreq: 'monthly' },
        { loc: '/#galeria', priority: '0.7', changefreq: 'monthly' },
        { loc: '/#resenas', priority: '0.8', changefreq: 'monthly' },
        { loc: '/#ubicacion', priority: '0.9', changefreq: 'yearly' },
        { loc: '/#contacto', priority: '0.9', changefreq: 'yearly' },
        { loc: '/blog/', priority: '0.9', changefreq: 'monthly' },
    ];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    // 1. Agregar páginas estáticas
    staticPages.forEach(page => {
        xml += `
  <url>
    <loc>${BASE_URL}${page.loc}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
    });

    // 2. Agregar artículos del blog dinámicamente
    articles.forEach(article => {
        // Asegurarse de que el link empiece con /
        const link = article.link.startsWith('/') ? article.link : `/${article.link}`;
        xml += `
  <url>
    <loc>${BASE_URL}${link}</loc>
    <lastmod>${article.isoDate || TODAY}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
    });

    xml += `\n</urlset>`;

    try {
        fs.writeFileSync(SITEMAP_PATH, xml, 'utf8');
        console.log(`✅ sitemap.xml generado exitosamente con ${staticPages.length + articles.length} URLs.`);
    } catch (error) {
        console.error('❌ Error al escribir sitemap.xml:', error);
    }
}

generateSitemap();
