import type { Config } from "tailwindcss";
import daisyui from "daisyui";

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
        primary: "#26996d",
        secondary: "#87f229",
      },
    },
  },
  plugins: [daisyui],
};

export default config;
