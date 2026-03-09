/* ============================================================
   PHOTO SQUARE — Preloader
   ============================================================ */

export function initPreloader() {
  const loader = document.querySelector('.preloader');
  if (!loader) return;

  const minTime = 1800;
  const start = Date.now();

  function hide() {
    const elapsed = Date.now() - start;
    const wait = Math.max(0, minTime - elapsed);
    setTimeout(() => loader.classList.add('hidden'), wait);
  }

  if (document.readyState === 'complete') {
    hide();
  } else {
    window.addEventListener('load', hide);
    // Failsafe
    setTimeout(hide, 5000);
  }
}
