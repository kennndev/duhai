import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#F8F4EA",
        paper: "#FFFDF7",
        ink: "#111111",
        mutedInk: "#555555",
        forest: "#12372A",
        oxblood: "#5A1A1A",
        gold: "#B08D57",
        border: "#DED6C8",
        danger: "#B42318",
        success: "#166534",
        warning: "#B45309"
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", "Times New Roman", "serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      boxShadow: {
        paper: "0 18px 50px rgba(17, 17, 17, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
