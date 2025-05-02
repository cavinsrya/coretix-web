/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-maison-neue)"],
        figtree: ["var(--font-figtree)"], // kamu bisa pakai font-figtree di Tailwind class
      },
    },
  },
  plugins: [],
};
