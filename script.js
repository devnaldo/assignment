/* ===================================================================
   Verdant Grove — mobile navigation
   The only JavaScript on the site: a small, dependency-free controller
   for the hamburger menu. Everything else is handled by CSS.
   =================================================================== */
(function () {
  'use strict';

  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('primary-nav');

  if (!toggle || !nav) {
    return;
  }

  var mobile = window.matchMedia('(min-width: 768px)');

  function closeNav() {
    toggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
    document.body.classList.remove('is-locked');
  }

  function openNav() {
    toggle.setAttribute('aria-expanded', 'true');
    nav.classList.add('is-open');
    document.body.classList.add('is-locked');
  }

  toggle.addEventListener('click', function () {
    var isOpen = toggle.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      closeNav();
    } else {
      openNav();
    }
  });

  /* Close after choosing a destination, otherwise the drawer would
     stay open over the section that was just scrolled to. */
  nav.addEventListener('click', function (event) {
    if (event.target.closest('a')) {
      closeNav();
    }
  });

  /* Escape closes the drawer and returns focus to the button */
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && nav.classList.contains('is-open')) {
      closeNav();
      toggle.focus();
    }
  });

  /* Reset state if the drawer is open while crossing into the
     desktop layout, where the drawer no longer exists. */
  mobile.addEventListener('change', function (event) {
    if (event.matches) {
      closeNav();
    }
  });
})();


/* ===================================================================
   Scroll reveal
   Adds .is-visible to each .reveal element the first time it enters
   the viewport. The CSS does the actual fading; this only decides
   when, and staggers items that sit side by side.
   =================================================================== */
(function () {
  'use strict';

  var items = document.querySelectorAll('.reveal');

  if (!items.length) {
    return;
  }

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function showAll() {
    Array.prototype.forEach.call(items, function (el) {
      el.classList.add('is-visible');
    });
  }

  /* Older browsers and reduced-motion visitors get the content
     immediately, with no animation at all. */
  if (!('IntersectionObserver' in window) || reduceMotion.matches) {
    showAll();
    return;
  }

  /* Cards and gallery tiles that share a parent fade in one after
     another instead of all at once. Capped so nothing waits too long. */
  Array.prototype.forEach.call(items, function (el) {
    var siblings = Array.prototype.filter.call(el.parentNode.children, function (child) {
      return child.classList && child.classList.contains('reveal');
    });
    var index = siblings.indexOf(el);

    if (siblings.length > 1 && index > 0) {
      el.style.transitionDelay = Math.min(index, 5) * 80 + 'ms';
    }
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) {
        return;
      }
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -8% 0px'
  });

  Array.prototype.forEach.call(items, function (el) {
    observer.observe(el);
  });
})();
