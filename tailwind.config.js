/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0F1016",
        panel: "#171821",
        panel2: "#1E202B",
        border: "#2A2C3A",
        porcelain: "#EDEDF2",
        muted: "#9497A8",
        violet: {
          DEFAULT: "#8B6BF2",
          soft: "#3A3352",
        },
        teal: {
          DEFAULT: "#2FD9C4",
          soft: "#1B3A38",
        },
        amber: "#F5A524",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      keyframes: {
        pulseDot: {
          "0%, 80%, 100%": { transform: "scale(0.6)", opacity: "0.4" },
          "40%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        pulseDot: "pulseDot 1.2s infinite ease-in-out",
      },
    },
  },
  plugins: [],
};
