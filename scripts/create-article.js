import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- CONFIGURACIÓN DE RUTAS ---
const PATHS = {
    TEMPLATE: path.join(__dirname, '../blog/article.template.html'),
    ARTICLES_DIR: path.join(__dirname, '../blog/articles'),
    DB: path.join(__dirname, '../js/data/articles.js')
};

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/**
 * Función auxiliar para realizar preguntas en la consola.
 */
const ask = (question) => new Promise((resolve) => rl.question(question, resolve));

/**
 * Formatea las fechas para el artículo.
 */
function getFormattedDates(dateInput) {
    const dateObj = dateInput ? new Date(dateInput) : new Date();
    return {
        iso: dateObj.toISOString().split('T')[0],
        display: dateObj.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
    };
}

/**
 * Genera el Schema Markup (JSON-LD) para el artículo.
 */
function generateSchemaMarkup(data) {
    const { title, description, imagePath, isoDate, slug } = data;
    return `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": "${title.replace(/"/g, '\\"')}",
      "description": "${description.replace(/"/g, '\\"')}",
      "image": "https://narbossalon.com/blog/articles/${imagePath}",
      "author": {
        "@type": "Organization",
        "name": "Narbo's Salón Spa"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Narbo's Salón Spa",
        "logo": {
          "@type": "ImageObject",
          "url": "https://narbossalon.com/images/brand/logo-narbos-negro.webp"
        }
      },
      "datePublished": "${isoDate}",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://narbossalon.com/blog/articles/${slug}.html"
      }
    }
    </script>`;
}

/**
 * Procesa el template HTML reemplazando placeholders.
 */
function processTemplate(data) {
    const { title, slug, description, category, displayDate, imagePath, schemaMarkup } = data;
    const template = fs.readFileSync(PATHS.TEMPLATE, 'utf8');

    return template
        .replace(/{{TITLE}}/g, title)
        .replace(/{{SLUG}}/g, slug)
        .replace(/{{DESCRIPTION}}/g, description)
        .replace(/{{CATEGORY}}/g, category)
        .replace(/{{DATE}}/g, displayDate)
        .replace(/{{IMAGE_PATH}}/g, `/blog/articles/${imagePath}`)
        .replace(/{{IMAGE_ALT}}/g, title)
        .replace('<meta name="robots" content="noindex, nofollow" />', schemaMarkup);
}

/**
 * Actualiza la base de datos de artículos (js/data/articles.js).
 */
function updateArticlesDatabase(data) {
    const { slug, displayDate, isoDate, category, title, description, imagePath, filename } = data;
    const dbContent = fs.readFileSync(PATHS.DB, 'utf8');

    const newEntry = `    {
        id: '${slug}',
        date: '${displayDate}',
        isoDate: '${isoDate}',
        category: '${category}',
        title: '${title.replace(/'/g, "\\'")}',
        description: '${description.replace(/'/g, "\\'")}',
        image: '${imagePath}',
        alt: '${title.replace(/'/g, "\\'")}',
        link: '/blog/articles/${filename}'
    },`;

    const updatedDb = dbContent.replace('const articles = [', `const articles = [\n${newEntry}`);
    fs.writeFileSync(PATHS.DB, updatedDb);
    console.log(`✅ Base de datos actualizada: js/data/articles.js`);
}

/**
 * Función principal para orquestar la creación del artículo.
 */
async function main() {
    try {
        console.log('\n✨ GENERADOR DE ARTÍCULOS - NARBO\'S SALON ✨\n');

        const title = await ask('📝 Título del Artículo: ');
        const slug = await ask('🔗 Slug (URL amigable): ');
        const description = await ask('📄 Meta Descripción (SEO): ');
        const category = await ask('📂 Categoría: ');
        const dateInput = await ask('📅 Fecha (YYYY-MM-DD) [Hoy]: ');

        const { iso, display } = getFormattedDates(dateInput);
        const imagePath = 'images/image_blog_1.webp'; // Relativa a blog/articles/
        const filename = `${slug}.html`;
        const filePath = path.join(PATHS.ARTICLES_DIR, filename);

        if (fs.existsSync(filePath)) {
            throw new Error(`El archivo ${filename} ya existe.`);
        }

        // Para Schema y OG tags necesitamos la URL absoluta o raíz
        const absoluteImagePath = `blog/articles/${imagePath}`;

        const schemaMarkup = generateSchemaMarkup({ title, description, imagePath: absoluteImagePath, isoDate: iso, slug });
        
        const htmlContent = processTemplate({
            title, slug, description, category, 
            displayDate: display, imagePath, schemaMarkup
        });

        fs.writeFileSync(filePath, htmlContent);
        console.log(`\n✅ Archivo creado: blog/articles/${filename}`);

        updateArticlesDatabase({
            slug, displayDate: display, isoDate: iso, 
            category, title, description, imagePath, filename
        });

        console.log(`\n🎉 ¡Artículo listo! Edita el contenido en: blog/articles/${filename}`);

    } catch (error) {
        console.error(`\n❌ Error: ${error.message}`);
    } finally {
        rl.close();
    }
}

main();
