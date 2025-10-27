module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"], // customize as you want
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
