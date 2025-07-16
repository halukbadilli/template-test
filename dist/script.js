document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const elements = {
    menuToggle: document.getElementById("menu-toggle"),
    navMenu: document.getElementById("nav-menu"),
    logoContainer: document.querySelector(".logo-container"),
    hamburgerIcon: document.querySelector(".hamburger-icon"),
    closeIcon: document.querySelector(".close-icon"),
    modal: document.getElementById("randevu-modal"),
    modalOverlay: document.querySelector(".modal-overlay"),
    modalClose: document.getElementById("modal-close"),
    randevuButtons: document.querySelectorAll('[href="#iletisim"], .randevu-button'),
    randevuForm: document.getElementById("randevu-form"),
    swiperElement: document.querySelector(".mySwiper"),
  };

  // Responsive Class Toggling
  const toggleResponsiveClasses = () => {
    const isMobile = window.innerWidth < 768;
    const { navMenu, logoContainer, hamburgerIcon, closeIcon } = elements;

    if (!navMenu || !logoContainer || !hamburgerIcon || !closeIcon) return;

    navMenu.classList.toggle("hidden", isMobile);
    navMenu.classList.toggle("md:flex", !isMobile);
    navMenu.classList.remove("flex", "flex-col", "items-center", "w-full", "mt-2");
    logoContainer.classList.remove("flex", "justify-center", "mb-2");
    hamburgerIcon.classList.remove("hidden");
    closeIcon.classList.add("hidden");
  };

  // Mobile Menu Toggle
  const toggleMobileMenu = () => {
    const { menuToggle, navMenu, logoContainer, hamburgerIcon, closeIcon } = elements;

    if (!menuToggle || !navMenu || !logoContainer || !hamburgerIcon || !closeIcon) return;

    navMenu.classList.toggle("hidden");
    navMenu.classList.toggle("flex");
    navMenu.classList.toggle("flex-col");
    navMenu.classList.toggle("items-center");
    navMenu.classList.toggle("w-full");
    navMenu.classList.toggle("mt-2");
    logoContainer.classList.toggle("flex");
    logoContainer.classList.toggle("justify-center");
    logoContainer.classList.toggle("mb-2");
    hamburgerIcon.classList.toggle("hidden");
    closeIcon.classList.toggle("hidden");
    menuToggle.setAttribute("aria-expanded", !navMenu.classList.contains("hidden"));
  };

  // Setup Dropdown Menus
  const setupDropdownMenus = () => {
    document.querySelectorAll('[id^="dropdown-toggle-"]').forEach((toggle) => {
      const dropdownMenu = document.getElementById(toggle.id.replace("toggle", "menu"));
      if (!dropdownMenu) return;

      toggle.addEventListener("click", (e) => {
        e.preventDefault();
        dropdownMenu.classList.toggle("hidden");
        toggle.setAttribute("aria-expanded", !dropdownMenu.classList.contains("hidden"));

        // Close other dropdown menus
        document.querySelectorAll('[id^="dropdown-menu-"]').forEach((menu) => {
          if (menu !== dropdownMenu) {
            menu.classList.add("hidden");
            const otherToggle = document.getElementById(menu.id.replace("menu", "toggle"));
            if (otherToggle) otherToggle.setAttribute("aria-expanded", "false");
          }
        });
      });
    });
  };

  // Close Menus on Outside Click
  const closeMenusOnOutsideClick = (e) => {
    const { navMenu, menuToggle, logoContainer, hamburgerIcon, closeIcon, modal } = elements;

    // Prevent menu closing when modal is open
    if (modal && !modal.classList.contains("hidden")) return;

    // Close dropdown menus
    document.querySelectorAll('[id^="dropdown-menu-"]').forEach((menu) => {
      const toggle = document.getElementById(menu.id.replace("menu", "toggle"));
      if (!menu.contains(e.target) && (!toggle || !toggle.contains(e.target))) {
        menu.classList.add("hidden");
        if (toggle) toggle.setAttribute("aria-expanded", "false");
      }
    });

    // Close mobile menu (only on mobile devices)
    if (
      window.innerWidth < 768 &&
      navMenu &&
      !navMenu.contains(e.target) &&
      menuToggle &&
      !menuToggle.contains(e.target)
    ) {
      navMenu.classList.add("hidden");
      navMenu.classList.remove("flex", "flex-col", "items-center", "w-full", "mt-2");
      if (logoContainer) logoContainer.classList.remove("flex", "justify-center", "mb-2");
      if (hamburgerIcon && closeIcon) {
        hamburgerIcon.classList.remove("hidden");
        closeIcon.classList.add("hidden");
      }
      if (menuToggle) menuToggle.setAttribute("aria-expanded", "false");
    }
  };

  // Modal Setup
  const setupModal = () => {
    const { modal, modalOverlay, modalClose, randevuButtons } = elements;

    // Exit early if modal elements are not present
    if (!modal || !modalOverlay || !modalClose) return;

    // Open modal
    randevuButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        modal.classList.remove("hidden");
        modal.classList.add("flex");
        document.body.style.overflow = "hidden";
        // Focus on the first input for accessibility
        document.getElementById("adsoyad")?.focus();
      });
    });

    // Close modal with close button
    modalClose.addEventListener("click", () => {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
      document.body.style.overflow = "auto";
    });

    // Close modal by clicking overlay
    modalOverlay.addEventListener("click", () => {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
      document.body.style.overflow = "auto";
    });

    // Close modal with ESC key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !modal.classList.contains("hidden")) {
        modal.classList.add("hidden");
        modal.classList.remove("flex");
        document.body.style.overflow = "auto";
      }
    });

    // Focus trap (accessibility)
    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    modal.addEventListener("keydown", (e) => {
      if (e.key === "Tab" && !modal.classList.contains("hidden")) {
        if (e.shiftKey && document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        } else if (!e.shiftKey && document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    });
  };

  // Form Submission
  const setupFormSubmission = () => {
    const { randevuForm } = elements;

    // Exit early if form is not present
    if (!randevuForm) return;

    randevuForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = {
        adsoyad: document.getElementById("adsoyad")?.value,
        telefon: document.getElementById("telefon")?.value,
        email: document.getElementById("email")?.value,
        hizmet: document.getElementById("hizmet")?.value,
        tarih: document.getElementById("tarih")?.value,
        mesaj: document.getElementById("mesaj")?.value,
      };

      console.log("Form gönderildi:", formData);

      alert("Randevu talebiniz alınmıştır. En kısa sürede sizinle iletişime geçilecektir.");
      elements.modal.classList.add("hidden");
      elements.modal.classList.remove("flex");
      document.body.style.overflow = "auto";
      randevuForm.reset();
    });
  };

// Swiper Initialization
const setupSwiper = () => {
  const { swiperElement } = elements;

  if (!swiperElement) {
    console.log("Swiper elemanı bulunamadı.");
    return;
  }

  // Helper function to determine navigation configuration
  const getNavigationConfig = () => {
    return window.innerWidth >= 768 ? {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    } : false;
  };

  // Initialize Swiper
  const swiper = new Swiper(swiperElement, {
    loop: true,
    autoplay: {
      delay: 10000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: getNavigationConfig(), // Responsive navigation setup
    effect: "slide",
    speed: 1000,
    on: {
      init: function() {
        // Update navigation visibility on init
        this.navigation.update();
      }
    }
  });

  // Update navigation on window resize
  const handleResize = () => {
    swiper.params.navigation = getNavigationConfig();
    
    if (window.innerWidth >= 768) {
      if (!swiper.navigation.initialized) {
        swiper.navigation.init();
      }
      swiper.navigation.update();
    } else {
      if (swiper.navigation.initialized) {
        swiper.navigation.destroy();
      }
    }
  };

  // Add event listeners
  window.addEventListener('resize', handleResize);
  swiperElement.addEventListener("mouseenter", () => swiper.autoplay.stop());
  swiperElement.addEventListener("mouseleave", () => swiper.autoplay.start());

  // Store references for cleanup
  elements.swiperInstance = swiper;
  elements.swiperResizeHandler = handleResize;
};

// Initialization
const initialize = () => {
  toggleResponsiveClasses();
  window.addEventListener("resize", toggleResponsiveClasses);
  if (elements.menuToggle) elements.menuToggle.addEventListener("click", toggleMobileMenu);
  document.addEventListener("click", closeMenusOnOutsideClick);
  setupDropdownMenus();
  setupModal();
  setupFormSubmission();
  setupSwiper();
};

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  if (elements.swiperInstance) {
    window.removeEventListener('resize', elements.swiperResizeHandler);
    elements.swiperInstance.destroy(true, true);
  }
});

initialize();
});