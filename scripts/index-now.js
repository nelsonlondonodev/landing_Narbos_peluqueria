import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import articles from '../js/data/articles.js';
import { getHtmlFiles, normalizeUrlPath } from './utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.join(__dirname, '../');

const ENDPOINTS = [
    { name: 'IndexNow Global (Microsoft)', url: 'https://api.indexnow.org/indexnow' },
    { name: 'Bing Direct', url: 'https://www.bing.com/indexnow' },
    { name: 'Yandex Direct', url: 'https://yandex.com/indexnow' }
];

/**
 * Detecta la clave de IndexNow desde los archivos .txt de la raíz
 */
function detectApiKey() {
    const files = fs.readdirSync(PROJECT_ROOT);
    const keyFile = files.find(f => /^[a-f0-9]{32}\.txt$/.test(f));
    
    if (!keyFile) {
        throw new Error('No se encontró el archivo de clave IndexNow (.txt de 32 caracteres) en la raíz.');
    }
    
    const key = keyFile.replace('.txt', '');
    return { key, keyFile };
}

/**
 * Recopila todas las URLs del sitio para un base URL dado
 */
function collectAllUrls(baseUrl) {
    const urls = new Set();
    
    // 1. Archivos físicos HTML
    getHtmlFiles(PROJECT_ROOT).forEach(file => {
        if (!file.includes('blog/articles/')) {
            urls.add(`${baseUrl}${normalizeUrlPath(file)}`);
        }
    });

    // 2. Artículos del blog desde data
    articles.forEach(article => {
        let link = article.link.startsWith('/') ? article.link : `/${article.link}`;
        if (link.endsWith('.html')) link = link.slice(0, -5);
        urls.add(`${baseUrl}${link}`);
    });

    return Array.from(urls);
}

/**
 * Construye el payload para un hostname y clave dados
 */
function buildPayload(baseUrl, key, keyFile) {
    const hostname = new URL(baseUrl).hostname;
    return {
        host: hostname,
        key: key,
        keyLocation: `${baseUrl}/${keyFile}`,
        urlList: collectAllUrls(baseUrl)
    };
}

/**
 * Envía la petición a un endpoint específico
 */
async function submitToEndpoint(endpoint, payload) {
    console.log(`📡 Enviando a ${endpoint.name} (${payload.host})...`);
    try {
        const response = await fetch(endpoint.url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            body: JSON.stringify(payload)
        });

        const status = response.status;
        const text = await response.text();
        
        if (response.ok) {
            return { success: true, status, text };
        } else {
            return { success: false, status, text };
        }
    } catch (err) {
        return { success: false, status: 500, text: err.message };
    }
}

/**
 * Invoca el ciclo completo
 */
async function runIndexNow() {
    try {
        const { key, keyFile } = detectApiKey();
        
        // Hostnames de inicio y alternativo
        const primaryBaseUrl = 'https://narbossalon.com';
        const alternativeBaseUrl = 'https://www.narbossalon.com';

        console.log(`\n🚀 Iniciando motor de indexación robusta IndexNow`);
        console.log(`🔑 Clave detectada: ${key}`);
        
        const results = [];

        for (const endpoint of ENDPOINTS) {
            console.log(`\n--- Evaluando buscador: ${endpoint.name} ---`);
            
            // Intento 1: Hostname Primario (non-www)
            let payload = buildPayload(primaryBaseUrl, key, keyFile);
            let res = await submitToEndpoint(endpoint, payload);

            // Si falla por 403 o 401, intentamos con el hostname alternativo (www)
            if (!res.success && (res.status === 403 || res.status === 401)) {
                console.log(`⚠️ Advertencia: Intento primario falló con código ${res.status}. Conmutando de host a ${new URL(alternativeBaseUrl).hostname}...`);
                payload = buildPayload(alternativeBaseUrl, key, keyFile);
                res = await submitToEndpoint(endpoint, payload);
            }

            if (res.success) {
                console.log(`✅ ¡Éxito! ${endpoint.name} aceptó el envío (Código: ${res.status}).`);
                results.push({ endpoint: endpoint.name, status: `Éxito (${res.status})`, hostUsed: payload.host });
            } else {
                console.error(`❌ Falló ${endpoint.name} (Código: ${res.status}): ${res.text}`);
                results.push({ endpoint: endpoint.name, status: `Error (${res.status})`, hostUsed: payload.host });
            }
        }

        console.log(`\n📊 REPORT DE INDEXACIÓN INDEXNOW:`);
        console.table(results);
        console.log('\n');

    } catch (error) {
        console.error(`❌ Error general en IndexNow: ${error.message}`);
    }
}

runIndexNow();
