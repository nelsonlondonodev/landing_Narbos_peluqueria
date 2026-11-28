import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

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
 * Procesa y optimiza una sola versión (desktop o mobile) usando sips y sharp.
 * @param {string} src Ruta origen de la imagen JPEG
 * @param {string} destPath Ruta de destino final para el archivo WebP (ej. blog/articles/images/nombre.webp)
 * @param {number} width Ancho deseado en píxeles
 */
async function processImageVersion(src, destPath, width) {
    console.log(`-> Procesando versión (${width}px) para: ${destPath}`);

    const tempJpg = `temp_optimize_${width}.jpg`;

    try {
        // Paso 1: Redimensionar con sips a un JPEG temporal (sips también lee HEIC)
        execSync(`sips -s format jpeg --resampleWidth ${width} "${src}" --out "${tempJpg}"`, { stdio: 'ignore' });

        if (!fs.existsSync(tempJpg)) {
            throw new Error(`No se pudo crear el archivo temporal de redimensionado ${tempJpg}`);
        }

        fs.mkdirSync(path.dirname(destPath), { recursive: true });

        // Paso 2: Convertir a WebP; `autoOrient` aplica la rotación que traiga la foto
        await sharp(tempJpg).autoOrient().webp({ quality: 80 }).toFile(destPath);

        console.log(`   ✅ ¡Éxito! Versión creada en: ${destPath}`);
        console.log(`      └─ Peso Optimizado: ${getFileSizeInKB(destPath)}`);
    } catch (error) {
        console.error(`   ❌ Error procesando versión de ${width}px:`, error.message);
    } finally {
        // Limpieza del archivo temporal
        if (fs.existsSync(tempJpg)) {
            fs.unlinkSync(tempJpg);
        }
    }
}

/**
 * Punto de entrada principal
 */
async function main() {
    const args = process.argv.slice(2);
    let src = 'images/blog/IMG_5704 Large.jpeg';
    let destName = 'manchas-blancas-unas-narbos';

    if (args.length >= 2) {
        src = args[0];
        destName = args[1];
    } else if (args.length === 1) {
        console.log('💡 Uso: node scripts/optimize-blog-image.js <ruta_origen> <nombre_base_destino>');
        console.log('   Cargando solo ruta de origen, usando nombre de destino por defecto...');
        src = args[0];
    } else {
        console.log('💡 Usando valores por defecto (Ejemplo de uso: node scripts/optimize-blog-image.js <ruta_origen> <nombre_base_destino>)');
    }

    const destDesktop = `blog/articles/images/${destName}.webp`;
    const destMobile = `blog/articles/images/${destName}-mobile.webp`;

    console.log(`🚀 Iniciando optimización de imagen para artículo de blog (sips + sharp)...`);
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
