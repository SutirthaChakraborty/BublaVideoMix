/* ============================================================
   PHOTO SQUARE — Portal Dashboard Controller
   ============================================================ */

import { FileUploadManager } from './file-upload.js?v=20260309e';
import { PromptBuilder }      from './prompt-builder.js?v=20260309e';
import { handleApiProcess }   from './api-handler.js?v=20260309e';

export function initDashboard() {
  // ── Element references ─────────────────────────────────────
  const uploader        = new FileUploadManager();
  const promptBuilder   = new PromptBuilder();

  const processBtn      = document.getElementById('processBtn');
  const processingEl    = document.getElementById('processingOverlay');
  const sectionResult   = document.getElementById('sectionResult');
  const sectionTools    = document.getElementById('sectionTools');
  const toolsLock       = document.getElementById('toolsLock');
  const resultImg       = document.getElementById('resultImage');
  const beforeImg       = document.getElementById('beforeImage');
  const downloadBtn     = document.getElementById('downloadBtn');
  const tryAgainBtn     = document.getElementById('tryAgainBtn');
  const newPhotoBtn     = document.getElementById('newPhotoBtn');

  if (!processBtn) return;

  // ── Step management ────────────────────────────────────────
  function setStep(n) {
    document.querySelectorAll('.portal-step').forEach(el => {
      const s = parseInt(el.dataset.step);
      el.classList.remove('active', 'done');
      if (s < n)  el.classList.add('done');
      if (s === n) el.classList.add('active');
    });
    // update connector lines
    document.querySelectorAll('.portal-step__connector').forEach((line, i) => {
      line.classList.toggle('done', i + 1 < n);
    });
  }

  // ── Unlock tools after upload ──────────────────────────────
  document.addEventListener('photo-uploaded', () => {
    if (sectionTools) sectionTools.classList.remove('portal-section--locked');
    if (toolsLock)    toolsLock.style.display = 'none';
    setStep(2);
  });

  // ── Process button ─────────────────────────────────────────
  processBtn.addEventListener('click', async () => {
    if (!uploader.getBase64()) {
      alert('Please upload a photo first.');
      return;
    }
    if (promptBuilder.selected.size === 0) {
      alert('Please select at least one tool.');
      return;
    }

    // Guard: require an API key before hitting the network
    const { hasUsableApiKey } = await import('./api-handler.js?v=20260309e');
    if (!hasUsableApiKey()) {
      const settingsBtn = document.getElementById('apiSettingsBtn');
      if (settingsBtn) settingsBtn.click();
      alert('Please enter your Gemini API key in Settings (⚙️) first.\n\nGet a free key at: aistudio.google.com/apikey');
      return;
    }

    // generatePrompt() now includes additional instructions inside the prompt text
    const prompt = promptBuilder.generatePrompt();
    if (!prompt) return;

    // Pass empty customText since it's already embedded in prompt by buildPromptText()
    const negativePrompt = promptBuilder.getNegativePrompt();

    // Show processing
    if (processingEl)  processingEl.classList.add('show');
    if (sectionResult) sectionResult.classList.add('portal-section--hidden');
    processBtn.disabled = true;
    setStep(3);

    try {
      const resultUrl = await handleApiProcess({
        base64: uploader.getBase64(),
        selectedTools: Array.from(promptBuilder.selected),
        prompt,
        customText: '',
        negativePrompt,
      });

      // Hide processing, show result
      if (processingEl)  processingEl.classList.remove('show');
      if (sectionResult) sectionResult.classList.remove('portal-section--hidden');

      if (resultImg) resultImg.src = resultUrl || uploader.getBase64();
      if (beforeImg) beforeImg.src = uploader.getBase64();

      // Wire download button (it's an <a> tag now)
      if (downloadBtn) {
        downloadBtn.href     = resultUrl || uploader.getBase64();
        downloadBtn.download = `photo-square-result-${Date.now()}.jpg`;
      }

      setStep(4);

      // Scroll to result
      sectionResult && sectionResult.scrollIntoView({ behavior: 'smooth', block: 'start' });

    } catch (err) {
      if (processingEl) processingEl.classList.remove('show');
      setStep(2);
      alert('Something went wrong. Please try again.\n' + err.message);
    } finally {
      processBtn.disabled = false;
    }
  });

  // ── Try Again (go back to tools) ───────────────────────────
  if (tryAgainBtn) {
    tryAgainBtn.addEventListener('click', () => {
      if (sectionResult) sectionResult.classList.add('portal-section--hidden');
      setStep(2);
      sectionTools && sectionTools.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  // ── New Photo (full reset) ──────────────────────────────────
  if (newPhotoBtn) {
    newPhotoBtn.addEventListener('click', () => {
      location.reload();
    });
  }
}
