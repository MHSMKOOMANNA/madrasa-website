/* ==========================================================================
   SHIC 16th Batch Alumni (WAFD) — Interactive Scripts
   Features: Lightbox Gallery, Category Filter, Tab Switching, Stats Counters,
             Particles, Scroll Spy, Active Navigation & Accessibility
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ------------------------------------------------------------------------
  // 1. Navigation Scroll & Active Link Spy
  // ------------------------------------------------------------------------
  const navbar = document.getElementById('navbar');
  const backToTopBtn = document.getElementById('back-to-top');

  function handleScroll() {
    const scrollY = window.scrollY;

    // Navbar Scrolled Class
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back to Top Visibility
    if (scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }

    // Active Nav Link Spy
    updateActiveNavLink();
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 140;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const link = document.querySelector(`.nav-link[href="#${id}"]`);

      if (link) {
        if (scrollPos >= top && scrollPos < top + height) {
          document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        }
      }
    });
  }

  // Back to Top Click
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ------------------------------------------------------------------------
  // 2. Mobile Hamburger Menu
  // ------------------------------------------------------------------------
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);

      const spans = hamburger.querySelectorAll('span');
      if (isOpen) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '1';
        spans[2].style.transform = '';
      }
    });

    // Close on navigation link click
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        const spans = hamburger.querySelectorAll('span');
        spans.forEach(s => {
          s.style.transform = '';
          s.style.opacity = '1';
        });
      });
    });
  }

  // ------------------------------------------------------------------------
  // 3. Ambient Floating Particles
  // ------------------------------------------------------------------------
  const particleContainer = document.getElementById('particles');
  if (particleContainer) {
    const particleCount = 35;
    const colors = [
      'rgba(21, 128, 61, 0.45)',
      'rgba(34, 197, 94, 0.35)',
      'rgba(197, 155, 39, 0.4)',
      'rgba(229, 186, 85, 0.3)'
    ];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      const size = Math.random() * 3.5 + 1.5;
      const duration = Math.random() * 16 + 12;
      const delay = Math.random() * 15;
      const left = Math.random() * 100;
      const color = colors[Math.floor(Math.random() * colors.length)];

      particle.style.cssText = `
        left: ${left}%;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
      `;
      particleContainer.appendChild(particle);
    }
  }

  // ------------------------------------------------------------------------
  // 4. Batch Spotlight Tab Switching
  // ------------------------------------------------------------------------
  const tabButtons = document.querySelectorAll('.spotlight-tab-btn');
  const tabContents = document.querySelectorAll('.spotlight-content');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');

      // Update button active state
      tabButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Update tab contents
      tabContents.forEach(content => {
        if (content.id === targetId) {
          content.classList.add('active');
        } else {
          content.classList.remove('active');
        }
      });
    });
  });

  // ------------------------------------------------------------------------
  // 5. Memories Gallery Filtering
  // ------------------------------------------------------------------------
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryCards = document.querySelectorAll('.gallery-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      // Set active button
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Filter gallery cards
      galleryCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // ------------------------------------------------------------------------
  // 6. Number Counter Animation (Stats & Donation)
  // ------------------------------------------------------------------------
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  let statsCounted = false;

  function runCounterAnimation() {
    if (statsCounted) return;
    const statsSection = document.getElementById('stats');
    if (!statsSection) return;

    const rect = statsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      statsCounted = true;
      statNumbers.forEach(numEl => {
        const target = +numEl.dataset.target;
        const duration = 2200;
        const startTime = performance.now();

        function step(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease-out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          const currentVal = Math.floor(eased * target);

          numEl.textContent = currentVal.toLocaleString();

          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            numEl.textContent = target.toLocaleString();
          }
        }
        requestAnimationFrame(step);
      });
    }
  }

  window.addEventListener('scroll', runCounterAnimation, { passive: true });
  runCounterAnimation();

  // ------------------------------------------------------------------------
  // 7. Scroll Reveal Animation via Intersection Observer
  // ------------------------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, idx * 60);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  revealElements.forEach(el => revealObserver.observe(el));

  // ------------------------------------------------------------------------
  // 8. Smooth Scrolling Anchor Links
  // ------------------------------------------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#' || href === '') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ------------------------------------------------------------------------
  // 9. Initializing Lightbox Gallery List
  // ------------------------------------------------------------------------
  initGalleryList();

  console.log('%c🏛️ Sabeelul Hidaya Islamic College (SHIC)', 'color: #15803d; font-size: 16px; font-weight: bold;');
  console.log('%c16th Batch Alumni (WAFD) — Since 09.05.2012 to 05.03.2024', 'color: #c59b27; font-size: 12px;');
});

// --------------------------------------------------------------------------
// 10. Lightbox Carousel & Modal Logic (Global Scope)
// --------------------------------------------------------------------------
let galleryItems = [];
let currentLightboxIndex = 0;

function initGalleryList() {
  galleryItems = [
    { src: 'mem-graduation.jpg', caption: 'Graduation Day — Standing in front of Darul Huda Islamic University (5th March 2024)' },
    { src: 'cover-photo.jpg', caption: 'Official Convocation Batch Portrait — 16th Batch in graduation regalia with degrees' },
    { src: 'logo.png', caption: '16th Batch at Sabeelul Hidaya Islamic College — United in traditional white attire' },
    { src: 'mem-brotherhood.jpg', caption: 'Brothers for Life — Joyful reunion selfie filled with warmth and memories' },
    { src: 'mem-football.jpg', caption: 'WAFD Meet & Grand Turf League — Football tournament and brotherhood in sports' },
    { src: 'mem-roots.jpg', caption: 'Peaceful Days — Sitting under the shade of the campus tree in serene white attire' },
    { src: 'mem-excursion.jpg', caption: 'Madrasa Excursion Trip — Early exploratory years of the 16th Batch' }
  ];
}

function openLightbox(imgSrc, caption) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxCounter = document.getElementById('lightbox-counter');

  // Find index in galleryItems or default
  const foundIdx = galleryItems.findIndex(item => item.src === imgSrc);
  if (foundIdx !== -1) {
    currentLightboxIndex = foundIdx;
  } else {
    currentLightboxIndex = 0;
  }

  updateLightboxView();

  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function updateLightboxView() {
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxCounter = document.getElementById('lightbox-counter');

  if (galleryItems.length === 0) return;

  const currentItem = galleryItems[currentLightboxIndex];
  lightboxImg.src = currentItem.src;
  lightboxImg.alt = currentItem.caption;
  lightboxCaption.textContent = currentItem.caption;
  lightboxCounter.textContent = `${currentLightboxIndex + 1} / ${galleryItems.length}`;
}

function navigateLightbox(direction) {
  if (galleryItems.length === 0) return;

  currentLightboxIndex += direction;
  if (currentLightboxIndex < 0) {
    currentLightboxIndex = galleryItems.length - 1;
  } else if (currentLightboxIndex >= galleryItems.length) {
    currentLightboxIndex = 0;
  }

  updateLightboxView();
}

function closeLightbox(e) {
  if (e && e.target && e.target.closest('.lightbox-media-container') && !e.target.classList.contains('lightbox-backdrop')) {
    return;
  }
  const lightbox = document.getElementById('lightbox');
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

// Keyboard controls for Lightbox
document.addEventListener('keydown', (e) => {
  const lightbox = document.getElementById('lightbox');
  if (lightbox && lightbox.classList.contains('open')) {
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowRight') {
      navigateLightbox(1);
    } else if (e.key === 'ArrowLeft') {
      navigateLightbox(-1);
    }
  }
});
