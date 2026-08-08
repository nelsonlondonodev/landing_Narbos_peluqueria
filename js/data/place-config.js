/**
 * Identidad del negocio en Google Business Profile.
 * Fuente única: la consumen tanto los scripts de build (Node) como el cliente.
 *
 * Si Google responde 404 "The provided Place ID is no longer valid", el ID cambió.
 * Se recupera con Text Search:
 *   POST https://places.googleapis.com/v1/places:searchText
 *   { "textQuery": "Narbo's salón spa Chía" }
 */
export const PLACE_ID = 'ChIJtwo7egB5QI4RuuvnxCiWG7g';

/** Zona horaria del local, usada para calcular abierto/cerrado. */
export const TIME_ZONE = 'America/Bogota';
