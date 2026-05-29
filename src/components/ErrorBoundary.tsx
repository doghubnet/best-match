import React from "react";

type State = { hasError: boolean; message: string };

export default class ErrorBoundary extends React.Component<React.PropsWithChildren, State> {
  state: State = { hasError: false, message: "" };

  static getDerivedStateFromError(error: unknown): State {
    return { hasError: true, message: error instanceof Error ? error.message : "Unknown runtime error" };
  }

  componentDidCatch(error: unknown) {
    console.error("Brovi Scan runtime error", error);
  }

  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <div className="min-h-screen bg-slate-950 px-6 py-16 text-white">
        <div className="mx-auto max-w-xl rounded-2xl border border-red-400/30 bg-red-950/30 p-8 shadow-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-red-200">Something went wrong</p>
          <p className="mt-4 text-slate-200">The page hit a runtime error. No secrets were exposed.</p>
          <p className="mt-3 rounded-lg bg-black/20 p-3 text-sm text-red-100">{this.state.message}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="/" className="btn">Go home</a>
            <button className="btn bg-slate-700" onClick={() => window.location.reload()}>Retry</button>
          </div>
        </div>
      </div>
    );
  }
}
