/* ============================================================
   PHOTO SQUARE — Portal Dashboard (2-step AI flow)

   Step 1: Upload photo → Gemini reads it → returns a structured
           improvement prompt the user can review and edit.
   Step 2: User confirms → Gemini edits the photo with that prompt
           → download the result.
   ============================================================ */

import { FileUploadManager } from './file-upload.js';
import { analyseImageForPrompt, handleApiProcess, hasUsableApiKey } from './api-handler.js';

/* ── System prompt sent to Gemini in Step 1 ──────────────── */
const ANALYSE_SYSTEM_PROMPT = `Read the image carefully, think about what is wrong or could be improved, and write me a detailed prompt to make this image better and professional — DSLR quality, with fixed and improved lighting — so that when this prompt is given to an image generation AI along with the original image, it will produce an amazing, stunning result.

Return ONLY the prompt — no preamble, no explanation, no markdown headers, no bullet points. Just the prompt text as a single flowing paragraph of direct editing instructions.

The prompt you write MUST:
- Describe how to fix the lighting (shadows, highlights, catch-lights, direction and quality of light)
- Specify DSLR-quality improvements: sharp focus, natural shallow depth of field (bokeh) where suitable, correct exposure, clean white balance
- Fix colour grading to look cinematic and professional
- Improve skin tones and remove blemishes if a person is present
- Enhance background — blur, clean up, or replace if distracting
- Keep ALL faces and people EXACTLY as they are — never alter, regenerate or replace any face
- State the final visual target clearly (e.g. "result should look like a studio-lit DSLR portrait")`;

export function initDashboard() {
  const uploader = new FileUploadManager();

  /* ── DOM refs ─────────────────────────────────────────── */
  const analyseBtn       = document.getElementById('analyseBtn');
  const applyBtn         = document.getElementById('applyBtn');
  const regenerateBtn    = document.getElementById('regenerateBtn');
  const hintInput        = document.getElementById('hintInput');
  const generatedPrompt  = document.getElementById('generatedPrompt');
  const promptSection    = document.getElementById('sectionPrompt');
  const processingEl     = document.getElementById('processingOverlay');
  const processingMsg    = document.getElementById('processingMsg');
  const sectionResult    = document.getElementById('sectionResult');
  const sectionTools     = document.getElementById('sectionTools');
  const toolsLock        = document.getElementById('toolsLock');
  const resultImg        = document.getElementById('resultImage');
  const beforeImg        = document.getElementById('beforeImage');
  const downloadBtn      = document.getElementById('downloadBtn');
  const tryAgainBtn      = document.getElementById('tryAgainBtn');
  const newPhotoBtn      = document.getElementById('newPhotoBtn');
  const editPromptBtn    = document.getElementById('editPromptBtn');
  const promptEditArea   = document.getElementById('promptEditArea');
  const charCount        = document.getElementById('promptCharCount');

  if (!analyseBtn) return;

  /* ── Step helpers ─────────────────────────────────────── */
  function setStep(n) {
    document.querySelectorAll('.portal-step').forEach(el => {
      const s = parseInt(el.dataset.step);
      el.classList.remove('active', 'done');
      if (s < n) el.classList.add('done');
      if (s === n) el.classList.add('active');
    });
    document.querySelectorAll('.portal-step__connector').forEach((line, i) => {
      line.classList.toggle('done', i + 1 < n);
    });
  }

  function showProcessing(msg) {
    if (processingMsg) processingMsg.textContent = msg;
    if (processingEl) processingEl.classList.add('show');
  }
  function hideProcessing() {
    if (processingEl) processingEl.classList.remove('show');
  }

  /* ── Unlock section after upload ─────────────────────── */
  document.addEventListener('photo-uploaded', () => {
    if (sectionTools) sectionTools.classList.remove('portal-section--locked');
    if (toolsLock)    toolsLock.style.display = 'none';
    setStep(2);
  });

  /* ── STEP 1: Analyse image → get prompt ─────────────── */
  analyseBtn.addEventListener('click', async () => {
    if (!uploader.getBase64()) { alert('Please upload a photo first.'); return; }

    const { hasUsableApiKey: checkKey } = await import('./api-handler.js');
    if (!checkKey()) {
      document.getElementById('apiSettingsBtn')?.click();
      alert('Please enter your Gemini API key in Settings (⚙️) first.\nGet a free key at: aistudio.google.com/apikey');
      return;
    }

    const hint = hintInput?.value.trim() || '';
    const fullAnalysePrompt = hint
      ? `${ANALYSE_SYSTEM_PROMPT}\n\nAdditional context about this photo: ${hint}. Factor this in when writing the DSLR enhancement prompt.`
      : ANALYSE_SYSTEM_PROMPT;

    analyseBtn.disabled = true;
    showProcessing('🧠 Gemini is reading your photo and writing a DSLR enhancement prompt…');

    try {
      const promptText = await analyseImageForPrompt(uploader.getBase64(), fullAnalysePrompt);
      hideProcessing();

      // Show the prompt section
      if (promptSection) promptSection.classList.remove('portal-section--hidden');
      if (generatedPrompt) generatedPrompt.textContent = promptText;
      if (promptEditArea)  promptEditArea.value = promptText;
      updateCharCount();
      setStep(3);
      promptSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });

    } catch (err) {
      hideProcessing();
      alert('Error analysing photo:\n' + err.message);
    } finally {
      analyseBtn.disabled = false;
    }
  });

  /* ── Regenerate prompt (re-run Step 1) ───────────────── */
  regenerateBtn?.addEventListener('click', () => {
    analyseBtn?.click();
  });

  /* ── Toggle prompt editor ────────────────────────────── */
  editPromptBtn?.addEventListener('click', () => {
    const isEditing = promptEditArea?.style.display !== 'none';
    if (promptEditArea) promptEditArea.style.display = isEditing ? 'none' : 'block';
    if (generatedPrompt) generatedPrompt.style.display = isEditing ? 'block' : 'none';
    if (editPromptBtn) editPromptBtn.textContent = isEditing ? '✏️ Edit Prompt' : '👁️ Preview';
    if (!isEditing) promptEditArea?.focus();
  });

  promptEditArea?.addEventListener('input', () => {
    if (generatedPrompt) generatedPrompt.textContent = promptEditArea.value;
    updateCharCount();
  });

  function updateCharCount() {
    if (!charCount || !promptEditArea) return;
    charCount.textContent = `${promptEditArea.value.length} chars`;
  }

  /* ── STEP 2: Apply prompt → edit image ───────────────── */
  applyBtn?.addEventListener('click', async () => {
    if (!uploader.getBase64()) { alert('Please upload a photo first.'); return; }

    const prompt = promptEditArea?.value.trim() || generatedPrompt?.textContent?.trim();
    if (!prompt) { alert('No prompt to apply. Click "Analyse Photo" first.'); return; }

    applyBtn.disabled = true;
    showProcessing('🚀 Sending your original photo + prompt to Gemini for DSLR enhancement… (may take up to 60s)');
    setStep(3);

    try {
      const resultUrl = await handleApiProcess({
        base64: uploader.getBase64(),
        selectedTools: [],
        prompt,
        customText: '',
        negativePrompt: 'blur, noise, grain, distorted face, altered face, new face, extra fingers, extra limbs, watermark, text overlay, artifacts, low quality, overexposed, underexposed, flat lighting, washed out colors',
      });

      hideProcessing();
      if (sectionResult) sectionResult.classList.remove('portal-section--hidden');
      if (promptSection) promptSection.classList.add('portal-section--hidden');
      if (resultImg) resultImg.src = resultUrl || uploader.getBase64();
      if (beforeImg) beforeImg.src = uploader.getBase64();
      if (downloadBtn) {
        downloadBtn.href     = resultUrl || uploader.getBase64();
        downloadBtn.download = `photo-square-${Date.now()}.jpg`;
      }
      setStep(4);
      sectionResult?.scrollIntoView({ behavior: 'smooth', block: 'start' });

    } catch (err) {
      hideProcessing();
      setStep(2);
      alert('Something went wrong:\n' + err.message);
    } finally {
      applyBtn.disabled = false;
    }
  });

  /* ── Try Again (back to prompt) ──────────────────────── */
  tryAgainBtn?.addEventListener('click', () => {
    if (sectionResult) sectionResult.classList.add('portal-section--hidden');
    if (promptSection) promptSection.classList.remove('portal-section--hidden');
    setStep(2);
    promptSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  /* ── New Photo (full reset) ──────────────────────────── */
  newPhotoBtn?.addEventListener('click', () => location.reload());
}
