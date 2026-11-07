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
        },
        disenos: {
            nailArt: '$5.000' // Desde, por uña
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
            alisadoProgresivo: '$420.000', // Desde, con aminoácidos
            botoxCapilar: '$380.000', // Desde; confirmado por la propietaria el 2026-11-06
            shampoo: '$10.000', // Desde
            // Carta de tratamientos que envió la propietaria el 2026-11-06.
            vitaminoColor: '$60.000',
            absolutRepair: '$70.000',
            metalDetox: '$80.000',
            authenticBeauty: '$80.000',
            nutritivoAmpolleta: '$90.000', // Desde; la carta dice $90.000 / $100.000
            quinoa911: '$120.000',
            proActive69: '$120.000',
            risame: '$130.000',
            fusionWella: '$140.000',
            exfoliacionNutricion: '$140.000',
            fibreClinix: '$150.000',
            proteinLipids: '$180.000',
            celulasMadres: '$250.000'
        },
        // Confirmados por la propietaria el 2026-09-28. La cortina invisible no tiene
        // precio público: se cotiza en la valoración.
        extensiones: {
            porPunto: '$18.000', // Desde
            adhesivoPar: '$160.000', // Desde
            mantenimientoPunto: '$4.000' // Desde; entre 4.000 y 5.000 por punto
        }
    },
    makeup: {
        social: '$120.000',
        diario: '$95.000'
        // Novias no tiene precio público: se cotiza por plan.
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
