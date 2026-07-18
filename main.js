/**
 * MOIN KHAN PORTFOLIO — MAIN JAVASCRIPT
 * Senior Engineer Grade • Modular Architecture • Performance Optimized
 * @author Moin Khan
 * @version 1.0.0
 */

'use strict';

/* ═══════════════════════════════════════════════════════════════
   CONFIGURATION
   ═══════════════════════════════════════════════════════════════ */
const CONFIG = {
  typing: {
    strings: [
      'AI/ML Engineer',
      'Full-Stack MERN Developer',
      'IoT & Embedded Systems Specialist',
      'Computer Vision Researcher',
      'Technical Head @ IEEE MHSSCE'
    ],
    speed: 80,
    deleteSpeed: 40,
    pause: 2000
  },
  particles: {
    count: 60,
    connectionDistance: 150,
    mouseDistance: 200,
    colors: ['rgba(245, 158, 11, ', 'rgba(16, 185, 129, ', 'rgba(244, 63, 94, ']
  },
  scroll: {
    navHideThreshold: 100,
    backToTopThreshold: 500,
    revealThreshold: 0.15
  }
};

/* ═══════════════════════════════════════════════════════════════
   PARTICLE SYSTEM — Live Background
   ═══════════════════════════════════════════════════════════════ */
class ParticleSystem {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: null, y: null };
    this.animationId = null;
    this.isActive = true;

    this.init();
    this.bindEvents();
    this.animate();
  }

  init() {
    this.resize();
    this.createParticles();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createParticles() {
    this.particles = [];
    const { count, colors } = CONFIG.particles;

    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.2,
        colorIndex: Math.floor(Math.random() * colors.length),
        pulse: Math.random() * Math.PI * 2
      });
    }
  }

  bindEvents() {
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => this.resize(), 150);
    });

    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });

    // Pause when tab is hidden for performance
    document.addEventListener('visibilitychange', () => {
      this.isActive = !document.hidden;
      if (this.isActive && !this.animationId) {
        this.animate();
      }
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const { colors, connectionDistance, mouseDistance } = CONFIG.particles;

    // Update and draw particles
    this.particles.forEach((p, i) => {
      // Update position
      p.x += p.vx;
      p.y += p.vy;
      p.pulse += 0.02;

      // Wrap around edges
      if (p.x < 0) p.x = this.canvas.width;
      if (p.x > this.canvas.width) p.x = 0;
      if (p.y < 0) p.y = this.canvas.height;
      if (p.y > this.canvas.height) p.y = 0;

      // Draw particle with pulse
      const radius = p.radius + Math.sin(p.pulse) * 0.3;
      const alpha = p.opacity + Math.sin(p.pulse) * 0.1;

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, Math.max(0.5, radius), 0, Math.PI * 2);
      this.ctx.fillStyle = colors[p.colorIndex] + Math.max(0.1, alpha) + ')';
      this.ctx.fill();

      // Draw connections to nearby particles
      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < connectionDistance) {
          const lineAlpha = (1 - dist / connectionDistance) * 0.12;
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.strokeStyle = colors[p.colorIndex] + lineAlpha + ')';
          this.ctx.lineWidth = 0.5;
          this.ctx.stroke();
        }
      }

      // Mouse interaction
      if (this.mouse.x !== null && this.mouse.y !== null) {
        const mdx = p.x - this.mouse.x;
        const mdy = p.y - this.mouse.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);

        if (mDist < mouseDistance) {
          const mAlpha = (1 - mDist / mouseDistance) * 0.4;
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(this.mouse.x, this.mouse.y);
          this.ctx.strokeStyle = colors[p.colorIndex] + mAlpha + ')';
          this.ctx.lineWidth = 0.8;
          this.ctx.stroke();
        }
      }
    });
  }

  animate() {
    if (!this.isActive) {
      this.animationId = null;
      return;
    }

    this.draw();
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  destroy() {
    this.isActive = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}

/* ═══════════════════════════════════════════════════════════════
   TYPING EFFECT
   ═══════════════════════════════════════════════════════════════ */
class TypingEffect {
  constructor(elementId, config) {
    this.element = document.getElementById(elementId);
    if (!this.element) return;

    this.strings = config.strings;
    this.speed = config.speed;
    this.deleteSpeed = config.deleteSpeed;
    this.pause = config.pause;

    this.stringIndex = 0;
    this.charIndex = 0;
    this.isDeleting = false;
    this.isPaused = false;

    this.type();
  }

  type() {
    const currentString = this.strings[this.stringIndex];

    if (this.isPaused) {
      setTimeout(() => {
        this.isPaused = false;
        this.isDeleting = true;
        this.type();
      }, this.pause);
      return;
    }

    if (this.isDeleting) {
      this.charIndex--;
      this.element.textContent = currentString.substring(0, this.charIndex);

      if (this.charIndex === 0) {
        this.isDeleting = false;
        this.stringIndex = (this.stringIndex + 1) % this.strings.length;
      }

      setTimeout(() => this.type(), this.deleteSpeed);
    } else {
      this.charIndex++;
      this.element.textContent = currentString.substring(0, this.charIndex);

      if (this.charIndex === currentString.length) {
        this.isPaused = true;
      }

      setTimeout(() => this.type(), this.speed);
    }
  }
}

/* ═══════════════════════════════════════════════════════════════
   CUSTOM CURSOR
   ═══════════════════════════════════════════════════════════════ */
class CustomCursor {
  constructor() {
    this.dot = document.getElementById('cursorDot');
    this.ring = document.getElementById('cursorRing');

    if (!this.dot || !this.ring) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    this.pos = { x: 0, y: 0 };
    this.ringPos = { x: 0, y: 0 };
    this.isActive = true;

    this.bindEvents();
    this.animate();
  }

  bindEvents() {
    document.addEventListener('mousemove', (e) => {
      this.pos.x = e.clientX;
      this.pos.y = e.clientY;
    });

    // Hover states
    const hoverElements = document.querySelectorAll('[data-hover], a, button, input, textarea');
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => this.ring.classList.add('hover'));
      el.addEventListener('mouseleave', () => this.ring.classList.remove('hover'));
    });

    // Handle dynamically added elements
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest('[data-hover], a, button, input, textarea')) {
        this.ring.classList.add('hover');
      }
    });

    document.addEventListener('mouseout', (e) => {
      if (e.target.closest('[data-hover], a, button, input, textarea')) {
        this.ring.classList.remove('hover');
      }
    });
  }

  animate() {
    if (!this.isActive) return;

    // Smooth follow for ring
    this.ringPos.x += (this.pos.x - this.ringPos.x) * 0.15;
    this.ringPos.y += (this.pos.y - this.ringPos.y) * 0.15;

    this.dot.style.left = this.pos.x + 'px';
    this.dot.style.top = this.pos.y + 'px';
    this.ring.style.left = this.ringPos.x + 'px';
    this.ring.style.top = this.ringPos.y + 'px';

    requestAnimationFrame(() => this.animate());
  }
}

/* ═══════════════════════════════════════════════════════════════
   SCROLL CONTROLLER
   ═══════════════════════════════════════════════════════════════ */
class ScrollController {
  constructor() {
    this.lastScroll = 0;
    this.ticking = false;

    this.navbar = document.getElementById('navbar');
    this.scrollProgress = document.getElementById('scrollProgress');
    this.backToTop = document.getElementById('backToTop');

    this.bindEvents();
    this.initReveal();
    this.initCounters();
    this.initSkillBars();
  }

  bindEvents() {
    window.addEventListener('scroll', () => {
      if (!this.ticking) {
        requestAnimationFrame(() => {
          this.handleScroll();
          this.ticking = false;
        });
        this.ticking = true;
      }
    });

    if (this.backToTop) {
      this.backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  handleScroll() {
    const currentScroll = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (currentScroll / docHeight) * 100;

    // Update scroll progress
    if (this.scrollProgress) {
      this.scrollProgress.style.width = scrollPercent + '%';
    }

    // Navbar hide/show
    if (this.navbar) {
      if (currentScroll > CONFIG.scroll.navHideThreshold && currentScroll > this.lastScroll) {
        this.navbar.classList.add('hidden');
      } else {
        this.navbar.classList.remove('hidden');
      }
    }

    // Back to top visibility
    if (this.backToTop) {
      if (currentScroll > CONFIG.scroll.backToTopThreshold) {
        this.backToTop.classList.add('visible');
      } else {
        this.backToTop.classList.remove('visible');
      }
    }

    this.lastScroll = currentScroll;
  }

  initReveal() {
    const reveals = document.querySelectorAll('.section-reveal, .timeline-item');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: CONFIG.scroll.revealThreshold,
      rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(el => observer.observe(el));
  }

  initCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
  }

  animateCounter(element) {
    const target = parseFloat(element.dataset.count);
    const isDecimal = target % 1 !== 0;
    const duration = 2000;
    const start = performance.now();

    const update = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic

      const current = eased * target;
      element.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        element.textContent = target;
      }
    };

    requestAnimationFrame(update);
  }

  initSkillBars() {
    const bars = document.querySelectorAll('.category-progress[data-width]');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const width = entry.target.dataset.width;
          setTimeout(() => {
            entry.target.style.width = width + '%';
          }, 200);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    bars.forEach(bar => observer.observe(bar));
  }
}

/* ═══════════════════════════════════════════════════════════════
   MOBILE NAVIGATION
   ═══════════════════════════════════════════════════════════════ */
class MobileNav {
  constructor() {
    this.toggle = document.getElementById('navToggle');
    this.menu = document.getElementById('navMenu');

    if (!this.toggle || !this.menu) return;

    this.bindEvents();
  }

  bindEvents() {
    this.toggle.addEventListener('click', () => this.toggleMenu());

    // Close on link click
    const links = this.menu.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => this.closeMenu());
    });

    // Close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.closeMenu();
    });
  }

  toggleMenu() {
    const isOpen = this.menu.classList.contains('active');
    if (isOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  openMenu() {
    this.menu.classList.add('active');
    this.toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  closeMenu() {
    this.menu.classList.remove('active');
    this.toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
}

/* ═══════════════════════════════════════════════════════════════
   PROJECT FILTER
   ═══════════════════════════════════════════════════════════════ */
class ProjectFilter {
  constructor() {
    this.buttons = document.querySelectorAll('.filter-btn');
    this.cards = document.querySelectorAll('.project-card');

    if (!this.buttons.length || !this.cards.length) return;

    this.bindEvents();
  }

  bindEvents() {
    this.buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        this.setActiveButton(btn);
        this.filterProjects(filter);
      });
    });
  }

  setActiveButton(activeBtn) {
    this.buttons.forEach(btn => btn.classList.remove('active'));
    activeBtn.classList.add('active');
  }

  filterProjects(filter) {
    this.cards.forEach(card => {
      const categories = card.dataset.category?.split(' ') || [];

      if (filter === 'all' || categories.includes(filter)) {
        card.classList.remove('hidden');
        card.style.animation = 'fadeInUp 0.5s ease forwards';
      } else {
        card.classList.add('hidden');
      }
    });
  }
}

/* ═══════════════════════════════════════════════════════════════
   FORM HANDLER
   ═══════════════════════════════════════════════════════════════ */
class FormHandler {
  constructor() {
    this.form = document.getElementById('contactForm');
    if (!this.form) return;

    this.bindEvents();
  }

  bindEvents() {
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  handleSubmit(e) {
    // If using Formspree, let it handle naturally
    // Add loading state
    const btn = this.form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;

    btn.disabled = true;
    btn.innerHTML = '<span>Sending...</span>';

    // Reset after delay (Formspree will handle actual submission)
    setTimeout(() => {
      btn.disabled = false;
      btn.innerHTML = originalText;
    }, 2000);
  }
}

/* ═══════════════════════════════════════════════════════════════
   SMOOTH SCROLL POLYFILL
   ═══════════════════════════════════════════════════════════════ */
class SmoothScroll {
  constructor() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const offset = 80; // navbar height
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }
}

/* ═══════════════════════════════════════════════════════════════
   UTILITY FUNCTIONS
   ═══════════════════════════════════════════════════════════════ */
const Utils = {
  // Set current year in footer
  setYear() {
    const yearEl = document.getElementById('year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  },

  // Debounce function for performance
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Throttle function for performance
  throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
};

/* ═══════════════════════════════════════════════════════════════
   INITIALIZATION
   ═══════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all systems
  const particleSystem = new ParticleSystem('bg-canvas');
  const typingEffect = new TypingEffect('typingText', CONFIG.typing);
  const customCursor = new CustomCursor();
  const scrollController = new ScrollController();
  const mobileNav = new MobileNav();
  const projectFilter = new ProjectFilter();
  const formHandler = new FormHandler();
  const smoothScroll = new SmoothScroll();

  // Utilities
  Utils.setYear();

  // Expose to global for debugging (remove in production if desired)
  window.Portfolio = {
    particleSystem,
    typingEffect,
    customCursor,
    scrollController,
    mobileNav,
    projectFilter,
    formHandler,
    smoothScroll
  };

  console.log('%c Moin Khan Portfolio ', 'background: linear-gradient(135deg, #f59e0b, #10b981); color: #0a0a0f; font-size: 20px; font-weight: bold; padding: 10px 20px; border-radius: 8px;');
  console.log('%c Built with precision. Open for internships. ', 'color: #a1a1aa; font-size: 12px;');
});

/* ═══════════════════════════════════════════════════════════════
   CLEANUP ON PAGE UNLOAD
   ═══════════════════════════════════════════════════════════════ */
window.addEventListener('beforeunload', () => {
  if (window.Portfolio && window.Portfolio.particleSystem) {
    window.Portfolio.particleSystem.destroy();
  }
});
