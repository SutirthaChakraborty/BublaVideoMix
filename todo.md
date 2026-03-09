# 📸 PHOTO SQUARE — Premium Website Development Roadmap

> **Project:** Photo Square — Premium Photography Studio Website
> **Location:** Old Market, Maynaguri, West Bengal 735224, India
> **Phone:** 098320 08268
> **Rating:** 5.0 ★★★★★ (17 reviews)
> **Languages:** English & Bengali (বাংলা)
> **Stack:** HTML + CSS + JavaScript (No frameworks)
> **Design Tier:** World-class, cinematic, studio-grade

Read the folders and adjust things accordingly.
---

## TABLE OF CONTENTS

1. [Project Architecture & Folder Structure](#1-project-architecture--folder-structure)
2. [Design System](#2-design-system)
3. [Typography System](#3-typography-system)
4. [Animation System](#4-animation-system)
5. [Multilingual System (English + Bengali)](#5-multilingual-system-english--bengali)
6. [Hero Section](#6-hero-section)
7. [Navigation](#7-navigation)
8. [Services Section](#8-services-section)
9. [Interactive Portfolio Gallery](#9-interactive-portfolio-gallery)
10. [Video Showcase](#10-video-showcase)
11. [Testimonials Section](#11-testimonials-section)
12. [Local Business Conversion Features](#12-local-business-conversion-features)
13. [Contact Section](#13-contact-section)
14. [Footer](#14-footer)
15. [Bubla AI Portal](#15-bubla-ai-portal)
16. [SEO & Marketing](#16-seo--marketing)
17. [Performance Optimization](#17-performance-optimization)
18. [Deployment Checklist](#18-deployment-checklist)

---

## 1. Project Architecture & Folder Structure

### 1.1 — Create the Root Directory

```
/photo-square-website/
│
├── index.html                    # Main entry — single-page website
├── portal.html                   # Bubla AI Portal (separate page)
├── manifest.json                 # PWA manifest
├── robots.txt                    # SEO crawl directives
├── sitemap.xml                   # SEO sitemap
├── favicon.ico                   # Favicon (camera icon, royal blue)
│
├── /assets/
│   ├── /videos/
│   │   ├── hero-bg.mp4           # Hero background video (compressed, looped)
│   │   ├── photo_lamination/     # Lamination service videos
│   │   ├── photo_printing/       # Printing service videos
│   │   └── wedding/              # Wedding videography videos
│   │
│   ├── /images/
│   │   ├── /portfolio/           # Portfolio gallery images
│   │   │   ├── /printing/
│   │   │   ├── /restoration/
│   │   │   ├── /videography/
│   │   │   ├── /lamination/
│   │   │   ├── /custom/
│   │   │   └── /passport/
│   │   ├── /before-after/        # Before/after restoration pairs
│   │   ├── /testimonials/        # Customer photos (optional)
│   │   ├── /icons/               # Service icons (SVG)
│   │   ├── /ui/                  # UI elements, decorative textures
│   │   ├── logo.svg              # Photo Square logo (SVG)
│   │   ├── logo-white.svg        # White version for dark backgrounds
│   │   └── og-image.jpg          # Open Graph social preview (1200×630)
│   │
│   └── /fonts/
│       ├── /english/             # Display + body fonts
│       └── /bengali/             # Bengali Unicode fonts
│
├── /css/
│   ├── variables.css             # CSS custom properties (colors, spacing, type scale)
│   ├── reset.css                 # Modern CSS reset (Andy Bell / Josh Comeau style)
│   ├── base.css                  # Global base styles, html/body, scrollbar
│   ├── typography.css            # Font-face declarations, type utilities
│   ├── animations.css            # All keyframe animations & utility classes
│   ├── components.css            # Reusable component styles (buttons, cards, badges)
│   ├── layout.css                # Grid systems, containers, spacing utilities
│   │
│   ├── /sections/
│   │   ├── hero.css
│   │   ├── nav.css
│   │   ├── services.css
│   │   ├── portfolio.css
│   │   ├── video-showcase.css
│   │   ├── testimonials.css
│   │   ├── contact.css
│   │   └── footer.css
│   │
│   ├── /portal/
│   │   ├── portal-login.css
│   │   ├── portal-dashboard.css
│   │   └── portal-components.css
│   │
│   └── responsive.css            # All media queries consolidated
│
├── /js/
│   ├── app.js                    # Main initialization, event bus
│   ├── router.js                 # Simple scroll-based "routing" for SPA feel
│   │
│   ├── /modules/
│   │   ├── language.js           # i18n language toggle system
│   │   ├── animations.js         # Scroll-triggered animation controller
│   │   ├── gallery.js            # Portfolio masonry + lightbox + filters
│   │   ├── video-player.js       # Custom video modal player
│   │   ├── before-after.js       # Before/after image slider
│   │   ├── testimonials.js       # Testimonial carousel/auto-scroll
│   │   ├── contact-form.js       # Form validation + submission
│   │   ├── floating-buttons.js   # WhatsApp/Call/Maps sticky buttons
│   │   ├── preloader.js          # Cinematic page preloader
│   │   ├── parallax.js           # Parallax scroll effects
│   │   ├── cursor.js             # Custom cursor (desktop only)
│   │   └── smooth-scroll.js      # Smooth scroll navigation
│   │
│   ├── /portal/
│   │   ├── auth.js               # Login authentication
│   │   ├── dashboard.js          # Portal main controller
│   │   ├── prompt-builder.js     # AI prompt generator from tags
│   │   ├── file-upload.js        # Image upload handler
│   │   └── api-handler.js        # API integration manager
│   │
│   └── /ai-tools/
│       ├── restore.js            # Photo restoration API module
│       ├── upscale.js            # Super resolution API module
│       ├── background-remove.js  # Background removal API module
│       ├── portrait-enhance.js   # Portrait enhancement API module
│       ├── colorize.js           # B&W colorization API module
│       ├── face-enhance.js       # Face enhancement API module
│       ├── skin-retouch.js       # Skin retouch API module
│       ├── lighting-fix.js       # Lighting correction API module
│       └── artistic-portrait.js  # Artistic style transfer API module
│
├── /lang/
│   ├── en.json                   # English translations (all UI text)
│   └── bn.json                   # Bengali translations (all UI text)
│
└── /components/
    ├── header.html               # Reusable header/nav (loaded via JS)
    ├── footer.html               # Reusable footer
    └── floating-cta.html         # Floating WhatsApp/Call buttons
```

### 1.2 — Module Loading Strategy

- [x] Use native ES modules (`type="module"`) for JavaScript
- [x] Load CSS files in correct cascade order in `<head>`
- [x] Use `defer` attribute on all script tags
- [x] Implement a cinematic preloader that shows the Photo Square logo with a shutter animation while assets load

---

## 2. Design System

### 2.1 — Color Palette

Define all colors as CSS custom properties in `variables.css`:

```css
:root {
  /* ── Primary ── */
  --royal-blue:        #1a3a6b;    /* Deep royal blue — primary brand */
  --royal-blue-light:  #2a5298;    /* Lighter variant for hover states */
  --royal-blue-dark:   #0f2649;    /* Darker variant for headers/overlays */

  /* ── Accent ── */
  --gold:              #c9a84c;    /* Gold accent — premium feel */
  --gold-light:        #e0c878;    /* Light gold for highlights */
  --gold-dark:         #a08030;    /* Dark gold for pressed states */

  /* ── Neutrals ── */
  --white:             #ffffff;
  --off-white:         #f8f7f4;    /* Warm off-white for backgrounds */
  --cream:             #f0ece3;    /* Cream for cards/surfaces */
  --gray-100:          #e8e4dc;
  --gray-200:          #d0ccc4;
  --gray-300:          #a8a49c;
  --gray-400:          #787470;
  --gray-500:          #504c48;
  --gray-600:          #383430;
  --charcoal:          #1c1a18;    /* Near-black for text */
  --black:             #0a0908;    /* True dark for overlays */

  /* ── Semantic ── */
  --success:           #2e7d32;
  --error:             #c62828;
  --warning:           #f9a825;

  /* ── Gradients ── */
  --gradient-hero:     linear-gradient(135deg, rgba(15,38,73,0.85), rgba(26,58,107,0.6));
  --gradient-gold:     linear-gradient(135deg, var(--gold-dark), var(--gold), var(--gold-light));
  --gradient-dark:     linear-gradient(180deg, var(--black), var(--royal-blue-dark));

  /* ── Shadows ── */
  --shadow-sm:         0 2px 8px rgba(10,9,8,0.08);
  --shadow-md:         0 4px 20px rgba(10,9,8,0.12);
  --shadow-lg:         0 8px 40px rgba(10,9,8,0.18);
  --shadow-gold:       0 4px 20px rgba(201,168,76,0.25);
}
```

### 2.2 — Spacing Scale

```css
:root {
  --space-2xs:  0.25rem;   /* 4px  */
  --space-xs:   0.5rem;    /* 8px  */
  --space-sm:   0.75rem;   /* 12px */
  --space-md:   1rem;       /* 16px */
  --space-lg:   1.5rem;     /* 24px */
  --space-xl:   2rem;       /* 32px */
  --space-2xl:  3rem;       /* 48px */
  --space-3xl:  4rem;       /* 64px */
  --space-4xl:  6rem;       /* 96px */
  --space-5xl:  8rem;       /* 128px */

  /* Section vertical padding */
  --section-pad:  clamp(4rem, 8vw, 8rem);
}
```

### 2.3 — Border Radius

```css
:root {
  --radius-sm:   4px;
  --radius-md:   8px;
  --radius-lg:   12px;
  --radius-xl:   20px;
  --radius-full: 9999px;
}
```

### 2.4 — Transitions

```css
:root {
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out:   cubic-bezier(0.65, 0, 0.35, 1);
  --duration-fast:   200ms;
  --duration-normal: 400ms;
  --duration-slow:   700ms;
  --duration-cinematic: 1200ms;
}
```

### 2.5 — Component Consistency Rules

- [x] All interactive cards: 8px border-radius, `--shadow-md` on hover, 400ms transition
- [x] All buttons: minimum 48px height (touch target), 12px 32px padding
- [x] Primary buttons: `--royal-blue` bg, `--white` text, gold underline on hover
- [x] Secondary buttons: transparent bg, `--royal-blue` border, fill on hover
- [x] Gold CTA buttons: `--gradient-gold` bg, `--charcoal` text, shine animation on hover
- [x] All section headings: gold decorative line (40px wide, 3px thick) above or below
- [x] Consistent content width: max-width 1200px, centered, with 5vw side padding

---

## 3. Typography System

### 3.1 — Font Selection

**English Fonts:**
- **Display / Headings:** `Playfair Display` (Google Fonts) — Elegant serif, cinematic feel
- **Body / UI:** `DM Sans` (Google Fonts) — Clean modern sans-serif
- **Accent / Mono:** `Cormorant Garamond` (Google Fonts) — For taglines, quotes, decorative text

**Bengali Fonts:**
- **Display:** `Noto Serif Bengali` (Google Fonts) — Elegant Bengali serif
- **Body:** `Noto Sans Bengali` (Google Fonts) — Clean Bengali sans-serif

### 3.2 — Type Scale

```css
:root {
  --text-xs:    clamp(0.7rem, 0.65rem + 0.25vw, 0.8rem);
  --text-sm:    clamp(0.8rem, 0.75rem + 0.25vw, 0.9rem);
  --text-base:  clamp(0.95rem, 0.9rem + 0.25vw, 1.05rem);
  --text-lg:    clamp(1.1rem, 1rem + 0.5vw, 1.3rem);
  --text-xl:    clamp(1.3rem, 1.1rem + 1vw, 1.8rem);
  --text-2xl:   clamp(1.8rem, 1.4rem + 2vw, 2.8rem);
  --text-3xl:   clamp(2.4rem, 1.8rem + 3vw, 4rem);
  --text-hero:  clamp(3rem, 2rem + 5vw, 7rem);
}
```

### 3.3 — Font Loading Strategy

- [x] Use `<link rel="preconnect" href="https://fonts.googleapis.com">`
- [x] Use `font-display: swap` to prevent FOIT (Flash of Invisible Text)
- [x] Load Bengali fonts only when language is set to Bengali (lazy load)
- [x] Define fallback system fonts for each font family

### 3.4 — Typography Classes

- [x] `.heading-hero` — Hero title: Playfair Display, `--text-hero`, weight 700, letter-spacing -0.02em
- [x] `.heading-section` — Section titles: Playfair Display, `--text-3xl`, weight 600
- [x] `.heading-card` — Card titles: DM Sans, `--text-xl`, weight 600
- [x] `.body-text` — Body copy: DM Sans, `--text-base`, weight 400, line-height 1.7
- [x] `.accent-text` — Taglines: Cormorant Garamond, `--text-lg`, italic
- [x] `.label-text` — UI labels: DM Sans, `--text-sm`, weight 500, letter-spacing 0.08em, uppercase

---

## 4. Animation System

### 4.1 — CSS Keyframe Animations

Define the following in `animations.css`:

- [x] **`@keyframes fadeInUp`** — opacity 0→1, translateY(40px→0), duration 800ms
- [x] **`@keyframes fadeInDown`** — opacity 0→1, translateY(-40px→0)
- [x] **`@keyframes fadeInLeft`** — opacity 0→1, translateX(-60px→0)
- [x] **`@keyframes fadeInRight`** — opacity 0→1, translateX(60px→0)
- [x] **`@keyframes scaleIn`** — opacity 0→1, scale(0.9→1)
- [x] **`@keyframes slideReveal`** — clip-path reveal from left to right
- [x] **`@keyframes shimmer`** — Gold shimmer/shine sweep effect for buttons
- [x] **`@keyframes floatSoft`** — Subtle floating up-down for decorative elements
- [x] **`@keyframes pulseGlow`** — Pulsing glow for CTA buttons
- [x] **`@keyframes shutterClick`** — Camera shutter animation for preloader
- [x] **`@keyframes typeWriter`** — Typing effect for tagline text
- [x] **`@keyframes rotateIn`** — Rotate from -10deg to 0deg with fade
- [x] **`@keyframes blurIn`** — blur(20px)→blur(0) with opacity

### 4.2 — Scroll-Triggered Animations (Intersection Observer)

Create `animations.js` module:

- [x] Use `IntersectionObserver` with `threshold: 0.15` and `rootMargin: "0px 0px -50px 0px"`
- [x] Add `data-animate` attribute system:
  - `data-animate="fade-up"` — fade in from below
  - `data-animate="fade-left"` / `"fade-right"` — directional fade
  - `data-animate="scale-in"` — scale up entrance
  - `data-animate="slide-reveal"` — clip-path reveal
  - `data-animate="stagger"` — staggered children animation (add `data-stagger-delay="100"` for child delay in ms)
- [x] Elements start with `.not-animated` class (opacity:0, transform set)
- [x] Observer adds `.animated` class when in view
- [x] Support `data-animate-delay="200"` for custom delays
- [x] Animate only once (unobserve after trigger) unless `data-animate-repeat` is set

### 4.3 — Parallax System

Create `parallax.js` module:

- [x] Use `data-parallax="0.3"` attribute (value = speed multiplier)
- [x] Transform elements on scroll using `requestAnimationFrame` for smooth 60fps
- [x] Apply to: hero background, decorative elements, section backgrounds
- [x] Disable on mobile (check `window.innerWidth < 768` or `prefers-reduced-motion`)

### 4.4 — Hover Micro-Interactions

- [x] **Service cards:** Scale 1.03, shadow elevation increase, icon color shift to gold
- [x] **Portfolio images:** Scale 1.05, overlay fade-in with "View" text + icon
- [x] **Buttons:** Underline slide-in from left, subtle translateY(-2px)
- [x] **Nav links:** Gold dot indicator slide in below active/hovered link
- [x] **Social icons:** Rotate 10deg + color change on hover
- [x] **Testimonial cards:** Subtle tilt using CSS perspective + transform

### 4.5 — Page Preloader

- [x] Full-screen overlay with Photo Square logo centered
- [x] Camera shutter animation (CSS-only aperture blades opening)
- [x] Logo fade-in + scale after shutter opens
- [x] Fade out overlay when `window.onload` fires
- [x] Minimum display time: 1.5 seconds (even if page loads faster)
- [x] Use `will-change: transform, opacity` for GPU-accelerated transitions

### 4.6 — Custom Cursor (Desktop Only)

Create `cursor.js` module:

- [x] Replace default cursor with a small circle (12px) + trailing larger circle (36px)
- [x] Inner circle: `--gold` color, no delay
- [x] Outer circle: `--royal-blue` with 0.15s delay (smooth follow)
- [x] On hover over interactive elements: outer circle scales to 60px + becomes semi-transparent
- [x] On hover over images: cursor becomes a "+" or eye icon
- [x] Disable entirely on touch devices

---

## 5. Multilingual System (English + Bengali)

### 5.1 — Translation Files

**`/lang/en.json`** — Structure:

```json
{
  "nav": {
    "home": "Home",
    "services": "Services",
    "portfolio": "Portfolio",
    "videos": "Videos",
    "testimonials": "Testimonials",
    "contact": "Contact"
  },
  "hero": {
    "title": "Photo Square",
    "tagline": "Where Moments Become Masterpieces",
    "cta_primary": "Explore Our Work",
    "cta_secondary": "Book a Session"
  },
  "services": {
    "section_title": "Our Services",
    "section_subtitle": "Crafting visual excellence for every occasion",
    "printing": {
      "title": "Photo Printing",
      "desc": "Premium quality prints in all sizes with vibrant colors and archival paper."
    },
    "restoration": {
      "title": "Photo Restoration",
      "desc": "Breathe new life into old, damaged, or faded photographs with expert restoration."
    },
    "videography": {
      "title": "Videography",
      "desc": "Cinematic wedding and event videography that tells your story beautifully."
    },
    "lamination": {
      "title": "Lamination",
      "desc": "Protect and preserve your prints with professional-grade lamination."
    },
    "custom_printing": {
      "title": "Custom Printing",
      "desc": "Personalized mugs, frames, gifts, and keepsakes with your photos."
    },
    "passport": {
      "title": "Passport Photos",
      "desc": "Quick, compliant passport and visa photos — ready in minutes."
    },
    "photo_editing": {
      "title": "Photo Editing",
      "desc": "Professional retouching, color correction, and creative editing."
    },
    "video_editing": {
      "title": "Video Editing",
      "desc": "Polish your videos with cuts, transitions, effects, and music."
    }
  },
  "portfolio": {
    "section_title": "Our Portfolio",
    "section_subtitle": "A glimpse into our finest work",
    "filter_all": "All",
    "filter_printing": "Printing",
    "filter_restoration": "Restoration",
    "filter_videography": "Videography",
    "filter_custom": "Custom",
    "filter_lamination": "Lamination"
  },
  "video_showcase": {
    "section_title": "Video Showcase",
    "section_subtitle": "Watch our cinematic productions"
  },
  "testimonials": {
    "section_title": "What Our Customers Say",
    "section_subtitle": "Real stories from real people"
  },
  "contact": {
    "section_title": "Get In Touch",
    "section_subtitle": "Visit us or send a message",
    "name": "Your Name",
    "phone": "Phone Number",
    "service": "Select Service",
    "message": "Your Message",
    "submit": "Send Message",
    "address": "Old Market, Maynaguri, West Bengal 735224",
    "hours": "Open · Closes 10 PM"
  },
  "footer": {
    "copyright": "© 2025 Photo Square. All Rights Reserved.",
    "tagline": "Maynaguri's Premier Photography Studio"
  },
  "portal": {
    "login_title": "Bubla AI Portal",
    "id_label": "Login ID",
    "password_label": "Password",
    "login_btn": "Enter Portal",
    "dashboard_title": "What would you like to do?",
    "upload_btn": "Upload Photo",
    "choose_step": "Choose What To Fix",
    "preview_step": "Preview AI Result",
    "download_step": "Download",
    "tools": {
      "remove_bg": "Remove Background",
      "restore": "Restore Old Photo",
      "enhance": "Enhance Quality",
      "cinematic": "Cinematic Portrait",
      "colorize": "Colorize B&W",
      "super_res": "Super Resolution",
      "face_enhance": "Face Enhancement",
      "skin_retouch": "Skin Retouch",
      "lighting": "Lighting Fix",
      "artistic": "Artistic Portrait"
    },
    "generate_prompt": "Generate AI Prompt",
    "processing": "Processing your photo...",
    "result_ready": "Your photo is ready!"
  }
}
```

**`/lang/bn.json`** — Same structure, Bengali translations:

```json
{
  "nav": {
    "home": "হোম",
    "services": "সেবা",
    "portfolio": "পোর্টফোলিও",
    "videos": "ভিডিও",
    "testimonials": "গ্রাহকের মতামত",
    "contact": "যোগাযোগ"
  },
  "hero": {
    "title": "ফটো স্কয়ার",
    "tagline": "যেখানে মুহূর্ত হয়ে ওঠে শিল্প",
    "cta_primary": "আমাদের কাজ দেখুন",
    "cta_secondary": "সেশন বুক করুন"
  },
  "services": {
    "section_title": "আমাদের সেবাসমূহ",
    "section_subtitle": "প্রতিটি অনুষ্ঠানের জন্য সেরা মানের কাজ",
    "printing": {
      "title": "ফটো প্রিন্টিং",
      "desc": "উজ্জ্বল রঙ ও আর্কাইভাল কাগজে সব মাপের প্রিমিয়াম প্রিন্ট।"
    },
    "restoration": {
      "title": "ফটো রিস্টোরেশন",
      "desc": "পুরনো, নষ্ট বা ফ্যাকাশে ছবিতে নতুন প্রাণ দিন।"
    },
    "videography": {
      "title": "ভিডিওগ্রাফি",
      "desc": "সিনেমাটিক বিবাহ ও ইভেন্ট ভিডিওগ্রাফি।"
    },
    "lamination": {
      "title": "ল্যামিনেশন",
      "desc": "পেশাদার মানের ল্যামিনেশনে আপনার প্রিন্ট সুরক্ষিত করুন।"
    },
    "custom_printing": {
      "title": "কাস্টম প্রিন্টিং",
      "desc": "আপনার ছবি দিয়ে মগ, ফ্রেম, গিফট তৈরি করুন।"
    },
    "passport": {
      "title": "পাসপোর্ট ফটো",
      "desc": "দ্রুত, নিয়ম-মাফিক পাসপোর্ট ও ভিসা ফটো — মিনিটেই তৈরি।"
    },
    "photo_editing": {
      "title": "ফটো এডিটিং",
      "desc": "প্রফেশনাল রিটাচিং, কালার কারেকশন ও ক্রিয়েটিভ এডিটিং।"
    },
    "video_editing": {
      "title": "ভিডিও এডিটিং",
      "desc": "কাট, ট্রানজিশন, ইফেক্ট ও মিউজিক দিয়ে ভিডিও পলিশ করুন।"
    }
  },
  "portfolio": {
    "section_title": "আমাদের পোর্টফোলিও",
    "section_subtitle": "আমাদের সেরা কাজের ঝলক",
    "filter_all": "সব",
    "filter_printing": "প্রিন্টিং",
    "filter_restoration": "রিস্টোরেশন",
    "filter_videography": "ভিডিওগ্রাফি",
    "filter_custom": "কাস্টম",
    "filter_lamination": "ল্যামিনেশন"
  },
  "video_showcase": {
    "section_title": "ভিডিও শোকেস",
    "section_subtitle": "আমাদের সিনেমাটিক প্রোডাকশন দেখুন"
  },
  "testimonials": {
    "section_title": "গ্রাহকেরা কী বলেন",
    "section_subtitle": "সত্যিকারের মানুষের সত্যিকারের গল্প"
  },
  "contact": {
    "section_title": "যোগাযোগ করুন",
    "section_subtitle": "আমাদের দোকানে আসুন বা মেসেজ পাঠান",
    "name": "আপনার নাম",
    "phone": "ফোন নম্বর",
    "service": "সেবা নির্বাচন করুন",
    "message": "আপনার বার্তা",
    "submit": "বার্তা পাঠান",
    "address": "ওল্ড মার্কেট, ময়নাগুড়ি, পশ্চিমবঙ্গ ৭৩৫২২৪",
    "hours": "খোলা আছে · রাত ১০টায় বন্ধ"
  },
  "footer": {
    "copyright": "© ২০২৫ ফটো স্কয়ার। সর্বস্বত্ব সংরক্ষিত।",
    "tagline": "ময়নাগুড়ির সেরা ফটোগ্রাফি স্টুডিও"
  },
  "portal": {
    "login_title": "বুবলা AI পোর্টাল",
    "id_label": "লগইন আইডি",
    "password_label": "পাসওয়ার্ড",
    "login_btn": "পোর্টালে ঢুকুন",
    "dashboard_title": "আপনি কী করতে চান?",
    "upload_btn": "ছবি আপলোড করুন",
    "choose_step": "কী ঠিক করতে হবে বাছুন",
    "preview_step": "AI ফলাফল দেখুন",
    "download_step": "ডাউনলোড করুন",
    "tools": {
      "remove_bg": "ব্যাকগ্রাউন্ড সরান",
      "restore": "পুরনো ছবি ঠিক করুন",
      "enhance": "কোয়ালিটি বাড়ান",
      "cinematic": "সিনেমাটিক পোর্ট্রেট",
      "colorize": "সাদা-কালো রঙিন করুন",
      "super_res": "সুপার রেজোলিউশন",
      "face_enhance": "মুখ সুন্দর করুন",
      "skin_retouch": "ত্বক মসৃণ করুন",
      "lighting": "আলো ঠিক করুন",
      "artistic": "আর্টিস্টিক পোর্ট্রেট"
    },
    "generate_prompt": "AI প্রম্পট তৈরি করুন",
    "processing": "আপনার ছবি প্রসেস হচ্ছে...",
    "result_ready": "আপনার ছবি তৈরি!"
  }
}
```

### 5.2 — Language Toggle Module (`language.js`)

- [x] Create a `LanguageManager` class
- [x] Store current language in `localStorage` (key: `ps-lang`, default: `"en"`)
- [x] Load JSON translation file via `fetch()` on init
- [x] All translatable elements use `data-i18n="nav.home"` attribute (dot notation keys)
- [x] `switchLanguage(lang)` method:
  1. Fetch `/lang/{lang}.json`
  2. Traverse all `[data-i18n]` elements
  3. Set `textContent` from translation object using dot-path resolution
  4. Update `<html lang="en|bn">`
  5. Update `document.documentElement.setAttribute('dir', 'ltr')` (both languages are LTR)
  6. Toggle `font-family` on `<body>` between English and Bengali font stacks
- [x] Language toggle button in navbar: flag icon or "EN | বাং" text toggle
- [x] Smooth text transition: fade out → switch → fade in (300ms)

### 5.3 — Bengali Typography Considerations

- [x] Bengali text needs slightly larger line-height (~1.8 vs 1.7 for English)
- [x] Bengali characters are wider — test all layouts in Bengali mode
- [x] Use `font-feature-settings` for proper Bengali ligatures
- [x] Add `[lang="bn"]` CSS selectors for Bengali-specific spacing/sizing overrides

---

## 6. Hero Section

### 6.1 — Structure

```html
<section id="hero" class="hero">
  <div class="hero__video-bg">
    <video autoplay muted loop playsinline preload="auto" poster="poster.jpg">
      <source src="hero-bg.mp4" type="video/mp4">
    </video>
    <div class="hero__overlay"></div> <!-- Gradient overlay -->
  </div>

  <div class="hero__content">
    <div class="hero__badge">EST. MAYNAGURI</div>
    <h1 class="hero__title" data-i18n="hero.title">Photo Square</h1>
    <p class="hero__tagline" data-i18n="hero.tagline">Where Moments Become Masterpieces</p>
    <div class="hero__cta-group">
      <a href="#portfolio" class="btn btn--gold" data-i18n="hero.cta_primary">Explore Our Work</a>
      <a href="#contact" class="btn btn--outline" data-i18n="hero.cta_secondary">Book a Session</a>
    </div>
    <div class="hero__scroll-indicator">
      <!-- Animated scroll-down chevron -->
    </div>
  </div>

  <!-- Decorative elements -->
  <div class="hero__frame-corner hero__frame-corner--tl"></div>
  <div class="hero__frame-corner hero__frame-corner--br"></div>
</section>
```

### 6.2 — Styling

- [x] Full viewport height (`100vh`, use `100dvh` for mobile)
- [x] Video covers entire section (`object-fit: cover`)
- [x] Gradient overlay: `--gradient-hero` on top of video (dark enough for text readability)
- [x] Content vertically and horizontally centered with flexbox
- [x] Decorative frame corners: thin gold lines (2px) in top-left and bottom-right, ~80px from edges
- [x] Badge above title: letter-spaced uppercase, gold color, small text
- [x] Title: `--text-hero` size, white color, `text-shadow` for depth
- [x] Tagline: `Cormorant Garamond` italic, `--text-xl`, `--gold-light` color
- [x] CTA buttons side-by-side, gold button + outline button

### 6.3 — Animations

- [x] Video background: Ken Burns effect (slow zoom 1.0 → 1.1 over 30s, alternate)
- [x] Title: `fadeInUp` with 0.3s delay after preloader
- [x] Tagline: `fadeInUp` with 0.6s delay
- [x] CTA buttons: `fadeInUp` with 0.9s delay, staggered 0.15s between buttons
- [x] Frame corners: `slideReveal` from their respective corners
- [x] Scroll indicator: `floatSoft` infinite loop (bouncing arrow)
- [x] On scroll down: hero content parallax (moves up slower than scroll)

### 6.4 — Mobile Adaptations

- [x] Reduce title to `--text-3xl`
- [x] Stack CTA buttons vertically
- [x] Use a compressed/shorter video or static image poster on mobile (save bandwidth)
- [x] Check `<video>` autoplay on iOS (must be `muted` and `playsinline`)

---

## 7. Navigation

### 7.1 — Structure

```html
<nav class="nav" id="mainNav">
  <div class="nav__container">
    <a href="#hero" class="nav__logo">
      <img src="logo.svg" alt="Photo Square" class="nav__logo-img">
      <span class="nav__logo-text">Photo Square</span>
    </a>

    <ul class="nav__links">
      <li><a href="#hero" class="nav__link active" data-i18n="nav.home">Home</a></li>
      <li><a href="#services" class="nav__link" data-i18n="nav.services">Services</a></li>
      <li><a href="#portfolio" class="nav__link" data-i18n="nav.portfolio">Portfolio</a></li>
      <li><a href="#videos" class="nav__link" data-i18n="nav.videos">Videos</a></li>
      <li><a href="#testimonials" class="nav__link" data-i18n="nav.testimonials">Testimonials</a></li>
      <li><a href="#contact" class="nav__link" data-i18n="nav.contact">Contact</a></li>
    </ul>

    <div class="nav__actions">
      <button class="nav__lang-toggle" aria-label="Switch language">
        EN | বাং
      </button>
      <button class="nav__menu-toggle" aria-label="Toggle menu">
        <span class="hamburger"></span>
      </button>
    </div>
  </div>
</nav>
```

### 7.2 — Behavior

- [x] **Transparent on hero:** Nav starts transparent, overlaying the hero video
- [x] **Solid on scroll:** After scrolling 100px, add `.nav--solid` class (white/cream bg, shadow)
- [x] **Active link tracking:** Use Intersection Observer on sections to highlight current nav link
- [x] **Smooth scroll:** Clicking nav links smoothly scrolls to the section
- [x] **Hide on scroll down / Show on scroll up:** Toggle `.nav--hidden` on scroll direction change
- [x] **Mobile hamburger:** 3-line → X morphing animation, opens full-screen overlay menu
- [x] **Mobile menu:** Full-screen overlay with `--royal-blue-dark` bg, large centered links, staggered fade-in
- [x] **Language toggle:** Compact button, shows current language, click switches

### 7.3 — Animations

- [x] Nav entrance: `fadeInDown` on page load (after preloader)
- [x] Solid ↔ transparent transition: 400ms background-color + box-shadow transition
- [x] Link hover: gold dot slides in under text, 300ms
- [x] Mobile menu open: curtain wipe from right, links stagger in 100ms apart
- [x] Hamburger morph: CSS transition rotate + translate on the 3 spans

---

## 8. Services Section

### 8.1 — Layout

- [x] Section heading with gold decorative line
- [x] Grid of service cards: 3 columns on desktop, 2 on tablet, 1 on mobile
- [x] Each card has: icon area, title, description, subtle preview image in background
- [x] Optional: One featured/larger card for the most popular service

### 8.2 — Service Cards

For each of the 8 services, create a card:

**Services List:**
1. Photo Printing — Icon: 🖨️ (use SVG printer icon)
2. Photo Restoration — Icon: ✨ (sparkle/wand)
3. Videography — Icon: 🎥 (video camera)
4. Lamination — Icon: 🛡️ (shield/protect)
5. Custom Printing — Icon: 🎁 (gift/mug)
6. Passport Photos — Icon: 🪪 (ID card)
7. Photo Editing — Icon: 🖌️ (paintbrush)
8. Video Editing — Icon: 🎬 (clapperboard)

### 8.3 — Card Structure

```html
<div class="service-card" data-animate="fade-up" data-animate-delay="0">
  <div class="service-card__icon-wrap">
    <img src="icons/printing.svg" alt="" class="service-card__icon">
  </div>
  <div class="service-card__bg-image" style="background-image: url('...')"></div>
  <h3 class="service-card__title" data-i18n="services.printing.title">Photo Printing</h3>
  <p class="service-card__desc" data-i18n="services.printing.desc">Premium quality prints...</p>
  <a href="#contact" class="service-card__link">
    <span data-i18n="services.learn_more">Learn More</span>
    <svg><!-- arrow icon --></svg>
  </a>
</div>
```

### 8.4 — Card Styling

- [x] Card: White/cream bg, `--radius-lg`, `--shadow-sm`
- [x] Icon area: 64px circle, `--off-white` bg with gold border, centered icon
- [x] Background image: hidden by default, 10% opacity, covers card, `object-fit: cover`
- [x] Title: `--text-lg`, `--charcoal`
- [x] Description: `--text-sm`, `--gray-400`
- [x] Link: Gold text, arrow icon, displayed at bottom of card
- [x] Card minimum height: 280px

### 8.5 — Card Animations & Interactions

- [x] **Scroll entrance:** Staggered `fade-up`, each card delayed by 100ms × index
- [x] **Hover — desktop:**
  - Card elevates: `translateY(-8px)`, shadow → `--shadow-lg`
  - Background image fades to 15% opacity
  - Icon: scale(1.1), border color → gold
  - Link arrow slides right 8px
  - Gold accent line appears at top of card (4px height, width animates 0→100%)
- [x] **Hover transition:** 400ms `--ease-out-expo`
- [x] **Mobile touch:** Apply hover state on touch start, remove on touch end

---

## 9. Interactive Portfolio Gallery

### 9.1 — Gallery Layout

- [x] Masonry grid layout using CSS `columns` or CSS Grid with `grid-auto-rows: 10px` + JavaScript `span` calculation
- [x] 3 columns desktop, 2 columns tablet, 1 column mobile
- [x] Gap: 16px
- [x] Rounded corners on images: `--radius-md`

### 9.2 — Category Filters

```html
<div class="portfolio__filters">
  <button class="filter-btn active" data-filter="all" data-i18n="portfolio.filter_all">All</button>
  <button class="filter-btn" data-filter="printing" data-i18n="portfolio.filter_printing">Printing</button>
  <button class="filter-btn" data-filter="restoration" data-i18n="portfolio.filter_restoration">Restoration</button>
  <button class="filter-btn" data-filter="videography" data-i18n="portfolio.filter_videography">Videography</button>
  <button class="filter-btn" data-filter="custom" data-i18n="portfolio.filter_custom">Custom</button>
  <button class="filter-btn" data-filter="lamination" data-i18n="portfolio.filter_lamination">Lamination</button>
</div>
```

- [x] Filter buttons: pill-shaped, horizontal scroll on mobile
- [x] Active filter: `--royal-blue` bg, white text
- [x] Inactive: transparent bg, gray text, hover → light bg
- [x] Clicking a filter: animate out non-matching items (scale down + fade), animate in matching items

### 9.3 — Gallery Items

Each gallery item:

```html
<div class="gallery__item" data-category="restoration">
  <img src="thumbnail.jpg" alt="..." loading="lazy">
  <div class="gallery__item-overlay">
    <span class="gallery__item-category">Restoration</span>
    <button class="gallery__item-expand" aria-label="View full size">
      <svg><!-- expand icon --></svg>
    </button>
  </div>
</div>
```

### 9.4 — Before/After Slider (For Restoration Category)

Create `before-after.js` module:

- [x] Special gallery items for restoration work show a before/after comparison
- [x] Horizontal slider with draggable divider
- [x] Left side: "Before" label + damaged photo
- [x] Right side: "After" label + restored photo
- [x] Divider: vertical line with circular handle (gold, 40px diameter)
- [x] Drag handle or hover to reveal before/after
- [x] Touch-compatible drag on mobile
- [x] CSS `clip-path` or `overflow: hidden` with variable width

### 9.5 — Lightbox Viewer

Create within `gallery.js`:

- [x] Click on any gallery image opens full-screen lightbox
- [x] Dark semi-transparent overlay (95% opacity black)
- [x] Image centered, max 90vw / 90vh, with `object-fit: contain`
- [x] Close button: top-right, "X" icon, white
- [x] Navigation arrows: left/right to browse gallery
- [x] Keyboard support: Escape to close, Arrow keys to navigate
- [x] Swipe support on mobile (touch events)
- [x] Opening animation: image scales from thumbnail position to full size (FLIP animation)
- [x] Image caption/category shown below image in lightbox
- [x] Prevent body scroll when lightbox is open (`overflow: hidden` on body)

### 9.6 — Gallery Animations

- [x] **Loading:** Images appear with staggered `scaleIn` + `blurIn` as they enter viewport
- [x] **Filter transition:** FLIP animation — record positions, change filter, animate to new positions
- [x] **Hover on items:** Scale 1.03, overlay slides up from bottom with category label
- [x] **Lazy loading:** Use `loading="lazy"` on `<img>` + Intersection Observer for custom fade-in

---

## 10. Video Showcase

### 10.1 — Layout

- [x] Section with dark background (`--royal-blue-dark` or `--black` with gradient)
- [x] Grid of video cards: 2 large + 2 small, or 3 columns
- [x] Each card shows a cinematic video thumbnail

### 10.2 — Video Card Structure

```html
<div class="video-card" data-video-src="wedding/highlight.mp4">
  <div class="video-card__thumbnail">
    <img src="thumbnail.jpg" alt="Wedding Highlight" loading="lazy">
    <div class="video-card__play-btn">
      <svg><!-- Play triangle icon --></svg>
    </div>
    <div class="video-card__duration">2:45</div>
  </div>
  <h3 class="video-card__title">Wedding Highlight Reel</h3>
  <p class="video-card__category">Videography</p>
</div>
```

### 10.3 — Hover Preview Playback

- [x] On desktop hover (after 500ms delay): replace thumbnail with `<video>` element that auto-plays a 5-second preview clip (muted)
- [x] On hover exit: pause video, show thumbnail again
- [x] Use `video.play()` with promise catch (some browsers block autoplay)
- [x] Mobile: no hover preview — directly open modal on tap

### 10.4 — Modal Video Player

Create `video-player.js`:

- [x] Click on video card opens a full-screen modal
- [x] Custom video player UI (not default browser controls):
  - Play/pause button
  - Progress bar (gold accent)
  - Volume control
  - Fullscreen toggle
  - Close button
- [x] Video modal: dark background, video centered
- [x] Opening animation: card thumbnail expands to modal (similar to lightbox FLIP)
- [x] Keyboard: Space = play/pause, Escape = close, F = fullscreen

### 10.5 — Source Videos

Use the repository videos from:
- `/assets/videos/photo_lamination/`
- `/assets/videos/photo_printing/`
- `/assets/videos/wedding/`

- [x] Create preview thumbnails from video keyframes
- [x] Compress videos for web (720p, H.264, ~2-4 Mbps)
- [x] Create 5-second preview clips for hover effect

---

## 11. Testimonials Section

### 11.1 — Layout

- [x] Horizontal scrolling carousel of testimonial cards
- [x] Auto-scroll with pause on hover
- [x] Navigation dots or small arrows
- [x] Background: subtle pattern or texture

### 11.2 — Testimonial Card

```html
<div class="testimonial-card">
  <div class="testimonial-card__stars">★★★★★</div>
  <blockquote class="testimonial-card__text">
    "Amazing quality prints and wonderful service. Best photo studio in Maynaguri!"
  </blockquote>
  <div class="testimonial-card__author">
    <div class="testimonial-card__avatar">R</div>
    <div>
      <p class="testimonial-card__name">Rahul M.</p>
      <p class="testimonial-card__service">Photo Printing</p>
    </div>
  </div>
</div>
```

### 11.3 — Card Styling

- [x] White card, `--radius-lg`, `--shadow-md`
- [x] Large decorative quote mark (") in gold, positioned top-left (absolute, semi-transparent)
- [x] Stars: gold color, `--text-lg`
- [x] Quote text: `Cormorant Garamond` italic, `--text-lg`
- [x] Avatar: 48px circle with initial letter, `--royal-blue` bg, white text
- [x] Card width: 380px on desktop, full-width on mobile

### 11.4 — Carousel Behavior

- [x] Infinite scroll effect (clone items for seamless loop)
- [x] Auto-advance every 5 seconds
- [x] Pause auto-advance on hover
- [x] Smooth CSS `transform: translateX()` animation
- [x] Touch/swipe support on mobile
- [x] Optional: Use `scroll-snap-type` for native snap scrolling

### 11.5 — Sample Testimonials (Populate with real Google reviews if available)

Prepare 6-8 testimonials covering different services. Mix English and Bengali reviews based on the Google listing.

---

## 12. Local Business Conversion Features

### 12.1 — Floating Action Buttons

Create `floating-buttons.js`:

Position: Fixed, bottom-right corner (20px from edges), above any cookie banners.

```html
<div class="floating-cta" id="floatingCta">
  <button class="floating-cta__toggle" aria-label="Contact options">
    <svg><!-- Chat/contact icon --></svg>
  </button>

  <div class="floating-cta__menu">
    <a href="tel:+919832008268" class="floating-cta__btn floating-cta__btn--call">
      <svg><!-- Phone icon --></svg>
      <span>Call Now</span>
    </a>
    <a href="https://wa.me/919832008268?text=Hi%20Photo%20Square!" class="floating-cta__btn floating-cta__btn--whatsapp" target="_blank">
      <svg><!-- WhatsApp icon --></svg>
      <span>WhatsApp</span>
    </a>
    <a href="https://maps.google.com/?q=Photo+Square+Maynaguri" class="floating-cta__btn floating-cta__btn--maps" target="_blank">
      <svg><!-- Map pin icon --></svg>
      <span>Directions</span>
    </a>
  </div>
</div>
```

### 12.2 — Floating Button Behavior

- [x] Toggle button: 56px circle, `--royal-blue` bg, white icon
- [x] Click toggle: rotate 45deg (+ to ×), reveal menu with staggered `scaleIn`
- [x] Menu items: circular buttons stacked vertically above toggle
  - Call: Green (`#25D366`)
  - WhatsApp: WhatsApp green (`#25D366`)
  - Maps: Google Maps blue (`#4285F4`)
- [x] Each menu button: 48px circle with icon + tooltip label on hover
- [x] Auto-show WhatsApp button after 10 seconds on page (with attention-grabbing pulse)
- [x] Close menu when clicking outside
- [x] Z-index: 9999 (above everything)

### 12.3 — Mobile-Specific

- [x] On mobile, keep the floating button but make it 64px (larger touch target)
- [x] Also add a **sticky bottom bar** on mobile with Call | WhatsApp | Directions (3 equal buttons)
- [x] Bottom bar: only visible when scrolled past hero section

### 12.4 — Conversion Tracking

- [x] Add `onclick` event tracking for each button (for future Google Analytics integration)
- [x] Log button clicks to console with timestamp and type

---

## 13. Contact Section

### 13.1 — Layout

- [x] Two-column layout: left = contact form, right = map + info
- [x] Single column on mobile (form first, then map)
- [x] Section background: `--off-white` or subtle texture

### 13.2 — Contact Form

```html
<form class="contact-form" id="contactForm" novalidate>
  <div class="form-group">
    <label for="name" data-i18n="contact.name">Your Name</label>
    <input type="text" id="name" name="name" required>
  </div>
  <div class="form-group">
    <label for="phone" data-i18n="contact.phone">Phone Number</label>
    <input type="tel" id="phone" name="phone" required pattern="[0-9]{10}">
  </div>
  <div class="form-group">
    <label for="service" data-i18n="contact.service">Select Service</label>
    <select id="service" name="service">
      <option value="">-- Select --</option>
      <option value="printing">Photo Printing</option>
      <option value="restoration">Photo Restoration</option>
      <option value="videography">Videography</option>
      <option value="lamination">Lamination</option>
      <option value="custom">Custom Printing</option>
      <option value="passport">Passport Photos</option>
      <option value="editing">Photo Editing</option>
      <option value="video-editing">Video Editing</option>
    </select>
  </div>
  <div class="form-group">
    <label for="message" data-i18n="contact.message">Your Message</label>
    <textarea id="message" name="message" rows="4"></textarea>
  </div>
  <button type="submit" class="btn btn--gold btn--full" data-i18n="contact.submit">
    Send Message
  </button>
</form>
```

### 13.3 — Form Styling

- [x] Inputs: Full width, 48px height, `--radius-md` border, 1px `--gray-200` border
- [x] Focus state: border → `--royal-blue`, subtle blue glow shadow
- [x] Labels: `--text-sm`, `--gray-500`, positioned above input
- [x] Floating label animation (optional): label starts inside input, floats above on focus
- [x] Submit button: Full-width gold gradient, `shimmer` animation on hover
- [x] Error states: Red border, error message below input in `--error` color

### 13.4 — Form Validation (`contact-form.js`)

- [x] Real-time validation on blur
- [x] Name: required, min 2 characters
- [x] Phone: required, 10-digit Indian mobile number pattern
- [x] Service: required
- [x] Message: optional
- [x] On valid submit:
  - Show success animation (checkmark)
  - Option 1: Submit via mailto: link
  - Option 2: Submit via WhatsApp API (`https://wa.me/919832008268?text=...`)
  - Option 3: Submit via a simple backend (future)
- [x] For now, default to WhatsApp submission with pre-filled message

### 13.5 — Google Maps Embed

```html
<div class="contact__map">
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!...Photo+Square+Maynaguri"
    width="100%"
    height="400"
    style="border:0; border-radius: 12px;"
    allowfullscreen=""
    loading="lazy"
    referrerpolicy="no-referrer-when-downgrade">
  </iframe>
</div>
```

- [x] Map takes full width of right column
- [x] Rounded corners matching card radius
- [x] Below map: address, phone, hours displayed with icons

### 13.6 — Business Info Card

- [x] Address: Old Market, Maynaguri, West Bengal 735224
- [x] Phone: 098320 08268 (clickable `tel:` link)
- [x] Hours: Open · Closes 10 PM
- [x] Rating: 5.0 ★★★★★ (17 reviews) with Google link
- [x] Plus Code: HR7C+XV Maynaguri

---

## 14. Footer

### 14.1 — Structure

```html
<footer class="footer">
  <div class="footer__top">
    <div class="footer__brand">
      <img src="logo-white.svg" alt="Photo Square" class="footer__logo">
      <p class="footer__tagline" data-i18n="footer.tagline">Maynaguri's Premier Photography Studio</p>
    </div>
    <div class="footer__links">
      <h4>Quick Links</h4>
      <!-- Nav links repeated -->
    </div>
    <div class="footer__services">
      <h4>Services</h4>
      <!-- Service links -->
    </div>
    <div class="footer__contact">
      <h4>Contact</h4>
      <!-- Address, phone, hours -->
    </div>
  </div>
  <div class="footer__divider"></div> <!-- Gold thin line -->
  <div class="footer__bottom">
    <p data-i18n="footer.copyright">© 2025 Photo Square. All Rights Reserved.</p>
    <p class="footer__credit">Crafted with ❤️ in Maynaguri</p>
  </div>
</footer>
```

### 14.2 — Styling

- [x] Background: `--royal-blue-dark` or `--charcoal`
- [x] Text: `--gray-200`
- [x] Links: `--gray-300`, hover → `--gold`
- [x] 4-column grid on desktop, 2 on tablet, stacked on mobile
- [x] Footer divider: 1px `--gold` line, 40% opacity
- [x] Bottom bar: smaller text, centered

---

## 15. Bubla AI Portal

### 15.1 — Overview

The Bubla AI Portal is a **separate page** (`portal.html`) with its own login system. It is a private tool for the shop owner (Bubla) to access AI-powered photo editing workflows. The UI must be extremely simple, visual, and available in English and Bengali.

### 15.2 — Login Page

**File:** `portal.html` (initial view)

```html
<div class="portal-login" id="portalLogin">
  <div class="portal-login__card">
    <div class="portal-login__logo">
      <img src="logo.svg" alt="Photo Square">
      <h1 data-i18n="portal.login_title">Bubla AI Portal</h1>
    </div>
    <div class="portal-login__form">
      <div class="form-group">
        <label data-i18n="portal.id_label">Login ID</label>
        <input type="text" id="portalId" autocomplete="off">
      </div>
      <div class="form-group">
        <label data-i18n="portal.password_label">Password</label>
        <input type="password" id="portalPassword">
      </div>
      <button class="btn btn--gold btn--full" id="portalLoginBtn" data-i18n="portal.login_btn">
        Enter Portal
      </button>
      <p class="portal-login__error" id="loginError" hidden>Invalid credentials</p>
    </div>
    <!-- Language toggle -->
    <button class="portal-login__lang-toggle">EN | বাং</button>
  </div>
</div>
```

### 15.3 — Authentication (`auth.js`)

**Credentials (hardcoded for simplicity):**
```javascript
const VALID_CREDENTIALS = {
  id: 'bubla',
  password: 'bublabubla'
};
```

- [x] On login button click:
  1. Get ID and password values
  2. Compare with `VALID_CREDENTIALS`
  3. If match: set `sessionStorage.setItem('ps-portal-auth', 'true')`, show dashboard
  4. If no match: show error message with shake animation
- [x] On page load: check `sessionStorage` for existing auth
- [x] Logout button in dashboard clears session and returns to login

### 15.4 — Portal Dashboard

After login, show the main dashboard interface:

```
┌─────────────────────────────────────────────┐
│  [Logo]   Bubla AI Portal     [Lang] [Logout]│
├─────────────────────────────────────────────┤
│                                               │
│        ┌────────────────────────┐            │
│        │                        │            │
│        │    📤 UPLOAD PHOTO     │            │
│        │    (big drop zone)     │            │
│        │                        │            │
│        └────────────────────────┘            │
│                                               │
│  ── Choose What To Fix ──────────────────    │
│                                               │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐       │
│  │ 🖼️  │ │ ✨  │ │ 📸  │ │ 🎨  │       │
│  │Remove│ │Restor│ │Enhanc│ │Cinema│       │
│  │  BG  │ │  e   │ │  e   │ │ tic  │       │
│  └──────┘ └──────┘ └──────┘ └──────┘       │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐       │
│  │ 🌈  │ │ 🔍  │ │ 👤  │ │ 💆  │       │
│  │Color │ │Super │ │ Face │ │ Skin │       │
│  │ize   │ │ Res  │ │Enhanc│ │Retouc│       │
│  └──────┘ └──────┘ └──────┘ └──────┘       │
│  ┌──────┐ ┌──────┐                           │
│  │ 💡  │ │ 🎭  │                           │
│  │Light │ │Artis │                           │
│  │ Fix  │ │ tic  │                           │
│  └──────┘ └──────┘                           │
│                                               │
│  Selected: [Restore] [Face Enhance] [Colorize]│
│                                               │
│  ┌─────────────────────────────────────────┐ │
│  │  🚀  GENERATE AI PROMPT & PROCESS      │ │
│  └─────────────────────────────────────────┘ │
│                                               │
│  Generated Prompt:                            │
│  "restore old damaged photo, enhance face,    │
│   colorize black and white image"             │
│                                               │
│  [Processing spinner...]                      │
│  [Preview result]                             │
│  [⬇️ Download]                               │
│                                               │
└─────────────────────────────────────────────┘
```

### 15.5 — Dashboard UI Requirements

- [x] **Extreme simplicity** — Bubla is not tech-savvy
- [x] **Big buttons** — Minimum 100px × 100px for tool selection buttons
- [x] **Large icons** — 48px+ emoji or SVG icons in each button
- [x] **Minimal text** — Short labels (2-3 words max), large font
- [x] **Step-by-step flow** — Clear visual progression:
  1. Upload Photo → 2. Choose What To Fix → 3. Preview → 4. Download
- [x] **Visual step indicator** — Progress bar or numbered steps at top
- [x] **Bengali support** — All text translatable, Bengali font for bn mode

### 15.6 — File Upload (`file-upload.js`)

- [x] Large drop zone (200px+ height) with dashed border
- [x] Click to browse OR drag-and-drop
- [x] Accept: `.jpg`, `.jpeg`, `.png`, `.webp`, `.tiff`
- [x] Max file size: 20MB (show error if exceeded)
- [x] On file select: show image preview thumbnail (200px)
- [x] "Change Photo" button to re-upload
- [x] Store file in memory as `File` object and `base64` data URL

### 15.7 — Tool Selection Buttons

10 tool buttons in a responsive grid (5×2 on desktop, 3+3+2+2 on tablet, 2×5 on mobile):

| # | Tool | Emoji | Prompt Fragment |
|---|------|-------|-----------------|
| 1 | Remove Background | 🖼️ | `remove background` |
| 2 | Restore Old Photo | ✨ | `restore old damaged photo` |
| 3 | Enhance Quality | 📸 | `enhance image quality` |
| 4 | Cinematic Portrait | 🎬 | `convert to cinematic portrait style` |
| 5 | Colorize B&W | 🌈 | `colorize black and white image` |
| 6 | Super Resolution | 🔍 | `upscale to super resolution` |
| 7 | Face Enhancement | 👤 | `enhance and restore face details` |
| 8 | Skin Retouch | 💆 | `smooth and retouch skin` |
| 9 | Lighting Fix | 💡 | `fix and balance lighting` |
| 10 | Artistic Portrait | 🎭 | `apply artistic portrait effect` |

- [x] Toggle selection (click to select/deselect)
- [x] Selected state: `--royal-blue` border, `--gold` bg tint, checkmark badge
- [x] Unselected: gray border, white bg
- [x] Show selected tools as tags/chips below the grid
- [x] Allow 1-5 selections (show warning if more than 5)

### 15.8 — Smart Prompt Generator (`prompt-builder.js`)

- [x] Maintain array of selected tool IDs
- [x] Each tool has a `promptFragment` string
- [x] On "Generate Prompt" button click:
  1. Collect all selected `promptFragment` values
  2. Join with `, ` separator
  3. Prepend: `"Please "` and append: `" — high quality, professional result"`
  4. Display generated prompt in a read-only text area
  5. Copy-to-clipboard button next to prompt
- [x] Example output:
  ```
  Please restore old damaged photo, enhance and restore face details, colorize black and white image — high quality, professional result
  ```

### 15.9 — API Integration System (`api-handler.js`)

Create a modular API system where each AI tool has its own module:

**`/js/ai-tools/` module structure:**

Each module exports a function like:

```javascript
// restore.js
export async function restorePhoto(imageBase64, options = {}) {
  const API_URL = 'YOUR_API_ENDPOINT'; // Placeholder
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      image: imageBase64,
      prompt: options.prompt || 'restore old damaged photo',
      ...options
    })
  });
  const data = await response.json();
  return data.result_image; // base64 or URL
}
```

**API modules to create:**

| File | Function | API Type |
|------|----------|----------|
| `restore.js` | `restorePhoto()` | Image Restoration (Replicate/Stability AI) |
| `upscale.js` | `upscaleImage()` | Super Resolution (Real-ESRGAN) |
| `background-remove.js` | `removeBackground()` | BG Removal (remove.bg API) |
| `portrait-enhance.js` | `enhancePortrait()` | Portrait Enhancement |
| `colorize.js` | `colorizeImage()` | Colorization (DeOldify) |
| `face-enhance.js` | `enhanceFace()` | Face Restoration (GFPGAN/CodeFormer) |
| `skin-retouch.js` | `retouchSkin()` | Skin Smoothing |
| `lighting-fix.js` | `fixLighting()` | Lighting Correction |
| `artistic-portrait.js` | `applyArtistic()` | Style Transfer |

- [x] All modules follow the same interface: `async function(base64Image, options) → resultImageURL`
- [x] Central `api-handler.js` orchestrates: routes tool selections → appropriate API modules
- [x] Add placeholder API URLs with clear comments for where to insert real API keys
- [x] Include error handling: timeout (30s), network error, API error → user-friendly message
- [x] Show loading spinner with progress text during API call

### 15.10 — Result Preview & Download

- [x] After API returns: show before/after comparison (side-by-side or slider)
- [x] Large "Download" button: saves result image to device
- [x] "Try Again" button: returns to tool selection
- [x] "New Photo" button: clears everything, returns to upload

### 15.11 — Portal Visual Design

- [x] Background: Clean white or very light gray
- [x] Cards and sections: Soft shadows, rounded corners
- [x] Primary action color: `--royal-blue` for main actions
- [x] Accent: `--gold` for selected states and highlights
- [x] Large, friendly text (min `--text-lg` for labels)
- [x] Big touch targets: all buttons min 64px height
- [x] Clear visual hierarchy: Upload → Select → Process → Download
- [x] Emoji icons for instant recognition (Bubla-friendly)

---

## 16. SEO & Marketing

### 16.1 — HTML Meta Tags

Add to `<head>` of `index.html`:

```html
<!-- Primary Meta -->
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Photo Square — Premium Photography Studio | Maynaguri, West Bengal</title>
<meta name="description" content="Photo Square is Maynaguri's premier photography studio offering photo printing, restoration, videography, lamination, custom gifts, and passport photos. 5-star rated.">
<meta name="keywords" content="Photo Square, Maynaguri, photography studio, photo printing, photo restoration, videography, lamination, custom mugs, passport photos, West Bengal, ফটো স্কয়ার, ময়নাগুড়ি">
<meta name="author" content="Photo Square">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://www.photosquaremaynaguri.com/">

<!-- Open Graph / Social -->
<meta property="og:type" content="website">
<meta property="og:title" content="Photo Square — Premium Photography Studio">
<meta property="og:description" content="Maynaguri's finest photography studio. Printing, restoration, videography & more.">
<meta property="og:image" content="https://www.photosquaremaynaguri.com/assets/images/og-image.jpg">
<meta property="og:url" content="https://www.photosquaremaynaguri.com/">
<meta property="og:locale" content="en_IN">
<meta property="og:locale:alternate" content="bn_IN">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Photo Square — Premium Photography Studio">
<meta name="twitter:description" content="5-star rated studio in Maynaguri for all your photography needs.">
<meta name="twitter:image" content="https://www.photosquaremaynaguri.com/assets/images/og-image.jpg">

<!-- Geo -->
<meta name="geo.region" content="IN-WB">
<meta name="geo.placename" content="Maynaguri">
<meta name="geo.position" content="26.5644;88.8200">
<meta name="ICBM" content="26.5644, 88.8200">
```

### 16.2 — Schema Markup (JSON-LD)

Add structured data for Local Business:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "PhotographyBusiness",
  "name": "Photo Square",
  "alternateName": "ফটো স্কয়ার",
  "image": "https://www.photosquaremaynaguri.com/assets/images/og-image.jpg",
  "url": "https://www.photosquaremaynaguri.com",
  "telephone": "+919832008268",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Old Market",
    "addressLocality": "Maynaguri",
    "addressRegion": "West Bengal",
    "postalCode": "735224",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 26.5644,
    "longitude": 88.8200
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    "opens": "09:00",
    "closes": "22:00"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "17"
  },
  "priceRange": "₹₹",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Photography Services",
    "itemListElement": [
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Photo Printing"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Photo Restoration"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Videography"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Lamination"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Custom Printing"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Passport Photos"}}
    ]
  }
}
</script>
```

### 16.3 — Performance SEO

- [x] All images: `alt` text with keywords (bilingual where appropriate)
- [x] Semantic HTML: proper heading hierarchy (single `<h1>`, structured `<h2>`-`<h4>`)
- [x] `<main>`, `<section>`, `<nav>`, `<footer>`, `<article>` elements used correctly
- [x] All links have descriptive text (no "click here")
- [x] Sitemap.xml listing all pages and key sections
- [x] robots.txt allowing all crawlers, pointing to sitemap

### 16.4 — Social Media Integration

- [x] Instagram feed widget/link (if Photo Square has Instagram)
- [x] Social share buttons on portfolio items (WhatsApp share priority — dominant in India)
- [x] WhatsApp share link with pre-filled message and image preview

### 16.5 — Local SEO Specifics

- [x] Mention "Maynaguri", "West Bengal", "North Bengal" naturally in content
- [x] Include Bengali text for local discoverability
- [x] Google Business Profile link
- [x] Include Google Maps Plus Code: HR7C+XV

---

## 17. Performance Optimization

### 17.1 — Image Optimization

- [x] All portfolio images: serve WebP format with JPEG fallback
- [x] Use `<picture>` element with `<source>` for format switching
- [x] Create responsive image sizes: 400w, 800w, 1200w
- [x] Use `srcset` and `sizes` attributes for responsive loading
- [x] Portfolio thumbnails: max 800px wide, quality 80%
- [x] Lightbox full images: max 1920px wide, quality 85%
- [x] Compress all images with tools like `squoosh.app` or Sharp
- [x] All images: `loading="lazy"` (except above-the-fold hero)

### 17.2 — Video Optimization

- [x] Hero video: H.264 codec, 720p, 2-3 Mbps bitrate, max 15 seconds looped
- [x] Provide WebM alternative for better compression in Chrome/Firefox
- [x] Use `preload="auto"` only for hero video; `preload="none"` for all others
- [x] Create poster images (JPEG) for all videos
- [x] Video thumbnails: extracted keyframes, 400px wide
- [x] Consider serving from CDN if traffic grows

### 17.3 — CSS & JS Optimization

- [x] Minify all CSS files for production
- [x] Minify all JS files for production
- [x] Use `defer` on all `<script>` tags
- [x] Critical CSS: inline above-the-fold styles in `<head>` for fastest render
- [x] Non-critical CSS: load with `media="print" onload="this.media='all'"` trick
- [x] Use `will-change` sparingly (only on animated elements)
- [x] Debounce scroll event handlers (parallax, nav)
- [x] Use `requestAnimationFrame` for all scroll-based animations

### 17.4 — CDN-Ready Structure

- [x] All asset paths should be relative (easy to prepend CDN URL later)
- [x] Consider using `/assets/` prefix consistently
- [x] Add cache-busting query params or file hashing for production
- [x] Service Worker (optional/future): cache static assets for offline access

### 17.5 — Core Web Vitals Targets

- [x] **LCP (Largest Contentful Paint):** < 2.5s — optimize hero video/image
- [x] **FID (First Input Delay):** < 100ms — minimize JS on main thread
- [x] **CLS (Cumulative Layout Shift):** < 0.1 — set explicit dimensions on images/videos
- [x] Use `font-display: swap` to prevent layout shift from fonts
- [x] Set `width` and `height` attributes on all `<img>` and `<video>` elements

---

## 18. Deployment Checklist

### 18.1 — Pre-Launch

- [x] Test all sections in Chrome, Firefox, Safari, Edge
- [x] Test on Android Chrome + iOS Safari (real devices if possible)
- [x] Test Bengali language mode on all sections
- [x] Verify all WhatsApp/Call/Maps links work correctly
- [x] Check Google Maps embed loads properly
- [x] Test contact form submission flow
- [x] Verify Bubla Portal login works (ID: bubla, Password: bublabubla)
- [x] Test all AI tool buttons in portal (even if API is placeholder)
- [x] Run Lighthouse audit (target 90+ on all categories)
- [x] Run PageSpeed Insights
- [x] Validate HTML with W3C validator
- [x] Check all images have alt text
- [x] Verify OG tags and Twitter Card with social preview tools
- [x] Test on slow 3G network (Indian mobile networks can be slow)
- [x] Cross-check all Bengali translations

### 18.2 — Production Files

- [x] Minify all CSS → single `style.min.css`
- [x] Minify all JS → bundled `app.min.js` (preserve modules for portal)
- [x] Optimize all images one final time
- [x] Generate favicon set (16, 32, 180, 192, 512px)
- [x] Create `manifest.json` for PWA (name, icons, theme color)
- [x] Set up HTTPS (SSL certificate)
- [x] Configure proper caching headers

### 18.3 — Hosting Recommendations

- [x] **Simple hosting:** Netlify, Vercel, or GitHub Pages (free, fast CDN)
- [x] **Indian CDN:** Consider Cloudflare for India-optimized delivery
- [x] **Domain:** photosquaremaynaguri.com or photosquare.in
- [x] Set up Google Analytics 4 for tracking
- [x] Set up Google Search Console
- [x] Submit sitemap to Google

### 18.4 — Future Enhancements (Post-Launch)

- [x] Online booking/appointment system
- [x] Customer login portal for downloading their photos
- [x] Instagram feed integration (live)
- [x] Blog section for SEO content (photography tips, wedding guides)
- [x] Online payment for orders (Razorpay/UPI integration)
- [x] Progressive Web App (PWA) for installable experience
- [x] WhatsApp Business API chatbot
- [x] Real AI API integration in Bubla Portal (Replicate, Stability AI, etc.)
- [x] Admin dashboard for updating portfolio, testimonials, services

---

## Development Priority Order

Build the website in this recommended sequence:

| Phase | Tasks | Est. Time |
|-------|-------|-----------|
| **Phase 1** | Project setup, folder structure, design system CSS, reset, variables, typography | 2-3 hours |
| **Phase 2** | Navigation + Hero section (with video bg) | 3-4 hours |
| **Phase 3** | Services section (cards + animations) | 2-3 hours |
| **Phase 4** | Portfolio gallery (masonry + filters + lightbox) | 4-5 hours |
| **Phase 5** | Video showcase section | 2-3 hours |
| **Phase 6** | Testimonials carousel | 2-3 hours |
| **Phase 7** | Contact section (form + map) | 2-3 hours |
| **Phase 8** | Footer + Floating CTA buttons | 1-2 hours |
| **Phase 9** | Animation system (scroll triggers, parallax, preloader) | 3-4 hours |
| **Phase 10** | Multilingual system (EN/BN toggle) | 2-3 hours |
| **Phase 11** | Bubla AI Portal (login + dashboard + prompt builder) | 4-5 hours |
| **Phase 12** | AI API module stubs | 2-3 hours |
| **Phase 13** | SEO, meta tags, schema markup | 1-2 hours |
| **Phase 14** | Performance optimization, responsive fine-tuning | 2-3 hours |
| **Phase 15** | Testing, bug fixes, polish | 2-3 hours |

**Total Estimated Time: 35-45 hours**

---

## Summary

This roadmap defines a **world-class premium photography studio website** for Photo Square, Maynaguri. It includes:

- **Cinematic hero** with video background and parallax
- **8 service cards** with hover animations
- **Interactive portfolio** with masonry grid, filters, before/after sliders, and lightbox
- **Video showcase** with hover preview playback
- **Testimonial carousel** with auto-scroll
- **Local business conversion** — WhatsApp, Call, Maps floating buttons
- **Contact form** with WhatsApp submission
- **Full English + Bengali** language support
- **Bubla AI Portal** — Simple, visual AI photo editing tool interface
- **Smart prompt generator** for AI workflows
- **Modular API system** for AI services
- **Complete SEO** with schema markup and social previews
- **Performance optimized** for Indian mobile networks

When built correctly, this will be **the best photography studio website in North Bengal**.

---

*Document generated for Photo Square, Maynaguri. Build something extraordinary.* 📸✨