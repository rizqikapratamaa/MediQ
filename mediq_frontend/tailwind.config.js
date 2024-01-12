/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors : {
        'half-opacity-blue' : 'rgba(88,226,221,0.1)',
      }
    },
  },
  plugins: [],
};
