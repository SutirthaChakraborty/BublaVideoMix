/* ============================================================
   PHOTO SQUARE — Before/After Slider
   ============================================================ */

export function initBeforeAfter() {
  const sliders = document.querySelectorAll('[data-before-after]');
  if (!sliders.length) return;

  sliders.forEach(slider => {
    const handle = slider.querySelector('[data-before-after-handle]');
    const afterLayer = slider.querySelector('[data-before-after-after]');
    if (!handle || !afterLayer) return;

    let dragging = false;

    const setPosition = (clientX) => {
      const rect = slider.getBoundingClientRect();
      const pos = Math.max(0, Math.min(rect.width, clientX - rect.left));
      const percent = (pos / rect.width) * 100;
      handle.style.left = `${percent}%`;
      afterLayer.style.clipPath = `inset(0 0 0 ${percent}%)`;
    };

    slider.addEventListener('mousedown', (e) => {
      dragging = true;
      setPosition(e.clientX);
    });

    window.addEventListener('mousemove', (e) => {
      if (!dragging) return;
      setPosition(e.clientX);
    });

    window.addEventListener('mouseup', () => {
      dragging = false;
    });

    slider.addEventListener('touchstart', (e) => {
      dragging = true;
      setPosition(e.touches[0].clientX);
    }, { passive: true });

    slider.addEventListener('touchmove', (e) => {
      if (!dragging) return;
      setPosition(e.touches[0].clientX);
    }, { passive: true });

    slider.addEventListener('touchend', () => {
      dragging = false;
    });
  });
}
