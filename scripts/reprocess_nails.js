import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

// Configuración
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const targetDir = path.resolve(__dirname, '../images/pages/unas');

console.log(`📂 Iniciando reprocesamiento de imágenes en: ${targetDir}`);

// Mapeo manual de Archivo Nuevo (JPEG) -> Nombre Objetivo (sin extensión)
// Basado en el análisis de archivos presentes y la lógica anterior
const fileMap = {
    // Genéricos
    'IMG_0630 copy Large.jpeg': 'unas-acrilicas-tendencia-2026-chia',
    'IMG_1401 copy Large.jpeg': 'manicure-ruso-detalle-perfecto-narbos',
    'IMG_1618.jpeg': 'diseno-unas-arte-mano-alzada-chia',
    'IMG_1621 copy Large.jpeg': 'pedicure-spa-relax-experiencia-chia',

    // Descriptivos pero con sufijos "Copy Large"
    'diseno-unas-elegantes-chia-narbos-spa copy Large.jpeg': 'diseno-unas-elegantes-chia-narbos-spa',
    'manicura-perfecta-tono-vino-elegante-narbos-salon-spa-chia copy Large.jpeg': 'manicura-perfecta-tono-vino-elegante-narbos-salon-spa-chia',
    'manicure-diseno-premium-narbos-salon-spa-chia-cundinamarca-belleza-integral copy Large.jpeg': 'manicure-diseno-premium-narbos-salon-spa-chia-cundinamarca-belleza-integral',
    
    // Ojo con los caracteres especiales en los JPEGs (tildes/ñ) que pueden variar según sistema de archivos
    // Usamos nombres aproximados, el script intentará encontrarlos
    'manicure-diseño-uñas-glitter-elegantes-narbos-salon-spa-chia copy Large.jpeg': 'manicure-diseno-unas-glitter-elegantes-narbos-salon-spa-chia',
    'unas-en-chia-diseños-manicure-spa-narbos-salon-chia Large.jpeg': 'unas-en-chia-disenos-manicure-spa-narbos-salon-chia'
};

// Normalización de nombres de archivo para coincidencia insensible a NFD (tildes separadas)
const normalize = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

// Obtener lista real de archivos
const currentFiles = fs.readdirSync(targetDir);

// Proceso iterativo
Object.entries(fileMap).forEach(([sourceName, targetBaseName]) => {
    // Buscar el archivo fuente coincidente (manejando normalización unicode para ñ/tildes)
    const sourceFile = currentFiles.find(f => normalize(f) === normalize(sourceName));

    if (sourceFile) {
        console.log(`\n🔹 Procesando: ${sourceFile}`);
        const sourcePath = path.join(targetDir, sourceFile);
        
        // 1. Eliminar WebP antiguo de baja calidad
        const oldWebP = path.join(targetDir, `${targetBaseName}.webp`);
        if (fs.existsSync(oldWebP)) {
            fs.unlinkSync(oldWebP);
            console.log(`   🗑️  Eliminado WebP antiguo: ${targetBaseName}.webp`);
        }

        // 2. Renombrar JPEG nuevo a nombre limpio temporal
        const tempJwt = path.join(targetDir, `${targetBaseName}.jpeg`); // Usamos .jpeg para consistencia
        fs.renameSync(sourcePath, tempJwt);
        console.log(`   ✨ Renombrado a: ${targetBaseName}.jpeg`);

        // 3. Convertir a WebP con Alta Calidad (Quality 90)
        try {
            console.log(`   ⚙️  Generando WebP de alta calidad...`);
            // Usamos imagemin con calidad 90 para evitar "pixelación"
            execSync(`npx imagemin "${tempJwt}" --plugin=webp --plugin.webp.quality=90 --out-dir="${targetDir}"`);
            console.log(`   ✅ Conversión exitosa.`);
            
            // 4. Eliminar JPEG intermedio
            fs.unlinkSync(tempJwt);
            console.log(`   🧹 Limpieza de JPEG temporal.`);
        } catch (e) {
            console.error(`   ❌ Error convirtiendo ${targetBaseName}:`, e.message);
        }

    } else {
        console.warn(`⚠️  No se encontró el archivo fuente: ${sourceName}`);
    }
});

console.log('\n🎉 Proceso finalizado. Las imágenes han sido actualizadas con alta calidad.');
