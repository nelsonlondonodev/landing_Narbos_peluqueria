
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
    // Importamos la configuración compartida (Dinámica para soportar ESM en build script si es necesario, 
    // pero como ssg.js es modules, probaremos import estático o dinámico. 
    // Nota: 'pagesData.js' usa export const, debe funcionar con import estático arriba si configuramos bien,
    // pero para evitar conflictos de ruta relativa en ejecución node, usaremos import() dinámico.
    
    const { pagesData } = await import('../js/data/pagesData.js');

    const pagesConfig = [
        {
            path: 'peluqueria/index.html',
            key: 'peluqueria'
        },
        {
            path: 'servicios/barberia/index.html',
            key: 'barberia'
        },
        // Mapeo para otras páginas (se irán migrando)
        { path: 'cortes-de-pelo-en-chia.html' },
        { path: 'barberia-en-chia.html' },
        { path: 'balayage-y-color-en-chia.html' },
        { path: 'tratamientos-capilares-chia.html' },
        { path: 'servicios/unas-manicura-pedicura-chia.html' },
        { path: 'servicios/spa-y-estetica-facial-chia.html' },
        { path: 'servicios/depilacion-y-pestanas-chia.html' }
    ];

    for (const pageConfig of pagesConfig) {
        const relativePath = pageConfig.path;
        const fullPath = path.join(DIST_DIR, relativePath);
        
        if (fs.existsSync(fullPath)) {
            console.log(`Rendering services/hero for ${relativePath}...`);
            let html = fs.readFileSync(fullPath, 'utf8');
            const dom = new JSDOM(html);
            const document = dom.window.document;
            
            global.document = document;
            global.window = dom.window;

            // A. Inyección de Servicios (Lógica dinámica por página)
            const gridId = pageConfig.key === 'barberia' ? 'barber-services-grid' : 'hair-services-grid';
            const grid = document.getElementById(gridId);
            
            if (grid) {
                grid.innerHTML = '';
                
                // Determinar qué datos usar
                let servicesSource = [];
                if (pageConfig.key === 'barberia') {
                    // Importación dinámica si es posible, o usar la importada arriba si la añadimos
                    // Para simplificar, asumiremos que importamos todo arriba o hacemos un switch aquí
                    const { barberServices } = await import('../js/data/barberServices.js');
                    servicesSource = barberServices;
                } else {
                    // Por defecto Peluquería
                    servicesSource = hairSalonServices;
                }

                servicesSource.forEach(data => {
                    const card = new ServiceCard(data);
                    grid.appendChild(card.render());
                });
                console.log(`✨ Servicios inyectados en ${gridId} para ${relativePath}`);
            }

            // B. Inyección de Hero (Nueva lógica)
            if (pageConfig.key && pagesData[pageConfig.key] && pagesData[pageConfig.key].hero) {
                const heroData = pagesData[pageConfig.key].hero;
                const heroRoot = document.getElementById('hero-root');
                
                if (heroRoot) {
                     const { getHeroHTML } = await import('../js/components/HeroSection.js');
                     heroRoot.innerHTML = getHeroHTML(heroData);
                     console.log(`✨ Hero inyectado en ${relativePath}`);
                } else {
                    console.warn(`⚠️ No se encontró #hero-root en ${relativePath}, saltando inyección de Hero.`);
                }
            }


            fs.writeFileSync(fullPath, dom.serialize());
            console.log(`✅ ${relativePath} procesado.`);
        }
    }
}

runSSG().catch(err => console.error(err));
