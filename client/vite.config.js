import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Music App PWA',
        short_name: 'Music app',
        description: 'A Vite + React Progressive Web App',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/vite.png',
            sizes: '192x192',
            type: 'image/png'
          }
        ]
      }
    })
  ]
});
