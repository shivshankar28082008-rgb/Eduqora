import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig, Plugin} from 'vite';

function copy404Plugin(): Plugin {
  return {
    name: 'copy-404-fallback',
    closeBundle() {
      const distDir = path.resolve(__dirname, 'dist');
      const indexPath = path.join(distDir, 'index.html');
      const notFoundPath = path.join(distDir, '404.html');
      try {
        if (fs.existsSync(indexPath)) {
          fs.copyFileSync(indexPath, notFoundPath);
        }
      } catch (e) {
        console.warn('Could not copy 404.html:', e);
      }
    },
  };
}

export default defineConfig(() => {
  return {
    base: '/Eduqora/',
    plugins: [react(), tailwindcss(), copy404Plugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
