// Remove no-js class immediately
document.documentElement.classList.remove('no-js');

// ===== REVEAL ON SCROLL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('section, .step-row, .package-card, .service-block, .modern-service-card, .about-img-wrapper, .about-text-content, .pillar, .stat-card').forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// ===== NAVBAR =====
const toggle = document.getElementById('navbarToggle');
const nav = document.getElementById('mainNav');
const overlay = document.getElementById('navOverlay');

if (toggle) {
  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    if (overlay) {
      overlay.style.display = nav.classList.contains('open') ? 'block' : 'none';
      overlay.classList.toggle('active');
    }
  });
}

// Mobile dropdown toggle
document.querySelectorAll('.nav-link[data-dropdown]').forEach(link => {
  link.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      const parent = link.parentElement;
      parent.classList.toggle('open');
    }
  });
});

// ===== FAQ ACCORDION =====
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const isOpen = item.classList.contains('open');
    // close all
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// ===== TESTIMONIAL CAROUSEL =====
const track = document.querySelector('.testimonial-track');
if (track) {
  const slides = track.querySelectorAll('.testimonial-slide');
  let perView = window.innerWidth <= 768 ? 1 : 3;
  let current = 0;
  const total = slides.length;

  function getMax() {
    perView = window.innerWidth <= 768 ? 1 : 3;
    return Math.max(0, total - perView);
  }

  function goTo(idx) {
    current = Math.max(0, Math.min(idx, getMax()));
    track.style.transform = `translateX(-${current * (100 / perView)}%)`;
  }

  document.querySelector('.carousel-btn.prev')?.addEventListener('click', () => goTo(current - 1));
  document.querySelector('.carousel-btn.next')?.addEventListener('click', () => goTo(current + 1));

  window.addEventListener('resize', () => goTo(Math.min(current, getMax())));

  // Auto-advance
  setInterval(() => goTo(current >= getMax() ? 0 : current + 1), 6000);
}

// ===== LOGIN TABS =====
document.querySelectorAll('.login-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.login-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    document.querySelectorAll('.login-form-panel').forEach(p => {
      p.style.opacity = '0';
      setTimeout(() => p.style.display = 'none', 200);
    });

    const target = document.getElementById(tab.dataset.target);
    if (target) {
      setTimeout(() => {
        target.style.display = 'block';
        setTimeout(() => target.style.opacity = '1', 10);
      }, 210);
    }
  });
});

// Scroll to top
const scrollTopBtn = document.getElementById('scrollTopBtn');
if (scrollTopBtn) {
  window.addEventListener('scroll', () => {
    scrollTopBtn.style.display = window.scrollY > 400 ? 'flex' : 'none';
    scrollTopBtn.style.opacity = window.scrollY > 400 ? '1' : '0';
  });
  scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}
