export const getHomeModalsHTML = () => `
    <div id="peluqueria-modal" role="dialog" aria-modal="true" class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-[60] hidden p-4">
        <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full relative max-h-[90vh] overflow-y-auto p-6 md:p-8">
            <button data-modal-close="peluqueria-modal" aria-label="Cerrar ventana modal" class="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors duration-200">
                <svg class="pointer-events-none w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            <h3 data-i18n="modal.hair.title" class="text-3xl font-serif font-bold text-brand-green mb-4">Peluquería</h3>
            <img src="images/pages/peluqueria/estilismo-barba.webp" alt="Servicios de peluquería profesional" class="w-full h-auto rounded-lg mt-2 mb-6 shadow-md" width="800" height="600">
            <div class="text-gray-700 space-y-4">
                <p data-i18n="modal.hair.desc"></p>
                <h4 data-i18n="modal.hair.subtitle" class="font-bold text-lg text-gray-800 pt-2"></h4>
                <ul class="space-y-3">
                    <li class="modal-service-item">
                        <span class="modal-service-icon">
                            <svg class="pointer-events-none w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 2.1a2 2 0 00-2.828 0L10 2.757v8.486zM16 18H9.04a2 2 0 01-1.414-.586l-1.586-1.586A2 2 0 016.04 14V6.414l1-1L15.414 14l-1 1h.586A2 2 0 0117 17v1z" clip-rule="evenodd" />
                            </svg>
                        </span>
                        <span data-i18n="modal.hair.li1"></span>
                    </li>
                    <li class="modal-service-item">
                        <span class="modal-service-icon">
                           <svg class="pointer-events-none w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd" />
                            </svg>
                        </span>
                        <span data-i18n="modal.hair.li2"></span>
                    </li>
                    <li class="modal-service-item">
                        <span class="modal-service-icon">
                           <svg class="pointer-events-none w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3z" clip-rule="evenodd" />
                            </svg>
                        </span>
                        <span data-i18n="modal.hair.li3"></span>
                    </li>
                    <li class="modal-service-item">
                        <span class="modal-service-icon">
                            <svg class="pointer-events-none w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm12 3a1 1 0 10-2 0v.5a.5.5 0 001 0V7zM5 7a1 1 0 100-2h.5a.5.5 0 000-1H5a1 1 0 000 2z" clip-rule="evenodd" />
                            </svg>
                        </span>
                        <span data-i18n="modal.hair.li4"></span>
                    </li>
                    <li class="modal-service-item">
                        <span class="modal-service-icon">
                            <svg class="pointer-events-none w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M5.5 2A2.5 2.5 0 003 4.5v10.879a2.5 2.5 0 004.1 1.977l.736-.883a3.5 3.5 0 014.328 0l.736.883a2.5 2.5 0 004.1-1.977V4.5A2.5 2.5 0 0014.5 2h-9zM8 6a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                            </svg>
                        </span>
                        <span data-i18n="modal.hair.li5"></span>
                    </li>
                    <li class="modal-service-item">
                        <span class="modal-service-icon">
                            <svg class="pointer-events-none w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm4.8 9.061C10.758 10.513 13.084 10 16 10v7.632c-3.23 0-5.877-.946-7.2-2.571V5.534c0-.987-1.134-1.534-1.8-1.534s-1.8.547-1.8 1.534v9.527c-1.323 1.625-3.97 2.571-7.2 2.571V10c2.916 0 5.242.513 6.2 1.061l.8-1.422.8 1.422z" clip-rule="evenodd" />
                            </svg>
                        </span>
                        <span data-i18n="modal.hair.li6"></span>
                    </li>
                </ul>
                <p data-i18n="modal.cta" class="pt-4 font-semibold"></p>
            </div>
        </div>
    </div>
    
    <div id="manos-pies-modal" role="dialog" aria-modal="true" class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-[9999] hidden p-4">
        <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full relative max-h-[90vh] overflow-y-auto p-6 md:p-8">
            <button data-modal-close="manos-pies-modal" aria-label="Cerrar ventana modal" class="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors duration-200">
                <svg class="pointer-events-none w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            <h3 data-i18n="modal.nails.title" class="text-3xl font-serif font-bold text-brand-green mb-4">Manos y pies</h3>
            <img src="images/pages/unas/manicure-spa.webp" alt="Diseño de uñas profesional" class="w-full h-auto rounded-lg mt-2 mb-6 shadow-md" width="800" height="600">
            <div class="text-gray-700 space-y-4">
                <p data-i18n="modal.nails.desc"></p>
                <h4 data-i18n="modal.nails.subtitle" class="font-bold text-lg text-gray-800 pt-2"></h4>
                <ul class="space-y-3">
                    <li class="modal-service-item">
                        <span class="modal-service-icon">
                            <svg class="pointer-events-none w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1.28a1 1 0 00-.97.72l-1.99 5.98a1 1 0 01-.97.72H5.22a1 1 0 01-.97-.72L2.26 9.72a1 1 0 00-.97-.72H1a1 1 0 01-1-1V5a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
                            </svg>
                        </span>
                        <span data-i18n="modal.nails.li1"></span>
                    </li>
                    <li class="modal-service-item">
                        <span class="modal-service-icon">
                            <svg class="pointer-events-none w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.415L11 9.586V6z" clip-rule="evenodd" />
                            </svg>
                        </span>
                        <span data-i18n="modal.nails.li2"></span>
                    </li>
                    <li class="modal-service-item">
                        <span class="modal-service-icon">
                            <svg class="pointer-events-none w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5 7a1 1 0 011-1h2a1 1 0 110 2H6a1 1 0 01-1-1zm6 0a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1zm-3 6a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clip-rule="evenodd" />
                            </svg>
                        </span>
                        <span data-i18n="modal.nails.li3"></span>
                    </li>
                    <li class="modal-service-item">
                        <span class="modal-service-icon">
                            <svg class="pointer-events-none w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M15.5 2.25a2.5 2.5 0 00-3.05 4.13l-6.1 6.1a2.5 2.5 0 00-4.13 3.05l.38.38a.75.75 0 001.06-1.06l-.38-.38a1 1 0 011.65-1.65l6.1-6.1a1 1 0 011.65 1.65l-2.09 2.09a.75.75 0 001.06 1.06l2.09-2.09a2.5 2.5 0 00-1.08-5.18z" />
                            </svg>
                        </span>
                        <span data-i18n="modal.nails.li4"></span>
                    </li>
                    <li class="modal-service-item">
                        <span class="modal-service-icon">
                            <svg class="pointer-events-none w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10 3a1 1 0 00-1 1v4a1 1 0 00.82 0.983l4.82 1.44a1 1 0 001.18-1.18l-1.44-4.82A1 1 0 0013 5H6a1 1 0 00-1 1v6a2 2 0 002 2h1.5a.5.5 0 010 1H7a3 3 0 01-3-3V6a2 2 0 012-2h4a1 1 0 001-1z" />
                            </svg>
                        </span>
                        <span data-i18n="modal.nails.li5"></span>
                    </li>
                </ul>
                <p data-i18n="modal.cta" class="pt-4 font-semibold"></p>
            </div>
        </div>
    </div>

    <div id="estetica-modal" role="dialog" aria-modal="true" class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-[60] hidden p-4">
        <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full relative max-h-[90vh] overflow-y-auto p-6 md:p-8">
            <button data-modal-close="estetica-modal" aria-label="Cerrar ventana modal" class="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors duration-200">
                <svg class="pointer-events-none w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            <h3 data-i18n="modal.spa.title" class="text-3xl font-serif font-bold text-brand-green mb-4">Estética y spa</h3>
            <img src="images/pages/estetica/spa-hero.webp" alt="Tratamiento de estética facial" class="w-full h-auto rounded-lg mt-2 mb-6 shadow-md" width="800" height="600">
            <div class="text-gray-700 space-y-4">
                <p data-i18n="modal.spa.desc"></p>
                <h4 data-i18n="modal.spa.subtitle" class="font-bold text-lg text-gray-800 pt-2"></h4>
                <ul class="space-y-3">
                    <li class="modal-service-item">
                        <span class="modal-service-icon">
                           <svg class="pointer-events-none w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                            </svg>
                        </span>
                        <span data-i18n="modal.spa.li1"></span>
                    </li>
                    <li class="modal-service-item">
                        <span class="modal-service-icon">
                            <svg class="pointer-events-none w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M15.312 1.312a2.062 2.062 0 012.875 2.062l-1.344 3.75a2.062 2.062 0 01-3.688-1.313l1.156-3.219a.25.25 0 00-.438-.219L3.563 15.312a2.062 2.062 0 01-2.875-2.062l1.344-3.75a2.062 2.062 0 013.688 1.313l-1.156 3.219a.25.25 0 00.438.219L15.312 4.688a2.062 2.062 0 010-3.375z" clip-rule="evenodd" />
                            </svg>
                        </span>
                        <span data-i18n="modal.spa.li2"></span>
                    </li>
                    <li class="modal-service-item">
                        <span class="modal-service-icon">
                            <svg class="pointer-events-none w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                            </svg>
                        </span>
                        <span data-i18n="modal.spa.li3"></span>
                    </li>
                    <li class="modal-service-item">
                        <span class="modal-service-icon">
                            <svg class="pointer-events-none w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM6.207 7.207a1 1 0 00-1.414 1.414L8.586 12l-3.793 3.793a1 1 0 101.414 1.414L10 13.414l3.793 3.793a1 1 0 001.414-1.414L11.414 12l3.793-3.793a1 1 0 00-1.414-1.414L10 10.586 6.207 7.207z" clip-rule="evenodd" />
                            </svg>
                        </span>
                        <span data-i18n="modal.spa.li4"></span>
                    </li>
                    <li class="modal-service-item">
                        <span class="modal-service-icon">
                            <svg class="pointer-events-none w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10 3.75a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5a.75.75 0 01.75-.75zM10 8.75a.75.75 0 01.75.75v6.5a.75.75 0 01-1.5 0v-6.5a.75.75 0 01.75-.75zM10 2a8 8 0 100 16 8 8 0 000-16z" />
                            </svg>
                        </span>
                        <span data-i18n="modal.spa.li5"></span>
                    </li>
                </ul>
                <p data-i18n="modal.cta" class="pt-4 font-semibold"></p>
            </div>
        </div>
    </div>
    
    <div id="depilacion-modal" role="dialog" aria-modal="true" class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-[60] hidden p-4">
        <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full relative max-h-[90vh] overflow-y-auto p-6 md:p-8">
            <button data-modal-close="depilacion-modal" aria-label="Cerrar ventana modal" class="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors duration-200">
                <svg class="pointer-events-none w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            <h3 data-i18n="modal.waxing.title" class="text-3xl font-serif font-bold text-brand-green mb-4">Depilación y pestañas</h3>
            <img src="images/pages/estetica/spa-hero.webp" alt="Servicios para una mirada impactante" class="w-full h-auto rounded-lg mt-2 mb-6 shadow-md" width="800" height="600">
            <div class="text-gray-700 space-y-4">
                <p data-i18n="modal.waxing.desc"></p>
                <h4 data-i18n="modal.waxing.subtitle" class="font-bold text-lg text-gray-800 pt-2"></h4>
                <ul class="space-y-3">
                    <li class="modal-service-item">
                        <span class="modal-service-icon">
                            <svg class="pointer-events-none w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M16.25 5a.75.75 0 00-1.5 0v2.75H12a.75.75 0 000 1.5h2.75V12a.75.75 0 001.5 0V9.25H19a.75.75 0 000-1.5h-2.75V5z" />
                                <path fill-rule="evenodd" d="M1.75 1A1.75 1.75 0 000 2.75v14.5A1.75 1.75 0 001.75 19h14.5A1.75 1.75 0 0018 17.25V10a.75.75 0 00-1.5 0v7.25c0 .138-.112.25-.25.25H1.75a.25.25 0 01-.25-.25V2.75c0-.138.112.25.25-.25h7.5a.75.75 0 000-1.5h-7.5z" clip-rule="evenodd" />
                            </svg>
                        </span>
                        <span data-i18n="modal.waxing.li1"></span>
                    </li>
                    <li class="modal-service-item">
                        <span class="modal-service-icon">
                            <svg class="pointer-events-none w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0l-1.586-1.586a2 2 0 10-2.828 2.828l1.586 1.586a2 2 0 010 2.828l-3 3a2 2 0 01-2.828-2.828l1.086-1.086a.5.5 0 00-.707-.707l-1.086 1.086a3.5 3.5 0 104.95 4.95l3-3a3.5 3.5 0 000-4.95l1.586-1.586a3.5 3.5 0 10-4.95-4.95l-1.586 1.586a.5.5 0 10.707.707l1.586-1.586z" />
                            </svg>
                        </span>
                        <span data-i18n="modal.waxing.li2"></span>
                    </li>
                    <li class="modal-service-item">
                        <span class="modal-service-icon">
                           <svg class="pointer-events-none w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                            </svg>
                        </span>
                        <span data-i18n="modal.waxing.li3"></span>
                    </li>
                    <li class="modal-service-item">
                        <span class="modal-service-icon">
                           <svg class="pointer-events-none w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                            </svg>
                        </span>
                        <span data-i18n="modal.waxing.li4"></span>
                    </li>
                    <li class="modal-service-item">
                        <span class="modal-service-icon">
                           <svg class="pointer-events-none w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0l-1.586-1.586a2 2 0 10-2.828 2.828l1.586 1.586a2 2 0 010 2.828l-3 3a2 2 0 01-2.828-2.828l1.086-1.086a.5.5 0 00-.707-.707l-1.086 1.086a3.5 3.5 0 104.95 4.95l3-3a3.5 3.5 0 000-4.95l1.586-1.586a3.5 3.5 0 10-4.95-4.95l-1.586 1.586a.5.5 0 10.707.707l1.586-1.586z" />
                            </svg>
                        </span>
                        <span data-i18n="modal.waxing.li5"></span>
                    </li>
                </ul>
                <p data-i18n="modal.cta" class="pt-4 font-semibold"></p>
            </div>
        </div>
    </div>
`;
