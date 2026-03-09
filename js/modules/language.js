/* ============================================================
   PHOTO SQUARE — Language Manager (EN / BN)
   ============================================================ */

export class LanguageManager {
  constructor() {
    this.current = localStorage.getItem('ps-lang') || 'en';
    this.translations = {};
    // Build lang base URL — try multiple strategies
    try {
      // import.meta.url gives us the URL of this JS file
      const moduleUrl = import.meta.url;
      // We need to go from /js/modules/language.js to /lang/
      const base = moduleUrl.substring(0, moduleUrl.lastIndexOf('/js/'));
      this.langBaseUrl = base + '/lang/';
    } catch {
      // Fallback: use root-relative path
      this.langBaseUrl = 'lang/';
    }
    this.init();
  }

  async init() {
    try {
      await this.loadTranslations(this.current);
      this.applyTranslations();
    } catch (e) {
      console.warn('Language init failed:', e);
    }
    this.bindToggle();
    document.documentElement.setAttribute('lang', this.current);
    document.documentElement.setAttribute('dir', 'ltr');
    // Update toggle button text to match current language
    document.querySelectorAll('.nav__lang-toggle, .portal-login__lang-toggle, .lang-toggle-btn').forEach(btn => {
      btn.textContent = this.current === 'en' ? 'EN | বাং' : 'বাং | EN';
    });
  }

  async loadTranslations(lang) {
    try {
      const fileUrl = this.langBaseUrl + `${lang}.json`;
      const res = await fetch(fileUrl);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      this.translations = await res.json();
    } catch (e) {
      // Fallback: try root-relative path
      try {
        const res2 = await fetch(`lang/${lang}.json`);
        if (res2.ok) {
          this.translations = await res2.json();
          return;
        }
      } catch {}
      console.warn('Could not load translations for', lang, '— using inline defaults');
      this.translations = {};
    }
  }

  getNestedValue(obj, path) {
    return path.split('.').reduce((acc, key) => acc && acc[key], obj);
  }

  applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = this.getNestedValue(this.translations, key);
      if (val) el.textContent = val;
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const val = this.getNestedValue(this.translations, key);
      if (val) el.placeholder = val;
    });
  }

  async switchLanguage(lang) {
    if (lang === this.current) return;

    // Fade out
    document.body.style.transition = 'opacity 0.3s ease';
    document.body.style.opacity = '0.7';

    this.current = lang;
    localStorage.setItem('ps-lang', lang);

    await this.loadTranslations(lang);
    this.applyTranslations();

    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', 'ltr');

    // Update toggle buttons
    document.querySelectorAll('.nav__lang-toggle, .portal-login__lang-toggle, .lang-toggle-btn').forEach(btn => {
      btn.textContent = lang === 'en' ? 'EN | বাং' : 'বাং | EN';
    });

    // Fade in
    document.body.style.opacity = '1';

    setTimeout(() => { document.body.style.transition = ''; }, 400);
  }

  bindToggle() {
    document.querySelectorAll('.nav__lang-toggle, .lang-toggle-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.switchLanguage(this.current === 'en' ? 'bn' : 'en');
      });
    });
  }

  t(key) {
    return this.getNestedValue(this.translations, key) || key;
  }
}
