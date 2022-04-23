// https://vitejs.dev/config/#shared-options

import { defineConfig } from "vite"

const { resolve } = require("path")

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "./src/lib/hyperapplicable.ts"),
      name: "hyperapplicable",
    },
    rollupOptions: {
      external: [
        "hyperapp",
      ],
      output: {
        globals: {
          hyperapp: "Hyperapp",
        },
      },
    },
  },
})
