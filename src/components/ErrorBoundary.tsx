import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  public static getDerivedStateFromError(error: unknown): State {
    const safeError = error instanceof Error 
      ? error 
      : new Error(typeof error === 'string' ? error : 'Unknown runtime error');
    return { hasError: true, error: safeError, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Eduqora Uncaught Application Error:', error, errorInfo);
    this.setState({ errorInfo });

    // Handle chunk/dynamic-import load failures from stale cache across deployments
    const errMsg = (error?.message || '').toLowerCase();
    const isChunkFailure = 
      errMsg.includes('chunk') ||
      errMsg.includes('failed to fetch dynamically imported module') ||
      errMsg.includes('importing a module script failed') ||
      errMsg.includes('loading chunk failed') ||
      errMsg.includes('unable to preload css');

    if (isChunkFailure && typeof window !== 'undefined' && window.sessionStorage) {
      const retryKey = 'eduqora_chunk_reload_attempt';
      const lastRetry = sessionStorage.getItem(retryKey);
      const now = Date.now();
      // Only reload once every 15 seconds to prevent infinite reload loops
      if (!lastRetry || now - parseInt(lastRetry, 10) > 15000) {
        sessionStorage.setItem(retryKey, now.toString());
        window.location.reload();
      }
    }
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  private handleReload = () => {
    try {
      window.location.reload();
    } catch {
      window.location.href = window.location.href;
    }
  };

  private handleGoHome = () => {
    try {
      const pathname = window.location.pathname || '';
      const isEduqoraPrefix = pathname.toLowerCase().includes('/eduqora');
      const target = isEduqoraPrefix ? '/Eduqora/#/' : '/#/';
      window.location.href = target;
    } catch {
      window.location.hash = '#/';
      window.location.reload();
    }
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const errorMessage = this.state.error?.message 
        ? String(this.state.error.message).replace(/[A-Za-z0-9+/=]{30,}/g, '[REDACTED]') 
        : 'An unexpected application error occurred.';

      return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#090d16] text-[#f1f5f9] p-6 font-sans select-none">
          <div className="max-w-md w-full text-center p-8 rounded-2xl bg-[#0f172a] border border-slate-800 shadow-2xl space-y-5">
            {/* Header Branding */}
            <div className="flex items-center justify-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse"></span>
              <span className="text-sm font-semibold tracking-wider text-indigo-400 uppercase">Eduqora</span>
            </div>

            <div className="w-14 h-14 mx-auto rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 text-2xl font-bold">
              ⚡
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-white tracking-tight">Something went wrong</h1>
              <p className="text-sm text-slate-400 leading-relaxed">
                We encountered an unexpected error while loading the application.
              </p>
            </div>

            {/* Safe Error Details */}
            <div className="text-xs text-left bg-black/50 p-3.5 rounded-xl text-rose-300 overflow-x-auto max-h-32 border border-rose-900/30 font-mono">
              <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1 font-sans">Diagnostic Message</div>
              {errorMessage}
            </div>

            {/* Action Buttons: Retry, Reload Page, Go Home */}
            <div className="grid grid-cols-3 gap-2 pt-2">
              <button
                type="button"
                onClick={this.handleRetry}
                className="inline-flex items-center justify-center px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs transition-colors border border-slate-700 hover:border-slate-600 cursor-pointer"
              >
                Retry
              </button>
              <button
                type="button"
                onClick={this.handleReload}
                className="inline-flex items-center justify-center px-3 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors shadow-md shadow-indigo-500/20 cursor-pointer"
              >
                Reload Page
              </button>
              <button
                type="button"
                onClick={this.handleGoHome}
                className="inline-flex items-center justify-center px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs transition-colors border border-slate-700 hover:border-slate-600 cursor-pointer"
              >
                Go Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
