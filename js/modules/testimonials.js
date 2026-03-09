/* ============================================================
   PHOTO SQUARE — Testimonials
   ============================================================ */

export function initTestimonials() {
  const track = document.querySelector('.testimonials__track');
  if (!track) return;

  // Clone for infinite scroll
  const items = track.querySelectorAll('.testimonial-card');
  items.forEach(item => {
    const clone = item.cloneNode(true);
    track.appendChild(clone);
  });
}
