/**
 * Safe client-side Gemini API helper.
 * Handles reading `import.meta.env.VITE_GEMINI_API_KEY` without throwing if undefined during initial rendering.
 */

export function getClientGeminiApiKey(): string | null {
  try {
    if (typeof import.meta !== 'undefined' && import.meta.env && typeof import.meta.env.VITE_GEMINI_API_KEY === 'string') {
      const key = import.meta.env.VITE_GEMINI_API_KEY.trim();
      return key.length > 0 ? key : null;
    }
  } catch {
    // Environment variables not accessible or undefined in current runtime context
  }
  return null;
}

export function isGeminiClientConfigured(): boolean {
  return getClientGeminiApiKey() !== null;
}
