/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./blog/**/*.html", "./js/**/*.js"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'brand-green': '#6B755A',
        'brand-light': '#C7B8A8',
        'brand-medium': '#C5AB94',
        'brand-gray-light': '#5C6F70',
        'brand-gray-dark': '#364041',
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Lato', 'sans-serif'],
      }
    }
  },
  plugins: [],
}

