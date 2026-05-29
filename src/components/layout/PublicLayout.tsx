import { Link, Outlet } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { useTheme } from "@/lib/theme";

export default function PublicLayout() {
  const { user } = useAuth();
  const { resolvedTheme, toggleTheme } = useTheme();
  return (
    <div className="min-h-screen bg-slate-950 text-white transition-colors dark:bg-slate-950" data-layout="public">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/90 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <Link to="/" className="text-xl font-bold tracking-tight">Brovi Scan</Link>
          <div className="flex items-center gap-3 text-sm text-slate-200">
            <Link to="/pricing" className="hidden hover:text-white sm:inline">Pricing</Link>
            <Link to="/report-bug" className="hidden hover:text-white md:inline">Report bug</Link>
            <button type="button" onClick={toggleTheme} className="rounded-full border border-white/10 px-3 py-2 hover:bg-white/10" aria-label="Toggle theme">
              {resolvedTheme === "dark" ? "Light" : "Dark"}
            </button>
            <Link to="/login" className="hover:text-white">Login</Link>
            <Link to={user ? "/app" : "/register"} className="rounded-full bg-indigo-500 px-4 py-2 font-semibold text-white hover:bg-indigo-400">Start free scan</Link>
          </div>
        </nav>
      </header>
      <main><Outlet /></main>
      <footer className="border-t border-white/10 px-6 py-8 text-center text-sm text-slate-400">
        <div className="mx-auto flex max-w-4xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <span>Brovi Scan is a readiness tool, not a visa or admission guarantee.</span>
          <span className="flex justify-center gap-4"><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link></span>
        </div>
      </footer>
    </div>
  );
}
