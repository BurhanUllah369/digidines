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
        headerBg: "#D3A8A4",
      },
      screens: {
        xs: "375px",
      },
      boxShadow: {
        customShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
      },
    },
  },
  plugins: [],
};
