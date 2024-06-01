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
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [],
  },
};
