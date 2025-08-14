import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true, // allow external connections
    open: true, // open browser automatically
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: true, // enable source maps for debugging
  },
  base: "./", // use relative paths for Electron
  define: {
    __DEV__: true,
  },
  esbuild: {
    sourcemap: true,
  },
});
