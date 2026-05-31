import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary — Deep Institutional Navy
        navy: {
          50: "#EEF2F7",
          100: "#D5E0EE",
          200: "#AABFDD",
          300: "#7F9FCC",
          400: "#547EBB",
          500: "#2A5DAA",
          600: "#1A4A8C",
          700: "#0D3470",
          800: "#072454",
          900: "#021438",
          950: "#010B22",
        },
        // Secondary — WBF Institutional Blue (primary brand)
        brand: {
          50: "#E6EDF5",
          100: "#C0D0E6",
          200: "#8AAFD4",
          300: "#558EC2",
          400: "#2070B0",
          500: "#003366", // PRIMARY BRAND
          600: "#002B57",
          700: "#002148",
          800: "#001739",
          900: "#000D2A",
          950: "#00061A",
        },
        // Accent — Teal/Emerald (sustainability, Green Climate Fund-inspired)
        teal: {
          50: "#E6F4F2",
          100: "#BFEBE5",
          200: "#80D5CB",
          300: "#40BFB1",
          400: "#00A898",
          500: "#00756A", // SECONDARY BRAND
          600: "#006059",
          700: "#004C48",
          800: "#003836",
          900: "#002424",
          950: "#001212",
        },
        // Accent Gold — warmth, Balkans heritage
        gold: {
          50: "#FEF9EC",
          100: "#FDF0CC",
          200: "#FBE299",
          300: "#F9D066",
          400: "#F7BD33",
          500: "#F4A41A", // ACCENT
          600: "#D88A0C",
          700: "#B57009",
          800: "#925706",
          900: "#6F3E04",
          950: "#4C2702",
        },
        // Neutral grays
        slate: {
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          600: "#475569",
          700: "#334155",
          800: "#1E293B",
          900: "#0F172A",
          950: "#020617",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"],
        mono: ["var(--font-jetbrains-mono)", "Consolas", "monospace"],
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "0.875rem" }],
        display1: ["3.75rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        display2: ["3rem", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        display3: ["2.25rem", { lineHeight: "1.2", letterSpacing: "-0.015em" }],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "88": "22rem",
        "100": "25rem",
        "112": "28rem",
        "128": "32rem",
      },
      maxWidth: {
        "8xl": "88rem",
        "9xl": "96rem",
      },
      boxShadow: {
        card: "0 1px 3px 0 rgba(0,0,0,0.08), 0 1px 2px -1px rgba(0,0,0,0.06)",
        "card-hover": "0 10px 25px -3px rgba(0,0,0,0.1), 0 4px 8px -4px rgba(0,0,0,0.06)",
        institutional: "0 4px 24px -4px rgba(0, 51, 102, 0.15)",
        "institutional-lg": "0 20px 60px -10px rgba(0, 51, 102, 0.25)",
      },
      backgroundImage: {
        "gradient-brand": "linear-gradient(135deg, #003366 0%, #00756A 100%)",
        "gradient-hero": "linear-gradient(160deg, #002148 0%, #003366 40%, #00756A 100%)",
        "gradient-section": "linear-gradient(180deg, #F8FAFC 0%, #EEF2F7 100%)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.6s ease-out",
        "slide-in-right": "slideInRight 0.5s ease-out",
        "count-up": "countUp 1.5s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(24px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        countUp: {
          "0%": { opacity: "0", transform: "scale(0.8)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
