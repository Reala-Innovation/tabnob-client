import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
        injectRegister: 'auto',

      manifest: {
        name: 'Tabnob',
        short_name: 'Tabnob',
        description: 'Send Bitcoin & Receive Mobile Money instantly',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/pwa192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/pwa512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/pwa512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
     
    }),
  ],
})
