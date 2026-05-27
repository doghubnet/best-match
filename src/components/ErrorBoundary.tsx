import React from "react";
import { Link } from "react-router-dom";

type State = { hasError: boolean; message: string };

export default class ErrorBoundary extends React.Component<React.PropsWithChildren, State> {
  state: State = { hasError: false, message: "" };
  static getDerivedStateFromError(error: unknown): State {
    return { hasError: true, message: error instanceof Error ? error.message : "Unknown error" };
  }
  componentDidCatch(error: unknown) { console.error("Runtime error", error); }
  render() {
    if (!this.state.hasError) return this.props.children;
    return <div className="min-h-screen bg-slate-950 text-white p-8"><div className="max-w-xl mx-auto card"><h1 className="text-2xl font-bold">Something went wrong</h1><p className="mt-2 text-slate-300">{this.state.message}</p><div className="mt-4 flex gap-3"><Link to="/" className="btn">Go home</Link><button className="btn bg-slate-700" onClick={() => window.location.reload()}>Retry</button></div></div></div>;
  }
}
