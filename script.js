/* =========================================================
   I-GLOW SALON & SPA — SCRIPT
   Sections:
   1. Icon injection (inline SVGs, no external image requests)
   2. Loading screen
   3. Sticky nav + mobile menu
   4. Scroll reveal animations
   5. Animated counters (About stats)
   6. Services — static markup lives in index.html, nothing to do here
   7. Gallery — static <img> markup lives in index.html; this file
      only drives the scroll-reveal animation for it
   8. Reviews data + render + slider
   9. Booking form validation + toast + WhatsApp handoff
   10. Back-to-top button
   11. Hero background slideshow
   ========================================================= */

/* ---------------------------------------------------------
   0. CONFIG — edit these in one place
   --------------------------------------------------------- */
const WHATSAPP_NUMBER = "+2349135995379"; // change to real I-Glow WhatsApp number (no + or leading 0s)

/* ---------------------------------------------------------
   1. ICONS — inline SVG library, injected into [data-icon] spans
   --------------------------------------------------------- */
const ICONS = {
  scissors: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.5 8.5 20 20M20 4 8.5 15.5"/></svg>',
  fade: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 20c0-6 3-11 8-16 5 5 8 10 8 16"/><path d="M4 20h16" stroke-dasharray="2 2"/></svg>',
  beard: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 4v6c0 6 3 10 6 10s6-4 6-10V4"/><path d="M9 4v5M15 4v5"/></svg>',
  dye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3c3 3 6 6.5 6 10a6 6 0 1 1-12 0c0-3.5 3-7 6-10Z"/></svg>',
  treatment: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 21s-7-4.5-7-10a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 5.5-11 10-11 10Z"/></svg>',
  locs: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M7 3c0 4-2 5-2 9a2.5 2.5 0 0 0 5 0c0-3-1-4-1-7"/><path d="M13 3c0 4-2 5-2 9a2.5 2.5 0 0 0 5 0c0-3-1-4-1-7"/><path d="M19 5c0 4-2 5-2 9a2.5 2.5 0 0 0 5 0c0-3-1-4-1-7"/></svg>',
  relock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3v4M12 21c-3 0-5-3-5-6s2-4 5-4 5 1 5 4-2 6-5 6Z"/></svg>',
  spa: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 2c1.5 3 4 4.5 4 8a4 4 0 1 1-8 0c0-3.5 2.5-5 4-8Z"/><path d="M5 21c1-3 4-4 7-4s6 1 7 4"/></svg>',
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 11 12 4l9 7"/><path d="M5 10v10h14V10"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v4a2 2 0 0 1-2 2C9.5 21 3 14.5 3 6a2 2 0 0 1 1-2Z"/></svg>',
  whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20Zm4.4-5.9c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1s-.6.8-.7.9c-.1.1-.3.2-.5.1a6.6 6.6 0 0 1-1.9-1.2 7.2 7.2 0 0 1-1.3-1.6c-.1-.2 0-.4.1-.5l.4-.4c.1-.1.2-.3.2-.4a.5.5 0 0 0 0-.5c-.1-.1-.5-1.3-.7-1.8-.2-.4-.4-.4-.5-.4h-.5a.9.9 0 0 0-.6.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11.2 11.2 0 0 0 4.4 3.9c.6.2 1 .4 1.4.5.6.2 1.1.1 1.5.1.5-.1 1.4-.6 1.6-1.1s.2-1 .1-1.1-.2-.2-.4-.3Z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg>',
  tiktok: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 2h3a5 5 0 0 0 4 4v3a8 8 0 0 1-4-1.1V15a6 6 0 1 1-6-6c.3 0 .7 0 1 .1v3.1a3 3 0 1 0 2 2.8V2Z"/></svg>',
  facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 21v-8h2.7l.4-3.2h-3.1V7.7c0-.9.3-1.6 1.7-1.6h1.5V3.2C15.9 3.1 14.9 3 13.8 3c-2.5 0-4.3 1.5-4.3 4.4v2.4H6.8V13H9.5v8h4Z"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 22s7-7.4 7-12.5A7 7 0 0 0 5 9.5C5 14.6 12 22 12 22Z"/><circle cx="12" cy="9.5" r="2.4"/></svg>',
  arrowUp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 19V5M5 12l7-7 7 7"/></svg>',
};

function injectIcons() {
  document.querySelectorAll("[data-icon]").forEach((el) => {
    const name = el.getAttribute("data-icon");
    if (ICONS[name]) el.innerHTML = ICONS[name];
  });
}

/* ---------------------------------------------------------
   2. LOADING SCREEN
   --------------------------------------------------------- */
function initLoader() {
  const loader = document.getElementById("loader");
  const hero = document.querySelector(".hero");
  window.addEventListener("load", () => {
    setTimeout(() => {
      loader.classList.add("is-hidden");
      hero.classList.add("is-ready");
    }, 500);
  });
  setTimeout(() => {
    loader.classList.add("is-hidden");
    hero.classList.add("is-ready");
  }, 2200);
}

/* ---------------------------------------------------------
   3. STICKY NAV + MOBILE MENU
   --------------------------------------------------------- */
function initNav() {
  const nav = document.getElementById("nav");
  const burger = document.getElementById("navBurger");
  const mobileMenu = document.getElementById("mobileMenu");

  window.addEventListener("scroll", () => {
    nav.classList.toggle("is-scrolled", window.scrollY > 40);
  });

  burger.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", String(isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    });
  });
}

/* ---------------------------------------------------------
   4. SCROLL REVEAL
   --------------------------------------------------------- */
function initReveal() {
  const targets = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );
  targets.forEach((el) => observer.observe(el));
}

/* ---------------------------------------------------------
   5. ANIMATED COUNTERS
   --------------------------------------------------------- */
function initCounters() {
  const counters = document.querySelectorAll(".stat-card__num");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.getAttribute("data-count"), 10);
        const duration = 1600;
        const start = performance.now();

        function tick(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(eased * target).toLocaleString();
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        observer.unobserve(el);
      });
    },
    { threshold: 0.4 }
  );
  counters.forEach((el) => observer.observe(el));
}

/* ---------------------------------------------------------
   6. SERVICES — static markup in index.html is the source of
   truth; nothing to render here.
   --------------------------------------------------------- */

/* ---------------------------------------------------------
   7. GALLERY — the photos themselves are static <img> markup
   directly in index.html (see #galleryGrid). This file only
   handles the scroll-reveal animation for those tiles, using
   the same .reveal-up / delay-1 / delay-2 classes already on
   each gallery-item in the HTML.
   --------------------------------------------------------- */
function initGalleryReveal() {
  const items = document.querySelectorAll(".reveal-up");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  items.forEach((el) => observer.observe(el));
}

/* ---------------------------------------------------------
   8. REVIEWS — data, render, auto-sliding carousel
   --------------------------------------------------------- */
const REVIEWS = [
  { name: "Tunde A.", role: "Regular client", stars: 5, quote: "Every visit feels like an upgrade, not just a haircut. The fade is always sharp, no exceptions." },
  { name: "Chika O.", role: "Home service client", stars: 5, quote: "Booked home service for a family event and they showed up on time, sanitised tools, and delivered." },
  { name: "Emeka N.", role: "Regular client", stars: 5, quote: "The beard line-up alone is worth the trip. Precise every single time, and the spa add-on is a bonus." },
  { name: "Ibrahim S.", role: "New client", stars: 5, quote: "First time at I-Glow and I already feel like a regular. Professional from booking to the final mirror check." },
];

function renderReviews() {
  const track = document.getElementById("reviewsTrack");
  const dotsWrap = document.getElementById("reviewsDots");

  track.innerHTML = REVIEWS.map(
    (r) => `
    <div class="review-slide">
      <div class="review-slide__stars">${"★".repeat(r.stars)}</div>
      <p class="review-slide__quote">&ldquo;${r.quote}&rdquo;</p>
      <div class="review-slide__person">
        <div class="review-slide__avatar">${r.name.charAt(0)}</div>
        <div>
          <div class="review-slide__name">${r.name}</div>
          <div class="review-slide__role">${r.role}</div>
        </div>
      </div>
    </div>`
  ).join("");

  dotsWrap.innerHTML = REVIEWS.map((_, i) => `<button data-index="${i}" aria-label="Go to review ${i + 1}"></button>`).join("");
}

function initReviewsSlider() {
  const track = document.getElementById("reviewsTrack");
  const dots = () => document.querySelectorAll(".reviews__dots button");
  let index = 0;
  let autoTimer;

  function goTo(i) {
    index = (i + REVIEWS.length) % REVIEWS.length;
    track.style.transform = `translateX(-${index * 100}%)`;
    dots().forEach((d, di) => d.classList.toggle("active", di === index));
  }

  function startAuto() {
    stopAuto();
    autoTimer = setInterval(() => goTo(index + 1), 5000);
  }
  function stopAuto() {
    clearInterval(autoTimer);
  }

  dots().forEach((dot) => {
    dot.addEventListener("click", () => {
      goTo(parseInt(dot.getAttribute("data-index"), 10));
      startAuto();
    });
  });

  document.getElementById("reviewsSlider").addEventListener("mouseenter", stopAuto);
  document.getElementById("reviewsSlider").addEventListener("mouseleave", startAuto);

  goTo(0);
  startAuto();
}

/* ---------------------------------------------------------
   9. BOOKING FORM — validation, toast, WhatsApp handoff
   --------------------------------------------------------- */
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("is-visible");
  setTimeout(() => toast.classList.remove("is-visible"), 3800);
}

function initBookingForm() {
  const form = document.getElementById("bookingForm");

  const validators = {
    fullName: (v) => v.trim().length >= 2 || "Please enter your full name.",
    phone: (v) => /^[\d+()\s-]{7,16}$/.test(v.trim()) || "Enter a valid phone number.",
    service: (v) => v !== "" || "Please choose a service.",
    date: (v) => v !== "" || "Please choose a preferred date.",
    time: (v) => v !== "" || "Please choose a preferred time.",
  };

  function validateField(field) {
    const el = form.elements[field];
    const errEl = document.getElementById(`err-${field}`);
    const row = el.closest(".form-row");
    const result = validators[field](el.value);

    if (result === true) {
      row.classList.remove("has-error");
      errEl.textContent = "";
      return true;
    }
    row.classList.add("has-error");
    errEl.textContent = result;
    return false;
  }

  Object.keys(validators).forEach((field) => {
    form.elements[field].addEventListener("blur", () => validateField(field));
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const allValid = Object.keys(validators)
      .map(validateField)
      .every(Boolean);

    if (!allValid) {
      showToast("Please fix the highlighted fields.");
      return;
    }

    const data = Object.fromEntries(new FormData(form).entries());
    const message =
      `Hi I-Glow Salon & Spa, I'd like to book an appointment.%0A%0A` +
      `Name: ${data.fullName}%0A` +
      `Phone: ${data.phone}%0A` +
      `Service: ${data.service}%0A` +
      `Date: ${data.date}%0A` +
      `Time: ${data.time}` +
      (data.message ? `%0AMessage: ${data.message}` : "");

    showToast("Booking details ready — opening WhatsApp to confirm...");
    setTimeout(() => {
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
      form.reset();
    }, 900);
  });

  const directLink = document.getElementById("bookWhatsapp");
  directLink.href = `https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20I-Glow%20Salon%20%26%20Spa%2C%20I%27d%20like%20to%20book%20an%20appointment.`;
  directLink.target = "_blank";
  directLink.rel = "noopener";
}

/* ---------------------------------------------------------
   10. BACK TO TOP
   --------------------------------------------------------- */
function initBackToTop() {
  const btn = document.getElementById("backToTop");
  window.addEventListener("scroll", () => {
    btn.classList.toggle("is-visible", window.scrollY > 600);
  });
  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ---------------------------------------------------------
   11. HERO BACKGROUND SLIDESHOW
   --------------------------------------------------------- */
function initHeroSlideshow() {
  const slides = document.querySelectorAll(".hero__bg-slide");
  if (!slides.length) return;
  let index = 0;
  setInterval(() => {
    slides[index].classList.remove("is-active");
    index = (index + 1) % slides.length;
    slides[index].classList.add("is-active");
  }, 5000);
}

/* ---------------------------------------------------------
   INIT — runs after DOM is parsed
   --------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  injectIcons();
  initLoader();
  initNav();
  initReveal();
  initCounters();
  initGalleryReveal();
  initHeroSlideshow();
  renderReviews();
  initReviewsSlider();
  initBookingForm();
  initBackToTop();

  document.getElementById("year").textContent = new Date().getFullYear();
});