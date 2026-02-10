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
 * Genera el Schema Markup (JSON-LD) para el artículo, incluyendo FAQs si existen.
 */
function generateSchemaMarkup(data) {
    const { title, description, imagePath, isoDate, slug, faqs } = data;
    
    const blogPostingSchema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": title.replace(/"/g, '\\"'),
      "description": description.replace(/"/g, '\\"'),
      "image": `https://narbossalon.com/${imagePath}`,
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
      "datePublished": isoDate,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://narbossalon.com/blog/articles/${slug}.html"
      }
    };

    let schemas = [blogPostingSchema];

    if (faqs && faqs.length > 0) {
        const faqSchema = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.answer
                }
            }))
        };
        schemas.push(faqSchema);
    }

    return schemas.map(s => `<script type="application/ld+json">${JSON.stringify(s)}</script>`).join('\n    ');
}

/**
 * Genera el HTML para la sección de FAQ.
 */
function generateFAQHTML(faqs) {
    if (!faqs || faqs.length === 0) return '';

    const faqItems = faqs.map(faq => `
                <details class="group border-b border-gray-200 pb-4">
                    <summary class="flex justify-between items-center font-bold text-gray-900 cursor-pointer list-none py-4 px-2 hover:bg-gray-50 transition-colors">
                        <span>${faq.question}</span>
                        <span class="transition-transform group-open:rotate-180">
                            <svg class="w-5 h-5 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </span>
                    </summary>
                    <div class="faq-content overflow-hidden px-4 text-gray-700 leading-relaxed">
                        <p class="py-4">${faq.answer}</p>
                    </div>
                </details>`).join('');

    return `
              <section id="article-faq" class="mt-16 pt-16 border-t border-gray-100 animate__animated animate__fadeInUp">
                <h2 class="text-3xl font-serif font-bold text-gray-900 mb-8">Preguntas frecuentes</h2>
                <div class="space-y-4">
                    ${faqItems}
                </div>
              </section>`;
}

/**
 * Procesa el template HTML reemplazando placeholders.
 */
function processTemplate(data) {
    const { title, slug, description, category, displayDate, imagePath, schemaMarkup, breadcrumbTitle, faqHTML } = data;
    const template = fs.readFileSync(PATHS.TEMPLATE, 'utf8');

    return template
        .replace(/{{TITLE}}/g, title)
        .replace(/{{SLUG}}/g, slug)
        .replace(/{{DESCRIPTION}}/g, description)
        .replace(/{{CATEGORY}}/g, category)
        .replace(/{{DATE}}/g, displayDate)
        .replace(/{{BREADCRUMB_TITLE}}/g, breadcrumbTitle)
        .replace(/{{IMAGE_PATH}}/g, `/blog/articles/${imagePath}`)
        .replace(/{{IMAGE_ALT}}/g, title)
        .replace(/{{FAQ_SECTION}}/g, faqHTML)
        .replace('<!-- Robots: This will be replaced by JSON-LD Schema in production articles -->', schemaMarkup);
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
        const breadcrumbTitle = await ask('🍞 Título corto para Breadcrumbs (opcional): ');
        const category = await ask('📂 Categoría: ');
        const dateInput = await ask('📅 Fecha (YYYY-MM-DD) [Hoy]: ');
        
        console.log('\n❓ SECCIÓN DE PREGUNTAS FRECUENTES (FAQ)');
        const faqs = [];
        let addFaq = await ask('¿Deseas añadir FAQs? (s/n): ');
        while (addFaq.toLowerCase() === 's') {
            const question = await ask('   Pregunta: ');
            const answer = await ask('   Respuesta: ');
            faqs.push({ question, answer });
            addFaq = await ask('   ¿Añadir otra? (s/n): ');
        }

        const { iso, display } = getFormattedDates(dateInput);
        const imagePath = 'images/image_blog_1.webp'; // Relativa a blog/articles/
        const filename = `${slug}.html`;
        const filePath = path.join(PATHS.ARTICLES_DIR, filename);

        if (fs.existsSync(filePath)) {
            throw new Error(`El archivo ${filename} ya existe.`);
        }

        const absoluteImagePath = `blog/articles/${imagePath}`;
        const schemaMarkup = generateSchemaMarkup({ 
            title, description, imagePath: absoluteImagePath, 
            isoDate: iso, slug, faqs 
        });
        const faqHTML = generateFAQHTML(faqs);
        
        const htmlContent = processTemplate({
            title, slug, description, category, 
            displayDate: display, imagePath, schemaMarkup,
            breadcrumbTitle: breadcrumbTitle || title,
            faqHTML
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
