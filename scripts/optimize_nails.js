import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

// Configuración
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const targetDir = path.resolve(__dirname, '../images/pages/unas');

// Nombres SEO para reemplazar los genéricos (IMG_*)
const seoNames = [
    'unas-acrilicas-tendencia-2026-chia',
    'manicure-ruso-detalle-perfecto-narbos',
    'diseno-unas-arte-mano-alzada-chia',
    'pedicure-spa-relax-experiencia-chia'
];
let seoIndex = 0;

console.log(`📂 Analizando directorio: ${targetDir}`);

if (!fs.existsSync(targetDir)) {
    console.error('❌ El directorio no existe.');
    process.exit(1);
}

const files = fs.readdirSync(targetDir);
let filesToConvert = [];

// Paso 1: Renombrar y Sanitizar
console.log('🔄 Renombrando y sanitizando archivos...');

files.forEach(file => {
    const ext = path.extname(file).toLowerCase();
    if (ext === '.jpeg' || ext === '.jpg') {
        const oldPath = path.join(targetDir, file);
        let newName = file;

        // Si es un archivo genérico de cámara (IMG_...)
        if (file.startsWith('IMG_')) {
            if (seoIndex < seoNames.length) {
                newName = `${seoNames[seoIndex]}${ext}`;
                seoIndex++;
            } else {
                newName = `narbos-unas-trabajo-real-${seoIndex}${ext}`;
                seoIndex++;
            }
        } 
        // Si ya tiene nombre descriptivo, sanitizar caracteres especiales
        else {
            newName = file
                .toLowerCase()
                .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Eliminar tildes
                .replace(/ñ/g, 'n') // Reemplazar ñ (en caso de que normalize no lo haga)
                .replace(/\s+/g, '-') // Espacios a guiones
                .replace(/[^a-z0-9-.]/g, ''); // Eliminar todo lo que no sea letra, número, guion o punto
        }

        // Ejecutar renombrado si el nombre ha cambiado
        if (file !== newName) {
            const newPath = path.join(targetDir, newName);
            fs.renameSync(oldPath, newPath);
            console.log(`✨ Renombrado: "${file}" -> "${newName}"`);
            filesToConvert.push(newName);
        } else {
            console.log(`✅ Nombre correcto: "${file}"`);
            filesToConvert.push(file);
        }
    }
});

// Paso 2: Convertir a WebP
if (filesToConvert.length > 0) {
    console.log(`\n🚀 Convirtiendo ${filesToConvert.length} imágenes a WebP...`);
    
    try {
        // Ejecutamos imagemin sobre todos los JPEGs del directorio
        // Usamos comillas para manejar rutas con espacios si las hubiera (aunque ya sanitizamos)
        execSync(`npx imagemin "${targetDir}/*.{jpg,jpeg}" --plugin=webp --out-dir="${targetDir}"`, { stdio: 'inherit' });
        console.log('✅ Conversión completada exitosamente.');

        // Paso 3: Eliminar originales
        console.log('\n🗑️ Eliminando archivos originales JPEG...');
        const currentFiles = fs.readdirSync(targetDir);
        currentFiles.forEach(file => {
            const ext = path.extname(file).toLowerCase();
            if (ext === '.jpeg' || ext === '.jpg') {
                fs.unlinkSync(path.join(targetDir, file));
                console.log(`borrado: ${file}`);
            }
        });

    } catch (error) {
        console.error('❌ Error durante la conversión:', error.message);
    }
} else {
    console.log('⚠️ No se encontraron archivos JPEG para procesar.');
}
