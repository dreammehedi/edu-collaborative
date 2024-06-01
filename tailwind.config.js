/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
    },
    fontFamily: {
      "open-sans": ["Open Sans", "sans-serif"],
      roboto: ["Roboto", "sans-serif"],
    },
    extend: {
      colors: {
        "primary-main": "#ffb74d",
        primary: "#5c6bc0",
        secondary: "#7986cv",
        accent: "#F4B400",
        neutral1: "#F5F5F5 ",
        neutral2: "#333333 ",
        "rich-blue": "#0056D2 ",
        coral: "#FF6F61 ",
        "sun-yellow": "#F4B400",
        "light-gray": "#F5F5F5 ",
        "dark-charcoal": "#333333",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [],
  },
};
