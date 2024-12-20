/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        orangered: "#ff4500",
        orangeDark: "#502D20FF",
        backgroundColor: "#191c23",
        black: "#000000",
        dodgerblue: "#1e90ff",
        red: "#FF1E1EFF",
        yellow: "#E9FF1EFF",
        "primary-400": "#52FAAE",
        "primary-500": "#1AF7A9",
        "primary-600": "#13D4A3",
        "primary-700": "#0DB198",
        "primary-800": "#088F87",
        "primary-900": "#047176",
        "neutral-100": "#F0F0F0",
        "neutral-200": "#DEDEDE",
        "neutral-300": "#A7A4A4",
        "neutral-400": "#65636F",
        "neutral-500": "#383846",
        "neutral-600": "#2D2C3B",
        "neutral-700": "#242332",
        "neutral-800": "#1B1A28",
        "neutral-900": "#171423",
        "neutral-black": "#120E21",
        "border-color": "#2D2C3B",
        "deep-purple": "#804DEF",
        "bright-cyan": "#4EDBF9",
        "vivid-green": "#1AF7A9",
        green: "#1AF7A9",
      },
    },
    boxShadow: {
      custom: "0px 10px 10px rgba(0, 0, 0, 0.4)",
    },
  },
  plugins: [],
};
