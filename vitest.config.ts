/// <reference types="vitest" />
import { defineConfig } from "vite";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./setup-tests.js"],
    deps: {
      inline: ["jsdom"],
    },
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html", "lcov"],
      reportsDirectory: "./coverage",
      exclude: [
        "node_modules/",
        "dist/",
        "dist-electron/",
        "coverage/",
        "**/*.d.ts",
        "**/*.config.{js,ts}",
        "**/*.stories.{js,ts,tsx}",
        "setup-tests.js",
        "vite.config.ts",
        "vitest.config.ts",
        "tailwind.config.js",
        "postcss.config.js",
        "eslint.config.js",
        "electron/",
        "infrastructure/",
        "scripts/",
      ],
      include: ["src/**/*.{js,ts,tsx}"],
      all: true,
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },
    reporters: ["verbose", "json", "html"],
    outputFile: {
      json: "./test-results/results.json",
      html: "./test-results/index.html",
    },
  },
});
