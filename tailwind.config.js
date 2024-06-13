/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        expand: {
          "0%": { transform: "scaleY(0)" },
          "50%": { transform: "scaleY(1)" },
          "100%": { transform: "scaleY(0)" },
        },
      },
      animation: {
        expandAnimation: "expand 0.8s ease-out infinite",
      },
    },
  },
  plugins: [],
};
