import { Link, Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10 bg-slate-950/90 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="text-xl font-bold tracking-tight">
            Brovi Scan
          </Link>

          <div className="flex items-center gap-4 text-sm text-slate-200">
            <Link to="/pricing" className="hover:text-white">
              Pricing
            </Link>
            <Link to="/login" className="hover:text-white">
              Login
            </Link>
            <Link
              to="/register"
              className="rounded-full bg-indigo-500 px-4 py-2 font-semibold text-white hover:bg-indigo-400"
            >
              Start free scan
            </Link>
          </div>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="border-t border-white/10 px-6 py-8 text-center text-sm text-slate-400">
        Brovi Scan is a readiness tool, not a visa or admission guarantee.
      </footer>
    </div>
  );
}
