import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'

// Vite configuration optimized for GitHub Pages deployment
// Production-ready configuration for Node 24+
export default defineConfig({
  base: '/BatallaNaval/',
  logLevel: 'error',

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },

  plugins: [react()],

  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom'],
        }
      }
    },
  },

  server: {
    port: 5173,
    strictPort: true,
  }
});