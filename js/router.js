/* ============================================================
   PHOTO SQUARE — Hash Router (lightweight)
   ============================================================ */

export function initRouter() {
  const updateFromHash = () => {
    const hash = window.location.hash;
    if (!hash || hash === '#') return;
    const target = document.querySelector(hash);
    if (!target) return;
    setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0);
  };

  window.addEventListener('hashchange', updateFromHash);
  updateFromHash();
}
