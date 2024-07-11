/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      screens: {
        md: "950px",
      },
      colors: {
        brown: "#fe9446",
        bronze: "#98582a",
        base: "#fff4f2",
        origin: "#fb9333",
      },
      gridTemplateColumns: {
        footer: "2fr repeat(2, 1.2fr) 1.5fr  2fr",
      },
    },
  },
  plugins: [],
};
