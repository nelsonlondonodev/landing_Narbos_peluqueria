import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import articles from '../js/data/articles.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.join(__dirname, '../');

const BASE_URL = 'https://narbossalon.com';
const API_KEY = 'b8b6862532c83ede0ba40f5eb5c840fc';
const KEY_LOCATION = `${BASE_URL}/${API_KEY}.txt`;

/**
 * Helper to recursively find all HTML files (reusing your sitemap logic)
 */
function getHtmlFiles(dir, fileList = [], rootDir = dir) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            const excludedDirs = ['node_modules', 'dist', '.git', '_templates', 'css', 'js', 'images', 'video', 'scripts', 'lang', 'fidelizacion', 'legal'];
            if (!excludedDirs.includes(file)) {
                getHtmlFiles(filePath, fileList, rootDir);
            }
        } else {
            if (path.extname(file) === '.html') {
                let relativePath = path.relative(rootDir, filePath);
                relativePath = relativePath.split(path.sep).join('/');
                if (!relativePath.includes('google') && !relativePath.includes('.template.')) {
                     fileList.push(relativePath);
                }
            }
        }
    });
    return fileList;
}

/**
 * Get all project URLs
 */
function getAllUrls() {
    const urls = [];
    const allHtmlFiles = getHtmlFiles(PROJECT_ROOT);
    
    // Process physical files
    allHtmlFiles.forEach(file => {
        let urlPath = file;
        if (urlPath === 'index.html') {
            urlPath = '/';
        } else {
            urlPath = urlPath.replace('/index.html', '/').replace('index.html', '');
            if (urlPath.endsWith('.html')) urlPath = urlPath.slice(0, -5);
        }
        if (!urlPath.startsWith('/')) urlPath = '/' + urlPath;
        
        if (!file.includes('blog/articles/')) {
            urls.push(`${BASE_URL}${urlPath}`);
        }
    });

    // Add blog articles
    articles.forEach(article => {
        let link = article.link.startsWith('/') ? article.link : `/${article.link}`;
        if (link.endsWith('.html')) link = link.slice(0, -5);
        urls.push(`${BASE_URL}${link}`);
    });

    return [...new Set(urls)]; // Remove duplicates
}

/**
 * Notify IndexNow (Bing)
 */
async function notifyIndexNow() {
    const urlList = getAllUrls();
    console.log(`🚀 Preparando el envío de ${urlList.length} URLs a IndexNow...`);

    const data = {
        host: 'narbossalon.com',
        key: API_KEY,
        keyLocation: KEY_LOCATION,
        urlList: urlList
    };

    try {
        const response = await fetch('https://api.indexnow.org/indexnow', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            console.log('✅ ¡Éxito! Las URLs han sido enviadas a IndexNow.');
            console.log('Bing y otros buscadores procesarán los cambios pronto.');
        } else {
            const errorText = await response.text();
            console.error(`❌ Error al enviar a IndexNow: ${response.status} ${response.statusText}`);
            console.error(errorText);
        }
    } catch (error) {
        console.error('❌ Error de red al conectar con IndexNow:', error.message);
    }
}

notifyIndexNow();
