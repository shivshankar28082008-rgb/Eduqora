/**
 * API Configuration & Dynamic Backend Endpoint Discovery
 * 
 * Provides robust resolution for Eduqora execution & health endpoints:
 * 1. Checks VITE_BACKEND_URL / VITE_API_BASE_URL environment variables.
 * 2. In browser, detects local dev port separation (e.g. frontend on 5173, backend on 3000).
 * 3. Falls back to window.location.origin or relative path for unified dev/prod reverse proxy.
 */

export interface BackendHealthResponse {
  status: string;
  service?: string;
  compilers?: Record<string, boolean>;
  paths?: Record<string, string | null>;
  timestamp?: number;
  port?: number;
}

export interface HealthCheckResult {
  ok: boolean;
  activeEndpoint?: string;
  data?: BackendHealthResponse;
  error?: string;
}

/**
 * Returns the resolved backend base URL.
 * Never hardcodes an incorrect port; respects environment variables and current origin.
 */
export function getBackendBaseUrl(): string {
  // 1. Explicit environment variable if configured
  const envUrl = (
    (import.meta as any).env?.VITE_BACKEND_URL ||
    (import.meta as any).env?.VITE_API_BASE_URL ||
    (import.meta as any).env?.VITE_API_URL ||
    ''
  ).trim();

  if (envUrl) {
    return envUrl.replace(/\/+$/, '');
  }

  // 2. Client-side browser checks
  if (typeof window !== 'undefined' && window.location) {
    const { hostname, port, protocol, origin } = window.location;

    // When developing with Vite frontend standalone (port 5173),
    // target the backend server on port 3000:
    if (port === '5173') {
      return `${protocol}//${hostname}:3000`;
    }

    // When running under the unified Express + Vite server or reverse proxy,
    // origin matches the backend exactly.
    if (origin && origin !== 'null') {
      return origin.replace(/\/+$/, '');
    }
  }

  // 3. Default fallback for SSR / Node environment
  return 'http://localhost:3000';
}

/**
 * Retrieves prioritized candidate endpoints for backend health checks and execution.
 */
export function getApiEndpoints() {
  const baseUrl = getBackendBaseUrl();
  const rawBase = ((import.meta as any).env?.BASE_URL || '/Eduqora/').trim();
  const vitePrefix = rawBase.replace(/\/+$/, '');

  // Prioritized list of health check endpoints
  const healthEndpoints: string[] = [
    `${baseUrl}/health`,
    `${baseUrl}/api/health`,
  ];

  if (vitePrefix && vitePrefix !== '') {
    healthEndpoints.push(`${baseUrl}${vitePrefix}/health`);
    healthEndpoints.push(`${baseUrl}${vitePrefix}/api/health`);
  }

  // Also include relative paths as fallback if on same origin
  if (typeof window !== 'undefined' && window.location) {
    if (!healthEndpoints.includes('/health')) healthEndpoints.push('/health');
    if (!healthEndpoints.includes('/api/health')) healthEndpoints.push('/api/health');
    if (vitePrefix && !healthEndpoints.includes(`${vitePrefix}/api/health`)) {
      healthEndpoints.push(`${vitePrefix}/api/health`);
    }
  }

  // Prioritized list of code execution endpoints
  const executeEndpoints: string[] = [
    `${baseUrl}/api/execute`,
  ];

  if (vitePrefix && vitePrefix !== '') {
    executeEndpoints.push(`${baseUrl}${vitePrefix}/api/execute`);
  }
  executeEndpoints.push(`${baseUrl}/execute`);

  if (typeof window !== 'undefined' && window.location) {
    if (!executeEndpoints.includes('/api/execute')) executeEndpoints.push('/api/execute');
    if (vitePrefix && !executeEndpoints.includes(`${vitePrefix}/api/execute`)) {
      executeEndpoints.push(`${vitePrefix}/api/execute`);
    }
  }

  return {
    baseUrl,
    healthEndpoints: Array.from(new Set(healthEndpoints)),
    executeEndpoints: Array.from(new Set(executeEndpoints)),
  };
}

/**
 * Performs a health-check request to verify the backend service is active
 * before dispatching code execution.
 */
export async function checkBackendHealth(timeoutMs = 3000): Promise<HealthCheckResult> {
  const { healthEndpoints } = getApiEndpoints();

  for (const url of healthEndpoints) {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), timeoutMs);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        signal: controller.signal,
      });
      clearTimeout(timer);

      if (response.ok) {
        const data: BackendHealthResponse = await response.json().catch(() => ({ status: 'ok' }));
        if (data.status === 'ok') {
          return {
            ok: true,
            activeEndpoint: url,
            data,
          };
        }
      }
    } catch {
      // Continue to next candidate URL
    }
  }

  return {
    ok: false,
    error: 'Backend service is offline. Start the backend service and try again.',
  };
}
