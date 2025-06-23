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
});
