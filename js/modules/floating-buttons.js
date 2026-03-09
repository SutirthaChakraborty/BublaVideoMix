/* ============================================================
   PHOTO SQUARE — Floating Action Buttons (Always Visible)
   ============================================================ */

export function initFloatingButtons() {
  const bottomBar = document.querySelector('.mobile-bottom-bar');

  // Mobile bottom bar visibility — show after scrolling past hero
  if (bottomBar) {
    const hero = document.querySelector('.hero');
    if (!hero) {
      bottomBar.style.display = 'flex';
      return;
    }

    const obs = new IntersectionObserver(([entry]) => {
      bottomBar.style.display = entry.isIntersecting ? 'none' : 'flex';
    }, { threshold: 0.1 });

    obs.observe(hero);
  }

  // Track CTA clicks for analytics
  document.querySelectorAll('.floating-cta__btn, .mobile-bottom-bar a').forEach(btn => {
    btn.addEventListener('click', () => {
      const label = btn.getAttribute('aria-label') || btn.textContent.trim();
      console.log(`[CTA Click] ${new Date().toISOString()} — ${label}`);
    });
  });
}
