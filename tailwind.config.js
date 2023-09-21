/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./components/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  important: true,
  safelist: [
    "hidden",
    {
      pattern: /hidden/,
      variants: ["sm", "md", "lg", "xl", "2xl"],
    },
    "block",
    {
      pattern: /block/,
      variants: ["sm", "md", "lg", "xl", "2xl"],
    },
  ],
  theme: {
    extend: {
      screens: {
        "max-xl": { max: "1279px" },
        "max-lg": { max: "1023px" },
        "max-md": { max: "767px" },
        "max-sm": { max: "639px" },
        "hover-only": { raw: "(hover: hover)" },
      },
      container: {
        center: true,
        padding: "24px",
      },
      fontFamily: {
        ekacon: ["ekachon", "sans-serif"],
      },
      fontSize: {
        xs: ["12px", "1.5em"],
        sm: ["16px", "1em"],
        base: ["20px", "1.65em"],
        lg: ["30px", "1.46em"],
      },
      colors: {
        "project-orange-500": "#EC6B1E",
        "project-blue-500": "#010966",
        "project-gray-500": "#F2F2F2",
        "project-gray-600": "#CCCCCC",
        "project-gray-700": "#727272",
        "project-gray-800": "#707070",
        "project-gray-900": "#373F45",
      },
      backgroundImage: {
        check: "url(/images/icons/check.svg)",
        "angle-right-orange": "url(/images/icons/angle-right-orange.svg)",
      },
    },
  },
  plugins: [
    require("prettier-plugin-tailwindcss"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
  ],
};
