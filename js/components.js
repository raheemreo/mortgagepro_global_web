// js/components.js — Fetches and injects shared header and footer
// Include on every page: <script src="/js/components.js" defer></script>
// REO TECH | MortgagePro Global v2.1 | June 2026

(async function () {
  'use strict';

  // Highlight the active nav link based on current URL
  function setActiveNav() {
    const path = window.location.pathname;
    document.querySelectorAll('.nav-list a').forEach(link => {
      try {
        const linkPath = new URL(link.href).pathname;
        if (linkPath === path || (path === '/' && linkPath === '/')) {
          link.setAttribute('aria-current', 'page');
          link.classList.add('active');
        }
      } catch (e) { /* skip invalid hrefs */ }
    });
  }

  // Hamburger menu toggle
  function initHamburger() {
    const btn = document.querySelector('.hamburger-btn');
    const menu = document.getElementById('nav-menu');
    if (!btn || !menu) return;

    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      btn.setAttribute('aria-label', !expanded ? 'Close navigation menu' : 'Open navigation menu');
      menu.classList.toggle('open', !expanded);
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!btn.contains(e.target) && !menu.contains(e.target)) {
        btn.setAttribute('aria-expanded', 'false');
        btn.setAttribute('aria-label', 'Open navigation menu');
        menu.classList.remove('open');
      }
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('open')) {
        btn.setAttribute('aria-expanded', 'false');
        btn.setAttribute('aria-label', 'Open navigation menu');
        menu.classList.remove('open');
        btn.focus();
      }
    });
  }

  // Dynamic footer year
  function setFooterYear() {
    const el = document.getElementById('footer-year');
    if (el) el.textContent = new Date().getFullYear();
  }

  // Inject component HTML into placeholder
  async function injectComponent(selector, url) {
    const target = document.querySelector(selector);
    if (!target) return;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status} loading ${url}`);
      target.innerHTML = await res.text();
    } catch (err) {
      console.warn('MortgagePro: component load failed —', err.message);
    }
  }

  // FAQ accordion (works on any page with .faq-list)
  function initFAQ() {
    document.querySelectorAll('.faq-question').forEach(btn => {
      btn.addEventListener('click', () => {
        const answer = btn.nextElementSibling;
        const isOpen = btn.getAttribute('aria-expanded') === 'true';
        // Close all others
        document.querySelectorAll('.faq-question').forEach(other => {
          other.setAttribute('aria-expanded', 'false');
          other.nextElementSibling?.classList.remove('open');
        });
        // Toggle this one
        if (!isOpen) {
          btn.setAttribute('aria-expanded', 'true');
          answer?.classList.add('open');
        }
      });
    });
  }

  // Run static initializations immediately
  initFAQ();

  // Load header and footer in parallel
  try {
    await Promise.all([
      injectComponent('[data-component="header"]', '/components/header.html'),
      injectComponent('[data-component="footer"]', '/components/footer.html')
    ]);
  } catch (err) {
    console.warn('MortgagePro: components load error —', err.message);
  }

  // Post-injection setup
  setActiveNav();
  initHamburger();
  setFooterYear();

  // Initialize GTM on idle/load for better performance (P3 optimization)
  window.addEventListener('load', () => {
    const initGTM = () => {
      const s = document.createElement('script');
      s.async = true;
      s.src = "https://www.googletagmanager.com/gtag/js?id=G-1DEVWXRXJP";
      document.head.appendChild(s);
    };
    if ('requestIdleCallback' in window) {
      requestIdleCallback(initGTM);
    } else {
      setTimeout(initGTM, 1);
    }
  });
})();
