document.addEventListener("DOMContentLoaded", () => {
  // --- INICIO: LÓGICA PARA ANIMACIÓN DE HERO EN CARGA ---
  const heroTitle = document.getElementById("hero-title");
  const heroSubtitle = document.getElementById("hero-subtitle");

  if (heroTitle && heroSubtitle) {
    setTimeout(() => {
      heroTitle.classList.add("is-visible");
    }, 100);
    setTimeout(() => {
      heroSubtitle.classList.add("is-visible");
    }, 400);
  }
  // --- FIN: LÓGICA PARA ANIMACIÓN DE HERO EN CARGA ---

  // --- INICIO: LÓGICA DE TRADUCCIÓN (I18N) MEJORADA ---

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
      heroTitle: "Tu oasis de belleza y relajación en Chía",
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
        "Somos un equipo de profesionales, comprometidos con ofrecerte una experiencia inolvidable. Ofrecemos planes especiales, bonos de regalo y contamos con parqueadero gratuito para tu comodidad.",
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
      modalPeluqueriaDesc:
        "Transformamos tu cabello con arte, precisión y productos de las mejores marcas como Wella, L'Oréal y Schwarzkopf para garantizar resultados espectaculares.",
      modalPeluqueriaSubtitle: "Nuestros Servicios Destacados:",
      modalPeluqueriaLi1:
        "<strong>Color y Técnicas Avanzadas:</strong> Tintes, cubrimiento de canas y últimas tendencias en Balayage, Ombré y Babylights.",
      modalPeluqueriaLi2:
        "<strong>Cortes Personalizados:</strong> Asesoramiento de imagen para encontrar el corte que mejor se adapte a tu estilo.",
      modalPeluqueriaLi3:
        "<strong>Barbería:</strong> Cortes clásicos y modernos, arreglo de barba y rituales de afeitado.",
      modalPeluqueriaLi4:
        "<strong>Peinados y Maquillaje:</strong> Looks profesionales para cualquier ocasión, incluyendo recogidos, ondas y más.",
      modalPeluqueriaLi5:
        "<strong>Tratamientos Capilares:</strong> Hidratación profunda, reconstrucción y terapias para la salud de tu cuero cabelludo.",
      modalPeluqueriaCta:
        "¡Visítanos y deja que nuestros expertos realcen la belleza de tu cabello!",
      modalManosPiesDesc:
        "Ofrecemos una experiencia de manicure y pedicure de lujo con las mejores marcas como Organic, Belier y Masglo para asegurar un acabado perfecto y duradero.",
      modalManosPiesSubtitle: "Explora Nuestros Tratamientos:",
      modalManosPiesLi1:
        "<strong>Manicure y Pedicure:</strong> El cuidado clásico que tus uñas necesitan para lucir limpias, sanas y elegantes.",
      modalManosPiesLi2:
        "<strong>Esmaltado Semipermanente:</strong> Disfruta de un color impecable y un brillo espectacular por semanas.",
      modalManosPiesLi3:
        "<strong>Uñas Esculpidas:</strong> Extensiones en acrílico o gel, personalizadas para un look natural o audaz.",
      modalManosPiesLi4:
        "<strong>Diseños y Nail Art:</strong> Desde decoraciones sutiles hasta los diseños más creativos. ¡Hacemos tu idea realidad!",
      modalManosPiesLi5:
        "<strong>Pedicure Spa:</strong> Un ritual completo de relajación con exfoliación, hidratación profunda y masaje.",
      modalManosPiesCta:
        "¡Luce unas uñas perfectas y siéntete renovada con nuestros servicios!",
      modalEsteticaDesc:
        "Encuentra un santuario de paz y renovación en nuestro spa. Ofrecemos tratamientos faciales y corporales para revitalizar tu piel y relajar tu mente.",
      modalEsteticaSubtitle: "Nuestros Rituales de Bienestar:",
      modalEsteticaLi1:
        "<strong>Limpieza Facial Profunda:</strong> Purifica y desintoxica tu piel, eliminando impurezas y devolviéndole su luminosidad.",
      modalEsteticaLi2:
        "<strong>Hidratación Facial Intensiva:</strong> Tratamientos personalizados para nutrir tu piel a profundidad y combatir la resequedad.",
      modalEsteticaLi3:
        "<strong>Masajes Relajantes:</strong> Libera el estrés y la tensión muscular con técnicas para una relajación total.",
      modalEsteticaLi4:
        "<strong>Drenaje Linfático:</strong> Técnica manual que ayuda a eliminar toxinas y reducir la retención de líquidos.",
      modalEsteticaLi5:
        "<strong>Tratamientos Corporales:</strong> Exfoliaciones y envolturas para una piel suave, renovada y saludable.",
      modalEsteticaCta:
        "Regálate un momento de paz y cuidado. ¡Tu cuerpo y tu mente te lo agradecerán!",
      modalDepilacionDesc:
        "Realza tu belleza con nuestros servicios especializados. Utilizamos técnicas precisas y productos de la más alta calidad para tu comodidad.",
      modalDepilacionSubtitle: "Define tu Mirada y Piel:",
      modalDepilacionLi1:
        "<strong>Depilación con Cera:</strong> Técnica eficaz para eliminar el vello desde la raíz, dejando tu piel tersa por más tiempo.",
      modalDepilacionLi2:
        "<strong>Depilación con Hilo:</strong> Ideal para zonas delicadas como cejas y rostro, con una precisión inigualable.",
      modalDepilacionLi3:
        "<strong>Extensiones de Pestañas:</strong> Logra una mirada más densa, larga y expresiva con un acabado natural.",
      modalDepilacionLi4:
        "<strong>Lifting de Pestañas:</strong> Eleva y curva tus pestañas naturales para que parezcan más largas y definidas.",
      modalDepilacionLi5:
        "<strong>Diseño de Cejas:</strong> Damos forma a tus cejas según la morfología de tu rostro y aplicamos sombreado.",
      modalDepilacionCta:
        "¡Descubre el poder de una mirada y una piel impecable en Narbo's!",
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
      heroTitle: "Your oasis of beauty and relaxation in Chía",
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
        "We are a team of professionals, committed to offering you an unforgettable experience. We offer special packages, gift certificates, and have free parking for your convenience.",
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
      modalPeluqueriaDesc:
        "We transform your hair with art, precision, and top brand products like Wella, L'Oréal, and Schwarzkopf to ensure spectacular results.",
      modalPeluqueriaSubtitle: "Our Featured Services:",
      modalPeluqueriaLi1:
        "<strong>Color & Advanced Techniques:</strong> Dyes, gray coverage, and the latest trends in Balayage, Ombré, and Babylights.",
      modalPeluqueriaLi2:
        "<strong>Custom Haircuts:</strong> Image consulting to find the cut that best suits your style.",
      modalPeluqueriaLi3:
        "<strong>Barbering:</strong> Classic and modern cuts, beard trims, and shaving rituals.",
      modalPeluqueriaLi4:
        "<strong>Hairstyling & Makeup:</strong> Professional looks for any occasion, including updos, waves, and more.",
      modalPeluqueriaLi5:
        "<strong>Hair Treatments:</strong> Deep hydration, reconstruction, and therapies for your scalp's health.",
      modalPeluqueriaCta:
        "Visit us and let our experts enhance your hair's beauty!",
      modalManosPiesDesc:
        "We offer a luxury manicure and pedicure experience with top brands like Organic, Belier, and Masglo to ensure a perfect, long-lasting finish.",
      modalManosPiesSubtitle: "Explore Our Treatments:",
      modalManosPiesLi1:
        "<strong>Manicure & Pedicure:</strong> The classic care your nails need to look clean, healthy, and elegant.",
      modalManosPiesLi2:
        "<strong>Semi-Permanent Polish:</strong> Enjoy flawless color and spectacular shine for weeks.",
      modalManosPiesLi3:
        "<strong>Sculpted Nails:</strong> Custom acrylic or gel extensions for a natural or bold look.",
      modalManosPiesLi4:
        "<strong>Designs & Nail Art:</strong> From subtle decorations to creative designs. We make your ideas a reality!",
      modalManosPiesLi5:
        "<strong>Spa Pedicure:</strong> A complete relaxation ritual with exfoliation, deep hydration, and massage.",
      modalManosPiesCta:
        "Show off perfect nails and feel renewed with our services!",
      modalEsteticaDesc:
        "Find a sanctuary of peace and renewal in our spa. We offer facial and body treatments to revitalize your skin and relax your mind.",
      modalEsteticaSubtitle: "Our Wellness Rituals:",
      modalEsteticaLi1:
        "<strong>Deep Cleansing Facial:</strong> Purifies and detoxifies your skin, removing impurities and restoring its radiance.",
      modalEsteticaLi2:
        "<strong>Intensive Facial Hydration:</strong> Personalized treatments to deeply nourish your skin and combat dryness.",
      modalEsteticaLi3:
        "<strong>Relaxing Massages:</strong> Release stress and muscle tension with techniques for total relaxation.",
      modalEsteticaLi4:
        "<strong>Lymphatic Drainage:</strong> A manual technique that helps eliminate toxins and reduce fluid retention.",
      modalEsteticaLi5:
        "<strong>Body Treatments:</strong> Exfoliations and wraps for soft, renewed, and healthy skin.",
      modalEsteticaCta:
        "Treat yourself to a moment of peace and care. Your body and mind will thank you!",
      modalDepilacionDesc:
        "Enhance your beauty with our specialized services. We use precise techniques and the highest quality products for your comfort.",
      modalDepilacionSubtitle: "Define Your Look and Skin:",
      modalDepilacionLi1:
        "<strong>Waxing:</strong> An effective technique to remove hair from the root, leaving your skin smooth for longer.",
      modalDepilacionLi2:
        "<strong>Threading:</strong> Ideal for delicate areas like eyebrows and face, with unparalleled precision.",
      modalDepilacionLi3:
        "<strong>Eyelash Extensions:</strong> Achieve a fuller, longer, and more expressive look with a natural finish.",
      modalDepilacionLi4:
        "<strong>Lash Lift:</strong> Lifts and curls your natural lashes to make them appear longer and more defined.",
      modalDepilacionLi5:
        "<strong>Eyebrow Design:</strong> We shape your eyebrows according to your facial morphology and apply shading.",
      modalDepilacionCta:
        "Discover the power of a flawless look and skin at Narbo's!",
    },
  };

  const langToggleDesktop = document.getElementById("lang-toggle-desktop");
  const langToggleMobile = document.getElementById("lang-toggle-mobile");

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

    updateLangToggleButtons(lang);
  };

  const updateLangToggleButtons = (currentLang) => {
    const targetLang = currentLang === "es" ? "en" : "es";
    const flagCode = targetLang === "es" ? "es" : "gb";

    const buttonHTML = `
      <img src="https://flagcdn.com/w20/${flagCode}.png" srcset="https://flagcdn.com/w40/${flagCode}.png 2x" alt="${targetLang.toUpperCase()}" class="w-5 h-auto mr-2">
      ${targetLang.toUpperCase()}
    `;

    langToggleDesktop.innerHTML = buttonHTML;
    langToggleMobile.innerHTML = buttonHTML;
  };

  const toggleLanguage = () => {
    const currentLang = localStorage.getItem("language") || "es";
    const newLang = currentLang === "es" ? "en" : "es";
    localStorage.setItem("language", newLang);
    setLanguage(newLang);
  };

  langToggleDesktop.addEventListener("click", toggleLanguage);
  langToggleMobile.addEventListener("click", toggleLanguage);

  const currentLang = localStorage.getItem("language") || "es";
  setLanguage(currentLang);

  // --- FIN: LÓGICA DE TRADUCCIÓN (I18N) MEJORADA ---

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

  // --- INICIO: LÓGICA DEL SLIDER DE RESEÑAS (CON AUTOPLAY Y ALTURA UNIFORME) ---
  const sliderWrapper = document.getElementById("reviews-slider-wrapper");
  const reviewSlides = document.querySelectorAll(".review-slide");
  const prevBtn = document.getElementById("prev-review");
  const nextBtn = document.getElementById("next-review");

  if (reviewSlides.length > 0) {
    let currentReviewIndex = 0;
    let autoPlayInterval;

    const unifySlideHeights = () => {
      let maxHeight = 0;
      reviewSlides.forEach((slide) => {
        slide.style.height = "auto";
        if (slide.offsetHeight > maxHeight) {
          maxHeight = slide.offsetHeight;
        }
      });
      reviewSlides.forEach((slide) => {
        slide.style.minHeight = `${maxHeight}px`;
      });
    };

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
      autoPlayInterval = setInterval(nextReview, 7000);
    };

    const stopAutoPlay = () => {
      clearInterval(autoPlayInterval);
    };

    prevBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      currentReviewIndex =
        (currentReviewIndex - 1 + reviewSlides.length) % reviewSlides.length;
      showReview(currentReviewIndex);
      stopAutoPlay();
    });

    nextBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      nextReview();
      stopAutoPlay();
    });

    sliderWrapper.addEventListener("mouseenter", stopAutoPlay);
    sliderWrapper.addEventListener("mouseleave", startAutoPlay);

    unifySlideHeights();
    window.addEventListener("resize", unifySlideHeights);

    showReview(currentReviewIndex);
    startAutoPlay();
  }
  // --- FIN: LÓGICA DEL SLIDER DE RESEÑAS ---

  // --- INICIO: LÓGICA DEL FILTRO INTERACTIVO DE LA GALERÍA ---
  const galleryFilters = document.getElementById("gallery-filters");
  const galleryItems = document.querySelectorAll(".gallery-item");
  const filterButtons = document.querySelectorAll(".filter-btn");

  if (galleryFilters && galleryItems.length > 0) {
    const defaultFilterBtn = document.querySelector(
      '.filter-btn[data-filter="todos"]'
    );
    if (defaultFilterBtn) {
      filterButtons.forEach((btn) => btn.classList.remove("filter-btn-active"));
      defaultFilterBtn.classList.add("filter-btn-active");
    }

    galleryFilters.addEventListener("click", (e) => {
      const clickedButton = e.target.closest(".filter-btn");
      if (clickedButton) {
        const filterValue = clickedButton.getAttribute("data-filter");

        filterButtons.forEach((btn) => {
          btn.classList.remove("filter-btn-active");
        });
        clickedButton.classList.add("filter-btn-active");

        galleryItems.forEach((item) => {
          const itemCategory = item.getAttribute("data-category");

          if (filterValue === "todos" || filterValue === itemCategory) {
            item.classList.remove("hidden");
          } else {
            item.classList.add("hidden");
          }
        });

        if (typeof lightbox !== "undefined") {
          lightbox.reload();
        }
      }
    });
  }
  // --- FIN: LÓGICA DEL FILTRO INTERACTIVO DE LA GALERÍA ---

  // --- INICIO: LÓGICA PARA MODALES DE SERVICIOS ---

  const openModalTriggers = document.querySelectorAll("[data-modal-target]");

  const openModal = (modal) => {
    if (modal) {
      const modalContent = modal.querySelector(".bg-white");
      modal.classList.remove("hidden");
      modal.classList.add("modal-animation");
      if (modalContent) {
        modalContent.classList.add("modal-content-animation");
      }
      document.body.classList.add("mobile-menu-open");
    }
  };

  const closeModal = (modal) => {
    if (modal) {
      const modalContent = modal.querySelector(".bg-white");
      modal.classList.remove("modal-animation");
      if (modalContent) {
        modalContent.classList.remove("modal-content-animation");
      }
      modal.classList.add("hidden");
      document.body.classList.remove("mobile-menu-open");
    }
  };

  openModalTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const modal = document.getElementById(trigger.dataset.modalTarget);
      openModal(modal);
    });
  });

  document.querySelectorAll('[id$="-modal"]').forEach((modal) => {
    const closeButton = modal.querySelector("[data-modal-close]");
    if (closeButton) {
      closeButton.addEventListener("click", () => closeModal(modal));
    }
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const openModal = document.querySelector(".modal-animation:not(.hidden)");
      closeModal(openModal);
    }
  });

  // --- FIN: LÓGICA PARA MODALES DE SERVICIOS ---

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

  // --- INICIO: LÓGICA PARA ANIMACIÓN POR SCROLL ---
  const scrollAnimateElements = document.querySelectorAll(".scroll-animate");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  scrollAnimateElements.forEach((element) => {
    observer.observe(element);
  });
  // --- FIN: LÓGICA PARA ANIMACIÓN POR SCROLL ---
});
