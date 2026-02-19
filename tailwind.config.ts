import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx,json}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#020617",
        panel: "#0b1226",
        glow: {
          cyan: "#22d3ee",
          blue: "#38bdf8",
          emerald: "#34d399",
        },
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(56, 189, 248, 0.2), 0 15px 45px rgba(2, 132, 199, 0.18)",
      },
      backgroundImage: {
        "hero-grid":
          "linear-gradient(to right, rgba(148, 163, 184, 0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(148, 163, 184, 0.12) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};

export default config;
