/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{tsx, ts}"],
  theme: {
    extend: {
      colors: {
        "fade-navy": "#333545",
        "dark-navy": "#222539",
        "light-navy": "#323653",
        pink: "#DC3558",
        seagreen: "#1EA38C",
        "dark-green": "#4BBD5D",
        "ticket-navy": "#182133",
        "ticket-yellow": "#FFDE9C",
      },
      fontFamily: {
        "roboto-regular": ["Roboto-Regular", "sans-serif"],
        "roboto-bold": ["Roboto-Bold", "sans-serif"],
        "roboto-medium": ["Roboto-Medium", "sans-serif"],
        "roboto-italic": ["Roboto-Italic", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        "montserrat-bold": ["Montserrat-Bold", "sans-serif"],
        "montserrat-thin": ["Montserrat-Thin", "sans-serif"]
      },
    },
  },
  plugins: [],
};
