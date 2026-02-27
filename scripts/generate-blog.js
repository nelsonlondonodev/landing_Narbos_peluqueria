import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import articles from '../js/data/articles.js';

const BLOG_INDEX_PATH = path.join(__dirname, '../blog/index.html');

/**
 * Genera el HTML para una tarjeta de artículo
 */
function generateArticleCard(article) {
    const titleHTML = `<a href="${article.link}" class="hover:text-brand-green">${article.title}</a>`;

    const descHTML = `<p class="text-gray-700 mb-4">${article.description}</p>`;

    return `
                <!-- Artículo: ${article.id} -->
                <div class="bg-white rounded-lg shadow-lg overflow-hidden group">
                  <a href="${article.link}" aria-label="Leer artículo: ${article.title.replace(/"/g, '&quot;')}">
                    <img
                      src="${article.image}"
                      alt="${article.alt}"
                      class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </a>
                  <div class="p-6">
                    <p class="text-sm text-gray-500 mb-2">
                      ${article.category} • ${article.date}
                    </p>
                    <h2 class="text-2xl font-serif font-bold text-gray-900 mb-3">
                      ${titleHTML}
                    </h2>
                    ${descHTML}
                    <a
                      href="${article.link}"
                      class="font-bold text-brand-green hover:underline"
                      aria-label="Leer más sobre ${article.title.replace(/"/g, '&quot;')}"
                      >Leer más &rarr;</a
                    >
                  </div>
                </div>`;}

/**
 * Orquestador de la generación del blog
 */
/**
 * Orquestador de la generación del blog
 */
function generateBlog() {
    console.log('🚀 Iniciando generación del índice del blog...');

    try {
        const html = fs.readFileSync(BLOG_INDEX_PATH, 'utf8');
        const articlesHTML = getArticlesHTML();
        const updatedHtml = injectArticles(html, articlesHTML);

        if (updatedHtml) {
            fs.writeFileSync(BLOG_INDEX_PATH, updatedHtml, 'utf8');
            console.log(`✅ Blog actualizado exitosamente con ${articles.length} artículos.`);
        }
    } catch (error) {
        console.error('❌ Error crítico al generar el blog:', error);
    }
}

/**
 * Genera el bloque completo de HTML para todos los artículos.
 */
function getArticlesHTML() {
    return [...articles]
        .sort((a, b) => new Date(b.isoDate) - new Date(a.isoDate))
        .map(generateArticleCard)
        .join('\n');
}

/**
 * Inyecta el HTML de los artículos en el template del índice.
 */
function injectArticles(html, articlesHTML) {
    const regex = /<!-- ARTICLES_START -->[\s\S]*<!-- ARTICLES_END -->/;
    const newContent = `<!-- ARTICLES_START -->${articlesHTML}\n            <!-- ARTICLES_END -->`;

    if (regex.test(html)) {
        return html.replace(regex, newContent);
    } else {
        console.error('❌ Error: No se encontraron los marcadores <!-- ARTICLES_START --> y <!-- ARTICLES_END --> en blog/index.html');
        return null;
    }
}

generateBlog();
