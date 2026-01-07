
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { JSDOM } from 'jsdom';

// Importar componentes y datos (Nota: Node necesita que sean módulos compatibles o usaremos trucos)
// Dado que ServiceCard es un módulo ES6 diseñado para el navegador, lo importaremos directamente.
// Si hay dependencias del DOM en el top-level del módulo, podría fallar. Asumimos que ServiceCard es seguro.
import { ServiceCard } from '../js/components/ServiceCard.js';
import { servicesData } from '../js/data/servicesData.js';
import { hairSalonServices } from '../js/data/hairSalonServices.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.join(__dirname, '../dist');

async function runSSG() {
    console.log('🚀 Iniciando SSG (Static Site Generation)...');

    // 1. Procesar index.html (Home)
    const indexPath = path.join(DIST_DIR, 'index.html');
    if (fs.existsSync(indexPath)) {
        console.log('Rendering services for index.html...');
        let html = fs.readFileSync(indexPath, 'utf8');
        const dom = new JSDOM(html);
        const document = dom.window.document;
        
        // Simular entorno global para que ServiceCard funcione si usa document/window
        global.document = document;
        global.window = dom.window;
        global.HTMLElement = dom.window.HTMLElement;

        const grid = document.getElementById('services-grid');
        if (grid) {
            servicesData.forEach(data => {
                const card = new ServiceCard(data);
                grid.appendChild(card.render());
            });
            
            // Serializar de vuelta a HTML
            fs.writeFileSync(indexPath, dom.serialize());
            console.log('✅ index.html pre-renderizado.');
        } else {
            console.warn('⚠️ No se encontró #services-grid en index.html');
        }
    }

    // 2. Procesar páginas de servicios (Peluquería y derivadas)
    const hairServiceFiles = [
        'peluqueria/index.html',
        'cortes-de-pelo-en-chia.html',
        'barberia-en-chia.html',
        'balayage-y-color-en-chia.html',
        'tratamientos-capilares-chia.html',
        'servicios/unas-manicura-pedicura-chia.html',
        'servicios/spa-y-estetica-facial-chia.html',
        'servicios/depilacion-y-pestanas-chia.html'
    ];

    for (const relativePath of hairServiceFiles) {
        const fullPath = path.join(DIST_DIR, relativePath);
        if (fs.existsSync(fullPath)) {
            console.log(`Rendering services for ${relativePath}...`);
            let html = fs.readFileSync(fullPath, 'utf8');
            const dom = new JSDOM(html);
            const document = dom.window.document;
            
            global.document = document;
            global.window = dom.window;

            const grid = document.getElementById('hair-services-grid');
            if (grid) {
                // Limpiar contenido existente si lo hay
                grid.innerHTML = '';
                hairSalonServices.forEach(data => {
                    const card = new ServiceCard(data);
                    grid.appendChild(card.render());
                });

                fs.writeFileSync(fullPath, dom.serialize());
                console.log(`✅ ${relativePath} pre-renderizado.`);
            } else {
                console.warn(`⚠️ No se encontró #hair-services-grid en ${relativePath}`);
            }
        }
    }
}

runSSG().catch(err => console.error(err));
