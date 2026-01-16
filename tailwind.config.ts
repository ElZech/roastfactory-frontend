import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        fire: {
          DEFAULT: "#FF4500",
          light: "#FF6B35",
          ember: "#E94560",
          heat: "#FF8C42",
        },
        dark: {
          DEFAULT: "#0D0D0D",
          lighter: "#1A1A2E",
          navy: "#16213E",
          midnight: "#0F3460",
        },
        neon: {
          pink: "#E94560",
          blue: "#00D9FF",
        },
      },
      fontFamily: {
        heading: ["Bebas Neue", "Impact", "sans-serif"],
        body: ["Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
      animation: {
        "pulse-fire": "pulse-fire 2s ease-in-out infinite",
        "float-up": "float-up 1s ease-out forwards",
        "scale-in": "scale-in 0.2s ease-out",
      },
      keyframes: {
        "pulse-fire": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        "float-up": {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "100%": { transform: "translateY(-100px)", opacity: "0" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
