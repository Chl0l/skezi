/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-yellow": "#F0C300",
        "custom-red": "#6E0B14",
        "custom-green": "#A2D9CE",
      },
    },
  },
  plugins: [],
};
