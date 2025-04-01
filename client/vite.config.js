import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {  // Proxy any request starting with "/api"
        target: 'http://localhost:4242', // Your server
        changeOrigin: true,
        secure: false, // Allow self-signed certificates (if applicable)
      },
    },
  },
})
