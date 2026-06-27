import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#070707",
        charcoal: "#111111",
        burgundy: "#7A0D17",
        red: "#B11226",
        flame: "#E12B3F",
        cream: "#F7F2EC",
        muted: "#A7A2A0",
        teal: "#74E0D1"
      },
      boxShadow: {
        glow: "0 24px 80px rgba(177, 18, 38, 0.22)",
        soft: "0 18px 60px rgba(0, 0, 0, 0.18)"
      }
    }
  },
  plugins: []
};

export default config;
