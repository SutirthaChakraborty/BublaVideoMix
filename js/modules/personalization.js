/* ============================================================
   PHOTO SQUARE — Smart Personalization Engine
   Occasion-aware UI, gift prompts, time-greetings, festival banners
   ============================================================ */

export function initPersonalization() {

  /* ── 1. Occasion / Festival Engine ─────────────────────── */
  const OCCASIONS = [
    // format: { month (1-12), dayStart, dayEnd, label, emoji, cta, service, color }
    // Fixed-date Indian & local occasions
    { month: 1,  dayStart: 1,  dayEnd: 5,  label: "New Year",         emoji: "🎆", cta: "Print your New Year family photo!",           service: "Photo Printing",   color: "#c9a96e" },
    { month: 1,  dayStart: 12, dayEnd: 16, label: "Makar Sankranti",  emoji: "🪁", cta: "Gift a personalised photo mug this Sankranti!",service: "Custom Printing",  color: "#e8a020" },
    { month: 2,  dayStart: 12, dayEnd: 16, label: "Valentine's Day",  emoji: "❤️", cta: "Surprise your love with a custom photo gift!", service: "Custom Printing",  color: "#e85c7e" },
    { month: 3,  dayStart: 24, dayEnd: 30, label: "Holi",             emoji: "🎨", cta: "Capture the colours! Print your Holi photos.",  service: "Photo Printing",   color: "#e040fb" },
    { month: 4,  dayStart: 13, dayEnd: 17, label: "Bengali New Year", emoji: "🌸", cta: "শুভ নববর্ষ! Frame your Poila Boishakh memories.", service: "Custom Printing", color: "#4db6ac" },
    { month: 4,  dayStart: 13, dayEnd: 17, label: "Poila Boishakh",   emoji: "🌸", cta: "শুভ নববর্ষ! Print your Boishakh family photos.",  service: "Photo Printing",  color: "#4db6ac" },
    { month: 5,  dayStart: 10, dayEnd: 14, label: "Mother's Day",     emoji: "🌷", cta: "Gift Maa a beautiful framed photo this Mother's Day!", service: "Custom Printing", color: "#f06292" },
    { month: 6,  dayStart: 14, dayEnd: 18, label: "Father's Day",     emoji: "👔", cta: "A personalised photo mug is the perfect gift for Dad!", service: "Custom Printing", color: "#5c85d6" },
    { month: 8,  dayStart: 13, dayEnd: 17, label: "Independence Day", emoji: "🇮🇳", cta: "Celebrate freedom — frame your family portrait!", service: "Custom Printing",  color: "#ff9800" },
    { month: 8,  dayStart: 18, dayEnd: 22, label: "Raksha Bandhan",   emoji: "🪡", cta: "A photo gift is the most personal Rakhi present!", service: "Custom Printing",  color: "#ab47bc" },
    { month: 8,  dayStart: 22, dayEnd: 28, label: "Janmashtami",      emoji: "🦚", cta: "Preserve your Janmashtami memories with a beautiful print!", service: "Photo Printing", color: "#26a69a" },
    { month: 9,  dayStart: 1,  dayEnd: 10, label: "Ganesh Chaturthi", emoji: "🐘", cta: "Print your Ganesh Puja photos same day!", service: "Photo Printing", color: "#ff7043" },
    { month: 10, dayStart: 1,  dayEnd: 20, label: "Durga Puja",       emoji: "🪔", cta: "দুর্গাপূজার ছবি প্রিন্ট করুন! Same-day Puja photo printing.", service: "Photo Printing", color: "#c9a96e" },
    { month: 10, dayStart: 20, dayEnd: 31, label: "Diwali",           emoji: "🪔", cta: "Gift a photo keepsake this Diwali — ready same day!", service: "Custom Printing", color: "#ffca28" },
    { month: 11, dayStart: 1,  dayEnd: 5,  label: "Bhai Dooj",        emoji: "🪢", cta: "Celebrate sibling love with a custom photo frame!", service: "Custom Printing", color: "#66bb6a" },
    { month: 12, dayStart: 20, dayEnd: 31, label: "Christmas & New Year", emoji: "🎄", cta: "Christmas photo gifts — mugs, frames, calendars!", service: "Custom Printing", color: "#ef5350" },
  ];

  const BIRTHDAY_PROMPTS = [
    "Someone's birthday coming up? Gift them a personalised photo mug! 🎂",
    "Perfect birthday gift idea: a custom photo frame from Photo Square 🎁",
    "Birthday season? Print a surprise photo gift — ready in hours! 🎉",
    "Make birthdays unforgettable with personalised photo gifts 📸",
  ];

  const ANNIVERSARY_PROMPTS = [
    "Anniversary coming up? Frame your favourite couple photo! 💑",
    "The best anniversary gift is a memory — restored and framed! 🖼️",
    "Celebrate love with a custom photo canvas or mug 💝",
  ];

  const TIME_GREETINGS = [
    { start: 5,  end: 12, text: "Good Morning",    bn: "শুভ সকাল",   emoji: "🌅" },
    { start: 12, end: 17, text: "Good Afternoon",  bn: "শুভ বিকাল",  emoji: "☀️" },
    { start: 17, end: 20, text: "Good Evening",    bn: "শুভ সন্ধ্যা", emoji: "🌆" },
    { start: 20, end: 24, text: "Good Evening",    bn: "শুভ সন্ধ্যা", emoji: "🌙" },
    { start: 0,  end: 5,  text: "Night Owl!",      bn: "রাতের ভিজিটর", emoji: "🦉" },
  ];

  /* ── Detect current occasion ─────────────────────────────── */
  function getCurrentOccasion() {
    const now = new Date();
    const m   = now.getMonth() + 1; // 1-based
    const d   = now.getDate();
    // check exact window, plus 7-day preview (upcoming)
    const futureDate = new Date(now.getTime() + 7 * 86400000);
    const fm = futureDate.getMonth() + 1;
    const fd = futureDate.getDate();

    for (const occ of OCCASIONS) {
      // active right now
      if (occ.month === m && d >= occ.dayStart && d <= occ.dayEnd) {
        return { ...occ, upcoming: false };
      }
      // upcoming in 7 days
      if (
        (occ.month === fm && fd >= occ.dayStart && fd <= occ.dayEnd) ||
        (occ.month === m  && d < occ.dayStart && d >= occ.dayStart - 7)
      ) {
        return { ...occ, upcoming: true };
      }
    }
    return null;
  }

  /* ── Time greeting ───────────────────────────────────────── */
  function getTimeGreeting() {
    const h = new Date().getHours();
    for (const g of TIME_GREETINGS) {
      if (h >= g.start && h < g.end) return g;
    }
    return TIME_GREETINGS[0];
  }

  /* ── Show smart occasion banner ─────────────────────────── */
  const occasion = getCurrentOccasion();
  const greeting = getTimeGreeting();

  if (occasion) {
    const banner = document.createElement('div');
    banner.id = 'occasion-banner';
    banner.setAttribute('role', 'banner');
    banner.setAttribute('aria-label', `${occasion.label} offer`);

    const upcomingText = occasion.upcoming
      ? `<span class="ob-badge">🗓️ Coming Soon</span>`
      : `<span class="ob-badge">🎉 Special Offer</span>`;

    banner.innerHTML = `
      <div class="ob-inner">
        ${upcomingText}
        <span class="ob-emoji">${occasion.emoji}</span>
        <span class="ob-text">
          <strong>${occasion.label} at Photo Square:</strong>
          ${occasion.cta}
        </span>
        <a href="#contact" class="ob-btn">
          Book Now →
        </a>
        <button class="ob-close" aria-label="Dismiss banner">✕</button>
      </div>
    `;

    banner.style.setProperty('--ob-accent', occasion.color);
    document.body.prepend(banner);

    banner.querySelector('.ob-close').addEventListener('click', () => {
      banner.style.opacity = '0';
      banner.style.transform = 'translateY(-100%)';
      setTimeout(() => banner.remove(), 350);
      try { sessionStorage.setItem('ps_banner_dismissed', occasion.label); } catch(e) {}
    });

    // Dismiss if already seen this session
    try {
      if (sessionStorage.getItem('ps_banner_dismissed') === occasion.label) {
        banner.style.display = 'none';
      }
    } catch(e) {}

    // Update JSON-LD with SpecialAnnouncement
    _injectSpecialAnnouncementSchema(occasion);
  }

  /* ── Inject dynamic SpecialAnnouncement schema ───────────── */
  function _injectSpecialAnnouncementSchema(occ) {
    const now = new Date();
    const endDate = new Date(now.getFullYear(), occ.month - 1, occ.dayEnd + 1).toISOString().slice(0, 10);
    const schema = {
      "@context": "https://schema.org",
      "@type": "SpecialAnnouncement",
      "name": `${occ.label} at Photo Square Maynaguri`,
      "text": occ.cta,
      "datePosted": now.toISOString().slice(0, 10),
      "expires": endDate,
      "category": "https://www.wikidata.org/wiki/Q11573",
      "announcementLocation": {
        "@type": "LocalBusiness",
        "name": "Photo Square",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Maynaguri",
          "addressRegion": "West Bengal",
          "postalCode": "735224",
          "addressCountry": "IN"
        }
      }
    };
    const s = document.createElement('script');
    s.type = 'application/ld+json';
    s.textContent = JSON.stringify(schema);
    document.head.appendChild(s);
  }

  /* ── Inject time-aware greeting into hero ────────────────── */
  const heroBadge = document.querySelector('.hero__badge');
  if (heroBadge) {
    const orig = heroBadge.textContent;
    heroBadge.textContent = `${greeting.emoji} ${greeting.text} — ${orig}`;
  }

  /* ── Gift Ideas strip ────────────────────────────────────── */
  _injectGiftIdeasSection(occasion);

  /* ── Occasion-aware service card highlights ──────────────── */
  if (occasion) {
    const cards = document.querySelectorAll('.service-card');
    cards.forEach(card => {
      const title = card.querySelector('.service-card__title');
      if (title && title.textContent.toLowerCase().includes(occasion.service.toLowerCase())) {
        card.classList.add('service-card--featured');
        const badge = document.createElement('span');
        badge.className = 'service-card__occasion-badge';
        badge.textContent = `${occasion.emoji} ${occasion.label} Special`;
        card.appendChild(badge);
      }
    });
  }

  /* ── Blog link injection into service cards ──────────────── */
  const BLOG_LINKS = {
    'Photo Printing':    { href: 'blog/photo-printing-maynaguri.html',                     text: 'Printing Guide →' },
    'Photo Restoration': { href: 'blog/photo-restoration-old-photo-repair.html',            text: 'Restoration Tips →' },
    'Videography':       { href: 'blog/wedding-videography-maynaguri-jalpaiguri.html',      text: 'Wedding Video Guide →' },
    'Passport Photos':   { href: 'blog/passport-photo-maynaguri.html',                      text: 'Passport Photo Guide →' },
    'Custom Printing':   { href: 'blog/photo-frame-lamination-custom-gifts-maynaguri.html', text: 'Gift Ideas →' },
    'Lamination':        { href: 'blog/photo-frame-lamination-custom-gifts-maynaguri.html', text: 'Lamination Guide →' },
    'Photo Editing':     { href: 'blog/hd-video-editing-maynaguri.html',                    text: 'Editing Services →' },
    'Video Editing':     { href: 'blog/hd-video-editing-maynaguri.html',                    text: 'Video Editing Guide →' },
  };

  document.querySelectorAll('.service-card').forEach(card => {
    const titleEl = card.querySelector('.service-card__title');
    if (!titleEl) return;
    const titleText = titleEl.textContent.trim();
    const blog = BLOG_LINKS[titleText];
    if (blog) {
      const a = document.createElement('a');
      a.href = blog.href;
      a.className = 'service-card__blog-link';
      a.textContent = blog.text;
      a.setAttribute('aria-label', `Read our ${titleText} guide`);
      card.appendChild(a);
    }
  });

  /* ── Inject "Gift Ideas" section before contact ──────────── */
  function _injectGiftIdeasSection(activeOccasion) {
    const contactSection = document.getElementById('contact');
    if (!contactSection) return;

    const gifts = [
      { emoji: '🎂', title: 'Birthday Gifts',      desc: 'Personalised photo mugs, cushions and framed prints — the perfect surprise for any birthday.',       cta: 'Birthday Gift Ideas', service: 'Custom Printing', highlight: false },
      { emoji: '💑', title: 'Anniversary Gifts',   desc: 'Frame a favourite memory, restore an old wedding photo, or create a custom anniversary canvas.',       cta: 'Anniversary Ideas',   service: 'Custom Printing', highlight: false },
      { emoji: '🎓', title: 'Graduation Gifts',    desc: 'Commemorate academic achievement with framed portraits, photo books or personalised keychains.',       cta: 'Graduation Gifts',    service: 'Photo Printing',  highlight: false },
      { emoji: '🏠', title: 'Housewarming Gifts',  desc: 'A large canvas print or framed family portrait is the most thoughtful housewarming gift.',            cta: 'Housewarming Ideas',  service: 'Custom Printing', highlight: false },
      { emoji: '👨‍👩‍👧', title: 'Family Reunion',     desc: 'Capture the whole family — professional group portraits, printed albums and custom photo gifts.',    cta: 'Family Photo Ideas',  service: 'Photo Printing',  highlight: false },
      { emoji: '💒', title: 'Wedding Gifts',       desc: 'Personalised photo albums, canvas prints or restored family portraits make unforgettable wedding gifts.', cta: 'Wedding Gift Ideas', service: 'Custom Printing', highlight: false },
    ];

    // Highlight the card matching the current occasion service
    if (activeOccasion) {
      gifts.forEach(g => {
        if (g.service === activeOccasion.service || g.title.toLowerCase().includes(activeOccasion.label.toLowerCase())) {
          g.highlight = true;
        }
      });
    }

    const section = document.createElement('section');
    section.id = 'gift-ideas';
    section.className = 'section gift-ideas';
    section.setAttribute('aria-label', 'Photo Gift Ideas');
    section.innerHTML = `
      <div class="container">
        <header class="section-header" data-animate="fade-up">
          <span class="section-header__overline label-text">🎁 Perfect For Every Occasion</span>
          <h2 class="section-header__title">Photo Gift Ideas in Maynaguri</h2>
          <p class="section-header__subtitle">Personalised photo gifts for birthdays, anniversaries, weddings &amp; more — ready same day at Photo Square</p>
        </header>
        <div class="gift-ideas__grid">
          ${gifts.map(g => `
            <div class="gift-card${g.highlight ? ' gift-card--highlight' : ''}" data-animate="fade-up">
              <div class="gift-card__emoji">${g.emoji}</div>
              <h3 class="gift-card__title">${g.title}</h3>
              <p class="gift-card__desc">${g.desc}</p>
              <a href="#contact" class="gift-card__cta">${g.cta} →</a>
            </div>
          `).join('')}
        </div>
        <div class="gift-ideas__cta-row" data-animate="fade-up">
          <p class="gift-ideas__note">📱 WhatsApp your photo and get your personalised gift ready in hours — no appointment needed.</p>
          <a href="https://wa.me/919832008268?text=Hi%20Photo%20Square!%20I%20need%20a%20custom%20photo%20gift.%20Can%20you%20help?" target="_blank" rel="noopener" class="btn btn--gold btn--lg">💬 Order on WhatsApp</a>
        </div>
      </div>
    `;

    contactSection.parentNode.insertBefore(section, contactSection);
  }

  /* ── Dynamic page title for occasion ────────────────────── */
  if (occasion && !occasion.upcoming) {
    const currentTitle = document.title;
    document.title = `${occasion.emoji} ${occasion.label} Photo Gifts | ${currentTitle}`;
  }

  /* ── UTM-aware WhatsApp message ─────────────────────────── */
  _updateWhatsAppMessages(occasion);

  function _updateWhatsAppMessages(occ) {
    const baseMsg = occ
      ? `Hi Photo Square! I'm looking for ${occ.label} photo gifts. Can you help?`
      : `Hi Photo Square! I would like to inquire about your services.`;
    const encoded = encodeURIComponent(baseMsg);

    document.querySelectorAll('a[href*="wa.me/919832008268"]').forEach(a => {
      // Only update generic inquiry links, not ones with specific text
      if (!a.href.includes('Birthday') && !a.href.includes('gift') && !a.href.toLowerCase().includes('custom')) {
        if (!a.href.includes('?text=')) {
          a.href = `https://wa.me/919832008268?text=${encoded}`;
        }
      }
    });
  }

  /* ── Speed-dial: pre-fill service dropdown based on banner ── */
  if (occasion && !occasion.upcoming) {
    const serviceSelect = document.getElementById('service');
    if (serviceSelect) {
      // Try to auto-select the matching service option
      const opts = serviceSelect.options;
      for (let i = 0; i < opts.length; i++) {
        if (opts[i].value === occasion.service) {
          serviceSelect.value = occasion.service;
          break;
        }
      }
    }
  }
}
