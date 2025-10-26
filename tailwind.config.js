/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'brand-green': '#6B755A',
        'brand-light': '#DED2C4',
        'brand-medium': '#C5AB94',
        'brand-gray-light': '#BEC2B4',
        'brand-gray-dark': '#D3D3CB',
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Lato', 'sans-serif'],
      }
    }
  },
  plugins: [],
}

