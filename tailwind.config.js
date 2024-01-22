/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      display: ["Readex Pro"],
    },
  },
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
  // corePlugins: {
  //   aspectRatio: false,
  // },
  // eslint-disable-next-line no-undef
  // plugins: [require("daisyui")],
};
// , require("@tailwindcss/aspect-ratio")
