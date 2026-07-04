import type { Config } from "tailwindcss";

/**
 * Design tokens are declared as CSS variables in app/globals.css and mapped here
 * so `bg-surface`, `text-muted`, `border-line`, `text-brand`, etc. work in JSX.
 * Add a new colour by defining the CSS var + a line here — nothing else changes.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        elevated: "var(--elevated)",
        line: "var(--border)",
        ink: "var(--text-primary)",
        "ink-secondary": "var(--text-secondary)",
        muted: "var(--text-muted)",
        brand: {
          DEFAULT: "var(--brand)",
          hover: "var(--brand-hover)",
          soft: "var(--brand-soft)",
        },
        success: "var(--success)",
        warning: "var(--warning)",
        danger: "var(--error)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      borderRadius: {
        sm: "6px",
        DEFAULT: "10px",
        lg: "14px",
        xl: "18px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(15, 23, 42, 0.04), 0 1px 3px rgba(15, 23, 42, 0.06)",
        elevated: "0 4px 16px rgba(15, 23, 42, 0.08)",
        focus: "0 0 0 3px var(--brand-soft)",
      },
      maxWidth: {
        content: "1180px",
        prose: "68ch",
      },
      fontSize: {
        // tabular numeric result styling handled via .num utility in globals.css
      },
    },
  },
  plugins: [],
};

export default config;
