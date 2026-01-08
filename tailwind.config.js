/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./blog/**/*.html", "./js/**/*.js"],


  theme: {
    extend: {
      colors: {
        'brand-green': '#6B755A',
        'brand-light': '#DED2C4',
        'brand-medium': '#C5AB94',
        'brand-gray-light': '#BEC2B4',
        'brand-gray-lighter': '#D3D3CB',
        'brand-gray-dark': '#364041',
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Montserrat', 'sans-serif'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-50px)' }, // Movimiento vertical fuerte
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-15deg)' },
          '50%': { transform: 'rotate(15deg)' },
        }
      },
      animation: {
        float: 'float 5s ease-in-out infinite',
        sway: 'sway 5s ease-in-out infinite',
      },
    }
  },
  plugins: [],
}

