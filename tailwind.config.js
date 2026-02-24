/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./blog/**/*.html", "./servicios/**/*.html", "./fidelizacion/**/*.html", "./js/**/*.js", "./_templates/**/*.html"],
  safelist: [
    'mt-[90px]',
    'md:mt-[110px]'
  ],
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
          '50%': { transform: 'translateY(-50px)' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-15deg)' },
          '50%': { transform: 'rotate(15deg)' },
        },
        'bounce-horizontal': {
            '0%, 100%': { transform: 'translateX(0)' },
            '50%': { transform: 'translateX(-5px)' },
        }
      },
      animation: {
        float: 'float 5s ease-in-out infinite',
        sway: 'sway 5s ease-in-out infinite',
        'bounce-horizontal': 'bounce-horizontal 2s infinite',
      },
    }
  },
  plugins: [],
}
