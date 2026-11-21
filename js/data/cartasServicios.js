import { masterPrices } from './masterPrices.js';
import { hairCartaFor } from './hairPageServices.js';

const { tecnicas, arreglos, disenos } = masterPrices.nails;
const cejas = masterPrices.esthetics.cejasPestanas;

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
        heading: 'Pestañas y Henna',
        intro: 'Realzamos tu mirada con tus propias pestañas y cejas.',
        groups: [
            {
                title: 'Pestañas',
                intro: 'Trabajamos sobre tu pestaña natural.',
                items: [
                    { title: 'Lifting de pestañas', description: 'Curva y eleva tus pestañas desde la raíz.', price: cejas.lifting },
                    { title: 'Laminado de pestañas', description: 'Peina y fija tus pestañas con un acabado ordenado.', price: cejas.laminadoPestanas }
                ]
            },
            {
                title: 'Henna',
                intro: 'Pigmento vegetal que rellena y define tus cejas.',
                items: [
                    { title: 'Aplicación de henna', description: 'Sin depilación.', price: cejas.aplicacionHenna },
                    { title: 'Henna con depilación con cera', description: 'Diseño de cejas con cera y henna.', price: cejas.hennaConCera },
                    { title: 'Henna con depilación con hilo', description: 'Diseño de cejas con hilo y henna.', price: cejas.hennaConHilo }
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
