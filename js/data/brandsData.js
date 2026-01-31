/**
 * Definición de marcas para las diferentes secciones del sitio.
 */

export const hairBrands = [
    { name: 'Wella Professionals', sub: 'Coloración Premium' },
    { name: 'Schwarzkopf', sub: 'Tecnología Capilar' },
    { name: "L'Oréal Professionnel", sub: 'Innovación Global' },
    { name: 'Moroccanoil', sub: 'Tratamiento de Argán' }
];

export const nailBrands = [
    { name: 'Organic Nails', sub: 'Premium System' },
    { name: 'Masglo', sub: 'Gel Evolution' },
    { name: 'OPI', sub: 'Professional' }
];

// Marcas combinadas para la página principal
export const allBrands = [...hairBrands, ...nailBrands];
