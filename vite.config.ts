import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { defineConfig, type Plugin } from 'vite';

function copy404Plugin(): Plugin {
  return {
    name: 'copy-404-fallback',
    closeBundle() {
      const distDir = path.resolve(__dirname, 'dist');
      const indexPath = path.join(distDir, 'index.html');
      const notFoundPath = path.join(distDir, '404.html');
      try {
        if (fs.existsSync(indexPath)) fs.copyFileSync(indexPath, notFoundPath);
      } catch (e) {
        console.warn('Could not copy 404.html:', e);
      }
    },
  };
}

export default defineConfig(({ mode }) => ({
  base: mode === 'github-pages' ? '/Eduqora/' : '/',
  plugins: [react(), tailwindcss(), copy404Plugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
  server: {
    hmr: process.env.DISABLE_HMR !== 'true',
    watch: process.env.DISABLE_HMR === 'true' ? null : {},
  },
}));