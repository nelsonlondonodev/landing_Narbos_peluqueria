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

  // --- INICIO: NUEVA LÓGICA PARA DARK MODE ---
  const themeToggleBtn = document.getElementById("theme-toggle");
  const themeToggleDarkIcon = document.getElementById("theme-toggle-dark-icon");
  const themeToggleLightIcon = document.getElementById(
    "theme-toggle-light-icon"
  );
  const themeToggleBtnMobile = document.getElementById("theme-toggle-mobile");
  const themeToggleDarkIconMobile = document.getElementById(
    "theme-toggle-dark-icon-mobile"
  );
  const themeToggleLightIconMobile = document.getElementById(
    "theme-toggle-light-icon-mobile"
  );

  // Función para actualizar los íconos del tema
  const updateThemeIcons = (isDarkMode) => {
    themeToggleDarkIcon.classList.toggle("hidden", isDarkMode);
    themeToggleLightIcon.classList.toggle("hidden", !isDarkMode);
    themeToggleDarkIconMobile.classList.toggle("hidden", isDarkMode);
    themeToggleLightIconMobile.classList.toggle("hidden", !isDarkMode);
  };

  // Función para cambiar el tema
  const toggleTheme = () => {
    const isDarkMode = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    updateThemeIcons(isDarkMode);
  };

  // Función para verificar el tema inicial al cargar la página
  const initialThemeCheck = () => {
    const userHasChosenTheme = "theme" in localStorage;
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const isDarkMode = userHasChosenTheme
      ? localStorage.getItem("theme") === "dark"
      : systemPrefersDark;

    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    }
    updateThemeIcons(isDarkMode);
  };

  // Añadir los eventos a los botones
  themeToggleBtn.addEventListener("click", toggleTheme);
  themeToggleBtnMobile.addEventListener("click", toggleTheme);

  // Comprobar el tema inicial
  initialThemeCheck();
  // --- FIN: LÓGICA PARA DARK MODE ---
});
