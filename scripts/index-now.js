import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import articles from '../js/data/articles.js';
import { getHtmlFiles, normalizeUrlPath } from './utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.join(__dirname, '../');

const BASE_URL = 'https://narbossalon.com';

/**
 * Detecta la clave de IndexNow desde los archivos .txt de la raíz
 */
function detectApiKey() {
    const files = fs.readdirSync(PROJECT_ROOT);
    // Busca un archivo .txt que tenga exactamente 32 caracteres hexadecimales (el patrón que generamos)
    const keyFile = files.find(f => /^[a-f0-9]{32}\.txt$/.test(f));
    
    if (!keyFile) {
        throw new Error('No se encontró el archivo de clave IndexNow (.txt de 32 caracteres) en la raíz.');
    }
    
    const key = keyFile.replace('.txt', '');
    return { key, location: `${BASE_URL}/${keyFile}` };
}

/**
 * Recopila todas las URLs del sitio
 */
function collectAllUrls() {
    const urls = new Set();
    
    // 1. Archivos físicos HTML
    getHtmlFiles(PROJECT_ROOT).forEach(file => {
        if (!file.includes('blog/articles/')) {
            urls.add(`${BASE_URL}${normalizeUrlPath(file)}`);
        }
    });

    // 2. Artículos del blog desde data
    articles.forEach(article => {
        let link = article.link.startsWith('/') ? article.link : `/${article.link}`;
        if (link.endsWith('.html')) link = link.slice(0, -5);
        urls.add(`${BASE_URL}${link}`);
    });

    return Array.from(urls);
}

/**
 * Ejecuta la notificación a IndexNow
 */
async function runIndexNow() {
    try {
        const { key, location } = detectApiKey();
        const urlList = collectAllUrls();

        console.log(`\n🚀 IndexNow: Iniciando envío para ${BASE_URL}`);
        console.log(`🔑 Clave detectada: ${key}`);
        console.log(`📄 URLs a indexar: ${urlList.length}\n`);

        const response = await fetch('https://api.indexnow.org/indexnow', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            body: JSON.stringify({
                host: new URL(BASE_URL).hostname,
                key: key,
                keyLocation: location,
                urlList: urlList
            })
        });

        if (response.ok) {
            console.log('✅ ¡Éxito! Bing y otros buscadores han sido notificados correctamente.\n');
        } else {
            const error = await response.text();
            console.error(`❌ Error (${response.status}): ${error}`);
        }
    } catch (error) {
        console.error(`❌ Error en IndexNow: ${error.message}`);
    }
}

runIndexNow();
