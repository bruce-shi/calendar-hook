/** @type {import('daisyui').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
        },
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          "neutral-content": "#6b7280",
          "base-content": "#f5f5f5",
        },
      },
    ],
  },
};
