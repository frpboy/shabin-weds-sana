import { describe, it, expect } from 'vitest';
import { generateGoogleCalendarUrl } from '../lib/calendar';
import { getWhatsAppShareUrl } from '../lib/share';

describe('Foundational Utilities & Link Generation', () => {
  it('should generate valid Google Calendar URL', () => {
    const url = generateGoogleCalendarUrl({
      title: 'Wedding Nikah: Shabin & Sana',
      details: 'Blessed wedding celebration',
      location: 'Shifa Convention Center, Perinthalmanna',
      startDateIso: '2026-07-19T16:30:00+05:30',
      durationHours: 5,
    });

    expect(url).toContain('https://calendar.google.com/calendar/render');
    expect(url).toContain('Shabin');
    expect(url).toContain('Shifa%20Convention%20Center');
  });

  it('should format WhatsApp share links correctly', () => {
    const text = 'Join our celebration on July 19';
    const share = getWhatsAppShareUrl(text);
    expect(share).toBe('https://api.whatsapp.com/send?text=Join%20our%20celebration%20on%20July%2019');
  });
});
