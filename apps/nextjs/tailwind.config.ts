import type { Config } from "tailwindcss";
import daisyUIThemes from "daisyui/src/theming/themes";
import { fontFamily } from "tailwindcss/defaultTheme";

import baseConfig from "@acme/tailwind-config";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
      {
        // lofiをベースに気になるプロパテだけ上書きする
        lofi: {
          ...daisyUIThemes.lofi,
          info: "rgb(186 230 253)",
          success: "rgb(217 249 157)",
          warning: "rgb(254 240 138)",
          error: "rgb(254 202 202)",
        },
      },
    ],
    fontFamily: {
      sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      mono: ["var(--font-geist-mono)", ...fontFamily.mono],
    },
    darkTheme: "lofi", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    rtl: false, // rotate style direction from left-to-right to right-to-left. You also need to add dir="rtl" to your html tag and install `tailwindcss-flip` plugin for Tailwind CSS.
    prefix: "ui_", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
  },
  presets: [baseConfig],
} satisfies Config;
