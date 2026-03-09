/* ============================================================
   PHOTO SQUARE — API Handler (Gemini Image Generation)
   ============================================================ */

/** Default API key — users must set their own key in Settings (⚙️) */
const DEFAULT_API_KEY = '';  // intentionally blank — default was revoked
const STORAGE_KEY     = 'ps-gemini-api-key';

/**
 * Model priority list — most capable first.
 * gemini-2.5-flash-image  : stable, image generation + editing (confirmed working)
 * gemini-3.1-flash-image-preview : newer preview with 2K/4K output support
 */
const GEMINI_MODEL    = 'gemini-2.5-flash-image';
const API_TIMEOUT_MS  = 90000;  // 90s — image gen can be slow

/** Default negative prompt terms always included to improve quality */
const DEFAULT_NEGATIVE_PROMPTS = [
  'blurry', 'out of focus', 'noise', 'grain', 'distorted face',
  'extra fingers', 'extra limbs', 'deformed hands', 'disfigured',
  'watermark', 'text overlay', 'logo', 'artifacts', 'pixelated',
  'low quality', 'overexposed', 'underexposed', 'color bleeding',
].join(', ');

/** Returns the user-saved API key, or empty string if none set */
export function getActiveApiKey() {
  return localStorage.getItem(STORAGE_KEY) || DEFAULT_API_KEY;
}

/** Returns true if a usable key is available */
export function hasUsableApiKey() {
  const k = getActiveApiKey();
  return k && k.length > 10;
}

/** Saves a custom API key to localStorage */
export function saveApiKey(key) {
  const k = key ? key.trim() : '';
  if (k) {
    localStorage.setItem(STORAGE_KEY, k);
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
}

/** Clears user's custom key, reverting to default */
export function resetApiKey() {
  localStorage.removeItem(STORAGE_KEY);
}

/** Returns true if the user has set a custom key */
export function hasCustomApiKey() {
  return !!localStorage.getItem(STORAGE_KEY);
}

/**
 * Main entry point called by dashboard.js
 *
 * @param {object}   opts
 * @param {string}   opts.base64          Uploaded image as data URL (data:image/...)
 * @param {string[]} opts.selectedTools   Array of selected tool IDs
 * @param {string}   opts.prompt          Auto-generated tool prompt from prompt-builder.js
 * @param {string}   [opts.customText]    Optional extra instructions from user
 * @param {string}   [opts.negativePrompt] Things to avoid in the result
 * @returns {Promise<string>} Result image as a data URL
 */
export async function handleApiProcess({
  base64,
  selectedTools,
  prompt,
  customText    = '',
  negativePrompt = '',
}) {
  const fullPrompt = buildFullPrompt(prompt, customText, negativePrompt);
  console.log('[Gemini] Model:', GEMINI_MODEL);
  console.log('[Gemini] Prompt:', fullPrompt);
  console.log('[Gemini] Tools:', selectedTools);

  const resultDataUrl = await generateWithGemini(base64, fullPrompt);
  return resultDataUrl;
}

/* ─────────────────────────────────────────────────────────────
   Internal helpers
───────────────────────────────────────────────────────────── */

/**
 * Builds the final prompt string sent to Gemini.
 */
function buildFullPrompt(toolPrompt, customText, negativePrompt) {
  let full = toolPrompt;

  if (customText && customText.trim()) {
    full += ` Additional instructions: ${customText.trim()}.`;
  }

  // Merge user negative prompt with defaults
  const userNeg   = negativePrompt ? negativePrompt.trim() : '';
  const mergedNeg = userNeg
    ? `${DEFAULT_NEGATIVE_PROMPTS}, ${userNeg}`
    : DEFAULT_NEGATIVE_PROMPTS;

  full += ` Do NOT include or produce any of the following: ${mergedNeg}.`;

  return full;
}

/**
 * Sends the image + prompt to the Gemini API and returns the result as a data URL.
 *
 * API reference:
 *   https://ai.google.dev/gemini-api/docs/image-generation
 *
 * Model: gemini-2.5-flash-image (stable)
 * Endpoint: POST https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent
 *
 * Request body:
 *   contents[].parts[] = [{ text }, { inline_data: { mime_type, data } }]
 *   generationConfig.responseModalities = ['TEXT', 'IMAGE']
 *
 * Response:
 *   candidates[0].content.parts[] — may contain text parts and/or
 *   inlineData parts (base64-encoded PNG/JPEG)
 */
async function generateWithGemini(imageBase64, prompt) {
  const apiKey = getActiveApiKey();

  if (!apiKey) {
    throw new Error('No API key set. Click ⚙️ Settings to enter your Gemini API key. Get one free at aistudio.google.com/apikey');
  }

  // Separate mime type and raw base64 data from the data URL
  const mimeMatch = imageBase64.match(/^data:([^;]+);base64,/);
  const mimeType  = mimeMatch ? mimeMatch[1] : 'image/jpeg';
  const rawBase64 = imageBase64.replace(/^data:[^;]+;base64,/, '');

  const requestBody = {
    contents: [
      {
        parts: [
          { text: prompt },
          {
            inline_data: {
              mime_type: mimeType,
              data: rawBase64,
            },
          },
        ],
      },
    ],
    generationConfig: {
      responseModalities: ['TEXT', 'IMAGE'],
    },
  };

  const endpoint =
    `https://generativelanguage.googleapis.com/v1beta/models/` +
    `${GEMINI_MODEL}:generateContent?key=${apiKey}`;

  // Race the fetch against a timeout
  const res = await Promise.race([
    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    }),
    new Promise((_, reject) =>
      setTimeout(
        () => reject(new Error('Request timed out after 60 seconds. Please try again.')),
        API_TIMEOUT_MS
      )
    ),
  ]);

  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    let msg = `Gemini API error (HTTP ${res.status})`;
    try {
      const errJson = JSON.parse(errText);
      msg = errJson.error?.message || msg;
      // Surface API key errors clearly
      if (res.status === 400 && msg.includes('API key')) {
        msg = 'Invalid API key. Click ⚙️ Settings to update it.';
      }
      if (res.status === 403) {
        msg = 'API key denied (403). It may be revoked, leaked, or lack access to this model. Click ⚙️ Settings to enter a valid key.';
      }
    } catch { /* ignore JSON parse errors */ }
    throw new Error(msg);
  }

  const data  = await res.json();
  const parts = data?.candidates?.[0]?.content?.parts ?? [];

  // Return the first image part found
  for (const part of parts) {
    if (part.inlineData?.data) {
      const mime = part.inlineData.mimeType || 'image/png';
      return `data:${mime};base64,${part.inlineData.data}`;
    }
  }

  // Gemini returned text only — surface it as a helpful error
  const textMsg = parts
    .filter(p => p.text)
    .map(p => p.text)
    .join(' ')
    .trim();

  throw new Error(
    textMsg ||
    'Gemini did not return an image. Try selecting different tools or adding more detail.'
  );
}
