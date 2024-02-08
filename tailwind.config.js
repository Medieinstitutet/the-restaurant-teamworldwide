/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {

          "primary": "#CFC1AF",

          "secondary": "#D2BFA1",

          "accent": "#78B2C4",

          "neutral": "#1088A0",

          "base-100": "#ffffff",

          "info": "#00b5ff",

          "success": "#ffffff",

          "warning": "#ffbe00",

          "error": "#ff5861",
        },
      },
    ],
  },
}

