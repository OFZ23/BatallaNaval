import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'

// Vite configuration with React plugin
export default defineConfig({
  base: '/BatallaNaval/', // Repositorio en GitHub
  logLevel: 'error', // Suppress warnings, only show errors
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  plugins: [
    react(),
  ],
  build: {
    outDir: 'dist',
    sourcemap: false,
  }
});