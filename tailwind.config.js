/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        nunito: '"Nunito", sans-serif',
      },
      fontWeight: {},
      colors: {
        mainColor: "#A34A41",
        hoverColor: "#E3C8C6",
        buttonHoverColor: "#AA5850",
        textColor: "#2A2322",
      },
      screens: {
        xs: '375px'
      }
    },
  },
  plugins: [],
};
