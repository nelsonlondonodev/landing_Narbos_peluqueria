document.addEventListener("DOMContentLoaded", () => {
  // --- Lógica para el Menú Hamburguesa ---
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });

  // Cierra el menú móvil si se hace clic en un enlace
  const mobileMenuLinks = mobileMenu.querySelectorAll("a");
  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
    });
  });

  // --- Lógica para la Validación del Formulario de Contacto ---
  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Previene el envío real del formulario

    // Simulación de validación
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (name === "" || email === "" || message === "") {
      formStatus.textContent = "Por favor, completa todos los campos.";
      formStatus.style.color = "red";
    } else {
      // Aquí es donde integrarías un servicio como Formspree o EmailJS
      formStatus.textContent =
        "¡Gracias por tu mensaje! Te responderemos pronto.";
      formStatus.style.color = "green";
      contactForm.reset(); // Limpia el formulario

      // Oculta el mensaje de estado después de 5 segundos
      setTimeout(() => {
        formStatus.textContent = "";
      }, 5000);
    }
  });

  // --- INICIO: LÓGICA DE SCROLL SPY ---
  // Selecciona todas las secciones que tienen un ID y los enlaces del menú de navegación de escritorio.
  // ***** LÍNEA CORREGIDA: Ahora incluye 'footer[id]' para detectar la sección de contacto. *****
  const sections = document.querySelectorAll("main section[id], footer[id]");
  const navLinks = document.querySelectorAll("header nav .hidden a");

  // Función que se ejecuta cuando el usuario se desplaza por la página.
  const onScroll = () => {
    const scrollPosition = window.scrollY + 150; // Añadimos un offset para que el enlace se active un poco antes.

    sections.forEach((section) => {
      // Comprueba si la posición de scroll está dentro de los límites de la sección actual.
      if (
        scrollPosition >= section.offsetTop &&
        scrollPosition < section.offsetTop + section.offsetHeight
      ) {
        // Si es así, elimina la clase activa de todos los enlaces.
        navLinks.forEach((link) => {
          link.classList.remove("nav-link-active");
        });

        // Y añade la clase activa solo al enlace que corresponde a la sección actual.
        // Se busca un enlace cuyo 'href' contenga el ID de la sección.
        const correspondingLink = document.querySelector(
          `header nav .hidden a[href*="${section.id}"]`
        );
        if (correspondingLink) {
          correspondingLink.classList.add("nav-link-active");
        }
      }
    });
  };

  // Agrega un 'escuchador de eventos' que llama a la función onScroll cada vez que se hace scroll.
  window.addEventListener("scroll", onScroll);
  // --- FIN: LÓGICA DE SCROLL SPY ---
});
