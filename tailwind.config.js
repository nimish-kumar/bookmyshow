const { fadeNavy, darkNavy } = require("@assets");

// /** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        "fade-navy": fadeNavy,
        "dark-navy": darkNavy,
      },
    },
  },
  plugins: [],
};
