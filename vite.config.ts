import { defineConfig } from 'vite'

export default defineConfig({
  base: '/wow-land/',
  build: {
    chunkSizeWarningLimit: 600
  }
})
