import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/content.ts",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["IBM Plex Sans", "ui-sans-serif", "system-ui"],
        serif: ["Source Serif 4", "ui-serif", "Georgia"],
      },
      colors: {
        base: {
          900: "#0b0f14",
          800: "#121824",
          700: "#1a2232",
          600: "#2b3446",
          500: "#3e485e",
          400: "#97a2b6",
          300: "#c2c9d6",
          200: "#e2e6ee",
          100: "#f4f6fa",
        },
        accent: {
          500: "#4fd1c5",
          600: "#2bb7ac",
          700: "#1d8f86",
        },
      },
      boxShadow: {
        soft: "0 12px 40px rgba(6, 10, 18, 0.25)",
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to bottom, rgba(255,255,255,0.04), rgba(255,255,255,0)), radial-gradient(circle at 20% 20%, rgba(79,209,197,0.12), transparent 45%)",
      },
    },
  },
  plugins: [],
};

export default config;
