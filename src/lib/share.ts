export function getWhatsAppShareUrl(text: string): string {
  return `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
}

export async function shareToInstagram(text: string, url: string): Promise<'native' | 'copied' | 'failed'> {
  const fullText = `${text}\n\nView details & RSVP: ${url}`;
  const shareText = text; // keep URL out of text — navigator.share appends url separately

  // 1. Try native Web Share API (opens share sheet with Instagram, WhatsApp, etc.)
  if (typeof navigator.share === 'function') {
    try {
      await navigator.share({
        title: 'Shabin & Sana — Wedding Invitation',
        text: shareText,
        url: url,
      });
      return 'native';
    } catch (err: unknown) {
      // User cancelled the share sheet — don't do anything else
      if (err instanceof Error && err.name === 'AbortError') return 'failed';
    }
  }

  // 2. Desktop fallback — copy invite link to clipboard, user pastes into Instagram DM
  try {
    await navigator.clipboard.writeText(fullText);
    return 'copied';
  } catch {
    return 'failed';
  }
}
