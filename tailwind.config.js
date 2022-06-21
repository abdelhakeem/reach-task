/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#000e37",
          secondary: "#0076be",
          accent: "#1192d4",
          neutral: "#575556",
          "base-100": "#ffffff",
          "base-content": "#000000",
        },
      },
      {
        dark: {
          primary: "#000e37",
          secondary: "#0076be",
          accent: "#1192d4",
          neutral: "#575556",
          "base-100": "#000000",
          "base-content": "#ffffff",
        },
      },
    ],
  },
};
