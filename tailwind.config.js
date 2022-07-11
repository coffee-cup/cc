const fontStack = [
  "-apple-system",
  "BlinkMacSystemFont",
  "Segoe UI",
  "Roboto",
  "Oxygen-Sans",
  "Ubuntu",
  "Cantarell",
  "Helvetica Neue",
  "sans-serif",
  "Apple Color Emoji",
  "Segoe UI Emoji",
  "Segoe UI Symbol",
].join(",");

const monoStack = [
  "ui-monospace",
  "SFMono-Regular",
  "SF Mono",
  "Consolas",
  "Liberation Mono",
  "Menlo",
  "monospace",
].join(",");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: fontStack,
        mono: monoStack,
      },
      colors: {
        bg: "var(--bg)",
        fg: "var(--fg)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        tertiary: "var(--tertiary)",
      },
    },
  },
  plugins: [],
};
