import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      includeAssets: ['icon.svg'],
      manifest: {
        name: 'InstalFinder',
        short_name: 'InstalFinder',
        description:
          'Căutare echipamente pentru instalații (sanitare, termice, electrice, HVAC, incendiu)',
        lang: 'ro',
        theme_color: '#0369a1',
        background_color: '#0f172a',
        display: 'standalone',
        start_url: '.',
        icons: [
          { src: 'icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
          { src: 'icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,json,woff,woff2}'],
        navigateFallback: 'index.html',
        cleanupOutdatedCaches: true,
      },
    }),
  ],
  server: {
    port: 5173,
    open: true,
    host: true,
    allowedHosts: true,
    cors: true,
  },
});
