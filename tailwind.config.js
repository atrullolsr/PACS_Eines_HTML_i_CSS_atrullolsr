/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,scss,css}",
    "./src/components/**/*.{html,js}"
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#8b5a2b',    // Argila/Fang
        'brand-secondary': '#d4af37',  // Or/Foc
        'brand-dark': '#1a1a1a',       // El fons fosc
        'brand-light': '#fdfaf6',      // El fons clar
      },
      fontFamily: {
        'sans': ['Manrope', 'sans-serif'], // La tipografia que triessis
      },
    },
  },
  plugins: [],
}