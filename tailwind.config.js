/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      keyframes : {
        'fadeIn' : {
          '0%' : {opacity : '0%'},
          '100%' : {opacity : '100%'}
        }
      },
      animation : {
        'fadeIn' : 'fadeIn .2s ease-in'
      }
    },
  },
  plugins: [],
}