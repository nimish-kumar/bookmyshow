/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{tsx, ts}"],
  theme: {
    extend: {
      colors: {
        "fade-navy": "#333545",
        "dark-navy": "#222539",
        "light-navy": "#323653",
        "pink": "#DC3558",
      },
      fontFamily: {
        "roboto-regular": ["Roboto-Regular", "sans-serif"],
        "roboto-bold": ["Roboto-Bold", "sans-serif"],
        "roboto-medium": ["Roboto-Medium", "sans-serif"],
        "roboto-italic": ["Roboto-Italic", "sans-serif"],
      },
    },
  },
  plugins: [],
};
