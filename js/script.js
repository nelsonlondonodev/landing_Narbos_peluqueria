function initHeroAnimation() {
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
}

async function initI18n() {
  const langToggleDesktop = document.getElementById("lang-toggle-desktop");
  const langToggleMobile = document.getElementById("lang-toggle-mobile");

  if (!langToggleDesktop && !langToggleMobile) return;

  let translations = {};

  const getBasePath = () => {
    const path = window.location.pathname;
    if (path.includes('/blog/articles/')) {
      return '../../';
    } else if (path.includes('/blog/')) {
      return '../';
    }
    return './';
  };

  const setLanguage = (lang) => {
    document.documentElement.lang = lang;

    document.querySelectorAll("[data-key]").forEach((elem) => {
      const key = elem.getAttribute("data-key");
      if (translations[key]) {
        elem.innerHTML = translations[key];
      }
    });

    document.querySelectorAll("[data-key-alt]").forEach((elem) => {
      const key = elem.getAttribute("data-key-alt");
      if (translations[key]) {
        elem.setAttribute("alt", translations[key]);
      }
    });

    const metaDescription = document.getElementById("meta-description");
    if (metaDescription && translations.metaDescription) {
      metaDescription.setAttribute("content", translations.metaDescription);
    }
    
    if (translations.metaTitle) {
        document.title = translations.metaTitle;
    }

    updateLangToggleButtons(lang);
  };

  const updateLangToggleButtons = (currentLang) => {
    const targetLang = currentLang === "es" ? "en" : "es";
    const flagCode = targetLang === "es" ? "es" : "gb";
    const basePath = getBasePath();

    const buttonHTML = `
      <img src="https://flagcdn.com/w20/${flagCode}.png" srcset="https://flagcdn.com/w40/${flagCode}.png 2x" alt="${targetLang.toUpperCase()}" class="w-5 h-auto mr-2">
      ${targetLang.toUpperCase()}
    `;

    if (langToggleDesktop) langToggleDesktop.innerHTML = buttonHTML;
    if (langToggleMobile) langToggleMobile.innerHTML = buttonHTML;
  };

  const loadTranslations = async (lang) => {
    const basePath = getBasePath();
    try {
      const response = await fetch(`${basePath}lang/${lang}.json`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      translations = await response.json();
      setLanguage(lang);
    } catch (error) {
      console.error("Could not load translation file:", error);
      // Fallback to Spanish if loading fails
      if (lang !== 'es') {
        await loadTranslations('es');
      }
    }
  };

  const toggleLanguage = async () => {
    const currentLang = localStorage.getItem("language") || "es";
    const newLang = currentLang === "es" ? "en" : "es";
    localStorage.setItem("language", newLang);
    await loadTranslations(newLang);
  };

  if (langToggleDesktop) langToggleDesktop.addEventListener("click", toggleLanguage);
  if (langToggleMobile) langToggleMobile.addEventListener("click", toggleLanguage);

  const currentLang = localStorage.getItem("language") || "es";
  await loadTranslations(currentLang);
}

function initMobileMenu() {
    const menuBtn = document.getElementById("menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    
    if (!menuBtn || !mobileMenu) return;

    const menuBackdrop = document.getElementById("menu-backdrop");
    const menuOpenIcon = document.getElementById("menu-open-icon");
    const menuCloseIcon = document.getElementById("menu-close-icon");
    const mobileMenuLinks = mobileMenu.querySelectorAll("a");

    const toggleMenu = () => {
        mobileMenu.classList.toggle("translate-x-full");
        if (menuBackdrop) menuBackdrop.classList.toggle("hidden");
        if (menuOpenIcon) menuOpenIcon.classList.toggle("hidden");
        if (menuCloseIcon) menuCloseIcon.classList.toggle("hidden");
        document.body.classList.toggle("mobile-menu-open");
    };

    menuBtn.addEventListener("click", toggleMenu);
    if (menuBackdrop) menuBackdrop.addEventListener("click", toggleMenu);
    mobileMenuLinks.forEach((link) => {
        link.addEventListener("click", toggleMenu);
    });
}

function initContactForm() {
    const contactForm = document.getElementById("contact-form");
    if (!contactForm) return;

    const formStatus = document.getElementById("form-status");

    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const lang = localStorage.getItem("language") || "es";
        const data = new FormData(e.target);
        
        if(formStatus) formStatus.textContent = translations[lang].formStatusSubmitting;
        if(formStatus) formStatus.style.color = "#6B755A";

        try {
            const response = await fetch(e.target.action, {
                method: e.target.method,
                body: data,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                if(formStatus) formStatus.textContent = translations[lang].formStatusSuccess;
                if(formStatus) formStatus.style.color = "green";
                contactForm.reset();
            } else {
                response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        if(formStatus) formStatus.textContent = data["errors"].map(error => error["message"]).join(", ");
                    } else {
                        if(formStatus) formStatus.textContent = translations[lang].formStatusError;
                    }
                    if(formStatus) formStatus.style.color = "red";
                })
            }
        } catch (error) {
            if(formStatus) formStatus.textContent = translations[lang].formStatusError;
            if(formStatus) formStatus.style.color = "red";
        }
        
        setTimeout(() => {
            if(formStatus) formStatus.textContent = "";
        }, 5000);
    });
}

function initScrollSpy() {
    const sections = document.querySelectorAll("main section[id], footer[id]");
    const navLinks = document.querySelectorAll("header nav .hidden a");

    if (sections.length === 0 || navLinks.length === 0) return;

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
}

function initThemeToggle() {
    const themeToggleBtn = document.getElementById("theme-toggle");
    const themeToggleDarkIcon = document.getElementById("theme-toggle-dark-icon");
    const themeToggleLightIcon = document.getElementById("theme-toggle-light-icon");
    const themeToggleAutoIcon = document.getElementById("theme-toggle-auto-icon");
    const themeToggleBtnMobile = document.getElementById("theme-toggle-mobile");
    const themeToggleDarkIconMobile = document.getElementById("theme-toggle-dark-icon-mobile");
    const themeToggleLightIconMobile = document.getElementById("theme-toggle-light-icon-mobile");
    const themeToggleAutoIconMobile = document.getElementById("theme-toggle-auto-icon-mobile");

    if (!themeToggleBtn && !themeToggleBtnMobile) return;

    const applyTheme = () => {
        const theme = localStorage.getItem("theme") || "auto";
        const allIcons = [
            themeToggleDarkIcon, themeToggleLightIcon, themeToggleAutoIcon,
            themeToggleDarkIconMobile, themeToggleLightIconMobile, themeToggleAutoIconMobile
        ];
        
        allIcons.forEach((icon) => {
            if (icon) icon.classList.add("hidden");
        });

        if (theme === "dark") {
            document.documentElement.classList.add("dark");
            if (themeToggleLightIcon) themeToggleLightIcon.classList.remove("hidden");
            if (themeToggleLightIconMobile) themeToggleLightIconMobile.classList.remove("hidden");
        } else if (theme === "light") {
            document.documentElement.classList.remove("dark");
            if (themeToggleDarkIcon) themeToggleDarkIcon.classList.remove("hidden");
            if (themeToggleDarkIconMobile) themeToggleDarkIconMobile.classList.remove("hidden");
        } else {
            if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
            if (themeToggleAutoIcon) themeToggleAutoIcon.classList.remove("hidden");
            if (themeToggleAutoIconMobile) themeToggleAutoIconMobile.classList.remove("hidden");
        }
    };

    const cycleTheme = () => {
        const currentTheme = localStorage.getItem("theme") || "auto";
        const nextTheme = currentTheme === "light" ? "dark" : currentTheme === "dark" ? "auto" : "light";
        localStorage.setItem("theme", nextTheme);
        applyTheme();
    };

    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", applyTheme);
    if (themeToggleBtn) themeToggleBtn.addEventListener("click", cycleTheme);
    if (themeToggleBtnMobile) themeToggleBtnMobile.addEventListener("click", cycleTheme);
    
    applyTheme();
}

function initReviewsSlider() {
    const sliderWrapper = document.getElementById("reviews-slider-wrapper");
    if (!sliderWrapper) return;

    const reviewSlides = document.querySelectorAll(".review-slide");
    const prevBtn = document.getElementById("prev-review");
    const nextBtn = document.getElementById("next-review");

    if (reviewSlides.length === 0 || !prevBtn || !nextBtn) return;

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
        currentReviewIndex = (currentReviewIndex - 1 + reviewSlides.length) % reviewSlides.length;
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

function initGallery() {
    const galleryFilters = document.getElementById("gallery-filters");
    const galleryItems = document.querySelectorAll(".gallery-item");

    if (!galleryFilters || galleryItems.length === 0) return;

    const filterButtons = document.querySelectorAll(".filter-btn");
    const defaultFilterBtn = document.querySelector('.filter-btn[data-filter="todos"]');
    
    if (defaultFilterBtn) {
        filterButtons.forEach((btn) => btn.classList.remove("filter-btn-active"));
        defaultFilterBtn.classList.add("filter-btn-active");
    }

    galleryFilters.addEventListener("click", (e) => {
        const clickedButton = e.target.closest(".filter-btn");
        if (clickedButton) {
            const filterValue = clickedButton.getAttribute("data-filter");
            filterButtons.forEach((btn) => btn.classList.remove("filter-btn-active"));
            clickedButton.classList.add("filter-btn-active");

            galleryItems.forEach((item) => {
                const itemCategory = item.getAttribute("data-category");
                item.style.display = (filterValue === "todos" || filterValue === itemCategory) ? "" : "none";
            });

            if (typeof lightbox !== "undefined" && lightbox) {
                lightbox.reload();
            }
        }
    });

    const lightbox = GLightbox({ selector: ".glightbox" });

    // Accessibility fix for aria-hidden warning
    const mainContent = document.querySelector("main");
    const header = document.querySelector("header");
    const footer = document.querySelector("footer");

    lightbox.on('open', () => {
        if (mainContent) {
            mainContent.setAttribute('inert', '');
            mainContent.removeAttribute('aria-hidden');
        }
        if (header) {
            header.setAttribute('inert', '');
            header.removeAttribute('aria-hidden');
        }
        if (footer) {
            footer.setAttribute('inert', '');
            footer.removeAttribute('aria-hidden');
        }
    });

    lightbox.on('close', () => {
        if (mainContent) mainContent.removeAttribute('inert');
        if (header) header.removeAttribute('inert');
        if (footer) footer.removeAttribute('inert');
    });
}

function initModals() {
    const openModalTriggers = document.querySelectorAll("[data-modal-target]");
    if (openModalTriggers.length === 0) return;

    const openModal = (modal) => {
        if (modal) {
            modal.classList.remove("hidden");
            document.body.style.overflow = "hidden";
        }
    };

    const closeModal = (modal) => {
        if (modal) {
            modal.classList.add("hidden");
            document.body.style.overflow = "";
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
            if (e.target === modal) closeModal(modal);
        });
    });

    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            const openModal = document.querySelector('[id$="-modal"]:not(.hidden)');
            closeModal(openModal);
        }
    });
}

function initVideoPlayer() {
    const videoContainer = document.getElementById("video-container");
    if (!videoContainer) return;

    const promoVideo = document.getElementById("promo-video");
    const videoPlayButton = document.getElementById("video-play-button");

    if (!promoVideo || !videoPlayButton) return;

    videoContainer.addEventListener("click", () => {
        if (promoVideo.paused) {
            promoVideo.play();
        } else {
            promoVideo.pause();
        }
    });

    promoVideo.addEventListener("play", () => {
        videoPlayButton.classList.add("hidden");
    });

    promoVideo.addEventListener("pause", () => {
        videoPlayButton.classList.remove("hidden");
    });

    promoVideo.addEventListener("ended", () => {
        videoPlayButton.classList.remove("hidden");
    });
}

function initScrollAnimations() {
    const animatedElements = document.querySelectorAll("[data-animation]");
    if (animatedElements.length === 0) return;

    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const animation = element.getAttribute("data-animation");
                    const delay = element.getAttribute("data-animation-delay");

                    // Add a class to mark it as visible for any custom non-Animate.css transitions
                    element.classList.add("is-visible");

                    // Add Animate.css classes
                    if (animation) {
                        element.classList.add("animate__animated", `animate__${animation}`);
                    }
                    
                    if (delay) {
                        element.style.animationDelay = delay;
                    }

                    observer.unobserve(element);
                }
            });
        },
        { threshold: 0.1 }
    );

    animatedElements.forEach((element) => {
        // Hide element initially to prevent flash of unstyled content, but keep its space
        element.classList.add("animation-hidden");
        observer.observe(element);
    });
}

function initHeaderScroll() {
    const header = document.querySelector("header");
    if (!header) return;

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("header-scrolled");
        } else {
            header.classList.remove("header-scrolled");
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded and parsed");

    // Initialize all functionalities
    initI18n();
    initThemeToggle();
    initMobileMenu();
    initHeaderScroll();
    initHeroAnimation();
    initContactForm();
    initScrollSpy();
    initReviewsSlider();
    initGallery();
    initModals();
    initVideoPlayer();
    initScrollAnimations();
});