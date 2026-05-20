export const COLORS = {
  PRIMARY: '#D4AF37',    // Donor gold
  SECONDARY: '#080506',  // Donor cinematic dark base
  ACCENT: '#F5E9D2',     // Warm light accent for headings on dark base
  TEXT: '#F6F1E8',       // Warm text tone
  WHITE: '#FFFFFF',
  GLASS_BG: 'rgba(255, 255, 255, 0.06)',
  GLASS_BORDER: 'rgba(212, 175, 55, 0.28)',
} as const;

export const TYPOGRAPHY = {
  FONTS: {
    HEADING_CINZEL: "'Cinzel', serif",
    HEADING_CORMORANT: "'Great Vibes', cursive",
    BODY_POPPINS: "'Montserrat', sans-serif",
    BODY_INTER: "'Montserrat', sans-serif",
  },
  SIZES: {
    XS: '0.75rem',
    SM: '0.875rem',
    BASE: '1rem',
    LG: '1.125rem',
    XL: '1.25rem',
    '2XL': '1.5rem',
    '3XL': '1.875rem',
    '4XL': '2.25rem',
    '5XL': '3rem',
    '6XL': '3.75rem',
  },
} as const;

export const SPACING = {
  SECTION_Y: '5rem',
  CONTAINER_PX: '1.5rem',
  GAP_SM: '0.5rem',
  GAP_MD: '1rem',
  GAP_LG: '2rem',
  GAP_XL: '3rem',
} as const;

export const themeTokens = {
  COLORS,
  TYPOGRAPHY,
  SPACING,
};
