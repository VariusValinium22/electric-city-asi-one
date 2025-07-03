/// <reference types="vitest" />
import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./setup-tests.js'],
    deps: {
      inline: ['jsdom'],
    },
  },
}); 