// Initialize Feather Icons
feather.replace();

// Initialize AOS
AOS.init({
  duration: 1000,
  once: true,
});

// Mobile menu toggle
document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.querySelector("button.md\\:hidden");
  const navMenu = document.querySelector("nav.md\\:flex");

  if (menuButton) {
    menuButton.addEventListener("click", function () {
      if (navMenu) {
        navMenu.classList.toggle("hidden");
        navMenu.classList.toggle("flex");
        navMenu.classList.toggle("flex-col");
        navMenu.classList.toggle("absolute");
        navMenu.classList.toggle("top-full");
        navMenu.classList.toggle("left-0");
        navMenu.classList.toggle("w-full");
        navMenu.classList.toggle("bg-white");
        navMenu.classList.toggle("shadow-lg");
        navMenu.classList.toggle("py-4");
        navMenu.classList.toggle("px-4");
        navMenu.classList.toggle("space-y-4");
      }
    });
  }

  // Enhanced animation on scroll
  const animateElements = document.querySelectorAll(".animate-on-scroll");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  animateElements.forEach((element) => {
    observer.observe(element);
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Form validation for newsletter
  const newsletterForm = document.querySelector("#newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = this.querySelector('input[type="email"]').value;
      if (email && email.includes("@")) {
        alert("Terima kasih! Anda telah berlangganan newsletter kami.");
        this.reset();
      } else {
        alert("Silakan masukkan email yang valid.");
      }
    });
  }

  // Add hover effect to all buttons
  const buttons = document.querySelectorAll("button, a[href]:not(.no-hover)");
  buttons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.classList.add("transform", "scale-105");
    });

    button.addEventListener("mouseleave", function () {
      this.classList.remove("transform", "scale-105");
    });
  });
});
