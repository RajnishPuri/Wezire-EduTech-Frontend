import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  build: {
    outDir: 'dist' // optional: Vercel detects this by default
  },
  resolve: {
    alias: {
      // optional: useful for cleaner imports
      '@': '/src'
    }
  },
  server: {
    // Ensures dev server fallback to index.html for React Router
    historyApiFallback: true
  }
})
