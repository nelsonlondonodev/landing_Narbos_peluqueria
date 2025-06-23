document.addEventListener("DOMContentLoaded", () => {
  // --- Lógica para el Menú Hamburguesa ---
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });

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
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (name === "" || email === "" || message === "") {
      formStatus.textContent = "Por favor, completa todos los campos.";
      formStatus.style.color = "red";
    } else {
      formStatus.textContent =
        "¡Gracias por tu mensaje! Te responderemos pronto.";
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

  // Función central para aplicar el tema y actualizar los íconos
  const applyTheme = () => {
    const theme = localStorage.getItem("theme") || "auto";

    // Oculta todos los íconos primero para simplificar la lógica
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
      themeToggleLightIcon.classList.remove("hidden"); // Muestra el sol para cambiar a claro
      themeToggleLightIconMobile.classList.remove("hidden");
    } else if (theme === "light") {
      document.documentElement.classList.remove("dark");
      themeToggleDarkIcon.classList.remove("hidden"); // Muestra la luna para cambiar a oscuro
      themeToggleDarkIconMobile.classList.remove("hidden");
    } else {
      // 'auto'
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      themeToggleAutoIcon.classList.remove("hidden"); // Muestra el engranaje
      themeToggleAutoIconMobile.classList.remove("hidden");
    }
  };

  // Función para ciclar entre los temas al hacer clic
  const cycleTheme = () => {
    const currentTheme = localStorage.getItem("theme") || "auto";
    let nextTheme;

    if (currentTheme === "light") {
      nextTheme = "dark";
    } else if (currentTheme === "dark") {
      nextTheme = "auto";
    } else {
      // Si es 'auto'
      nextTheme = "light";
    }

    localStorage.setItem("theme", nextTheme);
    applyTheme();
  };

  // Escucha cambios en el tema del sistema operativo
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", applyTheme);

  // Añade los eventos de clic a los botones
  themeToggleBtn.addEventListener("click", cycleTheme);
  themeToggleBtnMobile.addEventListener("click", cycleTheme);

  // Aplica el tema inicial en cuanto carga la página
  applyTheme();
  // --- FIN: LÓGICA AVANZADA DE TEMA ---
});
