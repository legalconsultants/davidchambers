document.addEventListener("DOMContentLoaded", function () {
  /** =============================
   * 📌 Mobile Background Image Fix
   * ============================== */

  // Check if we're on mobile
  const isMobile = window.innerWidth <= 768;
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  if (isMobile || isIOS) {
    // Method 1: Try CSS background first
    const bgDiv = document.createElement("div");
    bgDiv.id = "mobile-background";
    bgDiv.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-image: url('./images/3d.jpg');
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      z-index: -10;
      pointer-events: none;
    `;

    // Insert at the beginning of body
    document.body.insertBefore(bgDiv, document.body.firstChild);

    // Method 2: HTML img fallback
    const htmlBackground = document.getElementById("html-background");
    if (htmlBackground) {
      const img = htmlBackground.querySelector("img");
      if (img) {
        img.style.display = "block";
        htmlBackground.style.display = "block";
      }
    }

    // Remove any conflicting background from body
    document.body.style.backgroundImage = "none";

    // Test if background is visible after 1 second
    setTimeout(() => {
      const computedStyle = window.getComputedStyle(bgDiv);
      if (
        computedStyle.backgroundImage === "none" ||
        computedStyle.backgroundImage === ""
      ) {
        // CSS background failed, use HTML img
        if (htmlBackground) {
          const img = htmlBackground.querySelector("img");
          if (img) {
            img.style.display = "block";
            htmlBackground.style.display = "block";
            bgDiv.style.display = "none";
          }
        }
      }
    }, 1000);
  }

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

  function sendMail() {
    var param = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      message: document.getElementById("message").value,
    };

    const serviceID = "service_8yfnvf1";
    const templateID = "template_s0qnuv7";

    emailjs
      .send(serviceID, templateID, param)
      .then((res) => {
        document.getElementById("appointment-form").reset(); // cleaner way
        console.log("SUCCESS!", res.status);
        alert("✅ Appointment request sent successfully!");
      })
      .catch((err) => {
        console.error("FAILED...", err);
        alert("❌ Failed to send. Please try again.");
      });
  }
  // Make sendMail globally accessible for the form submission
  window.sendMail = sendMail;

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
      <a href="https://wa.me/12296014840" target="_blank">
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

  /** =============================
   * 📌 Nav Shrink on Scroll
   * ============================== */
  const nav = document.querySelector("nav");
  let lastScrollY = window.scrollY;
  window.addEventListener("scroll", () => {
    if (!nav) return;
    if (window.scrollY > 30) {
      nav.classList.add("shrink");
    } else {
      nav.classList.remove("shrink");
    }
    lastScrollY = window.scrollY;
  });

  /** =============================
   * 📌 Hero Section Animation on Load
   * ============================== */
  const hero = document.querySelector(".hero");
  if (hero) {
    setTimeout(() => {
      hero.querySelectorAll(".title, h1, p, .btn").forEach((el) => {
        el.style.animationPlayState = "running";
      });
    }, 100);
  }

  /** =============================
   * 📌 Animate Blog, Appointment, Contact, Footer on Load
   * ============================== */
  const blog = document.getElementById("blog");
  if (blog) {
    setTimeout(() => {
      blog.querySelectorAll("h2, p, .blog-post").forEach((el) => {
        el.style.animationPlayState = "running";
      });
    }, 200);
  }
  const appointment = document.getElementById("appointment");
  if (appointment) {
    setTimeout(() => {
      appointment.querySelectorAll("h2, #appointment-form").forEach((el) => {
        el.style.animationPlayState = "running";
      });
    }, 300);
  }
  const contact = document.getElementById("contact");
  if (contact) {
    setTimeout(() => {
      contact.querySelectorAll("h2, p, a").forEach((el) => {
        el.style.animationPlayState = "running";
      });
    }, 400);

    // Fallback: Add visible class after 2 seconds to ensure content shows
    setTimeout(() => {
      contact.classList.add("visible");
    }, 2000);
  }
  const footerElem = document.querySelector("footer");
  if (footerElem) {
    setTimeout(() => {
      footerElem.style.animationPlayState = "running";
    }, 500);
  }
});

/** =============================
 * 📌 Scroll To Top Button
 * ============================== */

// Global scroll to top function
function scrollToTop() {
  console.log("scrollToTop function called");

  // Method 1: Modern smooth scroll
  if ("scrollBehavior" in document.documentElement.style) {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  } else {
    // Method 2: Fallback for older browsers
    const scrollStep = -window.scrollY / (500 / 15);
    const scrollInterval = setInterval(function () {
      if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep);
      } else {
        clearInterval(scrollInterval);
      }
    }, 15);
  }
}

// Make function globally accessible
window.scrollToTop = scrollToTop;

const scrollToTopBtn = document.getElementById("scrollToTop");

if (scrollToTopBtn) {
  console.log("Scroll to top button found!");

  // Show the button when scrolled down
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      scrollToTopBtn.classList.add("show");
      console.log("Scroll to top button shown");
    } else {
      scrollToTopBtn.classList.remove("show");
      console.log("Scroll to top button hidden");
    }
  });

  // Scroll to top smoothly when clicked
  scrollToTopBtn.addEventListener("click", function (e) {
    e.preventDefault();
    console.log("Scroll to top clicked");
    scrollToTop();
  });

  // Alternative click handler for better compatibility
  scrollToTopBtn.onclick = function (e) {
    e.preventDefault();
    console.log("Alternative click handler triggered");
    scrollToTop();
    return false;
  };

  // Force show button after 2 seconds for testing
  setTimeout(() => {
    scrollToTopBtn.classList.add("show");
    console.log("Scroll to top button forced to show");
  }, 2000);
} else {
  console.log("Scroll to top button not found!");
}
