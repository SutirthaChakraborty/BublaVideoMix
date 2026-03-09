/* ============================================================
   PHOTO SQUARE — Smart Prompt Generator
   ============================================================ */

const TOOLS = [
  {
    id: 'remove_bg',
    emoji: '🖼️',
    label: 'Remove BG',
    fragment: 'remove the background cleanly, make background transparent or white',
  },
  {
    id: 'restore',
    emoji: '✨',
    label: 'Restore Photo',
    fragment: 'restore this old or damaged photo, fix scratches tears fading and discolouration while keeping all original faces and people intact',
  },
  {
    id: 'enhance',
    emoji: '📸',
    label: 'Enhance Quality',
    fragment: 'enhance overall image quality sharpness and clarity without changing the subjects or faces',
  },
  {
    id: 'cinematic',
    emoji: '🎬',
    label: 'Cinematic',
    fragment: 'apply a cinematic colour grade and mood, keep all faces and people exactly as they are',
  },
  {
    id: 'colorize',
    emoji: '🌈',
    label: 'Colorize B&W',
    fragment: 'naturally colorize this black and white photo with realistic colours, preserve all faces and identities exactly',
  },
  {
    id: 'super_res',
    emoji: '🔍',
    label: 'Super Resolution',
    fragment: 'upscale to super resolution 4x, recover fine details, keep every face and feature sharp and accurate',
  },
  {
    id: 'face_enhance',
    emoji: '👤',
    label: 'Face Enhance',
    fragment: 'enhance and sharpen face details, improve skin texture and eye clarity while keeping the persons identity completely unchanged',
  },
  {
    id: 'skin_retouch',
    emoji: '💆',
    label: 'Skin Retouch',
    fragment: 'smooth and retouch skin naturally, reduce blemishes and uneven tone, keep the faces natural look and identity',
  },
  {
    id: 'lighting',
    emoji: '💡',
    label: 'Lighting Fix',
    fragment: 'fix and balance the lighting and exposure evenly across the image, do not alter any faces or people',
  },
  {
    id: 'artistic',
    emoji: '🎭',
    label: 'Artistic Portrait',
    fragment: 'apply an elegant artistic portrait effect, keep facial features and identity fully intact',
  },
];

const FACE_GUARD = 'IMPORTANT: Preserve ALL faces and people in the photo exactly as they are — do not change, alter, replace, or generate any new faces. Keep every persons identity, expression, and likeness 100% true to the original.';

export class PromptBuilder {
  constructor() {
    this.selected     = new Set();
    this.facePreserve = true;
    this.render();
    this.bindEvents();
  }

  render() {
    const grid = document.getElementById('toolsGrid');
    if (!grid) return;
    grid.innerHTML = TOOLS.map(t => `
      <button class="tool-btn" data-tool="${t.id}" type="button" aria-pressed="false">
        <span class="tool-btn__icon" aria-hidden="true">${t.emoji}</span>
        <span class="tool-btn__label" data-i18n="portal.tools.${t.id}">${t.label}</span>
      </button>
    `).join('');
  }

  bindEvents() {
    const grid = document.getElementById('toolsGrid');
    if (grid) {
      grid.addEventListener('click', e => {
        const btn = e.target.closest('.tool-btn');
        if (btn) this.toggleTool(btn);
      });
    }

    const faceToggle = document.getElementById('facePreserveToggle');
    if (faceToggle) {
      faceToggle.checked = this.facePreserve;
      faceToggle.addEventListener('change', () => {
        this.facePreserve = faceToggle.checked;
      });
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
      if (this.selected.size >= 6) {
        alert('You can select up to 6 tools at once.');
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
    container.innerHTML = this.selected.size === 0
      ? ''
      : Array.from(this.selected).map(id => {
          const t = TOOLS.find(x => x.id === id);
          return t ? `<span class="tool-tag">${t.emoji} ${t.label}</span>` : '';
        }).join('');
  }

  generateAndShow() {
    if (this.selected.size === 0) {
      alert('Please select at least one tool first.');
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
    if (this.selected.size === 0) return '';
    const prompt = this.buildPromptText();
    const area   = document.getElementById('promptArea');
    const text   = document.getElementById('generatedPrompt');
    if (text) text.textContent = prompt;
    if (area) area.classList.add('show');
    return prompt;
  }

  buildPromptText() {
    const fragments = Array.from(this.selected)
      .map(id => TOOLS.find(t => t.id === id)?.fragment || '')
      .filter(Boolean);

    let prompt = `You are a professional photo editor. Edit the provided photo as follows: ${fragments.join('; ')}. Output a high-quality photorealistic result suitable for printing.`;

    if (this.facePreserve) {
      prompt += ` ${FACE_GUARD}`;
    }

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
