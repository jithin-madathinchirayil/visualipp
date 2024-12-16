/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        doto: ['Doto','sans-serif']
      },
      colors: {
        primary: {
          default: '#4A628A',
          medium: '#7AB2D3',
          low: '#B9E5E8',
          light: '#DFF2EB'
        },
        secondary: {
          default: '#8A724A'
        },
      }
    }
  },
  plugins: [],
}

