import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      includeAssets: ['icon.svg', 'icon-192.png', 'icon-512.png'],
      devOptions: { enabled: true, type: 'module' },
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
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
          { src: 'icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,json,woff,woff2}'],
        navigateFallback: 'index.html',
        cleanupOutdatedCaches: true,
      },
    }),
  ],
  // Server de dezvoltare restrâns la localhost (uz privat; reduce suprafața
  // de atac a advisory-urilor care vizează doar dev-server-ul).
  server: {
    port: 5173,
    open: true,
    host: '127.0.0.1',
    strictPort: false,
  },
});
