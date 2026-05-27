import React from "react";

type ErrorBoundaryState = {
  hasError: boolean;
  message: string;
};

export default class ErrorBoundary extends React.Component<React.PropsWithChildren, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
    message: "",
  };

  static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    return {
      hasError: true,
      message: error instanceof Error ? error.message : "Unknown runtime error",
    };
  }

  componentDidCatch(error: unknown) {
    console.error("Brovi Scan runtime error:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 px-6 py-16 text-white">
          <div className="mx-auto max-w-3xl rounded-2xl border border-red-400/30 bg-red-950/30 p-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-red-200">
              Brovi Scan runtime error
            </p>
            <h1 className="mt-3 text-3xl font-bold">The app failed to render.</h1>
            <p className="mt-4 text-red-100">{this.state.message}</p>
            <p className="mt-6 text-sm text-slate-300">
              Check the browser console and fix the failing route, layout, import, or auth guard.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
