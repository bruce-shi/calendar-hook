import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import { libInjectCss } from "vite-plugin-lib-inject-css";

export default defineConfig({
  plugins: [react(), libInjectCss(), dts({ include: ["lib"] })],
  test: {
    environment: "jsdom",
  },
  build: {
    copyPublicDir: false,
    cssCodeSplit: false,
    lib: {
      entry: resolve(__dirname, "lib/index.ts"),
      formats: ["es", "umd"],
      name: "@bruceshi/calendar-hook",
    },
    rollupOptions: {
      external: ["react", "react/jsx-runtime", "date-fns", "lodash"],
    },
  },
});
