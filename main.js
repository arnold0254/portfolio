// ==============================
//  NAVBAR — scroll effect + mobile toggle
// ==============================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const navLinkItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  highlightActiveNav();
});

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
});

navLinks.addEventListener('click', (e) => {
  if (e.target.classList.contains('nav-link') || e.target.classList.contains('nav-cta')) {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
  }
});

function highlightActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) {
      current = sec.id;
    }
  });
  navLinkItems.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}

// ==============================
//  TYPING ANIMATION
// ==============================
const phrases = [
  'full-stack web apps.',
  'scalable REST APIs.',
  'beautiful React UIs.',
  'fast Node.js backends.',
  'seamless user experiences.',
];
let phraseIdx = 0;
let charIdx = 0;
let isDeleting = false;
const typedEl = document.getElementById('typedText');

function typeLoop() {
  const current = phrases[phraseIdx];
  if (!isDeleting) {
    typedEl.textContent = current.slice(0, ++charIdx);
    if (charIdx === current.length) {
      isDeleting = true;
      setTimeout(typeLoop, 2200);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, --charIdx);
    if (charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
    }
  }
  setTimeout(typeLoop, isDeleting ? 55 : 90);
}
typeLoop();

// ==============================
//  STATS COUNTER ANIMATION
// ==============================
function animateCount(el, target) {
  let current = 0;
  const duration = 1800;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = Math.round(current);
    if (current >= target) clearInterval(timer);
  }, 16);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const nums = entry.target.querySelectorAll('.stat-num');
      nums.forEach(n => animateCount(n, parseInt(n.dataset.target)));
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statObserver.observe(heroStats);

// ==============================
//  SKILL BARS ANIMATION
// ==============================
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fills = entry.target.querySelectorAll('.bar-fill');
      fills.forEach(fill => {
        fill.style.width = fill.dataset.width + '%';
      });
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const profSection = document.querySelector('.proficiency-bars');
if (profSection) barObserver.observe(profSection);

// ==============================
//  SCROLL REVEAL ANIMATIONS
// ==============================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = `${i * 0.07}s`;
      entry.target.classList.add('animate-in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(
  '.project-card, .skill-category, .testimonial-card, .highlight-item, .info-card, .contact-item'
).forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  revealObserver.observe(el);
});

document.querySelectorAll('.animate-in').length; // trigger registration

// Override animate-in to set opacity back
document.querySelectorAll('.project-card, .skill-category, .testimonial-card, .highlight-item, .info-card, .contact-item').forEach(el => {
  const originalTransition = el.style.transition;
  const obs = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
      obs.unobserve(el);
    }
  }, { threshold: 0.1 });
  obs.observe(el);
});

// ==============================
//  PROJECT FILTER
// ==============================
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.style.display = match ? '' : 'none';
      if (match) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        requestAnimationFrame(() => {
          card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        });
      }
    });
  });
});

// ==============================
//  CONTACT FORM
// ==============================
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector('button[type="submit"]');
  btn.textContent = 'Sending...';
  btn.disabled = true;

  // Simulate sending (replace with real API call)
  setTimeout(() => {
    btn.innerHTML = '✅ Sent!';
    formSuccess.classList.add('show');
    contactForm.reset();
    setTimeout(() => {
      btn.innerHTML = 'Send Message <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/></svg>';
      btn.disabled = false;
      formSuccess.classList.remove('show');
    }, 4000);
  }, 1400);
});

// ==============================
//  AVATAR FALLBACK
// ==============================
const avatarImg = document.getElementById('avatarImg');
if (avatarImg) {
  avatarImg.onerror = () => {
    avatarImg.outerHTML = `<div style="
      width: 100%; height: 100%; border-radius: 50%;
      background: linear-gradient(135deg, #2563eb, #0ea5e9);
      display: flex; align-items: center; justify-content: center;
      font-size: 96px; font-weight: 900; color: white;
      border: 4px solid white; box-shadow: 0 32px 64px rgba(37,99,235,0.12);
    ">A</div>`;
  };
}

// ==============================
//  SMOOTH ANCHOR SCROLL
// ==============================
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

console.log('👋 Portfolio loaded — Arnold Orina Onwong\'a');
