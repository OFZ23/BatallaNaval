import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'

// Vite configuration with React plugin
export default defineConfig({
  base: '/NavalTatics/', // Cambiar 'NavalTatics' por el nombre de tu repositorio
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