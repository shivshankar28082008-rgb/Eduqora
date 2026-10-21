import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { defineConfig, type Plugin } from 'vite';

function copyHostingerFilesPlugin(): Plugin {
  return {
    name: 'copy-hostinger-files',
    closeBundle() {
      const distDir = path.resolve(__dirname, 'dist');
      const indexPath = path.join(distDir, 'index.html');
      const notFoundPath = path.join(distDir, '404.html');
      const htaccessSource = path.resolve(__dirname, 'public/.htaccess');
      const htaccessDest = path.join(distDir, '.htaccess');
      try {
        if (fs.existsSync(indexPath)) {
          fs.copyFileSync(indexPath, notFoundPath);
        }
        if (fs.existsSync(htaccessSource)) {
          fs.copyFileSync(htaccessSource, htaccessDest);
        }
      } catch (e) {
        console.warn('Could not copy Hostinger fallback files:', e);
      }
    },
  };
}

export default defineConfig(({ mode }) => {
  const repoName = process.env.GITHUB_REPOSITORY ? process.env.GITHUB_REPOSITORY.split('/')[1] : 'Codevaible';
  const ghBase = process.env.VITE_BASE_PATH || `/${repoName}/`;

  return {
    base: mode === 'github-pages' ? ghBase : (process.env.VITE_BASE_PATH || './'),
    plugins: [react(), tailwindcss(), copyHostingerFilesPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});