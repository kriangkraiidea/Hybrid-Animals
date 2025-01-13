import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#00FF9C",
          secondary: "#B6FFA1",
          accent: "#FEFFA7",
          neutral: "#ffffff",
          "base-100": "#ffffff",
          info: "#2671fc",
          success: "#4ade80",
          warning: "#FFE700",
          error: "#ff0000",
        },
      },
    ],
  },
  theme: {
    extend: {
      backgroundImage: {
        "gradient-to-r": "linear-gradient(to right, var(--tw-gradient-stops))",
      },
      gradientColorStops: {
        primary: "#ff7e5f",
        secondary: "#feb47b",
      },
    },
  },
  plugins: [require("daisyui")],
};

export default config;
