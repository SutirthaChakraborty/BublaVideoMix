/* ============================================================
   PHOTO SQUARE — Main App Initialization
   ============================================================ */

import { initPreloader }      from './modules/preloader.js';
import { initAnimations }     from './modules/animations.js';
import { initParallax }       from './modules/parallax.js';
import { initGallery }        from './modules/gallery.js';
import { initBeforeAfter }    from './modules/before-after.js';
import { initVideoPlayer }    from './modules/video-player.js';
import { initTestimonials }   from './modules/testimonials.js';
import { initContactForm }    from './modules/contact-form.js';
import { initFloatingButtons} from './modules/floating-buttons.js';
import { initSmoothScroll }   from './modules/smooth-scroll.js';
import { initCursor }         from './modules/cursor.js';
import { LanguageManager }    from './modules/language.js';
import { initRouter }         from './router.js';

// Start preloader immediately
initPreloader();

// Init everything after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.langManager = new LanguageManager();

  initSmoothScroll();
  initAnimations();
  initParallax();
  initRouter();
  initGallery();
  initBeforeAfter();
  initVideoPlayer();
  initTestimonials();
  initContactForm();
  initFloatingButtons();
  initCursor();

  console.log('%c📸 Photo Square — Website loaded', 'color:#c9a84c; font-weight:bold; font-size:14px;');

  // Signal to fallback script that modules loaded successfully
  if (window.__psModuleLoaded) window.__psModuleLoaded();
});
