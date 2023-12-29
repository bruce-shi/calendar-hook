import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import pkg from "./package.json" assert { type: "json" };
import path from "path";
import * as glob from "glob";

export default defineConfig({
  plugins: [react(), dts({ include: ["lib"], rollupTypes: true })],
  test: {
    environment: "jsdom",
  },
  build: {
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, "lib/index.ts"),
      formats: ["es", "cjs"],
      name: "@bruceshi/calendar-hook",
      fileName: (format, entryName) => `${entryName}.${format}.js`,
    },
    target: "esnext",
    rollupOptions: {
      external: [
        ...Object.keys(pkg.dependencies),
        ...Object.keys(pkg.peerDependencies),
      ],
      input: glob.sync(path.resolve(__dirname, "lib/**/*.{ts,tsx,css}")),
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
