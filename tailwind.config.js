/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#D4AF37', // Donor gold
        secondary: '#080506', // Donor dark base
        accent: '#F5E9D2', // Warm light accent for dark theme
        text: '#F6F1E8', // Warm text tone
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        cormorant: ['Great Vibes', 'cursive'],
        poppins: ['Montserrat', 'sans-serif'],
        inter: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
