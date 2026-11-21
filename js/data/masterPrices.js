/**
 * Lista Maestra de Precios - Narbo's Salón Spa
 * Fuente única de verdad para los precios de servicios.
 * Se exporta como objeto congelado para prevenir modificaciones accidentales.
 */
export const masterPrices = Object.freeze({
    nails: {
        manicura: {
            tradicional: '$25.000',
            secadoRapido: '$37.000',
            semipermanente: '$58.000',
            spa: '$25.000' // Desde
        },
        pedicura: {
            tradicional: '$32.000',
            secadoRapido: '$43.000',
            semipermanente: '$63.000',
            spa: '$25.000' // Desde
        },
        extensiones: {
            poligel: '$160.000',
            acrilicas: '$160.000',
            pressOn: '$130.000' // Con aplicación semipermanente
        },
        disenos: {
            nailArt: '$3.000' // Desde; libreta de la propietaria del 2026-11-21
        },
        // Libreta del 2026-11-21: técnicas y arreglos que no estaban en la web.
        tecnicas: {
            dipping: '$78.000',
            rubber: '$72.000',
            recubrimientoGel: '$110.000',
            mantenimientoGel: '$100.000'
        },
        arreglos: {
            cambioNormal: '$17.000',
            cambioSecadoRapido: '$20.000',
            cambioSemipermanente: '$35.000',
            reparacion: '$10.000', // Por uña
            alargamiento: '$12.000', // Por uña
            efectos: '$10.000'
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
        // Libreta del 2026-11-21. El laminado es de pestañas: el de cejas no trae precio.
        cejasPestanas: {
            lifting: '$112.000',
            laminadoPestanas: '$100.000',
            aplicacionHenna: '$37.000',
            hennaConCera: '$55.000',
            hennaConHilo: '$60.000'
        },
        // Libreta de la propietaria del 2026-11-21 (precios de mujer). Cejas y bigote
        // se cobran por separado; la nariz y el cuerpo solo se hacen con cera.
        depilacion: {
            cera: {
                cejas: '$22.000',
                bigote: '$14.000',
                menton: '$7.000',
                nariz: '$14.000',
                patillas: '$9.000',
                mejillas: '$12.000',
                axilas: '$18.000',
                piernaCompleta: '$40.000',
                mediaPierna: '$30.000',
                bikiniParcial: '$31.000',
                bikiniCompleto: '$41.000',
                pies: '$12.000'
            },
            hilo: {
                cejas: '$27.000',
                bigote: '$14.000',
                menton: '$9.000',
                patillas: '$12.000',
                mejillas: '$12.000'
            }
        }
    }
});
