/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["C:/wed dev/progects/just html,css,js/BMI calc/index.html"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["cupcake"],
  },
  plugins: [require("@tailwindcss/typography"),require("daisyui")],
}

