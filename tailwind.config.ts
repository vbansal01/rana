import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ─── Color System (OlyPrep-inspired, adapted for elegant cultural org) ───
      colors: {
        background: "#FFFEF9",
        foreground: "#0D0D0D",
        accent: {
          DEFAULT: "#C8922A",
          hover: "#A67520",
          light: "#F5E6C8",
        },
        navy: {
          DEFAULT: "#5C2415",  // Deep Hawa Mahal rose — replaces cold navy
          light: "#7A3520",    // Lighter terracotta for hover/border states
        },
        surface: {
          DEFAULT: "#F5F0E8",
          alt: "#EDE8DD",
        },
        border: "#D9D3C8",
        muted: {
          DEFAULT: "#7A7169",
          light: "#B8B0A6",
        },
      },
      // ─── Three-Font System ───────────────────────────────────────────────────
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],       // Headings
        body: ["var(--font-inter)", "system-ui", "sans-serif"],      // Body / UI
        accent: ["var(--font-cormorant)", "Georgia", "serif"],       // Pull-quotes / large display
      },
      fontSize: {
        "display-2xl": ["4.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-xl": ["3.75rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-lg": ["3rem", { lineHeight: "1.15", letterSpacing: "-0.015em" }],
        "display-md": ["2.25rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        "display-sm": ["1.875rem", { lineHeight: "1.25" }],
      },
      spacing: {
        "section": "6rem",
        "section-sm": "4rem",
      },
      borderRadius: {
        "card": "0.75rem",
      },
      boxShadow: {
        "card": "0 1px 3px 0 rgba(0,0,0,0.06), 0 4px 16px 0 rgba(0,0,0,0.06)",
        "card-hover": "0 4px 24px 0 rgba(0,0,0,0.1)",
        "glass": "inset 0 1px 0 rgba(255,255,255,0.15)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease forwards",
        "fade-in": "fadeIn 0.4s ease forwards",
        "scroll": "scroll 30s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
