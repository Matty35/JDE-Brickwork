/* =========================================
   MAIN JS
   JDE Brickwork & Repointing
   ========================================= */

(function () {
  'use strict';

  const nav        = document.getElementById('site-nav');
  const hamburger  = document.getElementById('nav-hamburger');
  const overlay    = document.getElementById('nav-overlay');
  const overlayLinks = overlay ? overlay.querySelectorAll('a') : [];

  // ── Scroll: toggle .scrolled on nav ──────────────────────────────────────
  function onScroll() {
    if (window.scrollY > 20) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load in case page is already scrolled

  // ── Hamburger: toggle overlay ─────────────────────────────────────────────
  function openMenu() {
    hamburger.classList.add('is-open');
    overlay.classList.add('is-open');
    hamburger.setAttribute('aria-expanded', 'true');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    hamburger.classList.remove('is-open');
    overlay.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', function () {
      const isOpen = hamburger.classList.contains('is-open');
      isOpen ? closeMenu() : openMenu();
    });
  }

  // Close overlay when any overlay link is clicked
  overlayLinks.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // Close overlay on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && hamburger && hamburger.classList.contains('is-open')) {
      closeMenu();
      hamburger.focus();
    }
  });

  // ── FAQ Accordion ──────────────────────────────────────────────────────────
  const faqItems = document.querySelectorAll('.faq__item');

  faqItems.forEach(function (item) {
    const btn    = item.querySelector('.faq__question');
    const answer = item.querySelector('.faq__answer');
    if (!btn || !answer) return;

    btn.addEventListener('click', function () {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';

      // Collapse all items first
      faqItems.forEach(function (other) {
        const otherBtn    = other.querySelector('.faq__question');
        const otherAnswer = other.querySelector('.faq__answer');
        if (otherBtn && otherAnswer) {
          otherBtn.setAttribute('aria-expanded', 'false');
          otherAnswer.classList.remove('is-open');
        }
      });

      // If this item was closed, open it
      if (!isOpen) {
        btn.setAttribute('aria-expanded', 'true');
        answer.classList.add('is-open');
      }
    });

    // Keyboard: allow Enter and Space (button already handles Space natively)
    btn.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        btn.setAttribute('aria-expanded', 'false');
        answer.classList.remove('is-open');
        btn.focus();
      }
    });
  });

})();
