/* ============================================================
   PHOTO SQUARE — Smooth Scroll + Nav
   ============================================================ */

export function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Close mobile menu
        const mobileMenu = document.querySelector('.mobile-menu');
        const menuToggle = document.querySelector('.nav__menu-toggle');
        if (mobileMenu) mobileMenu.classList.remove('open');
        if (menuToggle) menuToggle.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  });

  // Nav scroll behavior
  const nav = document.querySelector('.nav');
  if (!nav) return;

  let lastScrollY = 0;

  function onScroll() {
    const scrollY = window.scrollY;

    if (scrollY > 100) nav.classList.add('nav--solid');
    else nav.classList.remove('nav--solid');

    if (scrollY > lastScrollY + 10 && scrollY > 400) nav.classList.add('nav--hidden');
    else if (scrollY < lastScrollY - 5) nav.classList.remove('nav--hidden');

    lastScrollY = scrollY;

    // Active link
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const link = document.querySelector(`.nav__link[href="#${section.id}"]`);
      if (link) {
        if (rect.top <= 120 && rect.bottom > 120) link.classList.add('active');
        else link.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // Hamburger
  const menuToggle = document.querySelector('.nav__menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      const isOpen = menuToggle.classList.toggle('open');
      mobileMenu.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  }
}
