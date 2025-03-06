document.addEventListener("DOMContentLoaded", function () {
  /** =============================
   * 📌 Mobile Menu Toggle
   * ============================== */
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const navItems = document.querySelectorAll(".nav-links a");

  if (menuToggle) {
    menuToggle.addEventListener("click", (event) => {
      event.stopPropagation();
      navLinks.classList.toggle("active");
      menuToggle.classList.toggle("active");

      if (navLinks.classList.contains("active")) {
        navLinks.style.maxHeight = navLinks.scrollHeight + "px";
      } else {
        navLinks.style.maxHeight = "0px";
      }
    });

    navItems.forEach((item) => {
      item.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", (event) => {
      if (
        !navLinks.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        closeMenu();
      }
    });

    function closeMenu() {
      navLinks.classList.remove("active");
      menuToggle.classList.remove("active");
      navLinks.style.maxHeight = "0px";
    }
  }

  /** =============================
   * 📌 Smooth Scrolling
   * ============================== */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  /** =============================
   * 📌 Form Submission Handling (MailJS)
   * ============================== */
  const appointmentForm = document.getElementById("appointment-form");
  if (appointmentForm) {
    appointmentForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const formData = new FormData(this);

      fetch("https://api.mailjs.com/send", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then(() => {
          alert("Appointment request sent successfully!");
        })
        .catch(() => {
          alert("Error sending appointment request. Please try again.");
        });
    });
  }

  /** =============================
   * 📌 Scroll Animation with AOS
   * ============================== */
  AOS.init({
    duration: 1000,
    easing: "ease-in-out",
    once: true,
  });

  /** =============================
   * 📌 About Section Scroll Effect
   * ============================== */
  const aboutTitle = document.querySelector(".about-title");
  const aboutTexts = document.querySelectorAll(".about-text");

  function checkScroll() {
    if (!aboutTitle) return;

    const screenPos = window.innerHeight / 1.3;
    const titlePos = aboutTitle.getBoundingClientRect().top;

    if (titlePos < screenPos) {
      aboutTitle.classList.add("visible");
      aboutTexts.forEach((text, index) => {
        setTimeout(() => {
          text.classList.add("visible");
        }, index * 300);
      });
    }
  }

  window.addEventListener("scroll", checkScroll);
  checkScroll();

  /** =============================
   * 📌 WhatsApp Chat Integration
   * ============================== */
  const footer = document.querySelector("footer"); // Select footer
  if (footer) {
    const whatsappChat = document.createElement("div");
    whatsappChat.className = "whatsapp-chat";
    whatsappChat.innerHTML = `
      <a href="https://wa.me/123456789" target="_blank">
        <img src="https://cdn-icons-png.flaticon.com/512/733/733585.png" alt="WhatsApp">
      </a>
    `;
    document.body.insertBefore(whatsappChat, footer);

    // Show WhatsApp chat only when scrolled to the bottom
    window.addEventListener("scroll", () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const pageHeight = document.body.offsetHeight;

      if (scrollPosition >= pageHeight - 50) {
        whatsappChat.classList.add("show");
      } else {
        whatsappChat.classList.remove("show");
      }
    });
  }
});
