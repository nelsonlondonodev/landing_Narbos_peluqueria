import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';

/**
 * Retorna el peso del archivo formateado de manera legible.
 * @param {string} filePath 
 * @returns {string}
 */
function getFileSizeInKB(filePath) {
    if (!fs.existsSync(filePath)) return '0 KB';
    const stats = fs.statSync(filePath);
    return `${(stats.size / 1024).toFixed(1)} KB`;
}

/**
 * Procesa y optimiza una sola versión (desktop o mobile) usando sips y la API de imagemin en JS.
 * @param {string} src Ruta origen de la imagen JPEG
 * @param {string} destPath Ruta de destino final para el archivo WebP (ej. blog/articles/images/nombre.webp)
 * @param {number} width Ancho deseado en píxeles
 */
async function processImageVersion(src, destPath, width) {
    console.log(`-> Procesando versión (${width}px) para: ${destPath}`);

    const tempJpg = `temp_optimize_${width}.jpg`;
    const tempDir = `temp_out_dir_${width}`;

    try {
        // Paso 1: Redimensionar con sips a un archivo JPEG temporal en el workspace
        execSync(`sips -s format jpeg --resampleWidth ${width} "${src}" --out "${tempJpg}"`, { stdio: 'ignore' });

        if (!fs.existsSync(tempJpg)) {
            throw new Error(`No se pudo crear el archivo temporal de redimensionado ${tempJpg}`);
        }

        // Asegurar que el directorio de salida temporal esté limpio
        if (fs.existsSync(tempDir)) {
            fs.rmSync(tempDir, { recursive: true, force: true });
        }
        fs.mkdirSync(tempDir);

        // Paso 2: Convertir a WebP comprimido usando la API de JS de imagemin
        const files = await imagemin([tempJpg], {
            destination: tempDir,
            plugins: [
                imageminWebp({ quality: 80 })
            ]
        });

        if (files && files.length > 0) {
            // El archivo producido tendrá el mismo nombre base pero con extensión .webp
            const producedWebp = path.join(tempDir, `temp_optimize_${width}.webp`);
            
            if (fs.existsSync(producedWebp)) {
                // Asegurar que el directorio de destino final exista
                const destDir = path.dirname(destPath);
                if (!fs.existsSync(destDir)) {
                    fs.mkdirSync(destDir, { recursive: true });
                }

                // Eliminar el archivo destino previo si existe
                if (fs.existsSync(destPath)) {
                    fs.unlinkSync(destPath);
                }

                // Mover al destino final
                fs.renameSync(producedWebp, destPath);
                console.log(`   ✅ ¡Éxito! Versión creada en: ${destPath}`);
                console.log(`      └─ Peso Optimizado: ${getFileSizeInKB(destPath)}`);
            } else {
                throw new Error(`No se encontró el archivo WebP optimizado en el directorio temporal.`);
            }
        } else {
            throw new Error(`imagemin no devolvió archivos procesados.`);
        }
    } catch (error) {
        console.error(`   ❌ Error procesando versión de ${width}px:`, error.message);
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

/**
 * Punto de entrada principal
 */
async function main() {
    const src = 'images/blog/IMG_5704 Large.jpeg';
    const destDesktop = 'blog/articles/images/manchas-blancas-unas-narbos.webp';
    const destMobile = 'blog/articles/images/manchas-blancas-unas-narbos-mobile.webp';

    console.log(`🚀 Iniciando optimización de imagen para artículo de blog (Vía API JS)...`);
    console.log(`   └─ Imagen Origen: ${src} (${getFileSizeInKB(src)})`);

    if (!fs.existsSync(src)) {
        console.error(`❌ Error: El archivo de origen no existe en: ${src}`);
        process.exit(1);
    }

    const startTime = Date.now();

    // 1. Generar versión Escritorio (1024px de ancho)
    await processImageVersion(src, destDesktop, 1024);

    // 2. Generar versión Móvil (768px de ancho)
    await processImageVersion(src, destMobile, 768);

    const duration = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log(`\n🎉 Pipeline completado con éxito en ${duration}s!`);
}

main().catch(err => {
    console.error('❌ Error fatal en el proceso de optimización:', err);
});
