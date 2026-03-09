/* ============================================================
   PHOTO SQUARE — Scroll Animation Controller
   ============================================================ */

export function initAnimations() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    document.querySelectorAll('[data-animate]').forEach(el => {
      el.classList.add('animated');
      el.style.opacity = '1';
    });
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const delay = el.getAttribute('data-animate-delay') || 0;

      setTimeout(() => {
        el.classList.add('animated');
      }, parseInt(delay));

      if (!el.hasAttribute('data-animate-repeat')) {
        observer.unobserve(el);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('[data-animate]').forEach(el => {
    observer.observe(el);
  });

  // Stagger children
  document.querySelectorAll('[data-animate="stagger"]').forEach(parent => {
    const delay = parseInt(parent.getAttribute('data-stagger-delay') || 100);
    const children = parent.children;

    const childObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        Array.from(children).forEach((child, i) => {
          child.style.animationDelay = `${i * delay}ms`;
          child.classList.add('animated');
          child.setAttribute('data-animate', 'fade-up');
        });
        childObserver.unobserve(entry.target);
      });
    }, { threshold: 0.1 });

    childObserver.observe(parent);
  });
}
