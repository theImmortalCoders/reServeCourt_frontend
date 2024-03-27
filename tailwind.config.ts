import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "475px",
        mds: "799px",
        mdl: "910px",
        "3xl": "1760px",
      },
      colors: {
        mainOrange: "rgb(var(--color-mainOrange) / <alpha-value>)",
        mainGreen: "rgb(var(--color-mainGreen) / <alpha-value>)",
        mainBlack: "rgb(var(--color-mainBlack) / <alpha-value>)",
        mainWhite: "rgb(var(--color-mainWhite) / <alpha-value>)",
        mainBrown: "rgb(var(--color-mainBrown) / <alpha-value>)",
        lightGrey: "rgb(var(--color-lightGrey) / <alpha-value>)",
        darkGreen: "rgb(var(--color-darkGreen) / <alpha-value>)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      padding: {
        navbar: "var(--navbar)",
      },
      margin: {
        navbar: "var(--navbar)",
      },
      height: {
        navbar: "var(--navbar)",
      },
      minHeight: {
        navbar: "var(--navbar)",
        max: "calc(100vh - var(--navbar))",
      },
      minWidth: {
        sidebar: "var(--sidebar)",
        max: "100vw",
      },
      maxHeight: {
        max: "calc(100vh - var(--navbar))",
      },
      maxWidth: {
        sidebar: "var(--sidebar)",
        max: "100vw",
      },
      inset: {
        navbar: "var(--navbar)",
      },
    },
  },
  plugins: [],
};
export default config;
