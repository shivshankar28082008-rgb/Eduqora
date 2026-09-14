import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import {ErrorBoundary} from './components/ErrorBoundary.tsx';
import './index.css';

// Handle stale Vite chunk / dynamic import failures across GitHub Pages deployments
if (typeof window !== 'undefined') {
  window.addEventListener('vite:preloadError', (event) => {
    console.warn('Vite preload error caught:', event);
    try {
      const key = 'eduqora_vite_preload_reload';
      const last = sessionStorage.getItem(key);
      const now = Date.now();
      if (!last || now - parseInt(last, 10) > 15000) {
        sessionStorage.setItem(key, now.toString());
        window.location.reload();
      }
    } catch {
      window.location.reload();
    }
  });

  window.addEventListener('unhandledrejection', (event) => {
    try {
      const reason = event.reason?.message || String(event.reason || '');
      if (
        reason.includes('Failed to fetch dynamically imported module') ||
        reason.includes('Importing a module script failed') ||
        reason.includes('Loading chunk failed') ||
        reason.includes('Unable to preload CSS')
      ) {
        const key = 'eduqora_chunk_reload';
        const last = sessionStorage.getItem(key);
        const now = Date.now();
        if (!last || now - parseInt(last, 10) > 15000) {
          sessionStorage.setItem(key, now.toString());
          window.location.reload();
        }
      }
    } catch {
      // Ignore storage/handling errors
    }
  });
}

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StrictMode>,
  );
} else {
  console.error("Critical: 'root' element not found in DOM.");
}
