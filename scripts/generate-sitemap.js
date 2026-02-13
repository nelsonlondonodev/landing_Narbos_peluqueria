import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import articles from '../js/data/articles.js';

const PROJECT_ROOT = path.join(__dirname, '../');
const SITEMAP_PATH = path.join(__dirname, '../sitemap.xml');
const BASE_URL = 'https://narbossalon.com';
const TODAY = new Date().toISOString().split('T')[0];




/**
 * Helper to recursively find all HTML files
 */
function getHtmlFiles(dir, fileList = [], rootDir = dir) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            if (file !== 'node_modules' && file !== 'dist' && file !== '.git' && file !== '_templates' && file !== 'css' && file !== 'js' && file !== 'images' && file !== 'video' && file !== 'scripts' && file !== 'lang' && file !== 'fidelizacion') {
                getHtmlFiles(filePath, fileList, rootDir);
            }
        } else {
            if (path.extname(file) === '.html') {
                // Calculate relative URL path
                let relativePath = path.relative(rootDir, filePath);
                // Fix path separators for URL
                relativePath = relativePath.split(path.sep).join('/');
                
                // Exclude specific files and templates
                if (!relativePath.includes('google') && !relativePath.includes('.template.')) {
                     fileList.push(relativePath);
                }
            }
        }
    });
    return fileList;
}

/**
 * Genera el XML del sitemap dinámicamente
 */
function generateSitemap() {
    console.log('🚀 Generando sitemap.xml...');

    // 1. Obtener todas las páginas HTML físicas
    const allHtmlFiles = getHtmlFiles(PROJECT_ROOT);
    
    // 2. Definir prioridades base
    const priorityMap = {
        'index.html': '1.0',
        'contacto.html': '0.9',
        'nosotros.html': '0.9',
        'blog/index.html': '0.9'
    };

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    let urlCount = 0;

    // 3. Procesar archivos físicos
    allHtmlFiles.forEach(file => {
        let urlPath = file;
        
        // Normalizar index.html a raíz '/' si es el home, o '/carpeta/'
        if (urlPath === 'index.html') {
            urlPath = '/';
        } else if (urlPath.endsWith('/index.html')) {
            urlPath = urlPath.replace('index.html', '');
        } else if (!urlPath.startsWith('/')) {
            urlPath = '/' + urlPath;
        }

        // Determinar prioridad
        let priority = '0.8'; // Default para landings internas
        if (file in priorityMap) {
            priority = priorityMap[file];
        } else if (file.includes('blog/articles')) {
             // Los artículos se manejan mejor desde el array de datos para tener fechas reales, 
             // pero aquí capturamos los físicos por seguridad. 
             // Verificaremos duplicados abajo.
             priority = '0.7'; 
        }

        const loc = `${BASE_URL}${urlPath}`;
        
        // Evitamos duplicar si ya lo procesamos (simple check)
        // Nota: Esta lógica es simple, asume que 'articles.js' y los archivos físicos coinciden.
        // Para evitar duplicados con la sección de artículos manual de abajo, filtraremos blogs aquí.
        if (!file.includes('blog/articles/')) {
            xml += `
  <url>
    <loc>${loc}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
  </url>`;
            urlCount++;
        }
    });

    // 4. Agregar artículos del blog desde la data (para tener fechas correctas)
    // Esto es mejor que el escaneo de arriba para los posts porque tenemos la fecha de modificación real/meta.
    articles.forEach(article => {
        const link = article.link.startsWith('/') ? article.link : `/${article.link}`;
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
