# 📷 Photo Square — Premium Photography Studio Website

> **Maynaguri's premier photography studio** — a full-featured business website with an AI-powered photo editing portal, bilingual support (English + Bengali), and GitHub Pages hosting.

🌐 **Live site:** [https://sutirthachakraborty.github.io/BublaVideoMix](https://sutirthachakraborty.github.io/BublaVideoMix)

---

## 🏪 About the Studio

**Photo Square** (ফটো স্কয়ার) is located in Old Market, Maynaguri, West Bengal. It is a 5-star rated local photography studio offering printing, restoration, videography, and AI-assisted photo editing.

| Detail | Info |
|--------|------|
| **Name** | Photo Square |
| **Address** | Old Market, Maynaguri, West Bengal 735224 |
| **Plus Code** | HR7C+XV |
| **Coordinates** | 26.5644° N, 88.8200° E |
| **Phone** | [+91 98320 08268](tel:+919832008268) |
| **WhatsApp** | [wa.me/919832008268](https://wa.me/919832008268) |
| **Hours** | Open daily · 9:00 AM – 10:00 PM |
| **Rating** | ⭐ 5.0 (17 reviews) |
| **Website** | [photosquaremaynaguri.com](https://www.photosquaremaynaguri.com) |

---

## 🛠️ Services

- 🖨️ **Photo Printing** — Standard and custom sizes
- 🖼️ **Photo Restoration** — Repair old, damaged, or faded photographs
- 🎬 **Videography** — Wedding and event video production
- 🧴 **Lamination** — Photo and document lamination
- 🎁 **Custom Printing** — Mugs, frames, and gift items
- 🪪 **Passport Photos** — Instant passport and visa-size photos
- ✂️ **Photo Editing** — Professional retouching and editing
- 🎞️ **Video Editing** — Post-production and highlight reels

---

## 🤖 Bubla AI Portal

A private AI-powered photo editing portal accessible at [`/portal.html`](portal.html).

**Login credentials:**
| Field | Value |
|-------|-------|
| Username | `bubla` |
| Password | `bublabubla` |

### AI Tools Available

| Tool | Description |
|------|-------------|
| 🖼️ Remove BG | Remove background — makes it transparent or white |
| ✨ Restore Photo | Repair scratches, tears, fading, discolouration |
| 📸 Enhance Quality | Sharpen and improve overall image clarity |
| 🎬 Cinematic | Apply cinematic colour grade and mood |
| 🌈 Colorize B&W | Naturally colourise black-and-white photos |
| 🔍 Super Resolution | 4× upscale with fine detail recovery |
| 👤 Face Enhance | Sharpen face details and eye clarity |
| 💆 Skin Retouch | Natural skin smoothing and tone correction |
| 💡 Lighting Fix | Balance exposure and lighting evenly |
| 🎭 Artistic Portrait | Elegant artistic portrait effect |

### Portal Features
- **Face Preserve toggle** — locks all faces/identities during AI processing (on by default)
- **Negative Prompt** — specify what to exclude from the result
- **Additional Instructions** — free-text field for custom guidance
- **Download result** — saves the processed image directly to device
- **API Key Settings** (⚙️ button in header) — use the built-in default key or paste your own from Google AI Studio

### Gemini API Integration
| Field | Value |
|-------|-------|
| Model | `gemini-2.5-flash-image` |
| Default key | Pre-configured (works out of the box) |
| Custom key | Paste at ⚙️ Settings — saved to `localStorage` |
| Timeout | 60 seconds |
| Get your own key | [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey) |
| API docs | [ai.google.dev/gemini-api/docs/image-generation](https://ai.google.dev/gemini-api/docs/image-generation) |

---

## 📁 Project Structure

```
BublaVideoMix/
│
├── index.html                  # Main website (home page)
├── portal.html                 # Bubla AI Portal (login + dashboard)
├── favicon.ico
├── manifest.json               # PWA manifest
├── robots.txt
├── sitemap.xml
├── .nojekyll                   # GitHub Pages — bypasses Jekyll processing
│
├── assets/
│   ├── shop_photo/             # Real photos of the Photo Square shop (13 images)
│   ├── videos/
│   │   ├── photo_printing/     # 2 × demo/showreel MP4 videos
│   │   ├── photo_lamination/   # Lamination video folder
│   │   └── wedding/            # 4 × wedding videography MP4s
│   ├── images/
│   │   ├── portfolio/
│   │   │   ├── custom/         # Custom printing portfolio shots
│   │   │   ├── lamination/     # Lamination portfolio shots
│   │   │   ├── passport/       # Passport photo samples
│   │   │   ├── printing/       # Printing portfolio shots
│   │   │   ├── restoration/    # Before/after restoration samples
│   │   │   └── videography/    # Videography portfolio shots
│   │   ├── before-after/       # Before/after comparison images
│   │   ├── icons/              # UI icons
│   │   └── ui/                 # General UI images
│   └── fonts/
│       ├── english/            # English web fonts
│       └── bengali/            # Bengali (Noto Serif/Sans Bengali) fonts
│
├── components/
│   ├── header.html             # Shared site header component
│   ├── footer.html             # Shared site footer component
│   └── floating-cta.html       # Floating call/WhatsApp/directions buttons
│
├── css/
│   ├── variables.css           # CSS custom properties (colours, spacing, radii)
│   ├── reset.css               # CSS reset / normalise
│   ├── base.css                # Body, root, global base styles
│   ├── typography.css          # Fonts, headings, text utilities
│   ├── animations.css          # Keyframe animations and transitions
│   ├── components.css          # Buttons, badges, cards, form elements
│   ├── layout.css              # Grid, containers, flex helpers
│   ├── responsive.css          # Global media queries
│   ├── sections/
│   │   ├── nav.css             # Navigation bar styles
│   │   ├── hero.css            # Hero / landing section
│   │   ├── services.css        # Services grid cards
│   │   ├── portfolio.css       # Portfolio gallery grid
│   │   ├── video-showcase.css  # Video showcase section
│   │   ├── testimonials.css    # Testimonials carousel
│   │   ├── contact.css         # Contact form + map
│   │   ├── footer.css          # Footer layout
│   │   ├── floating-cta.css    # Floating CTA buttons
│   │   └── preloader.css       # Page preloader animation
│   └── portal/
│       ├── portal-login.css    # Portal login screen styles
│       ├── portal-dashboard.css # Portal dashboard + API settings modal
│       └── portal-components.css # Shared portal component styles
│
├── js/
│   ├── app.js                  # Main entry point — initialises all modules
│   ├── router.js               # Client-side hash router
│   ├── modules/
│   │   ├── language.js         # Bilingual EN/BN switcher (LanguageManager class)
│   │   ├── animations.js       # Intersection Observer scroll animations
│   │   ├── before-after.js     # Before/after image slider
│   │   ├── contact-form.js     # Contact form → WhatsApp message builder
│   │   ├── cursor.js           # Custom cursor effect
│   │   ├── floating-buttons.js # Floating CTA show/hide logic
│   │   ├── gallery.js          # Portfolio lightbox gallery
│   │   ├── parallax.js         # Parallax scroll effects
│   │   ├── preloader.js        # Page preloader controller
│   │   ├── smooth-scroll.js    # Smooth anchor scrolling
│   │   ├── testimonials.js     # Testimonials auto-carousel
│   │   └── video-player.js     # Video section player controls
│   ├── portal/
│   │   ├── auth.js             # Portal login / logout / session (sessionStorage)
│   │   ├── dashboard.js        # Dashboard orchestrator — upload → process → result
│   │   ├── file-upload.js      # Drag-and-drop / click image uploader
│   │   ├── prompt-builder.js   # AI tool selector + Gemini prompt generator
│   │   └── api-handler.js      # Gemini REST API integration + key management
│   └── ai-tools/               # Individual AI tool descriptor modules
│       ├── background-remove.js
│       ├── restore.js
│       ├── portrait-enhance.js
│       ├── colorize.js
│       ├── upscale.js
│       ├── face-enhance.js
│       ├── skin-retouch.js
│       ├── lighting-fix.js
│       └── artistic-portrait.js
│
└── lang/
    ├── en.json                 # English translations (74 home keys + 41 portal keys)
    └── bn.json                 # Bengali translations (full parity with English)
```

---

## 🌐 Pages & Sections

### `index.html` — Main Website

| Section | Anchor | Description |
|---------|--------|-------------|
| Hero | `#hero` | Full-screen landing with tagline and CTA buttons |
| Services | `#services` | 6-card grid of studio services |
| Portfolio | `#portfolio` | Masonry gallery of real shop work (13 photos) |
| Videos | `#videos` | Videography showreel (wedding + printing videos) |
| Testimonials | `#testimonials` | Auto-scrolling customer reviews carousel |
| Contact | `#contact` | WhatsApp contact form + embedded Google Map |
| Footer | — | Links, contact info, portal link |
| Floating CTA | — | Sticky 📍 Directions / 📞 Call / WhatsApp buttons |

### `portal.html` — AI Portal

| View | Description |
|------|-------------|
| Login | ID + password form with session persistence |
| Dashboard | 4-step workflow: Upload → Select Tools → Process → Download |
| API Settings modal | ⚙️ header button — manage Gemini API key |

---

## 🚀 Running Locally

No build tools or dependencies required. Just serve the files over HTTP:

```bash
# Python (recommended)
python3 -m http.server 5500

# Node.js (npx)
npx serve . -p 5500
```

Then open: [http://localhost:5500](http://localhost:5500)

> ⚠️ Must be served over HTTP (not opened as a `file://` URL) because the site uses ES Modules and `fetch()` for language files.

---

## 🔧 Tech Stack

| Layer | Technology |
|-------|-----------|
| HTML | HTML5 — semantic, ARIA-labelled |
| CSS | CSS3 — custom properties, Grid, Flexbox, no framework |
| JavaScript | Vanilla ES Modules — no build step, no bundler |
| AI | Google Gemini 2.0 Flash (image generation) via REST API |
| i18n | Custom `LanguageManager` — JSON lang files, `data-i18n` attributes |
| PWA | `manifest.json` — installable as app |
| SEO | Schema.org `PhotographyBusiness`, Open Graph, Twitter Card, Geo tags |
| Hosting | GitHub Pages (`main` branch, `.nojekyll` present) |

---

## 🌍 Bilingual Support

The site supports **English** and **বাংলা (Bengali)** via the language switcher in the navigation bar. Translation files are in `lang/`:

- `lang/en.json` — English (115 total keys)
- `lang/bn.json` — Bengali (115 total keys, full parity)

All translatable text uses `data-i18n="section.key"` HTML attributes.

---

## 📦 Deployment (GitHub Pages)

The repo is configured for GitHub Pages on the `main` branch:

1. `.nojekyll` — prevents Jekyll from processing the site
2. All paths are relative — no absolute paths that would break on subdirectory hosting
3. No build step required — push and it's live

**GitHub repo:** [github.com/SutirthaChakraborty/BublaVideoMix](https://github.com/SutirthaChakraborty/BublaVideoMix)

---

## 📞 Quick Contact Links

| Channel | Link |
|---------|------|
| 📞 Call | [+91 98320 08268](tel:+919832008268) |
| 💬 WhatsApp | [wa.me/919832008268](https://wa.me/919832008268?text=Hi%20Photo%20Square!%20I%20would%20like%20to%20inquire%20about%20your%20services.) |
| 📍 Directions | [Google Maps](https://maps.google.com/?q=Photo+Square+Old+Market+Maynaguri+West+Bengal) |

---

*© 2025 Photo Square. Crafted with ❤️ in Maynaguri.*
