/* ============================================================
   PHOTO SQUARE — Output Controls
   Handles: orientation, size presets, custom dimensions,
            DPI, quality, generative fill aspect ratio,
            and client-side canvas rendering for download.
   ============================================================ */

/* ── Print / output size presets ──────────────────────────── */
export const SIZE_PRESETS = [
  { id: 'orig',      label: 'Original',         w: null,  h: null,  dpi: 96  },
  // Passport / ID
  { id: 'passport',  label: 'Passport (35×45mm)', w: 413,  h: 531,  dpi: 300 },
  { id: 'stamp',     label: 'Stamp (25×30mm)',   w: 295,  h: 354,  dpi: 300 },
  // Standard prints
  { id: '3x4',       label: '3×4 inch',          w: 900,  h: 1200, dpi: 300 },
  { id: '4x6',       label: '4×6 inch',          w: 1200, h: 1800, dpi: 300 },
  { id: '5x7',       label: '5×7 inch',          w: 1500, h: 2100, dpi: 300 },
  { id: '6x8',       label: '6×8 inch',          w: 1800, h: 2400, dpi: 300 },
  { id: '8x10',      label: '8×10 inch',         w: 2400, h: 3000, dpi: 300 },
  { id: '8x12',      label: '8×12 inch',         w: 2400, h: 3600, dpi: 300 },
  { id: '10x12',     label: '10×12 inch',        w: 3000, h: 3600, dpi: 300 },
  { id: '12x16',     label: '12×16 inch',        w: 3600, h: 4800, dpi: 300 },
  { id: '12x18',     label: '12×18 inch',        w: 3600, h: 5400, dpi: 300 },
  { id: '16x20',     label: '16×20 inch',        w: 4800, h: 6000, dpi: 300 },
  // Wallet
  { id: 'wallet',    label: 'Wallet (2×3 inch)', w: 600,  h: 900,  dpi: 300 },
  // Square / Social
  { id: 'sq_small',  label: 'Square 1:1',        w: 1080, h: 1080, dpi: 96  },
  { id: 'a4',        label: 'A4 (210×297mm)',    w: 2480, h: 3508, dpi: 300 },
  { id: 'a5',        label: 'A5 (148×210mm)',    w: 1748, h: 2480, dpi: 300 },
  { id: 'custom',    label: 'Custom…',           w: null,  h: null, dpi: 300 },
];

export const ASPECT_RATIOS = [
  { id: 'free',   label: 'Free',    w: 0,  h: 0  },
  { id: '1:1',    label: '1:1',     w: 1,  h: 1  },
  { id: '4:3',    label: '4:3',     w: 4,  h: 3  },
  { id: '3:4',    label: '3:4',     w: 3,  h: 4  },
  { id: '16:9',   label: '16:9',    w: 16, h: 9  },
  { id: '9:16',   label: '9:16',    w: 9,  h: 16 },
  { id: '3:2',    label: '3:2',     w: 3,  h: 2  },
  { id: '2:3',    label: '2:3',     w: 2,  h: 3  },
  { id: '5:7',    label: '5:7',     w: 5,  h: 7  },
  { id: '7:5',    label: '7:5',     w: 7,  h: 5  },
];

export class OutputControls {
  constructor() {
    this.preset      = 'orig';
    this.orientation = 'portrait';   // 'portrait' | 'landscape' | 'square'
    this.customW     = 1800;
    this.customH     = 1200;
    this.dpi         = 300;
    this.quality     = 95;           // JPEG quality 1-100
    this.format      = 'jpeg';       // 'jpeg' | 'png' | 'webp'
    this.aspectRatio = 'free';
    this.genFill     = false;        // generative fill flag (sent in prompt)
    this.genFillAR   = '16:9';       // target aspect ratio for gen-fill
    this._render();
    this._bind();
  }

  /* ── Build the HTML panel ──────────────────────────────── */
  _render() {
    const el = document.getElementById('oc-body');
    if (!el) return;
    el.innerHTML = `
    <div class="oc-section">
      <h4 class="oc-heading">📐 Size &amp; Orientation</h4>

      <!-- Orientation pills -->
      <div class="oc-row">
        <label class="oc-label">Orientation</label>
        <div class="oc-pills" id="oc-orientation">
          <button class="oc-pill oc-pill--active" data-val="portrait"  title="Portrait">⬆ Portrait</button>
          <button class="oc-pill" data-val="landscape" title="Landscape">➡ Landscape</button>
          <button class="oc-pill" data-val="square"    title="Square">⬛ Square</button>
        </div>
      </div>

      <!-- Size preset -->
      <div class="oc-row">
        <label class="oc-label" for="oc-preset">Print Size</label>
        <select id="oc-preset" class="oc-select">
          ${SIZE_PRESETS.map(p => `<option value="${p.id}">${p.label}</option>`).join('')}
        </select>
      </div>

      <!-- Custom dimensions (shown only when preset=custom) -->
      <div class="oc-row oc-custom" id="oc-custom-row" style="display:none">
        <label class="oc-label">Custom px</label>
        <div class="oc-dim-inputs">
          <input type="number" id="oc-cw" class="oc-input-num" value="${this.customW}" min="50" max="8000" aria-label="Width in pixels"> <span class="oc-dim-sep">×</span>
          <input type="number" id="oc-ch" class="oc-input-num" value="${this.customH}" min="50" max="8000" aria-label="Height in pixels">
          <span class="oc-dim-unit">px</span>
        </div>
      </div>

      <!-- DPI -->
      <div class="oc-row">
        <label class="oc-label" for="oc-dpi">DPI</label>
        <div class="oc-dpi-wrap">
          <div class="oc-pills" id="oc-dpi-pills">
            <button class="oc-pill" data-val="72">72</button>
            <button class="oc-pill" data-val="96">96</button>
            <button class="oc-pill" data-val="150">150</button>
            <button class="oc-pill oc-pill--active" data-val="300">300</button>
            <button class="oc-pill" data-val="600">600</button>
          </div>
          <input type="number" id="oc-dpi-custom" class="oc-input-num oc-input-num--sm"
                 value="${this.dpi}" min="72" max="1200" aria-label="Custom DPI">
        </div>
      </div>
    </div>

    <div class="oc-section">
      <h4 class="oc-heading">🖼️ Format &amp; Quality</h4>

      <!-- Format -->
      <div class="oc-row">
        <label class="oc-label">Format</label>
        <div class="oc-pills" id="oc-format">
          <button class="oc-pill oc-pill--active" data-val="jpeg">JPEG</button>
          <button class="oc-pill" data-val="png">PNG</button>
          <button class="oc-pill" data-val="webp">WebP</button>
        </div>
      </div>

      <!-- Quality slider -->
      <div class="oc-row oc-quality-row" id="oc-quality-row">
        <label class="oc-label" for="oc-quality">Quality <span id="oc-quality-val" class="oc-badge">${this.quality}%</span></label>
        <input type="range" id="oc-quality" class="oc-slider" min="60" max="100" step="1" value="${this.quality}" aria-label="JPEG/WebP quality">
      </div>
    </div>

    <div class="oc-section">
      <h4 class="oc-heading">✨ Generative Fill</h4>
      <div class="oc-row">
        <label class="oc-toggle-label" for="oc-genfill">
          <input type="checkbox" id="oc-genfill" class="oc-toggle-cb">
          <span class="oc-toggle-track"></span>
          <span class="oc-toggle-text">Extend canvas with AI fill</span>
        </label>
      </div>
      <div class="oc-genfill-opts" id="oc-genfill-opts" style="display:none">
        <div class="oc-row">
          <label class="oc-label">Target Ratio</label>
          <div class="oc-pills oc-pills--wrap" id="oc-genfill-ar">
            ${ASPECT_RATIOS.filter(r => r.id !== 'free').map(r =>
              `<button class="oc-pill${r.id === this.genFillAR ? ' oc-pill--active' : ''}" data-val="${r.id}">${r.label}</button>`
            ).join('')}
          </div>
        </div>
        <p class="oc-hint">AI will expand the image edges to fit the chosen ratio. Works best with Enhance or Restore tools.</p>
      </div>
    </div>

    <!-- Live output summary -->
    <div class="oc-summary" id="oc-summary"></div>
    `;
    this._updateSummary();
  }

  /* ── Bind all events ─────────────────────────────────────── */
  _bind() {
    const el = document.getElementById('oc-body');
    if (!el) return;

    // Orientation pills
    el.querySelector('#oc-orientation')?.addEventListener('click', e => {
      const btn = e.target.closest('.oc-pill');
      if (!btn) return;
      this._setActivePill('#oc-orientation', btn.dataset.val);
      this.orientation = btn.dataset.val;
      this._updateSummary();
    });

    // Size preset
    el.querySelector('#oc-preset')?.addEventListener('change', e => {
      this.preset = e.target.value;
      const p = SIZE_PRESETS.find(x => x.id === this.preset);
      // Show/hide custom row
      const customRow = el.querySelector('#oc-custom-row');
      if (customRow) customRow.style.display = this.preset === 'custom' ? 'flex' : 'none';
      // Auto-set DPI from preset
      if (p && p.dpi) {
        this.dpi = p.dpi;
        el.querySelector('#oc-dpi-custom').value = this.dpi;
        this._setActivePill('#oc-dpi-pills', String(p.dpi));
      }
      this._updateSummary();
    });

    // Custom W/H
    el.querySelector('#oc-cw')?.addEventListener('input', e => {
      this.customW = parseInt(e.target.value) || this.customW;
      this._updateSummary();
    });
    el.querySelector('#oc-ch')?.addEventListener('input', e => {
      this.customH = parseInt(e.target.value) || this.customH;
      this._updateSummary();
    });

    // DPI pills
    el.querySelector('#oc-dpi-pills')?.addEventListener('click', e => {
      const btn = e.target.closest('.oc-pill');
      if (!btn) return;
      this.dpi = parseInt(btn.dataset.val);
      el.querySelector('#oc-dpi-custom').value = this.dpi;
      this._setActivePill('#oc-dpi-pills', btn.dataset.val);
      this._updateSummary();
    });

    // DPI custom input
    el.querySelector('#oc-dpi-custom')?.addEventListener('input', e => {
      const v = parseInt(e.target.value);
      if (v >= 72 && v <= 1200) {
        this.dpi = v;
        this._setActivePill('#oc-dpi-pills', null); // clear preset selection
        this._updateSummary();
      }
    });

    // Format pills
    el.querySelector('#oc-format')?.addEventListener('click', e => {
      const btn = e.target.closest('.oc-pill');
      if (!btn) return;
      this.format = btn.dataset.val;
      this._setActivePill('#oc-format', btn.dataset.val);
      // Hide quality for PNG
      const qRow = el.querySelector('#oc-quality-row');
      if (qRow) qRow.style.display = this.format === 'png' ? 'none' : 'flex';
      this._updateSummary();
    });

    // Quality slider
    el.querySelector('#oc-quality')?.addEventListener('input', e => {
      this.quality = parseInt(e.target.value);
      const badge = el.querySelector('#oc-quality-val');
      if (badge) badge.textContent = `${this.quality}%`;
      this._updateSummary();
    });

    // Gen fill toggle
    el.querySelector('#oc-genfill')?.addEventListener('change', e => {
      this.genFill = e.target.checked;
      const opts = el.querySelector('#oc-genfill-opts');
      if (opts) opts.style.display = this.genFill ? 'block' : 'none';
      this._updateSummary();
    });

    // Gen fill aspect ratio pills
    el.querySelector('#oc-genfill-ar')?.addEventListener('click', e => {
      const btn = e.target.closest('.oc-pill');
      if (!btn) return;
      this.genFillAR = btn.dataset.val;
      this._setActivePill('#oc-genfill-ar', btn.dataset.val);
      this._updateSummary();
    });
  }

  _setActivePill(groupSelector, val) {
    const panel = document.getElementById('oc-body');
    if (!panel) return;
    panel.querySelectorAll(`${groupSelector} .oc-pill`).forEach(b => {
      b.classList.toggle('oc-pill--active', val !== null && b.dataset.val === val);
    });
  }

  /* ── Live output summary ─────────────────────────────────── */
  _updateSummary() {
    const { w, h } = this.getOutputDimensions();
    const formatLabel = this.format.toUpperCase();
    const qLabel = this.format !== 'png' ? ` · Q${this.quality}` : '';
    const fillLabel = this.genFill ? ` · Gen-Fill ${this.genFillAR}` : '';
    const preset = SIZE_PRESETS.find(p => p.id === this.preset);
    const sizeLabel = preset && preset.id !== 'orig' ? `${preset.label} · ` : '';

    const summary = document.getElementById('oc-summary');
    if (summary) {
      summary.innerHTML = `
        <span class="oc-summary__item">📏 ${w ? w + '×' + h + 'px' : 'Original size'}</span>
        <span class="oc-summary__item">🖨 ${this.dpi} DPI</span>
        <span class="oc-summary__item">💾 ${sizeLabel}${formatLabel}${qLabel}</span>
        ${fillLabel ? `<span class="oc-summary__item">✨ ${fillLabel}</span>` : ''}
      `;
    }
  }

  /* ── Public getters ──────────────────────────────────────── */

  /** Returns target {w, h} in pixels accounting for orientation */
  getOutputDimensions() {
    const preset = SIZE_PRESETS.find(p => p.id === this.preset);
    let w = preset?.w || null;
    let h = preset?.h || null;

    if (this.preset === 'custom') {
      w = this.customW;
      h = this.customH;
    }

    if (w && h) {
      // Apply orientation swap
      if (this.orientation === 'landscape' && h > w) [w, h] = [h, w];
      if (this.orientation === 'portrait'  && w > h) [w, h] = [h, w];
      if (this.orientation === 'square')             [w, h] = [Math.max(w,h), Math.max(w,h)];
    }

    return { w, h };
  }

  /**
   * Tells Gemini to recompose the image to the target orientation/aspect ratio
   * BEFORE sending the result back — so a portrait subject becomes landscape, etc.
   */
  getOrientationPromptFragment() {
    const { w, h } = this.getOutputDimensions();
    if (!w || !h) return ''; // 'Original' preset — no recomposition needed

    const ratio = (w / h).toFixed(2);
    const preset = SIZE_PRESETS.find(p => p.id === this.preset);
    const presetLabel = preset && preset.id !== 'orig' && preset.id !== 'custom'
      ? ` (${preset.label})` : '';

    let orientLabel = '';
    if (this.orientation === 'landscape') orientLabel = 'landscape (wider than tall)';
    else if (this.orientation === 'portrait') orientLabel = 'portrait (taller than wide)';
    else if (this.orientation === 'square')   orientLabel = 'square (equal width and height)';

    return ` IMPORTANT OUTPUT DIMENSIONS: The final output image must be composed and cropped to a ${orientLabel} ${ratio}:1 aspect ratio${presetLabel}. If the source image is in a different orientation, intelligently recompose it — rotate, extend, or crop as needed — so the main subject is well-placed in the new ${orientLabel} frame. Use generative fill to extend the canvas if necessary to achieve the target ratio without cutting off the subject.`;
  }

  /** Builds the gen-fill prompt fragment to append to the AI prompt */
  getGenFillPromptFragment() {
    if (!this.genFill) return '';
    const ratio = ASPECT_RATIOS.find(r => r.id === this.genFillAR);
    const label = ratio ? ratio.label : this.genFillAR;
    return ` Extend and expand the image canvas to fill a ${label} aspect ratio using generative fill — seamlessly continue the background, scenery and environment beyond the original edges. Keep the main subject exactly as is.`;
  }

  /**
   * Renders the result image onto a canvas with the chosen dimensions,
   * orientation and quality, then returns a data URL ready for download.
   *
   * @param {string} srcDataUrl - the base64 data URL from the API result
   * @returns {Promise<{dataUrl: string, filename: string}>}
   */
  async renderForDownload(srcDataUrl) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const { w, h } = this.getOutputDimensions();
        const outW = w || img.naturalWidth;
        const outH = h || img.naturalHeight;

        const canvas = document.createElement('canvas');
        canvas.width  = outW;
        canvas.height = outH;
        const ctx = canvas.getContext('2d');

        // Fill white background (important for JPEG)
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, outW, outH);

        // Draw image scaled + centered with letterboxing
        const scale = Math.min(outW / img.naturalWidth, outH / img.naturalHeight);
        const dw = img.naturalWidth  * scale;
        const dh = img.naturalHeight * scale;
        const dx = (outW - dw) / 2;
        const dy = (outH - dh) / 2;
        ctx.drawImage(img, dx, dy, dw, dh);

        // Embed DPI in PNG metadata via tEXt chunk isn't natively possible in canvas,
        // but we record it in the filename so the print shop knows.
        const mimeMap = { jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp' };
        const mime    = mimeMap[this.format] || 'image/jpeg';
        const quality = this.format !== 'png' ? this.quality / 100 : undefined;
        const dataUrl = canvas.toDataURL(mime, quality);

        const presetLabel = SIZE_PRESETS.find(p => p.id === this.preset)?.label
                              .replace(/[^a-z0-9]/gi, '-').toLowerCase() || 'custom';
        const filename = `photo-square_${presetLabel}_${outW}x${outH}_${this.dpi}dpi.${this.format === 'jpeg' ? 'jpg' : this.format}`;

        resolve({ dataUrl, filename });
      };
      img.onerror = () => reject(new Error('Failed to load result image for rendering.'));
      img.src = srcDataUrl;
    });
  }
}
