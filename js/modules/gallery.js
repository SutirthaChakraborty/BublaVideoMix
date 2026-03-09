/* ============================================================
   PHOTO SQUARE — Portfolio Gallery Carousel + Lightbox
   ============================================================ */

export function initGallery() {
  initCarousel();
  initFilters();
  initLightbox();
}

/* ── Auto-Sliding Carousel ── */
function initCarousel() {
  const carousel = document.querySelector('.gallery__carousel');
  const track = document.querySelector('.gallery__track');
  const prevBtn = document.querySelector('.gallery__arrow--prev');
  const nextBtn = document.querySelector('.gallery__arrow--next');
  const dotsContainer = document.querySelector('.gallery__dots');
  if (!carousel || !track) return;

  let currentPage = 0;
  let autoSlideTimer = null;
  const AUTO_SLIDE_INTERVAL = 4000;

  function getVisibleSlides() {
    return Array.from(track.querySelectorAll('.gallery__slide:not(.hidden-slide)'));
  }

  function getSlidesPerView() {
    const w = window.innerWidth;
    if (w <= 480) return 1;
    if (w <= 768) return 2;
    if (w <= 1024) return 2;
    return 3;
  }

  function getTotalPages() {
    const visible = getVisibleSlides();
    const perView = getSlidesPerView();
    return Math.max(1, Math.ceil(visible.length / perView));
  }

  function buildDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    const totalPages = getTotalPages();
    for (let i = 0; i < totalPages; i++) {
      const dot = document.createElement('button');
      dot.className = `gallery__dot${i === currentPage ? ' active' : ''}`;
      dot.setAttribute('aria-label', `Go to slide group ${i + 1}`);
      dot.addEventListener('click', () => goToPage(i));
      dotsContainer.appendChild(dot);
    }
  }

  function updateDots() {
    if (!dotsContainer) return;
    dotsContainer.querySelectorAll('.gallery__dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === currentPage);
    });
  }

  function goToPage(page) {
    const totalPages = getTotalPages();
    currentPage = ((page % totalPages) + totalPages) % totalPages;

    const visible = getVisibleSlides();
    const perView = getSlidesPerView();
    if (!visible.length) return;

    // Calculate offset based on the first slide's width + gap
    const slideEl = visible[0];
    const slideStyle = getComputedStyle(track);
    const gap = parseFloat(slideStyle.gap) || 24;
    const slideWidth = slideEl.offsetWidth + gap;
    const offset = currentPage * perView * slideWidth;

    track.style.transform = `translateX(-${offset}px)`;
    updateDots();
  }

  function nextPage() {
    goToPage(currentPage + 1);
  }

  function prevPage() {
    goToPage(currentPage - 1);
  }

  function startAutoSlide() {
    stopAutoSlide();
    autoSlideTimer = setInterval(nextPage, AUTO_SLIDE_INTERVAL);
  }

  function stopAutoSlide() {
    if (autoSlideTimer) clearInterval(autoSlideTimer);
  }

  // Event listeners
  if (prevBtn) prevBtn.addEventListener('click', () => { prevPage(); startAutoSlide(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { nextPage(); startAutoSlide(); });

  carousel.addEventListener('mouseenter', stopAutoSlide);
  carousel.addEventListener('mouseleave', startAutoSlide);

  // Touch/swipe support
  let touchStartX = 0;
  let touchDiff = 0;
  carousel.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
    stopAutoSlide();
  }, { passive: true });
  carousel.addEventListener('touchend', e => {
    touchDiff = touchStartX - e.changedTouches[0].screenX;
    if (Math.abs(touchDiff) > 50) {
      if (touchDiff > 0) nextPage();
      else prevPage();
    }
    startAutoSlide();
  });

  // Resize handler
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      currentPage = 0;
      buildDots();
      goToPage(0);
    }, 200);
  });

  // Initial setup
  buildDots();
  goToPage(0);
  startAutoSlide();

  // Expose for filter integration
  window.__galleryCarousel = { buildDots, goToPage, startAutoSlide };
}

/* ── Filters ── */
function initFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const slides = document.querySelectorAll('.gallery__slide');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      slides.forEach(slide => {
        if (filter === 'all' || slide.getAttribute('data-category') === filter) {
          slide.classList.remove('hidden-slide');
          slide.style.animation = 'scaleIn 0.4s ease both';
        } else {
          slide.classList.add('hidden-slide');
        }
      });

      // Reset carousel after filter
      if (window.__galleryCarousel) {
        const track = document.querySelector('.gallery__track');
        if (track) track.style.transform = 'translateX(0)';
        window.__galleryCarousel.buildDots();
        window.__galleryCarousel.goToPage(0);
        window.__galleryCarousel.startAutoSlide();
      }
    });
  });
}

/* ── Lightbox ── */
function initLightbox() {
  const lightbox = document.querySelector('.lightbox');
  if (!lightbox) return;

  const lightboxImg = lightbox.querySelector('.lightbox__img');
  const captionEl   = lightbox.querySelector('.lightbox__caption');
  const closeBtn    = lightbox.querySelector('.lightbox__close');
  const prevBtn     = lightbox.querySelector('.lightbox__prev');
  const nextBtn     = lightbox.querySelector('.lightbox__next');

  let currentIndex = 0;
  let items = [];

  function getVisibleSlides() {
    return Array.from(document.querySelectorAll('.gallery__slide:not(.hidden-slide)'));
  }

  function openLightbox(index) {
    items = getVisibleSlides();
    currentIndex = index;
    showImage(currentIndex);
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function showImage(index) {
    const slide = items[index];
    if (!slide) return;
    const img = slide.querySelector('img');
    const cat = slide.getAttribute('data-category') || '';
    lightboxImg.src = img ? img.src : '';
    lightboxImg.alt = img ? img.alt : '';
    if (captionEl) captionEl.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
  }

  // Bind click on slides (use event delegation on carousel)
  const carousel = document.querySelector('.gallery__carousel');
  if (carousel) {
    carousel.addEventListener('click', e => {
      const slide = e.target.closest('.gallery__slide');
      if (!slide || slide.classList.contains('hidden-slide')) return;
      const visibleSlides = getVisibleSlides();
      const index = visibleSlides.indexOf(slide);
      if (index !== -1) openLightbox(index);
    });
  }

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

  if (prevBtn) prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    showImage(currentIndex);
  });

  if (nextBtn) nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % items.length;
    showImage(currentIndex);
  });

  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft' && prevBtn) prevBtn.click();
    if (e.key === 'ArrowRight' && nextBtn) nextBtn.click();
  });

  // Touch/swipe in lightbox
  let touchStartX = 0;
  lightbox.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
  lightbox.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextBtn && nextBtn.click();
      else prevBtn && prevBtn.click();
    }
  });
}
