/**
 * Carta de precios por grupos: una lista de texto para los servicios que no tienen foto
 * propia. Trece tarjetas con la misma imagen no se distinguirían entre sí.
 * La pinta el SSG en el build, y `hair-page.js` en cliente cuando el HTML llega sin ella.
 *
 * @param {{ heading: string, intro: string, groups: ReadonlyArray<{ title: string, intro: string, items: ReadonlyArray<{ title: string, description: string, price: string }> }> }} carta
 * @returns {string}
 */
export function renderCartaServicios({ heading, intro, groups }) {
    return `
        <section class="py-16 md:py-24 bg-brand-light/10" aria-labelledby="carta-servicios-titulo">
            <div class="container mx-auto px-6 max-w-screen-xl">
                <div class="text-center mb-12">
                    <h2 id="carta-servicios-titulo" class="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">${heading}</h2>
                    <p class="text-lg text-gray-700 max-w-2xl mx-auto">${intro}</p>
                </div>
                <div class="grid lg:grid-cols-2 gap-8 items-start">
                    ${groups.map(renderGrupo).join('')}
                </div>
            </div>
        </section>
    `;
}

/** @param {{ title: string, intro: string, items: ReadonlyArray<{ title: string, description: string, price: string }> }} grupo */
function renderGrupo({ title, intro, items }) {
    return `
        <div class="bg-white rounded-xl shadow-sm p-6 md:p-8">
            <h3 class="text-2xl font-serif font-bold text-gray-900 mb-2">${title}</h3>
            <p class="text-gray-600 text-sm leading-relaxed mb-4">${intro}</p>
            <ul class="divide-y divide-gray-100">
                ${items.map(renderFila).join('')}
            </ul>
        </div>
    `;
}

/** @param {{ title: string, description: string, price: string }} servicio */
function renderFila({ title, description, price }) {
    return `
        <li class="py-4 flex items-start justify-between gap-4">
            <div class="min-w-0">
                <p class="font-bold text-gray-900">${title}</p>
                <p class="text-gray-600 text-sm leading-relaxed">${description}</p>
            </div>
            <span class="shrink-0 font-bold text-brand-green whitespace-nowrap">${price}</span>
        </li>
    `;
}
