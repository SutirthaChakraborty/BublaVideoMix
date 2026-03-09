/* ============================================================
   PHOTO SQUARE — Video Player Modal
   ============================================================ */

export function initVideoPlayer() {
  const modal    = document.querySelector('.video-modal');
  const player   = document.querySelector('.video-modal__player');
  const videoEl  = document.querySelector('.video-modal__video');
  const closeBtn = document.querySelector('.video-modal__close');
  if (!modal || !videoEl) return;

  document.querySelectorAll('.video-card').forEach(card => {
    // Auto-play thumbnail video on hover
    const thumbVideo = card.querySelector('.video-card__thumbnail video');

    if (thumbVideo) {
      card.addEventListener('mouseenter', () => {
        thumbVideo.play().catch(() => {});
      });
      card.addEventListener('mouseleave', () => {
        thumbVideo.pause();
        thumbVideo.currentTime = 0;
      });
    }

    card.addEventListener('click', () => {
      const src = card.getAttribute('data-video-src');
      if (!src) return;

      // Detect portrait vs landscape
      const isPortrait = card.classList.contains('video-card--portrait');
      if (player) {
        player.classList.toggle('portrait', isPortrait);
      }

      openVideoModal(src);
    });
  });

  function openVideoModal(src) {
    videoEl.src = src;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    videoEl.play().catch(() => {});
  }

  function closeVideoModal() {
    modal.classList.remove('active');
    videoEl.pause();
    videoEl.src = '';
    document.body.style.overflow = '';
    if (player) player.classList.remove('portrait');
  }

  if (closeBtn) closeBtn.addEventListener('click', closeVideoModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeVideoModal(); });

  document.addEventListener('keydown', e => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeVideoModal();
    if (e.key === ' ') { e.preventDefault(); videoEl.paused ? videoEl.play() : videoEl.pause(); }
  });
}
