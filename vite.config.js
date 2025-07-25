import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true, // allow external connections
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  base: './', // use relative paths for Electron
}); 