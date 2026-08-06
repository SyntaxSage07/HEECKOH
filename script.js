window.addEventListener("load", function () {
  document.body.classList.add("loaded");
});

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", function () {
  navMenu.classList.toggle("open");
});

const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach((el) => observer.observe(el));

const sections = document.querySelectorAll("main > div[id], main > section[id]");
const navLinks = document.querySelectorAll("nav a[data-nav]");

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");

        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("data-nav") === id);
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach((section) => navObserver.observe(section));


const backToTopBtn = document.getElementById("backToTop");

window.addEventListener("scroll", function () {
  if (window.scrollY > 400) {
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }
});

backToTopBtn.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");
  const formSuccess = document.getElementById("formSuccess");

  function showError(input, errorId, message) {
    document.getElementById(errorId).textContent = message;
    input.classList.add("invalid");
  }

  function clearError(input, errorId) {
    document.getElementById(errorId).textContent = "";
    input.classList.remove("invalid");
  }

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let isValid = true;

    if (nameInput.value.trim() === "") {
      showError(nameInput, "nameError", "Please enter your name.");
      isValid = false;
    } else {
      clearError(nameInput, "nameError");
    }

    const emailValue = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailValue === "") {
      showError(emailInput, "emailError", "Please enter your email.");
      isValid = false;
    } else if (!emailPattern.test(emailValue)) {
      showError(emailInput, "emailError", "Please enter a valid email address.");
      isValid = false;
    } else {
      clearError(emailInput, "emailError");
    }

    if (messageInput.value.trim().length < 10) {
      showError(messageInput, "messageError", "Message must be at least 10 characters.");
      isValid = false;
    } else {
      clearError(messageInput, "messageError");
    }

    if (isValid) {
      formSuccess.textContent = "Message sent! We'll get back to you soon.";
      contactForm.reset();
    } else {
      formSuccess.textContent = "";
    }
  });
}
