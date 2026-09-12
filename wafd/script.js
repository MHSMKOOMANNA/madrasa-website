/* ============================================
   SHIC 16th Batch Alumni — JavaScript
   White & Green Theme | With Memories Gallery
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // =====================
  // 1. NAVBAR SCROLL
  // =====================
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveNav();
  });

  // =====================
  // 2. HAMBURGER MENU
  // =====================
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = navLinks.classList.contains('open')
      ? 'rotate(45deg) translate(5px, 5px)' : '';
    spans[1].style.opacity   = navLinks.classList.contains('open') ? '0' : '1';
    spans[2].style.transform = navLinks.classList.contains('open')
      ? 'rotate(-45deg) translate(5px, -5px)' : '';
  });

  // Close nav on link click
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.querySelectorAll('span').forEach(s => {
        s.style.transform = '';
        s.style.opacity = '1';
      });
    });
  });

  // =====================
  // 3. ACTIVE NAV LINK
  // =====================
  function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY  = window.scrollY + 120;
    sections.forEach(section => {
      const top    = section.offsetTop;
      const height = section.offsetHeight;
      const id     = section.getAttribute('id');
      const link   = document.querySelector(`.nav-link[href="#${id}"]`);
      if (link) {
        if (scrollY >= top && scrollY < top + height) {
          document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        }
      }
    });
  }

  // =====================
  // 4. PARTICLES
  // =====================
  const particleContainer = document.getElementById('particles');
  const particleCount = 40;

  for (let i = 0; i < particleCount; i++) {
    createParticle();
  }

  function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    const size = Math.random() * 3 + 1;
    particle.style.cssText = `
      left: ${Math.random() * 100}%;
      width: ${size}px;
      height: ${size}px;
      animation-duration: ${Math.random() * 15 + 10}s;
      animation-delay: ${Math.random() * 15}s;
      opacity: ${Math.random() * 0.4 + 0.05};
    `;
    particleContainer.appendChild(particle);
  }

  // =====================
  // 5. COUNTER ANIMATION
  // =====================
  const counters = document.querySelectorAll('.stat-number[data-target]');
  let countersStarted = false;

  function animateCounters() {
    if (countersStarted) return;
    const statsSection = document.getElementById('stats');
    if (!statsSection) return;
    const rect = statsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      countersStarted = true;
      counters.forEach(counter => {
        const target = +counter.dataset.target;
        const duration = 2000;
        const startTime = performance.now();

        function updateCounter(currentTime) {
          const elapsed  = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased    = 1 - Math.pow(1 - progress, 3); // ease out cubic
          const current  = Math.floor(eased * target);
          counter.textContent = current.toLocaleString();
          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target.toLocaleString();
          }
        }
        requestAnimationFrame(updateCounter);
      });
    }
  }

  window.addEventListener('scroll', animateCounters);
  animateCounters(); // check on load

  // =====================
  // 6. SCROLL REVEAL
  // =====================
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, idx * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });

  revealElements.forEach(el => revealObserver.observe(el));

  // =====================
  // 7. SMOOTH SCROLL
  // =====================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // =====================
  // 8. LOGO HOVER EFFECT
  // =====================
  const heroLogo = document.getElementById('hero-logo');
  if (heroLogo) {
    heroLogo.addEventListener('mouseenter', () => {
      heroLogo.style.transform = 'scale(1.08) rotate(5deg)';
    });
    heroLogo.addEventListener('mouseleave', () => {
      heroLogo.style.transform = '';
    });
  }

  // =====================
  // 9. BATCH PHOTO CLICK
  // =====================
  const batchPhoto = document.getElementById('batch-group-photo');
  if (batchPhoto) {
    batchPhoto.style.cursor = 'zoom-in';
    batchPhoto.style.transition = 'transform 0.4s ease';
    batchPhoto.addEventListener('click', () => {
      openLightbox('mem-graduation.jpg', 'Graduation Day — 16th Batch at Darul Huda Islamic University, 5th March 2024');
    });
  }

  // =====================
  // 10. MEMORY CARDS HOVER PULSE
  // =====================
  document.querySelectorAll('.memory-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.borderColor = 'var(--green-light)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.borderColor = '';
    });
  });

  console.log('%c🌿 SHIC 16th Batch Alumni Website', 'color: #1b6b3a; font-size: 18px; font-weight: bold;');
  console.log('%c Since 9.5.12 : To 5.3.24 | Twelve Years · One Brotherhood · Eternal Knowledge',
    'color: #2d9b55; font-size: 13px;');
});

// =====================
// 11. LIGHTBOX — global functions
// =====================
function openLightbox(imgSrc, caption) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');

  lightboxImg.src = imgSrc;
  lightboxImg.alt = caption;
  lightboxCaption.textContent = caption;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox(e) {
  if (e && e.target !== document.getElementById('lightbox') && 
      !e.target.classList.contains('lightbox-close') &&
      e.target.id !== 'lightbox-close') {
    return;
  }
  const lightbox = document.getElementById('lightbox');
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

// ESC key to close lightbox
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const lightbox = document.getElementById('lightbox');
    if (lightbox && lightbox.classList.contains('open')) {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }
  }
});
