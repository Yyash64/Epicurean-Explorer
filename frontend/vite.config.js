import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://www.themealdb.com/api/json/v1/1', // Replace with the actual API URL
        changeOrigin: true,
        secure: false,  // If the API uses HTTPS without proper certificates, set this to false
        rewrite: (path) => path.replace(/^\/api/, '') // Removes `/api` prefix
      }
    }
  }
})
