// Navigation mobile
const hamburger = document.querySelector(".hamburger-icon");
const navMenu = document.querySelector(".nav-menu");
const icon = hamburger.querySelector("i");

// Charger le son de clic
const clickSound = new Audio("assets/sounds/click.mp3"); // Mets ici le bon chemin

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");

  // Changer l'icône Font Awesome
  if (icon.classList.contains("fa-bars")) {
    icon.classList.replace("fa-bars", "fa-xmark");
    icon.style.transform = "rotate(180deg)";
  } else {
    icon.classList.replace("fa-xmark", "fa-bars");
    icon.style.transform = "rotate(0deg)";
  }

  // Jouer le son de clic
  clickSound.currentTime = 0; // Réinitialise le son à chaque clic
  clickSound.play();
});

// Fermer le menu mobile en cliquant sur un lien
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  }),
);

//Navigation fluide vers les sections
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Initialiser la navigation quand le DOM est prêt
document.addEventListener("DOMContentLoaded", function () {
  initNavigation();

  // Test de navigation pour déboguer
  console.log("Navigation initialized");
  console.log("About section:", document.querySelector("#about"));
  console.log("Projects section:", document.querySelector("#projects"));
});

// Animation de la navbar au scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 100) {
    navbar.style.boxShadow = "0 2px 20px rgba(255, 107, 53, 0.3)";
  } else {
    navbar.style.boxShadow = "0 0 20px rgba(255, 107, 53, 0.3)";
  }
});

// Animation des éléments au scroll
const fadeObserverOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, fadeObserverOptions);

// Observer les éléments à animer
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(
    ".project-card, .skill-item, .about-text, .skills",
  );

  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
});

// Gestion du formulaire de contact
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Récupération des données du formulaire
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);

    // Validation basique
    if (!data.name || !data.email || !data.message) {
      showNotification(
        "Veuillez remplir tous les champs obligatoires.",
        "error",
      );
      return;
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      showNotification("Veuillez entrer une adresse email valide.", "error");
      return;
    }

    // Simulation d'envoi (remplacer par votre logique PHP)
    showNotification("Message envoyé avec succès !", "success");
    this.reset();
  });
}

// Système de notification
function showNotification(message, type = "info") {
  // Supprimer les notifications existantes
  const existingNotifications = document.querySelectorAll(".notification");
  existingNotifications.forEach((notification) => notification.remove());

  // Créer la notification
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

  // Styles de la notification
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === "success" ? "#10b981" : type === "error" ? "#ef4444" : "#3b82f6"};
        color: white;
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        max-width: 400px;
        animation: slideIn 0.3s ease;
    `;

  // Ajouter les styles pour l'animation
  const style = document.createElement("style");
  style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            margin-left: 1rem;
        }
    `;
  document.head.appendChild(style);

  // Ajouter la notification au DOM
  document.body.appendChild(notification);

  // Fermer la notification
  const closeBtn = notification.querySelector(".notification-close");
  closeBtn.addEventListener("click", () => {
    notification.remove();
  });

  // Auto-fermeture après 5 secondes
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove();
    }
  }, 5000);
}

// Animation des compétences au hover
document.querySelectorAll(".skill-item").forEach((item) => {
  item.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.05)";
  });

  item.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Animation des cartes de projets
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-15px)";
    this.style.boxShadow = "0 20px 40px rgba(255, 107, 53, 0.2)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0)";
    this.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.8)";
  });
});

// Animation des éléments de navigation
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("mouseenter", function () {
    const icon = this.querySelector("i");
    if (icon) {
      icon.style.transform = "rotate(360deg) scale(1.2)";
      icon.style.transition = "transform 0.3s ease";
    }
  });

  link.addEventListener("mouseleave", function () {
    const icon = this.querySelector("i");
    if (icon) {
      icon.style.transform = "rotate(0deg) scale(1)";
    }
  });
});

// Animation de la photo de profil
const profileImg = document.querySelector(".profile-img");
if (profileImg) {
  profileImg.addEventListener("mouseenter", function () {
    this.style.transform = "scale(1.05) rotate(2deg)";
    this.style.transition = "transform 0.3s ease";
  });

  profileImg.addEventListener("mouseleave", function () {
    this.style.transform = "scale(1) rotate(0deg)";
  });
}

// Animation des boutons avec effet de particules
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    // Créer des particules
    for (let i = 0; i < 8; i++) {
      const particle = document.createElement("div");
      const angle = (i / 8) * 360;
      const distance = 30 + Math.random() * 20;
      const x = Math.cos((angle * Math.PI) / 180) * distance;
      const y = Math.sin((angle * Math.PI) / 180) * distance;

      particle.style.position = "fixed";
      particle.style.width = "3px";
      particle.style.height = "3px";
      particle.style.background = i % 2 === 0 ? "#ff6b35" : "#d4af37";
      particle.style.borderRadius = "50%";
      particle.style.pointerEvents = "none";
      particle.style.left = e.clientX + "px";
      particle.style.top = e.clientY + "px";
      particle.style.setProperty("--x", x + "px");
      particle.style.setProperty("--y", y + "px");
      particle.style.animation = "particle 0.8s ease-out forwards";
      particle.style.zIndex = "9999";

      document.body.appendChild(particle);

      setTimeout(() => {
        if (particle.parentNode) {
          particle.remove();
        }
      }, 800);
    }
  });
});

// Animation des compétences avec effet de pulsation
document.querySelectorAll(".skill-item").forEach((skill) => {
  skill.addEventListener("mouseenter", function () {
    this.style.animation = "pulse 0.5s ease-in-out";
  });

  skill.addEventListener("animationend", function () {
    this.style.animation = "";
  });
});

// Effet de parallaxe pour la section hero
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero");
  if (hero) {
    const rate = scrolled * -0.5;
    hero.style.transform = `translateY(${rate}px)`;
  }
});

// Typing effect pour le titre (optionnel)
// Typing effect pour le titre (optionnel)
function typeWriter(element, text, speed = 10) {
  let i = 0;
  element.innerHTML = "";

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Appliquer l'effet de typing au titre si souhaité
document.addEventListener("DOMContentLoaded", () => {
  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    typeWriter(heroTitle, originalText, 100);
  }
});

// Lazy loading des images
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
});

// Suppression du gestionnaire en double - la navigation est déjà gérée plus haut

// Effet de scroll progressif avec parallaxe
let ticking = false;

function updateParallax() {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll(
    ".hero, .about, .projects, .contact",
  );

  parallaxElements.forEach((element) => {
    const speed = 0.5;
    const yPos = -(scrolled * speed);
    element.style.transform = `translateY(${yPos}px)`;
  });

  ticking = false;
}

// Animation des éléments au scroll avec Intersection Observer
const scrollObserverOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in-up", "visible");
    }
  });
}, scrollObserverOptions);

// Observer tous les éléments à animer
document.addEventListener("DOMContentLoaded", () => {
  // Attendre un peu pour s'assurer que tout est chargé
  setTimeout(() => {
    const animatedElements = document.querySelectorAll(
      ".project-card, .skill-item, .about-text, .skills, .contact-form",
    );

    animatedElements.forEach((el) => {
      if (el) {
        el.classList.add("fade-in-up");
        scrollObserver.observe(el);
      }
    });
  }, 100);
});

// Données centralisées du portfolio
function renderEducation() {
  const list = document.getElementById("education-list");
  if (!list || !window.portfolioData) return;

  list.innerHTML = window.portfolioData.education
    .map((item) => {
      const institution = item.institution ? ` à ${item.institution}` : "";
      return `<li><strong>${item.period}</strong> - ${item.title}${institution}</li>`;
    })
    .join("");
}

function renderSkills() {
  const grid = document.getElementById("skills-grid");
  if (!grid || !window.portfolioData) return;

  grid.innerHTML = window.portfolioData.skillCategories
    .map((category) => {
      const skills = category.skills
        .map((skill) => {
          const icon = skill.icon
            ? `<i class="${skill.icon} ${skill.iconClass}"></i> `
            : "";
          return `<span class="skill-tag">${icon}${skill.name}</span>`;
        })
        .join("");

      return `
            <div class="skill-category">
                <h4>${category.name}</h4>
                <div class="skill-tags">${skills}</div>
            </div>`;
    })
    .join("");
}

function renderProjects() {
  const grid = document.getElementById("projects-grid");
  if (!grid || !window.portfolioData) return;

  grid.innerHTML = window.portfolioData.projects
    .map((project, index) => {
      const technologies = project.technologies
        .map(
          (tech) =>
            `<i class="tech-tag ${tech.icon} ${tech.iconClass}" title="${tech.iconClass}"></i>`,
        )
        .join("");

      return `
            <div class="project-card">
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}">
                </div>
                <div class="project-content">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-tech">${technologies}</div>
                    <button type="button" class="project-details-btn" data-project-index="${index}">
                        Voir le projet <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
            </div>`;
    })
    .join("");

  document.querySelectorAll(".project-details-btn").forEach((button) => {
    button.addEventListener("click", () => {
      openProjectModal(
        window.portfolioData.projects[Number(button.dataset.projectIndex)],
      );
    });
  });
}

function openProjectModal(project) {
  const modal = document.getElementById("project-modal");
  const body = document.getElementById("project-modal-body");
  if (!modal || !body || !project) return;

  const technologies = project.technologies
    .map((tech) => `<i class="tech-tag ${tech.icon} ${tech.iconClass}"></i>`)
    .join("");

  const configuredScreenshots = project.screenshots || [];
  const screenshots = [...configuredScreenshots];

  while (screenshots.length < 3) {
    screenshots.push("");
  }

  const screenshotMarkup = screenshots
    .map((screen, index) =>
      screen
        ? `<img src="${screen}" alt="Capture d'écran ${index + 1} de ${project.title}" class="project-screenshot-image">`
        : `<div class="screenshots-placeholder">Capture d'écran ${index + 1}</div>`,
    )
    .join("");

  body.innerHTML = `
    <div class="project-modal-header">
      <span class="project-modal-label">Projet</span>
      <h2 id="project-modal-title">${project.title}</h2>
    </div>
    <p class="project-modal-description">${project.details || project.description}</p>
    <div class="project-modal-tech">${technologies}</div>
    <div class="project-screenshots">
      ${screenshotMarkup || `<p class="screenshots-placeholder">Les captures d'écran seront ajoutées prochainement.</p>`}
    </div>`;

  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");

  body.querySelectorAll(".project-screenshot-image").forEach((image) => {
    image.addEventListener("click", () => {
      openImageLightbox(image.getAttribute("src"), image.getAttribute("alt"));
    });
  });
}

function closeProjectModal() {
  const modal = document.getElementById("project-modal");
  if (!modal) return;

  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
  closeImageLightbox();
  document.body.classList.remove("modal-open");
}

function openImageLightbox(src, alt) {
  const lightbox = document.getElementById("image-lightbox");
  const preview = document.getElementById("image-lightbox-preview");
  if (!lightbox || !preview || !src) return;

  preview.setAttribute("src", src);
  preview.setAttribute("alt", alt || "Aperçu du projet");
  lightbox.classList.add("active");
  lightbox.setAttribute("aria-hidden", "false");
}

function closeImageLightbox() {
  const lightbox = document.getElementById("image-lightbox");
  const preview = document.getElementById("image-lightbox-preview");
  if (!lightbox || !preview) return;

  lightbox.classList.remove("active");
  lightbox.setAttribute("aria-hidden", "true");
  preview.setAttribute("src", "");
}

document.querySelectorAll("[data-close-modal]").forEach((element) => {
  element.addEventListener("click", closeProjectModal);
});

document.querySelectorAll("[data-close-lightbox]").forEach((element) => {
  element.addEventListener("click", closeImageLightbox);
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;

  const lightbox = document.getElementById("image-lightbox");
  if (lightbox && lightbox.classList.contains("active")) {
    closeImageLightbox();
    return;
  }

  closeProjectModal();
});

function renderSocialLinks() {
  const container = document.getElementById("social-links");
  if (!container || !window.portfolioData) return;

  container.innerHTML = window.portfolioData.socialLinks
    .map((link) => {
      const target = link.target ? ` target="${link.target}"` : "";
      return `
        <a href="${link.url}" class="social-link" aria-label="${link.name}"${target}>
          <i class="${link.icon} ${link.iconClass}"></i>
        </a>`;
    })
    .join("");
}

renderEducation();
renderSkills();
renderProjects();
renderSocialLinks();
