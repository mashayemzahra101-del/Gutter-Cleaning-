/* ============================================
   Gutter Cleaning Cartersville GA — Script
   Mobile nav toggle, smooth scroll, active nav
   ============================================ */

(function () {
  'use strict';

  // --- Mobile Nav Toggle ---
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      const isOpen = mainNav.classList.toggle('nav--open');
      navToggle.classList.toggle('nav-toggle--active', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen);
    });
  }

  // --- Mobile Dropdown Toggle ---
  const dropdownToggle = document.querySelector('.nav__link--dropdown-toggle');
  if (dropdownToggle) {
    dropdownToggle.addEventListener('click', function (e) {
      if (window.innerWidth < 1024) {
        e.preventDefault();
        const parent = dropdownToggle.closest('.nav__item--has-dropdown');
        const menu = parent ? parent.querySelector('.dropdown-menu') : null;
        if (menu) {
          const isOpen = menu.classList.toggle('dropdown-menu--open');
          dropdownToggle.setAttribute('aria-expanded', isOpen);
        }
      }
    });
  }

  // --- Smooth Scroll & Close Mobile Nav on Link Click ---
  const navLinks = document.querySelectorAll('.nav__link');

  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          // Close mobile nav
          mainNav.classList.remove('nav--open');
          navToggle.classList.remove('nav-toggle--active');
          navToggle.setAttribute('aria-expanded', 'false');

          // Scroll to section with offset for sticky header
          const headerHeight = document.querySelector('.site-header').offsetHeight;
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // --- Active Nav Highlighting via IntersectionObserver ---
  const sections = document.querySelectorAll('section[id]');
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(function (link) {
          link.classList.remove('nav__link--active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('nav__link--active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(function (section) {
    observer.observe(section);
  });
})();
