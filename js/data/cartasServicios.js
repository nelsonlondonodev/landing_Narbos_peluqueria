import { masterPrices } from './masterPrices.js';
import { hairCartaFor } from './hairPageServices.js';

const { tecnicas, arreglos, disenos } = masterPrices.nails;
const cejas = masterPrices.esthetics.cejasPestanas;
const { rostro, torso, brazos, combos } = masterPrices.esthetics.depilacionCaballero;

/**
 * Cartas de precios de las páginas que no son de peluquería, por la clave de la página.
 * Son los servicios sin foto propia de la libreta del 2026-11-21: como tarjetas, con la
 * misma imagen del logo, no se distinguirían entre sí. Peluquería arma la suya desde
 * `hairPageServices`, porque allí los servicios ya existían como datos.
 */
const CARTAS = Object.freeze({
    'unas-acrilicas-gel': {
        heading: 'Otras Técnicas de Uñas',
        intro: 'Si no buscas extensiones, también fortalecemos y cuidamos tu uña natural.',
        groups: [
            {
                title: 'Sobre tu uña natural',
                intro: 'Más resistencia sin cambiar el largo.',
                items: [
                    { title: 'Dipping', description: 'Manicura en polvo: color duradero y uñas más firmes.', price: tecnicas.dipping },
                    { title: 'Rubber', description: 'Base rubber que nivela y refuerza la uña.', price: tecnicas.rubber }
                ]
            },
            {
                title: 'Gel',
                intro: 'Un recubrimiento que protege tu uña mientras crece.',
                items: [
                    { title: 'Recubrimiento en gel', description: 'Capa de gel sobre tu uña natural.', price: tecnicas.recubrimientoGel },
                    { title: 'Mantenimiento en gel', description: 'Retoque del recubrimiento a medida que la uña crece.', price: tecnicas.mantenimientoGel }
                ]
            }
        ]
    },
    'manicure-pedicure': {
        heading: 'Arreglos y Extras',
        intro: 'Para cuando solo quieres cambiar el color o darle un detalle a tus uñas.',
        groups: [
            {
                title: 'Cambio de esmalte',
                intro: 'Retiramos el esmalte y aplicamos uno nuevo.',
                items: [
                    { title: 'Cambio normal', description: 'Esmalte tradicional.', price: arreglos.cambioNormal },
                    { title: 'Cambio secado rápido', description: 'Esmalte de secado rápido.', price: arreglos.cambioSecadoRapido },
                    { title: 'Cambio semipermanente', description: 'Esmalte semipermanente.', price: arreglos.cambioSemipermanente }
                ]
            },
            {
                title: 'Arreglos y detalles',
                intro: 'Lo que le da el toque final a tu manicura.',
                items: [
                    { title: 'Reparación de uña', description: 'Por uña partida o despegada.', price: arreglos.reparacion },
                    { title: 'Alargamiento de uña', description: 'Por uña, para emparejar el largo.', price: arreglos.alargamiento },
                    { title: 'Efectos', description: 'Acabados especiales sobre tu esmaltado.', price: arreglos.efectos },
                    { title: 'Decoración', description: 'Diseños y detalles por uña.', price: `Desde ${disenos.nailArt}` }
                ]
            }
        ]
    },
    'cejas-y-pestanas': {
        heading: 'Lifting, Laminado y Henna',
        intro: 'Realzamos tu mirada con tus propias pestañas y cejas.',
        groups: [
            {
                title: 'Pestañas',
                intro: 'Trabajamos sobre tu pestaña natural.',
                items: [
                    { title: 'Lifting de pestañas', description: 'Curva y eleva tus pestañas desde la raíz.', price: cejas.lifting }
                ]
            },
            {
                title: 'Cejas',
                intro: 'Laminado y pigmento vegetal para rellenar y definir tus cejas.',
                items: [
                    { title: 'Laminado de cejas', description: 'Peina y fija tus cejas con un acabado ordenado y lleno.', price: cejas.laminadoCejas },
                    { title: 'Aplicación de henna', description: 'Sin depilación.', price: cejas.aplicacionHenna },
                    { title: 'Henna con depilación con cera', description: 'Diseño de cejas con cera y henna.', price: cejas.hennaConCera },
                    { title: 'Henna con depilación con hilo', description: 'Diseño de cejas con hilo y henna.', price: cejas.hennaConHilo }
                ]
            }
        ]
    },
    // Las tarjetas de la página son los precios de mujer; caballero va en carta, sin fotos.
    'depilacion-corporal': {
        heading: 'Depilación para Caballero',
        intro: 'Depilación con cera para hombre, por zonas o en combo.',
        groups: [
            {
                title: 'Rostro',
                intro: 'Perfilado y limpieza del rostro.',
                items: [
                    { title: 'Diseño de cejas', description: 'Cejas limpias y definidas, sin perder su forma natural.', price: rostro.disenoCejas },
                    { title: 'Nariz', description: 'Vello de la nariz con cera.', price: rostro.nariz },
                    { title: 'Orejas', description: 'Vello de las orejas con cera.', price: rostro.orejas },
                    { title: 'Pómulos', description: 'La parte alta de las mejillas.', price: rostro.pomulos },
                    { title: 'Barba (perfilado con cera)', description: 'Líneas de la barba definidas con cera.', price: rostro.barbaPerfilado },
                    { title: 'Rostro completo', description: 'Todas las zonas del rostro en una sesión.', price: rostro.rostroCompleto }
                ]
            },
            {
                title: 'Torso y espalda',
                intro: 'Por zonas o juntas.',
                items: [
                    { title: 'Axilas', description: 'Ambas axilas.', price: torso.axilas },
                    { title: 'Pecho', description: 'El pecho completo.', price: torso.pecho },
                    { title: 'Abdomen', description: 'El abdomen completo.', price: torso.abdomen },
                    { title: 'Pecho y abdomen', description: 'Las dos zonas juntas.', price: torso.pechoAbdomen },
                    { title: 'Espalda completa', description: 'De los hombros a la cintura.', price: torso.espaldaCompleta },
                    { title: 'Hombros', description: 'Ambos hombros.', price: torso.hombros },
                    { title: 'Espalda y hombros', description: 'Las dos zonas juntas.', price: torso.espaldaHombros }
                ]
            },
            {
                title: 'Brazos y manos',
                intro: 'Medio brazo, brazo completo o solo las manos.',
                items: [
                    { title: 'Medio brazo', description: 'Antebrazo o brazo.', price: brazos.medioBrazo },
                    { title: 'Brazo completo', description: 'Del hombro a la muñeca.', price: brazos.brazoCompleto },
                    { title: 'Manos y dedos', description: 'Dorso de las manos y dedos.', price: brazos.manosDedos }
                ]
            },
            {
                title: 'Combos',
                intro: 'Varias zonas en una sesión, a mejor precio.',
                items: [
                    { title: 'Pecho, abdomen y axilas', description: 'Todo el frente del torso.', price: combos.pechoAbdomenAxilas },
                    { title: 'Espalda, hombros y cuello', description: 'Toda la parte de atrás.', price: combos.espaldaHombrosCuello },
                    { title: 'Cuerpo superior', description: 'Pecho, abdomen, espalda, hombros y axilas.', price: combos.cuerpoSuperior }
                ]
            }
        ]
    }
});

/**
 * Carta de precios de una página, o `null` si no tiene.
 * @param {string} pagina Clave de la página (el nombre del archivo sin `.html`).
 */
export function cartaFor(pagina) {
    return hairCartaFor(pagina) ?? CARTAS[pagina] ?? null;
}
