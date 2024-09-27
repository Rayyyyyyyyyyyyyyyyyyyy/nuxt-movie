/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#736253",
          light: "#D9B391",
          dark: "#262626",
        },
        secondary: {
          DEFAULT: "#A6A18A",
        },
        success: {
          DEFAULT: "#40c1ad",
          light: "#52c41a",
        },

        bg: {
          DEFAULT: "#F2F2F0",
        },
        text: {
          DEFAULT: "#262626",
        },
      },
    },
  },
  plugins: [],
};
