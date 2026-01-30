import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Rutas
const TEMPLATE_PATH = path.join(__dirname, '../blog/article.template.html');
const ARTICLES_DIR = path.join(__dirname, '../blog/articles');
const DB_PATH = path.join(__dirname, '../js/data/articles.js');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const ask = (question) => new Promise((resolve) => rl.question(question, resolve));

async function createArticle() {
    console.log('\n✨ GENERADOR DE ARTÍCULOS - NARBO\'S SALON ✨\n');

    // 1. Recolección de Datos
    const title = await ask('📝 Título del Artículo: ');
    const slug = await ask('🔗 Slug (URL amigable, ej: mi-nuevo-post): ');
    const description = await ask('📄 Meta Descripción (SEO): ');
    const category = await ask('📂 Categoría (ej: Cuidado Capilar): ');
    const dateInput = await ask('📅 Fecha (YYYY-MM-DD) [Hoy]: ');
    
    // Configuración de Fecha
    const dateObj = dateInput ? new Date(dateInput) : new Date();
    const isoDate = dateObj.toISOString().split('T')[0];
    const displayDate = dateObj.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });

    // Imagen por defecto (Placeholder)
    const imagePath = 'articles/images/image_blog_1.webp'; 

    // 2. Preparar el HTML
    let template = fs.readFileSync(TEMPLATE_PATH, 'utf8');
    
    // Generar el Schema Markup dinámico
    const schemaMarkup = `
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

    const htmlContent = template
        .replace(/{{TITLE}}/g, title)
        .replace(/{{SLUG}}/g, slug)
        .replace(/{{DESCRIPTION}}/g, description)
        .replace(/{{CATEGORY}}/g, category)
        .replace(/{{DATE}}/g, displayDate)
        .replace(/{{IMAGE_PATH}}/g, `/blog/articles/${imagePath}`) // Ruta absoluta para OG tags
        .replace(/{{IMAGE_ALT}}/g, title)
        .replace('<meta name="robots" content="noindex, nofollow" />', schemaMarkup); // Reemplazamos el noindex por el Schema Real

    // 3. Guardar Archivo HTML
    const filename = `${slug}.html`;
    const filePath = path.join(ARTICLES_DIR, filename);
    
    if (fs.existsSync(filePath)) {
        console.error(`\n❌ Error: El archivo ${filename} ya existe.`);
        rl.close();
        return;
    }

    fs.writeFileSync(filePath, htmlContent);
    console.log(`\n✅ Archivo creado: blog/articles/${filename}`);

    // 4. Actualizar Base de Datos (js/data/articles.js)
    try {
        let dbContent = fs.readFileSync(DB_PATH, 'utf8');
        
        // Creamos el nuevo objeto artículo
        const newEntry = `    {
        id: '${slug}',
        date: '${displayDate}',
        isoDate: '${isoDate}',
        category: '${category}',
        title: '${title.replace(/'/g, "\'")}',
        description: '${description.replace(/'/g, "\'")}',
        image: '${imagePath}', // TODO: Cambiar imagen
        alt: '${title.replace(/'/g, "\'")}',
        link: '/blog/articles/${filename}'
    },`;

        // Insertamos al principio del array (después de "const articles = [")
        const updatedDb = dbContent.replace('const articles = [', `const articles = [\n${newEntry}`);
        
        fs.writeFileSync(DB_PATH, updatedDb);
        console.log(`✅ Base de datos actualizada: js/data/articles.js`);
        console.log(`\n🎉 ¡Artículo listo! Ahora edita el contenido en: blog/articles/${filename}`);

    } catch (err) {
        console.error('❌ Error actualizando la base de datos:', err);
    }

    rl.close();
}

createArticle();
