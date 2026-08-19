import { defineConfig } from "vite";

export default defineConfig({
  optimizeDeps: {
    // Explicitly enforce loading mtg-crucible through Vite's optimizer layer
    include: ["mtg-crucible"],
    // Completely exclude the node-specific desktop canvas compiler
    exclude: ["@napi-rs/canvas"],
  },
  define: {
    // Provide blank definitions so server checks pass safely in a browser
    "process.env": {},
    global: "globalThis",
  },
});
