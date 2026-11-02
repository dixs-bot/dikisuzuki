/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        suzuki: {
          blue: "#123B78",
          neon: "#168BFF",
          ice: "#EAF4FF",
          charcoal: "#172438",
          gold: "#D4AF37",
        },
      },
    },
  },
  plugins: [],
};
