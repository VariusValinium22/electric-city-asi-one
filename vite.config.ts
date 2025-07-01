/// <reference types="vitest" />
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.ts'],
  },
  server: {
    port: 3000,
  },
  base: "./", // relative paths for Electron
  build: {
    outDir: "dist",
    assetsDir: "assets",
    rollupOptions: {
      output: {
        format: 'cjs',
        // consistent file naming for Electron with .cjs extension
        entryFileNames: "assets/[name].[hash].cjs",
        chunkFileNames: "assets/[name].[hash].cjs",
        assetFileNames: "assets/[name].[hash].[ext]",
      },
    },
  },
});
