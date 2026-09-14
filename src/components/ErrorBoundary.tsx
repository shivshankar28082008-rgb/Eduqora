import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Eduqora Uncaught Application Error:', error, errorInfo);
  }

  private handleReset = () => {
    try {
      window.location.hash = '#/';
      window.location.reload();
    } catch {
      window.location.href = './';
    }
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#090d16] text-[#f1f5f9] p-6">
          <div className="max-w-md w-full text-center p-8 rounded-2xl bg-[#0f172a] border border-slate-800 shadow-2xl space-y-4">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 text-2xl font-bold">
              ⚡
            </div>
            <h1 className="text-xl font-bold text-white">Something went wrong</h1>
            <p className="text-sm text-slate-400">
              Eduqora encountered an unexpected error during startup.
            </p>
            {this.state.error && (
              <pre className="text-xs text-left bg-black/50 p-3 rounded-lg text-rose-300 overflow-x-auto max-h-32 border border-rose-900/30 font-mono">
                {this.state.error.message}
              </pre>
            )}
            <button
              onClick={this.handleReset}
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition-all shadow-md shadow-indigo-500/20 cursor-pointer"
            >
              Reload Eduqora
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
