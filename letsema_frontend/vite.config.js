// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,       // allow 0.0.0.0 and subdomains of localhost
    port: 3000,
  },
})
