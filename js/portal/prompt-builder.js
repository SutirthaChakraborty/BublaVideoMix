/* ============================================================
   PHOTO SQUARE — Smart Prompt Studio
   Categories: ID/Docs · Background · Restore · Enhance ·
               Camera · Lighting · Color · Special
   ============================================================ */

/* ── TASK PRESETS ──────────────────────────────────────────── */
const TASKS = [
  // ── ID / Document Photos ──
  {
    id: 'passport',
    emoji: '🪪',
    label: 'Passport Photo',
    category: 'id',
    fragment: 'Generate a professional passport / visa photo from this image. The subject must face forward, eyes open and looking directly at the camera, neutral expression, mouth closed. Background must be pure white (#ffffff). Crop tightly so the face fills 70–80% of the frame. Remove any distracting objects. Shoulders should be visible. Ensure even studio-quality lighting with no shadows on the face or background. Result must meet standard passport photo requirements.',
  },
  {
    id: 'id_card',
    emoji: '🪪',
    label: 'ID / Aadhaar Photo',
    category: 'id',
    fragment: 'Create a clean ID card photo. Subject faces forward, neutral expression, eyes open, plain white or light-grey background. Crop from top of head to just below shoulders. Ensure bright even lighting, sharp focus on face, remove all distracting background elements.',
  },
  {
    id: 'visa_photo',
    emoji: '✈️',
    label: 'Visa / OCI Photo',
    category: 'id',
    fragment: 'Produce a visa application quality photo. Face centred and fully visible, neutral expression, eyes open, plain white background. Both ears should be visible. No shadows on the face or background. Must look like it was taken in a professional photo studio.',
  },
  // ── Background ──
  {
    id: 'remove_bg',
    emoji: '🔲',
    label: 'Remove Background',
    category: 'bg',
    fragment: 'Remove the background cleanly and precisely around every edge including hair strands and fine details. Place subject on a pure white (#ffffff) background.',
  },
  {
    id: 'white_bg',
    emoji: '⬜',
    label: 'White Background',
    category: 'bg',
    fragment: 'Replace the existing background with a clean, evenly lit pure white studio background. Keep the subject completely unchanged and preserve every edge detail including hair.',
  },
  {
    id: 'studio_bg',
    emoji: '🌫️',
    label: 'Studio Grey BG',
    category: 'bg',
    fragment: 'Replace the background with a professional photography studio seamless gradient background (soft grey-to-white gradient). Match the lighting on the subject to the new background. Keep subject fully intact.',
  },
  {
    id: 'outdoor_bg',
    emoji: '🌿',
    label: 'Outdoor / Nature BG',
    category: 'bg',
    fragment: 'Replace the background with a beautiful natural outdoor environment — lush green bokeh garden or a scenic landscape. Blend the subject naturally with realistic depth of field. Keep the subject sharp.',
  },
  // ── Restoration ──
  {
    id: 'restore',
    emoji: '🔧',
    label: 'Restore Old Photo',
    category: 'restore',
    fragment: 'Restore this old or damaged photograph. Remove scratches, tears, foxing, fading, water damage, and discolouration. Reconstruct missing areas seamlessly. Sharpen soft details while maintaining the original period feel. Keep all original faces and people completely intact.',
  },
  {
    id: 'colorize',
    emoji: '🌈',
    label: 'Colorize B&W',
    category: 'restore',
    fragment: 'Naturally and accurately colorize this black and white photograph. Use historically appropriate and realistic colours for skin tones, clothing, environment and props. Preserve all facial identities, expressions and likeness exactly as in the original.',
  },
  {
    id: 'denoise',
    emoji: '✨',
    label: 'Denoise / Remove Grain',
    category: 'restore',
    fragment: 'Remove noise, grain, JPEG compression artefacts and digital noise from this photo. Recover fine texture in skin, fabric and background. Result should look clean and professionally shot.',
  },
  // ── Enhancement ──
  {
    id: 'enhance',
    emoji: '📸',
    label: 'Overall Enhance',
    category: 'enhance',
    fragment: 'Enhance the overall quality of this photo — improve sharpness, clarity, dynamic range, white balance and colour accuracy. Make it look like a professionally edited photograph without changing any subjects or faces.',
  },
  {
    id: 'super_res',
    emoji: '🔍',
    label: 'Super Resolution 4×',
    category: 'enhance',
    fragment: 'Upscale this image to 4× super resolution. Recover realistic fine details — skin pores, fabric texture, hair strands, background detail. Every face must remain completely true to the original.',
  },
  {
    id: 'face_enhance',
    emoji: '👤',
    label: 'Face Enhance',
    category: 'enhance',
    fragment: 'Enhance and sharpen all face details — improve eye clarity, skin texture, hair definition and expressions — while keeping each person\'s identity, likeness and expression completely unchanged.',
  },
  {
    id: 'skin_retouch',
    emoji: '💆',
    label: 'Skin Retouch',
    category: 'enhance',
    fragment: 'Apply professional skin retouching — remove blemishes, even out skin tone, reduce dark circles, smooth texture naturally. The face must still look completely natural and recognisable. Do not over-smooth.',
  },
  // ── Camera & Lens Styles ──
  {
    id: 'dslr_portrait',
    emoji: '📷',
    label: 'DSLR Portrait Bokeh',
    category: 'camera',
    fragment: 'Simulate a professional DSLR portrait shot with an 85mm f/1.4 prime lens. Apply beautiful creamy bokeh background blur (shallow depth of field). The subject must be tack sharp from eyes to nose. Background pleasantly blurred but context still visible.',
  },
  {
    id: 'mirrorless_sharp',
    emoji: '📸',
    label: 'Mirrorless / Crisp',
    category: 'camera',
    fragment: 'Simulate a high-resolution mirrorless camera shot (Sony A7R or Fuji GFX style). Maximum sharpness and micro-contrast throughout the entire frame. Accurate natural colours, fine detail in every area, clean highlights.',
  },
  {
    id: 'film_grain',
    emoji: '🎞️',
    label: 'Film Camera Look',
    category: 'camera',
    fragment: 'Simulate an analogue 35mm film camera look — add realistic film grain (Kodak Portra 400 style), slightly warm tones, lifted shadows, imperfect vignetting on edges. Keep all faces sharp and recognisable.',
  },
  {
    id: 'dslr_product',
    emoji: '📦',
    label: 'Product / Commercial Shot',
    category: 'camera',
    fragment: 'Relight and recompose as a professional product photography shot. Clean studio lighting from above and the side, white or neutral background, sharp focus throughout the subject, no harsh shadows, commercial quality.',
  },
  {
    id: 'wide_angle',
    emoji: '🏙️',
    label: 'Wide Angle / Landscape',
    category: 'camera',
    fragment: 'Reframe as a wide-angle landscape or architectural shot. Expand the field of view naturally. Correct perspective distortion. Enhance depth, sky and foreground detail.',
  },
  {
    id: 'tilt_shift',
    emoji: '🎪',
    label: 'Tilt-Shift Miniature',
    category: 'camera',
    fragment: 'Apply a tilt-shift lens effect to make this photo look like a miniature model scene. Blur the top and bottom with a sharp horizontal focus band in the middle. Boost saturation slightly for the toy-world effect.',
  },
  // ── Lighting ──
  {
    id: 'lighting_fix',
    emoji: '💡',
    label: 'Fix Lighting',
    category: 'lighting',
    fragment: 'Correct and balance the lighting and exposure. Fix underexposed shadows and blown-out highlights. Apply professional even studio-quality lighting. Do not alter any faces or subjects.',
  },
  {
    id: 'golden_hour',
    emoji: '🌅',
    label: 'Golden Hour Sunset',
    category: 'lighting',
    fragment: 'Relight with a beautiful golden hour sunset effect — warm orange-gold directional light from the side, long soft shadows, glowing highlights on the subject and background.',
  },
  {
    id: 'studio_light',
    emoji: '🎬',
    label: '3-Point Studio Light',
    category: 'lighting',
    fragment: 'Apply professional 3-point studio lighting — key light from upper-left, fill light from the right to reduce shadows, and a rim/hair light from behind to separate the subject from the background.',
  },
  {
    id: 'dramatic_light',
    emoji: '🎭',
    label: 'Dramatic / Rembrandt',
    category: 'lighting',
    fragment: 'Apply Rembrandt lighting — a single strong directional light from 45° above creating a small triangle of light on the shadowed cheek. Deep shadows, high contrast, moody and painterly atmosphere.',
  },
  {
    id: 'neon_light',
    emoji: '��',
    label: 'Neon / Cyberpunk Light',
    category: 'lighting',
    fragment: 'Add dramatic neon / cyberpunk coloured lighting — vibrant pink, cyan, purple and blue neon lights reflected on the subject and background. High contrast, cinematic, futuristic night scene feel.',
  },
  // ── Color Grading ──
  {
    id: 'cinematic',
    emoji: '🎞️',
    label: 'Cinematic Grade',
    category: 'color',
    fragment: 'Apply a professional cinematic colour grade — lift shadows to teal/blue-green, push highlights to warm amber, add a subtle vignette, and desaturate slightly for a film-like look. Keep all faces exactly as they are.',
  },
  {
    id: 'vintage_film',
    emoji: '📽️',
    label: 'Vintage / Retro',
    category: 'color',
    fragment: 'Apply a vintage analogue film look — slight yellowing of whites, subtle grain texture, faded blacks, slightly washed-out colours reminiscent of 1970s film photography. Keep faces fully intact.',
  },
  {
    id: 'bw_dramatic',
    emoji: '⬛',
    label: 'B&W Dramatic',
    category: 'color',
    fragment: 'Convert to high-contrast black and white. Deep blacks, bright whites, rich midtone separation. Emulate Ilford HP5 or Kodak T-Max 400 film. Keep all facial features sharp and clear.',
  },
  {
    id: 'vivid_pop',
    emoji: '🎨',
    label: 'Vivid Pop',
    category: 'color',
    fragment: 'Boost colour saturation and vibrancy significantly for a bright, punchy, eye-catching look. Increase contrast and clarity. All faces and subjects must remain unaltered.',
  },
  {
    id: 'matte_fade',
    emoji: '🌫️',
    label: 'Matte / Faded',
    category: 'color',
    fragment: 'Apply a trendy matte faded look — lift the black point so blacks become dark grey, slightly desaturate, add a subtle warm tint to shadows. Modern Instagram editorial style.',
  },
  // ── Special / Artistic ──
  {
    id: 'wedding',
    emoji: '💒',
    label: 'Wedding / Soft Airy',
    category: 'special',
    fragment: 'Apply a soft romantic wedding photography edit — bright and airy exposure, warm skin tones, creamy highlights, subtle glow on bright areas, gentle skin retouching. Keep all faces and people completely unchanged.',
  },
  {
    id: 'hdr',
    emoji: '🏔️',
    label: 'HDR Effect',
    category: 'special',
    fragment: 'Apply HDR processing — recover shadow and highlight detail simultaneously, enhance local contrast and texture, make the image look vivid and detailed throughout.',
  },
  {
    id: 'artistic',
    emoji: '🖌️',
    label: 'Artistic Portrait',
    category: 'special',
    fragment: 'Transform into an elegant artistic portrait with subtle painterly texture, refined tonal balance, and gallery-quality composition. Keep facial features and identity fully intact.',
  },
  {
    id: 'anime_style',
    emoji: '✏️',
    label: 'Anime / Illustration',
    category: 'special',
    fragment: 'Convert to high-quality anime / manga illustration style. Clean line art, flat cel-shaded colours with soft shading, anime facial style but keep the subjects recognisable.',
  },
];

const FACE_GUARD = 'IMPORTANT: Preserve ALL faces and people exactly as they are — do not change, alter, replace, or generate any new faces. Keep every person\'s identity, expression, and likeness 100% true to the original.';

const DEFAULT_NEGATIVE_PROMPT_TEXT = 'blur, noise, grain, distorted face, extra fingers, deformed hands, watermark, text overlay, artifacts, low quality, overexposed, underexposed';

const CATEGORIES = [
  { id: 'id',      label: '🪪 ID / Docs'   },
  { id: 'bg',      label: '🖼️ Background'  },
  { id: 'restore', label: '🔧 Restore'     },
  { id: 'enhance', label: '📸 Enhance'     },
  { id: 'camera',  label: '📷 Camera'      },
  { id: 'lighting',label: '💡 Lighting'    },
  { id: 'color',   label: '🎞️ Color Grade' },
  { id: 'special', label: '✨ Special'     },
];

export class PromptBuilder {
  constructor() {
    this.selected       = new Set();
    this.facePreserve   = true;
    this.activeCategory = 'id';
    this.render();
    this.bindEvents();
    this._prefillNegativePrompt();
  }

  _prefillNegativePrompt() {
    const el = document.getElementById('negativePromptInput');
    if (el && !el.value.trim()) el.value = DEFAULT_NEGATIVE_PROMPT_TEXT;
  }

  /* ── Render the full studio ─────────────────────────────── */
  render() {
    const container = document.getElementById('toolsGrid');
    if (!container) return;
    container.innerHTML = `
      <div class="ps-cats" id="ps-cats" role="tablist" aria-label="Tool categories">
        ${CATEGORIES.map(c => `
          <button class="ps-cat-btn${c.id === this.activeCategory ? ' ps-cat-btn--active' : ''}"
                  data-cat="${c.id}" role="tab"
                  aria-selected="${c.id === this.activeCategory}">${c.label}</button>
        `).join('')}
      </div>
      <div class="ps-tools" id="ps-tools" role="group" aria-label="Select tools">
        ${this._renderTools(this.activeCategory)}
      </div>
      <div class="ps-selected" id="selectedTools" aria-live="polite"></div>
      <div class="ps-quicktype">
        <label for="ps-quick" class="ps-quicktype__label">✏️ Or describe your own edit</label>
        <input type="text" id="ps-quick" class="ps-quicktype__input"
               placeholder="e.g. add DSLR bokeh, convert to landscape, blue sky, make it cinematic…"
               autocomplete="off">
      </div>
    `;
  }

  _renderTools(cat) {
    return TASKS.filter(t => t.category === cat).map(t => `
      <button class="tool-btn${this.selected.has(t.id) ? ' selected' : ''}"
              data-tool="${t.id}" type="button"
              aria-pressed="${this.selected.has(t.id)}">
        <span class="tool-btn__icon" aria-hidden="true">${t.emoji}</span>
        <span class="tool-btn__label">${t.label}</span>
      </button>
    `).join('');
  }

  /* ── Events ─────────────────────────────────────────────── */
  bindEvents() {
    const container = document.getElementById('toolsGrid');
    if (!container) return;

    container.addEventListener('click', e => {
      const catBtn = e.target.closest('.ps-cat-btn');
      if (catBtn) {
        this.activeCategory = catBtn.dataset.cat;
        container.querySelectorAll('.ps-cat-btn').forEach(b => {
          b.classList.toggle('ps-cat-btn--active', b === catBtn);
          b.setAttribute('aria-selected', b === catBtn ? 'true' : 'false');
        });
        const toolsEl = container.querySelector('#ps-tools');
        if (toolsEl) toolsEl.innerHTML = this._renderTools(this.activeCategory);
        return;
      }
      const toolBtn = e.target.closest('.tool-btn');
      if (toolBtn) this.toggleTool(toolBtn);
    });

    // Allow removing tags via the × button
    document.addEventListener('click', e => {
      const rmBtn = e.target.closest('[data-remove]');
      if (!rmBtn) return;
      const rid = rmBtn.dataset.remove;
      this.selected.delete(rid);
      const visBtn = document.querySelector(`.tool-btn[data-tool="${rid}"]`);
      if (visBtn) { visBtn.classList.remove('selected'); visBtn.setAttribute('aria-pressed','false'); }
      this.updateTags();
    });

    const faceToggle = document.getElementById('facePreserveToggle');
    if (faceToggle) {
      faceToggle.checked = this.facePreserve;
      faceToggle.addEventListener('change', () => { this.facePreserve = faceToggle.checked; });
    }

    const genBtn  = document.getElementById('generatePromptBtn');
    const copyBtn = document.getElementById('copyPromptBtn');
    if (genBtn)  genBtn.addEventListener('click',  () => this.generateAndShow());
    if (copyBtn) copyBtn.addEventListener('click',  () => this.copyPrompt());
  }

  toggleTool(btn) {
    const id = btn.getAttribute('data-tool');
    if (this.selected.has(id)) {
      this.selected.delete(id);
      btn.classList.remove('selected');
      btn.setAttribute('aria-pressed', 'false');
    } else {
      if (this.selected.size >= 5) {
        alert('You can combine up to 5 tools at once.');
        return;
      }
      this.selected.add(id);
      btn.classList.add('selected');
      btn.setAttribute('aria-pressed', 'true');
    }
    this.updateTags();
  }

  updateTags() {
    const container = document.getElementById('selectedTools');
    if (!container) return;
    if (this.selected.size === 0) { container.innerHTML = ''; return; }
    container.innerHTML = Array.from(this.selected).map(id => {
      const t = TASKS.find(x => x.id === id);
      return t ? `<span class="tool-tag">${t.emoji} ${t.label}
        <button class="tool-tag__remove" data-remove="${id}" aria-label="Remove ${t.label}">×</button></span>` : '';
    }).join('');
  }

  generateAndShow() {
    if (this.selected.size === 0 && !this._getQuickType()) {
      alert('Please select at least one tool, or type a custom task below.');
      return '';
    }
    const prompt = this.buildPromptText();
    const area   = document.getElementById('promptArea');
    const text   = document.getElementById('generatedPrompt');
    if (text) text.textContent = prompt;
    if (area) area.classList.add('show');
    return prompt;
  }

  generatePrompt() {
    if (this.selected.size === 0 && !this._getQuickType()) return '';
    const prompt = this.buildPromptText();
    const area   = document.getElementById('promptArea');
    const text   = document.getElementById('generatedPrompt');
    if (text) text.textContent = prompt;
    if (area) area.classList.add('show');
    return prompt;
  }

  _getQuickType() {
    const el = document.getElementById('ps-quick');
    return el ? el.value.trim() : '';
  }

  buildPromptText() {
    const fragments = Array.from(this.selected)
      .map(id => TASKS.find(t => t.id === id)?.fragment || '')
      .filter(Boolean);

    const quickType = this._getQuickType();
    if (quickType) fragments.push(quickType);

    let prompt = `You are an expert professional photo editor and retoucher. Edit the provided photo precisely as follows: ${fragments.join('. ')}. Output a single high-quality photorealistic result suitable for printing at 300 DPI.`;

    if (this.facePreserve) prompt += ` ${FACE_GUARD}`;

    const additionalEl = document.getElementById('customTextInput');
    const additional   = additionalEl ? additionalEl.value.trim() : '';
    if (additional) prompt += ` Additional instructions: ${additional}.`;

    return prompt;
  }

  getNegativePrompt() {
    const el = document.getElementById('negativePromptInput');
    return el ? el.value.trim() : '';
  }

  copyPrompt() {
    const text = document.getElementById('generatedPrompt')?.textContent?.trim();
    if (!text) { alert('Generate a prompt first.'); return; }
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => this.showCopied());
    } else {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.cssText = 'position:fixed;opacity:0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      this.showCopied();
    }
  }

  showCopied() {
    const btn = document.getElementById('copyPromptBtn');
    if (!btn) return;
    const orig = btn.textContent;
    btn.textContent = '✓ Copied!';
    setTimeout(() => { btn.textContent = orig; }, 2000);
  }
}
