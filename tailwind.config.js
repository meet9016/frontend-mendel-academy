/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1280px",
      },
    },

    extend: {
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui", "sans-serif"],
      },

      colors: {
        primary: {
          DEFAULT: "#FFCA00",
          foreground: "#000000",
        },
        secondary: {
          DEFAULT: "#D9AF07",
          foreground: "#000000",
        },
      },

      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },

      boxShadow: {
        soft: "0 10px 25px -5px rgba(0,0,0,0.1)",
      },
    },
  },

  plugins: [
    require("@tailwindcss/typography"),
  ],
};
