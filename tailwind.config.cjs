/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        hero: "url('/bg-s.jpg')",
        home_banner:
          "linear-gradient(155deg, rgb(59 130 246) 6.67%, rgb(191 219 254) 84.1%)",
      },
      colors: {
        banner: "#F8F8F8",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
