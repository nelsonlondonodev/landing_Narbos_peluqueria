import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Lista quirúrgica de imágenes principales del Hero para optimizar en móvil (768px)
const IMAGES_TO_OPTIMIZE = [
    {
        src: 'images/pages/maquillaje/maquillaje-profesional-eventos-chia-narbos.webp',
        dest: 'images/pages/maquillaje/maquillaje-profesional-eventos-chia-narbos-mobile.webp'
    },
    {
        src: 'images/pages/peluqueria/hair-hero.webp',
        dest: 'images/pages/peluqueria/hair-hero-mobile.webp'
    },
    {
        src: 'images/pages/barberia/barberia-salon-spa-premium-chia-hero.webp',
        dest: 'images/pages/barberia/barberia-salon-spa-premium-chia-hero-mobile.webp'
    },
    {
        src: 'images/pages/estetica/cabina-doble-spa-estetica-chia.webp',
        dest: 'images/pages/estetica/cabina-doble-spa-estetica-chia-mobile.webp'
    },
    {
        src: 'images/pages/estetica/alta-frecuencia-facial-narbos.webp',
        dest: 'images/pages/estetica/alta-frecuencia-facial-narbos-mobile.webp'
    },
    {
        src: 'images/nosotros/narbos-team-hero.webp',
        dest: 'images/nosotros/narbos-team-hero-mobile.webp'
    },
    {
        src: 'images/blog/foto_fachada.webp',
        dest: 'images/blog/foto_fachada-mobile.webp'
    },
    // Subpáginas de servicios
    {
        src: 'images/pages/peluqueria/cortes-de-pelo-profesionales-chia.webp',
        dest: 'images/pages/peluqueria/cortes-de-pelo-profesionales-chia-mobile.webp'
    },
    {
        src: 'images/pages/peluqueria/balayage-rubio-perfecto-ondas-chia-narbos.webp',
        dest: 'images/pages/peluqueria/balayage-rubio-perfecto-ondas-chia-narbos-mobile.webp'
    },
    {
        src: 'images/pages/peluqueria/balayage-rubio-iluminado-corte-capas-narbos-salon-spa-chia.webp',
        dest: 'images/pages/peluqueria/balayage-rubio-iluminado-corte-capas-narbos-salon-spa-chia-mobile.webp'
    },
    {
        src: 'images/pages/estetica/limpieza-facial-profunda-spa-chia.webp',
        dest: 'images/pages/estetica/limpieza-facial-profunda-spa-chia-mobile.webp'
    },
    {
        src: 'images/pages/estetica/experiencia-spa-depilacion-sin-dolor.webp',
        dest: 'images/pages/estetica/experiencia-spa-depilacion-sin-dolor-mobile.webp'
    },
    {
        src: 'images/pages/estetica/microblading-cejas-despues.webp',
        dest: 'images/pages/estetica/microblading-cejas-despues-mobile.webp'
    },
    {
        src: 'images/pages/estetica/masaje-facial-relajante-narbos.webp',
        dest: 'images/pages/estetica/masaje-facial-relajante-narbos-mobile.webp'
    },
    {
        src: 'images/pages/estetica/masaje-relajante-piedras-calientes-spa-chia.webp',
        dest: 'images/pages/estetica/masaje-relajante-piedras-calientes-spa-chia-mobile.webp'
    },
    {
        src: 'images/pages/barberia/corte-hombre-fade-moderno.webp',
        dest: 'images/pages/barberia/corte-hombre-fade-moderno-mobile.webp'
    }
];

/**
 * Retorna el peso del archivo formateado en un formato legible.
 * @param {string} filePath 
 * @returns {string}
 */
function getFileSizeInKB(filePath) {
    if (!fs.existsSync(filePath)) return '0 KB';
    const stats = fs.statSync(filePath);
    return `${(stats.size / 1024).toFixed(1)} KB`;
}

/**
 * Procesa y optimiza una sola imagen usando el pipeline de sips y imagemin.
 * @param {Object} imageConfig 
 */
function optimizeImage({ src, dest }) {
    console.log(`\n----------------------------------------`);
    console.log(`Procesando: ${src}`);

    if (!fs.existsSync(src)) {
        console.error(`⚠️ Error: El archivo de origen no existe: ${src}`);
        return;
    }

    const tempJpg = 'temp_optimize.jpg';
    const tempDir = 'temp_out_dir';

    try {
        // Paso 1: Redimensionar con sips a JPEG temporal a 768px de ancho
        console.log(`-> Redimensionando con sips a 768px de ancho...`);
        execSync(`sips -s format jpeg --resampleWidth 768 "${src}" --out "${tempJpg}"`, { stdio: 'ignore' });

        // Asegurar que el directorio temporal exista y esté vacío
        if (fs.existsSync(tempDir)) {
            fs.rmSync(tempDir, { recursive: true, force: true });
        }
        fs.mkdirSync(tempDir);

        // Paso 2: Convertir a WebP comprimido usando imagemin en el directorio temporal
        console.log(`-> Comprimiendo a WebP con imagemin...`);
        execSync(`npx imagemin "${tempJpg}" --plugin=webp --out-dir="${tempDir}"`, { stdio: 'ignore' });

        // Paso 3: Mover el archivo resultante de temp_out_dir/temp_optimize.webp a la ruta destino
        const producedWebp = path.join(tempDir, 'temp_optimize.webp');
        if (fs.existsSync(producedWebp)) {
            // Asegurar que el directorio de destino exista
            const destDir = path.dirname(dest);
            if (!fs.existsSync(destDir)) {
                fs.mkdirSync(destDir, { recursive: true });
            }

            fs.renameSync(producedWebp, dest);
            console.log(`✅ ¡Éxito! Imagen móvil creada en: ${dest}`);
            console.log(`   └─ Peso Original  : ${getFileSizeInKB(src)}`);
            console.log(`   └─ Peso Optimizado: ${getFileSizeInKB(dest)}`);
        } else {
            console.error(`⚠️ Error: No se pudo localizar la imagen WebP optimizada producida.`);
        }
    } catch (error) {
        console.error(`❌ Error procesando la imagen ${src}:`, error.message);
    } finally {
        // Limpieza de archivos y directorios temporales
        if (fs.existsSync(tempJpg)) {
            fs.unlinkSync(tempJpg);
        }
        if (fs.existsSync(tempDir)) {
            fs.rmSync(tempDir, { recursive: true, force: true });
        }
    }
}

// Punto de entrada del script
function main() {
    console.log(`🚀 Iniciando pipeline de optimización de imágenes móviles Narbo's...`);
    const startTime = Date.now();

    IMAGES_TO_OPTIMIZE.forEach(optimizeImage);

    const duration = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log(`\n========================================`);
    console.log(`🎉 Pipeline de optimización completado con éxito en ${duration}s!`);
    console.log(`========================================\n`);
}

main();
