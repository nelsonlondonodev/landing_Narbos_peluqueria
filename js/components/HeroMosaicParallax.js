/** Fracción del recorrido que avanza cada fotograma: suaviza el seguimiento del cursor. */
const SUAVIZADO = 0.12;

/** Por debajo de esta distancia se da por llegado y se para el bucle de animación. */
const REPOSO = 0.001;

/**
 * Posición del puntero respecto al centro de una caja, de -1 a 1 en cada eje.
 * @param {{clientX: number, clientY: number}} puntero
 * @param {{left: number, top: number, width: number, height: number}} caja
 * @returns {{x: number, y: number}}
 */
export function posicionRelativa({ clientX, clientY }, { left, top, width, height }) {
    const limitar = (valor) => Math.max(-1, Math.min(1, valor));
    return {
        x: limitar(((clientX - left) / width) * 2 - 1),
        y: limitar(((clientY - top) / height) * 2 - 1)
    };
}

/**
 * Hace que las teselas del hero sigan al cursor. Solo escribe `--mx` y `--my` en el
 * mosaico; el desplazamiento de cada tesela lo calcula `css/input.css` con su `--z`.
 * @param {HTMLElement} mosaico - Contenedor `.hero-mosaic`.
 * @param {PointerEvent} eventoInicial - La entrada que disparó la carga de este módulo.
 */
export function seguirCursor(mosaico, eventoInicial) {
    const actual = { x: 0, y: 0 };
    let objetivo = { x: 0, y: 0 };
    let caja = mosaico.getBoundingClientRect();
    let fotograma = null;

    const animar = () => {
        actual.x += (objetivo.x - actual.x) * SUAVIZADO;
        actual.y += (objetivo.y - actual.y) * SUAVIZADO;
        mosaico.style.setProperty('--mx', actual.x.toFixed(3));
        mosaico.style.setProperty('--my', actual.y.toFixed(3));

        const enReposo = Math.abs(objetivo.x - actual.x) < REPOSO && Math.abs(objetivo.y - actual.y) < REPOSO;
        fotograma = enReposo ? null : requestAnimationFrame(animar);
    };

    const apuntarA = (nuevoObjetivo) => {
        objetivo = nuevoObjetivo;
        fotograma ??= requestAnimationFrame(animar);
    };

    mosaico.addEventListener('pointerenter', () => {
        // El scroll mueve el mosaico entre visita y visita: la caja guardada ya no vale.
        caja = mosaico.getBoundingClientRect();
    });
    mosaico.addEventListener('pointermove', (evento) => apuntarA(posicionRelativa(evento, caja)));
    mosaico.addEventListener('pointerleave', () => apuntarA({ x: 0, y: 0 }));

    apuntarA(posicionRelativa(eventoInicial, caja));
}
