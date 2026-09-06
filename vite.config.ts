import { defineConfig } from 'vite'
import { resolve } from 'node:path'

export default defineConfig({
  base: '/wow-land/',
  server: {
    proxy: {
      '/api': 'http://localhost:3000'
    }
  },
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        admin: resolve(import.meta.dirname, 'admin.html')
      }
    }
  }
})
