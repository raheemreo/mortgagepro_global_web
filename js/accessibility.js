// js/accessibility.js — Keyboard navigation and focus trapping utilities
// REO TECH | MortgagePro Global v2.1 | June 2026

'use strict';

(function () {
  // Focus trapping helper (useful for modals or dropdown menu overlay)
  function trapFocus(element) {
    if (!element) return;

    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusableElements.length === 0) return;

    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', function (e) {
      const isTabPressed = e.key === 'Tab' || e.keyCode === 9;

      if (!isTabPressed) {
        return;
      }

      if (e.shiftKey) {
        // Shift + Tab: Go backward
        if (document.activeElement === firstFocusable) {
          lastFocusable.focus();
          e.preventDefault();
        }
      } else {
        // Tab: Go forward
        if (document.activeElement === lastFocusable) {
          firstFocusable.focus();
          e.preventDefault();
        }
      }
    });
  }

  // Keyboard accessibility helpers
  document.addEventListener('DOMContentLoaded', () => {
    // Skip-link focus correction for screen readers
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
      skipLink.addEventListener('click', (e) => {
        const targetId = skipLink.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
          target.setAttribute('tabindex', '-1');
          target.focus();
        }
      });
    }

    // Toggle aria-expanded for FAQ items with Space/Enter
    document.querySelectorAll('.faq-question').forEach(btn => {
      btn.addEventListener('keydown', (e) => {
        if (e.key === ' ' || e.key === 'Spacebar') {
          e.preventDefault();
          btn.click();
        }
      });
    });
  });

  // Expose trapFocus globally
  window.AccessibilityUtils = { trapFocus };
})();
