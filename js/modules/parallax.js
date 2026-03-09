/* ============================================================
   PHOTO SQUARE — Parallax Scroll
   ============================================================ */

export function initParallax() {
  if (window.innerWidth < 768) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const elements = document.querySelectorAll('[data-parallax]');
  if (!elements.length) return;

  let ticking = false;

  function update() {
    const scrollY = window.scrollY;
    elements.forEach(el => {
      const speed = parseFloat(el.getAttribute('data-parallax')) || 0.3;
      const rect = el.getBoundingClientRect();
      const centerY = rect.top + rect.height / 2 - window.innerHeight / 2;
      el.style.transform = `translateY(${centerY * speed * -1}px)`;
    });
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });
}
