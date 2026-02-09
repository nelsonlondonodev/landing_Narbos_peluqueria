/**
 * Lista Maestra de Precios - Narbo's Salón Spa
 * Fuente única de verdad para los precios de servicios.
 * Se exporta como objeto congelado para prevenir modificaciones accidentales.
 */
export const masterPrices = Object.freeze({
    nails: {
        manicura: {
            tradicional: '$23.000',
            secadoRapido: '$34.000',
            semipermanente: '$56.000',
            spa: '$25.000' // Desde
        },
        pedicura: {
            tradicional: '$29.000',
            secadoRapido: '$41.000',
            semipermanente: '$61.000',
            spa: '$25.000' // Desde
        },
        extensiones: {
            poligel: '$160.000',
            acrilicas: '$160.000',
            pressOn: '$130.000' // Con aplicación semipermanente
        }
    },
    hair: {
        corte: {
            dama: '$35.000',
            cepillados: '$35.000' // Desde
        },
        color: {
            tintes: '$200.000', // Desde
            balayage: '$450.000', // Desde
            iluminaciones: '$320.000' // Desde
        },
        tratamientos: {
            alisadoProgresivo: '$350.000', // Desde
            shampoo: '$10.000' // Desde
        }
    },
    barber: {
        corteBarba: '$75.000'
    },
    esthetics: {
        facial: {
            basico: '$130.000', // Desde
            microdermoabrasion: '$75.000', // Desde
            hidroFacial: '$220.000', // Con microdermoabrasión e hidratación
            despigmentantes: '$75.000' // Sesiones desde
        },
        corporal: {
            masajeRelajante: '$120.000', // 1 hora todo el cuerpo
            masajeDescontracturanteEspalda: '$75.000', // 35 min
            masajeDescontracturanteCuerpo: '$170.000', // Todo el cuerpo
            drenajeLinfatico: '$150.000', // Todo el cuerpo
            moldeamiento: '$75.000' // Sesiones desde
        },
        depilacion: {
            cera: {
                cejasBigote: '$22.000',
                axilas: '$15.000',
                piernaCompleta: '$38.000',
                mediaPierna: '$28.000',
                bikiniParcial: '$28.000',
                bikiniCompleto: '$38.000'
            },
            hilo: {
                cejasBigote: '$37.000'
            }
        }
    }
});
