document.addEventListener("DOMContentLoaded", () => {
  // --- INICIO: LÓGICA DE TRADUCCIÓN (I18N) ---

  const translations = {
    es: {
      metaTitle: "Narbo's Salón Spa | Peluquería y Spa en Chía, Colombia",
      metaDescription:
        "Experimenta belleza y relajación en Narbo's Salón Spa en Chía. Ofrecemos servicios de peluquería, balayage, manicure, estética facial y más. ¡Agenda tu cita!",
      navInicio: "Inicio",
      navServicios: "Servicios",
      navNosotros: "Nosotros",
      navGaleria: "Galería",
      navResenas: "Reseñas",
      navUbicacion: "Ubicación",
      navContacto: "Contacto",
      navInicioMobile: "Inicio",
      navServiciosMobile: "Servicios",
      navNosotrosMobile: "Nosotros",
      navGaleriaMobile: "Galería",
      navResenasMobile: "Reseñas",
      navUbicacionMobile: "Ubicación",
      navContactoMobile: "Contacto",
      heroTitle: "Tu peluquería en Chía", // <-- LÍNEA MODIFICADA
      heroSubtitle:
        "Más de 11 años de experiencia transformando tu estilo y bienestar.",
      heroCta: "Agenda tu Cita por WhatsApp",
      servicesTitle: "Nuestros Servicios",
      servicesSubtitle:
        "Ofrecemos una amplia gama de tratamientos con productos de alta calidad para realzar tu belleza.",
      service1Title: "Peluquería",
      service1Desc:
        "Color, balayage, cortes, barbería, maquillaje y peinados con las mejores marcas: Wella, L'Oréal, y Schwarzkopf.",
      service2Title: "Manos y Pies",
      service2Desc:
        "Manicure y pedicure con esmaltado semipermanente, uñas en gel o acrílicas con productos Organic, Belier y Masglo.",
      service3Title: "Estética & Spa",
      service3Desc:
        "Masajes relajantes, drenajes linfáticos, y limpiezas e hidrataciones faciales con productos dermatológicos.",
      service4Title: "Depilación y Pestañas",
      service4Desc:
        "Servicios de depilación con cera o hilo y extensiones de pestañas para una mirada impactante.",
      aboutTitle: "Más de una década de experiencia",
      aboutP1:
        "En Narbo's Salón Spa, llevamos más de 11 años dedicados al arte de la belleza y el bienestar. Aunque nuestra nueva y moderna sede abrió en 2024, nuestra pasión y experiencia nos acompañan desde 2013.",
      aboutP2:
        "Somos un negocio liderado por mujeres, comprometidas con ofrecerte una experiencia inolvidable. Ofrecemos planes especiales, bonos de regalo y contamos con parqueadero gratuito para tu comodidad.",
      aboutP3: "¡Te esperamos para consentirte!",
      aboutAlt: "Equipo profesional de Narbo's Salón Spa sonriendo",
      galleryTitle: "Nuestros Trabajos",
      galleryFilterAll: "Todos",
      galleryFilterHair: "Peluquería",
      galleryFilterNails: "Uñas",
      galleryFilterAesthetics: "Estética",
      galleryAlt1: "Trabajo de balayage profesional",
      galleryAlt2: "Diseño de uñas acrílicas creativo",
      galleryAlt3: "Corte de cabello moderno para mujer",
      galleryAlt4: "Maquillaje profesional para evento",
      galleryAlt5: "Peinado elegante para ocasión especial",
      galleryAlt6: "Tratamiento facial de limpieza profunda",
      locationTitle: "Visítanos",
      locationAddress:
        "Kilómetro 2 vía Chía-Cajicá, Bajos del hotel Ibis, Chía, Cundinamarca.",
      locationHoursTitle: "Horario de Atención",
      locationHoursDays:
        "<strong>Lunes a Sábado:</strong> 7:00 a.m. – 8:00 p.m.",
      locationHoursSun: "<strong>Domingo:</strong> 9:00 a.m. – 2:00 p.m.",
      locationHoursHolidays: "<strong>Festivos:</strong> 9:00 a.m. – 2:00 p.m.",
      footerTitle: "Agenda tu cita hoy",
      footerSubtitle:
        "Llámanos o escríbenos por WhatsApp. O si prefieres, déjanos un mensaje aquí:",
      footerCta: "Contactar por WhatsApp",
      formNameLabel: "Nombre",
      formEmailLabel: "Correo Electrónico",
      formMessageLabel: "Mensaje",
      formSubmitBtn: "Enviar Mensaje",
      formStatusError: "Por favor, completa todos los campos.",
      formStatusSuccess: "¡Gracias por tu mensaje! Te responderemos pronto.",
      footerLinkWhatsapp: "WhatsApp",
      footerLinkInstagram: "Instagram",
      footerLinkFacebook: "Facebook",
      footerLinkTiktok: "TikTok",
      footerCopyright:
        "© 2025 Narbo's Salón Spa. Todos los derechos reservados.",
      reviewsTitle: "Lo que dicen nuestros clientes",
      reviewsSubtitle:
        "Estamos orgullosos de la experiencia que ofrecemos. Aquí tienes algunas de las reseñas de Google que más nos inspiran.",
      review1Text:
        '"Narbo’s Spa es mi lugar favorito para consentirme. La atención siempre es impecable, el ambiente es relajante y el servicio de uñas es espectacular. Cada vez que voy, salgo feliz con el resultado. Son muy detallistas, puntuales y cuidan cada detalle. ¡Súper recomendado!"',
      review1Author: "- HeLLeN GaLiiNdO",
      review2Text:
        '"Siempre me atienden con la mejor energía, el servicio es súper profesional y se nota el amor que le ponen a cada detalle. Mis uñas siempre quedan hermosas, duran un montón y me encanta cómo siempre logran justo lo que quiero. ¡Mil gracias por siempre hacerme sentir tan bien y por ese talento increíble que tienen! 💅✨"',
      review2Author: "- manuela pardo",
      review3Text:
        '"Excelente lugar! La atención es espectacular, los servicios y productos ofrecidos son de excelente calidad, sales realmente renovad@😉"',
      review3Author: "- Claudia Escobar",
    },
    en: {
      metaTitle: "Narbo's Salon Spa | Hair & Spa in Chía, Colombia",
      metaDescription:
        "Experience beauty and relaxation at Narbo's Salon Spa in Chía. We offer hairdressing, balayage, manicures, facials, and more. Book your appointment!",
      navInicio: "Home",
      navServicios: "Services",
      navNosotros: "About Us",
      navGaleria: "Gallery",
      navResenas: "Reviews",
      navUbicacion: "Location",
      navContacto: "Contact",
      navInicioMobile: "Home",
      navServiciosMobile: "Services",
      navNosotrosMobile: "About Us",
      navGaleriaMobile: "Gallery",
      navResenasMobile: "Reviews",
      navUbicacionMobile: "Location",
      navContactoMobile: "Contact",
      heroTitle: "Your hair salon in Chía", // <-- LÍNEA MODIFICADA
      heroSubtitle:
        "Over 11 years of experience transforming your style and well-being.",
      heroCta: "Book via WhatsApp",
      servicesTitle: "Our Services",
      servicesSubtitle:
        "We offer a wide range of treatments with high-quality products to enhance your beauty.",
      service1Title: "Hairdressing",
      service1Desc:
        "Color, balayage, cuts, barbering, makeup, and hairstyles with the best brands: Wella, L'Oréal, and Schwarzkopf.",
      service2Title: "Hands & Feet",
      service2Desc:
        "Manicures and pedicures with semi-permanent polish, gel or acrylic nails with Organic, Belier, and Masglo products.",
      service3Title: "Aesthetics & Spa",
      service3Desc:
        "Relaxing massages, lymphatic drainage, and facial cleansings and hydrations with dermatological products.",
      service4Title: "Waxing & Lashes",
      service4Desc:
        "Wax or thread hair removal services and eyelash extensions for a stunning look.",
      aboutTitle: "Over a decade of experience",
      aboutP1:
        "At Narbo's Salon Spa, we have been dedicated to the art of beauty and wellness for over 11 years. Although our new, modern location opened in 2024, our passion and experience have been with us since 2013.",
      aboutP2:
        "We are a women-led business, committed to offering you an unforgettable experience. We offer special packages, gift certificates, and have free parking for your convenience.",
      aboutP3: "We look forward to pampering you!",
      aboutAlt: "Professional team of Narbo's Salon Spa smiling",
      galleryTitle: "Our Work",
      galleryFilterAll: "All",
      galleryFilterHair: "Hairdressing",
      galleryFilterNails: "Nails",
      galleryFilterAesthetics: "Aesthetics",
      galleryAlt1: "Professional balayage work",
      galleryAlt2: "Creative acrylic nail design",
      galleryAlt3: "Modern haircut for women",
      galleryAlt4: "Professional makeup for an event",
      galleryAlt5: "Elegant hairstyle for a special occasion",
      galleryAlt6: "Deep cleansing facial treatment",
      locationTitle: "Visit Us",
      locationAddress:
        "Kilometer 2 Chía-Cajicá road, beneath the Ibis hotel, Chía, Cundinamarca.",
      locationHoursTitle: "Opening Hours",
      locationHoursDays:
        "<strong>Monday to Saturday:</strong> 7:00 a.m. – 8:00 p.m.",
      locationHoursSun: "<strong>Sunday:</strong> 9:00 a.m. – 2:00 p.m.",
      locationHoursHolidays: "<strong>Holidays:</strong> 9:00 a.m. – 2:00 p.m.",
      footerTitle: "Book your appointment today",
      footerSubtitle:
        "Call or write to us on WhatsApp. Or if you prefer, leave us a message here:",
      footerCta: "Contact via WhatsApp",
      formNameLabel: "Name",
      formEmailLabel: "Email Address",
      formMessageLabel: "Message",
      formSubmitBtn: "Send Message",
      formStatusError: "Please fill in all fields.",
      formStatusSuccess:
        "Thank you for your message! We will get back to you soon.",
      footerLinkWhatsapp: "WhatsApp",
      footerLinkInstagram: "Instagram",
      footerLinkFacebook: "Facebook",
      footerLinkTiktok: "TikTok",
      footerCopyright: "© 2025 Narbo's Salón Spa. All rights reserved.",
      reviewsTitle: "What Our Clients Say",
      reviewsSubtitle:
        "We are proud of the experience we offer. Here are some of the most inspiring Google reviews.",
      review1Text:
        '"Narbo\'s Spa is my favorite place to pamper myself. The service is always impeccable, the atmosphere is relaxing, and the nail service is spectacular. Every time I go, I leave happy with the result. They are very detail-oriented, punctual, and take care of every detail. Highly recommended!"',
      review1Author: "- HeLLeN GaLiiNdO",
      review2Text:
        '"They always greet me with the best energy, the service is super professional, and you can see the love they put into every detail. My nails always look beautiful, they last a long time, and I love how they always achieve just what I want. Thank you so much for always making me feel so good and for the incredible talent you have! 💅✨"',
      review2Author: "- manuela pardo",
      review3Text:
        '"Excellent place! The service is spectacular, the services and products offered are of excellent quality, you leave feeling truly renewed 😉"',
      review3Author: "- Claudia Escobar",
    },
  };

  const setLanguage = (lang) => {
    document.documentElement.lang = lang;

    document.querySelectorAll("[data-key]").forEach((elem) => {
      const key = elem.getAttribute("data-key");
      if (translations[lang] && translations[lang][key]) {
        elem.innerHTML = translations[lang][key];
      }
    });

    document.querySelectorAll("[data-key-alt]").forEach((elem) => {
      const key = elem.getAttribute("data-key-alt");
      if (translations[lang] && translations[lang][key]) {
        elem.setAttribute("alt", translations[lang][key]);
      }
    });

    document
      .getElementById("meta-description")
      .setAttribute("content", translations[lang].metaDescription);
    document.title = translations[lang].metaTitle;

    updateLangButtonsStyle(lang);
  };

  const updateLangButtonsStyle = (activeLang) => {
    document.querySelectorAll(".lang-btn, .lang-btn-mobile").forEach((btn) => {
      const btnLang = btn.dataset.lang || btn.dataset.langMobile;
      if (btnLang === activeLang) {
        btn.classList.add(
          "font-bold",
          "text-brand-green",
          "dark:text-brand-medium"
        );
        btn.classList.remove("text-gray-500", "hover:text-brand-green");
      } else {
        btn.classList.remove(
          "font-bold",
          "text-brand-green",
          "dark:text-brand-medium"
        );
        btn.classList.add("text-gray-500", "hover:text-brand-green");
      }
    });
  };

  document.querySelectorAll(".lang-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const lang = button.dataset.lang;
      localStorage.setItem("language", lang);
      setLanguage(lang);
    });
  });

  document.querySelectorAll(".lang-btn-mobile").forEach((button) => {
    button.addEventListener("click", () => {
      const lang = button.dataset.langMobile;
      localStorage.setItem("language", lang);
      setLanguage(lang);
    });
  });

  const currentLang = localStorage.getItem("language") || "es";
  setLanguage(currentLang);

  // --- FIN: LÓGICA DE TRADUCCIÓN (I18N) ---

  // --- INICIO: LÓGICA MEJORADA PARA MENÚ HAMBURGUESA (OVERLAY) ---
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuBackdrop = document.getElementById("menu-backdrop");
  const menuOpenIcon = document.getElementById("menu-open-icon");
  const menuCloseIcon = document.getElementById("menu-close-icon");
  const mobileMenuLinks = mobileMenu.querySelectorAll("a");

  const toggleMenu = () => {
    mobileMenu.classList.toggle("translate-x-full");
    menuBackdrop.classList.toggle("hidden");
    menuOpenIcon.classList.toggle("hidden");
    menuCloseIcon.classList.toggle("hidden");
    document.body.classList.toggle("mobile-menu-open");
  };

  menuBtn.addEventListener("click", toggleMenu);
  menuBackdrop.addEventListener("click", toggleMenu);
  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", toggleMenu);
  });
  // --- FIN: LÓGICA MEJORADA PARA MENÚ HAMBURGUESA (OVERLAY) ---

  // --- Lógica para la Validación del Formulario de Contacto ---
  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const lang = localStorage.getItem("language") || "es";

    if (name === "" || email === "" || message === "") {
      formStatus.textContent = translations[lang].formStatusError;
      formStatus.style.color = "red";
    } else {
      formStatus.textContent = translations[lang].formStatusSuccess;
      formStatus.style.color = "green";
      contactForm.reset();
      setTimeout(() => {
        formStatus.textContent = "";
      }, 5000);
    }
  });

  // --- LÓGICA DE SCROLL SPY ---
  const sections = document.querySelectorAll("main section[id], footer[id]");
  const navLinks = document.querySelectorAll("header nav .hidden a");

  const onScroll = () => {
    const scrollPosition = window.scrollY + 150;
    sections.forEach((section) => {
      if (
        scrollPosition >= section.offsetTop &&
        scrollPosition < section.offsetTop + section.offsetHeight
      ) {
        navLinks.forEach((link) => {
          link.classList.remove("nav-link-active");
        });
        const correspondingLink = document.querySelector(
          `header nav .hidden a[href*="${section.id}"]`
        );
        if (correspondingLink) {
          correspondingLink.classList.add("nav-link-active");
        }
      }
    });
  };
  window.addEventListener("scroll", onScroll);

  // --- INICIO: LÓGICA AVANZADA DE TEMA (Claro, Oscuro, Automático) ---
  const themeToggleBtn = document.getElementById("theme-toggle");
  const themeToggleDarkIcon = document.getElementById("theme-toggle-dark-icon");
  const themeToggleLightIcon = document.getElementById(
    "theme-toggle-light-icon"
  );
  const themeToggleAutoIcon = document.getElementById("theme-toggle-auto-icon");

  const themeToggleBtnMobile = document.getElementById("theme-toggle-mobile");
  const themeToggleDarkIconMobile = document.getElementById(
    "theme-toggle-dark-icon-mobile"
  );
  const themeToggleLightIconMobile = document.getElementById(
    "theme-toggle-light-icon-mobile"
  );
  const themeToggleAutoIconMobile = document.getElementById(
    "theme-toggle-auto-icon-mobile"
  );

  const applyTheme = () => {
    const theme = localStorage.getItem("theme") || "auto";
    [
      themeToggleDarkIcon,
      themeToggleLightIcon,
      themeToggleAutoIcon,
      themeToggleDarkIconMobile,
      themeToggleLightIconMobile,
      themeToggleAutoIconMobile,
    ].forEach((icon) => {
      icon.classList.add("hidden");
    });

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      themeToggleLightIcon.classList.remove("hidden");
      themeToggleLightIconMobile.classList.remove("hidden");
    } else if (theme === "light") {
      document.documentElement.classList.remove("dark");
      themeToggleDarkIcon.classList.remove("hidden");
      themeToggleDarkIconMobile.classList.remove("hidden");
    } else {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      themeToggleAutoIcon.classList.remove("hidden");
      themeToggleAutoIconMobile.classList.remove("hidden");
    }
  };

  const cycleTheme = () => {
    const currentTheme = localStorage.getItem("theme") || "auto";
    let nextTheme;

    if (currentTheme === "light") {
      nextTheme = "dark";
    } else if (currentTheme === "dark") {
      nextTheme = "auto";
    } else {
      nextTheme = "light";
    }

    localStorage.setItem("theme", nextTheme);
    applyTheme();
  };

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", applyTheme);
  themeToggleBtn.addEventListener("click", cycleTheme);
  themeToggleBtnMobile.addEventListener("click", cycleTheme);
  applyTheme();
  // --- FIN: LÓGICA AVANZADA DE TEMA ---

  // --- INICIO: LÓGICA DEL SLIDER DE RESEÑAS (CON AUTOPLAY) ---
  const sliderContainer = document.getElementById("reviews-slider");
  const reviewSlides = document.querySelectorAll(".review-slide");
  const prevBtn = document.getElementById("prev-review");
  const nextBtn = document.getElementById("next-review");

  if (reviewSlides.length > 0) {
    let currentReviewIndex = 0;
    let autoPlayInterval;

    const showReview = (index) => {
      reviewSlides.forEach((slide, i) => {
        slide.style.display = i === index ? "block" : "none";
      });
    };

    const nextReview = () => {
      currentReviewIndex = (currentReviewIndex + 1) % reviewSlides.length;
      showReview(currentReviewIndex);
    };

    const startAutoPlay = () => {
      autoPlayInterval = setInterval(nextReview, 7000); // Cambia cada 7 segundos
    };

    const stopAutoPlay = () => {
      clearInterval(autoPlayInterval);
    };

    prevBtn.addEventListener("click", () => {
      currentReviewIndex =
        (currentReviewIndex - 1 + reviewSlides.length) % reviewSlides.length;
      showReview(currentReviewIndex);
    });

    nextBtn.addEventListener("click", () => {
      nextReview();
    });

    sliderContainer.addEventListener("mouseenter", stopAutoPlay);
    sliderContainer.addEventListener("mouseleave", startAutoPlay);

    prevBtn.addEventListener("click", stopAutoPlay);
    nextBtn.addEventListener("click", stopAutoPlay);

    showReview(currentReviewIndex);
    startAutoPlay();
  }
  // --- FIN: LÓGICA DEL SLIDER DE RESEÑAS ---

  // --- INICIO: LÓGICA DEL FILTRO INTERACTIVO DE LA GALERÍA ---
  const galleryFilters = document.getElementById("gallery-filters");
  const galleryItems = document.querySelectorAll(".gallery-item");
  const filterButtons = document.querySelectorAll(".filter-btn");

  if (galleryFilters && galleryItems.length > 0) {
    // Establecer el botón "Todos" como activo por defecto al cargar la página.
    const defaultFilterBtn = document.querySelector(
      '.filter-btn[data-filter="todos"]'
    );
    if (defaultFilterBtn) {
      // Primero, eliminamos la clase activa de todos para estar seguros
      filterButtons.forEach((btn) => btn.classList.remove("filter-btn-active"));
      // Luego, la añadimos al botón por defecto.
      defaultFilterBtn.classList.add("filter-btn-active");
    }

    galleryFilters.addEventListener("click", (e) => {
      // Nos aseguramos de que el clic fue en un botón con la clase 'filter-btn'
      const clickedButton = e.target.closest(".filter-btn");
      if (clickedButton) {
        const filterValue = clickedButton.getAttribute("data-filter");

        // Actualizar el estilo del botón activo
        filterButtons.forEach((btn) => {
          btn.classList.remove("filter-btn-active");
        });
        clickedButton.classList.add("filter-btn-active");

        // Recorrer y filtrar cada elemento de la galería
        galleryItems.forEach((item) => {
          const itemCategory = item.getAttribute("data-category");

          // Si el filtro es "todos" o la categoría del ítem coincide, lo mostramos. Si no, lo ocultamos.
          if (filterValue === "todos" || filterValue === itemCategory) {
            item.classList.remove("hidden");
          } else {
            item.classList.add("hidden");
          }
        });

        // ¡Paso Clave! Se debe recargar GLightbox después de filtrar.
        // Esto actualiza la galería interna de GLightbox para que solo incluya los elementos visibles.
        // Sin esto, al hacer clic en una imagen, las flechas de navegación mostrarían también las ocultas.
        if (typeof lightbox !== "undefined") {
          lightbox.reload();
        }
      }
    });
  }
  // --- FIN: LÓGICA DEL FILTRO INTERACTIVO DE LA GALERÍA ---

  // --- INICIO: LÓGICA DE LIGHTBOX GALLERY (GLightbox) ---
  const lightbox = GLightbox({
    selector: ".glightbox",
    touchNavigation: true,
    loop: true,
    preload: true,
    closeEffect: "fade",
    slideEffect: "fade",
  });
  // --- FIN: LÓGICA DE LIGHTBOX GALLERY ---
});
