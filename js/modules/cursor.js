/* ============================================================
   PHOTO SQUARE — Custom Cursor (Desktop Only)
   ============================================================ */

export function initCursor() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  if (window.innerWidth < 768) return;

  const inner = document.createElement('div');
  inner.className = 'cursor-inner';
  const outer = document.createElement('div');
  outer.className = 'cursor-outer';
  document.body.appendChild(inner);
  document.body.appendChild(outer);

  // Inject styles
  const style = document.createElement('style');
  style.textContent = `
    *, *::before, *::after { cursor: none !important; }
    .cursor-inner {
      position: fixed; top: 0; left: 0;
      width: 10px; height: 10px;
      background: var(--gold);
      border-radius: 50%;
      pointer-events: none;
      z-index: var(--z-cursor);
      transform: translate(-50%, -50%);
      transition: transform 0.1s ease;
    }
    .cursor-outer {
      position: fixed; top: 0; left: 0;
      width: 36px; height: 36px;
      border: 2px solid var(--royal-blue-light);
      border-radius: 50%;
      pointer-events: none;
      z-index: var(--z-cursor);
      transform: translate(-50%, -50%);
      transition: transform 0.15s ease, width 0.2s ease, height 0.2s ease, opacity 0.2s ease;
      opacity: 0.6;
    }
    .cursor-outer.hovered {
      width: 56px; height: 56px;
      opacity: 0.3;
      border-color: var(--gold);
    }
  `;
  document.head.appendChild(style);

  let mouseX = 0, mouseY = 0;
  let outerX = 0, outerY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    inner.style.left = mouseX + 'px';
    inner.style.top  = mouseY + 'px';
  });

  function animateOuter() {
    outerX += (mouseX - outerX) * 0.15;
    outerY += (mouseY - outerY) * 0.15;
    outer.style.left = outerX + 'px';
    outer.style.top  = outerY + 'px';
    requestAnimationFrame(animateOuter);
  }
  animateOuter();

  document.querySelectorAll('a, button, [data-cursor-hover]').forEach(el => {
    el.addEventListener('mouseenter', () => outer.classList.add('hovered'));
    el.addEventListener('mouseleave', () => outer.classList.remove('hovered'));
  });
}
