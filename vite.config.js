import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['logo.svg', 'logo-circle.svg'],
      manifest: {
        name: 'Electric City Aquarium: Sharks Interactive',
        short_name: 'Sharks Interactive',
        description: 'Interactive shark learning experience for Electric City Aquarium',
        theme_color: '#1B3567',
        background_color: '#1B3567',
        display: 'standalone',
        orientation: 'landscape-primary',
        icons: [
          {
            src: 'logo-circle.svg',
            sizes: '192x192',
            type: 'image/svg+xml'
          },
          {
            src: 'logo-circle.svg',
            sizes: '512x512',
            type: 'image/svg+xml'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,jpg,jpeg}'],
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024, // 10MB
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365
              }
            }
          },
          {
            urlPattern: /\.mp4$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'video-cache',
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              }
            }
          }
        ]
      }
    })
  ],
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
