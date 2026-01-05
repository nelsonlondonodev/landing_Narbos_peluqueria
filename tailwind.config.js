/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./blog/**/*.html", "./js/**/*.js"],

  theme: {
    extend: {
      colors: {
        'brand-green': '#6B755A',
        'brand-light': '#C7B8A8',
        'brand-medium': '#C5AB94',
        'brand-gray-light': '#858A76',
        'brand-gray-dark': '#364041',
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Montserrat', 'sans-serif'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-5deg)' },
          '50%': { transform: 'rotate(5deg)' },
        }
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float-slow 8s ease-in-out infinite',
        'float-delayed': 'float 7s ease-in-out infinite 2s',
        sway: 'sway 4s ease-in-out infinite',
      },
    }
  },
  plugins: [],
}

