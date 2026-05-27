import { Link, Outlet } from "react-router-dom";

const appLinks = [
  ["/app", "Dashboard"],
  ["/app/program-match", "Program Match"],
  ["/app/documents", "Documents"],
  ["/app/bank", "Financial Scan"],
  ["/app/interview", "Interview"],
  ["/app/report", "Report"],
  ["/app/consultant", "Consultant"],
  ["/app/tasks", "Tasks"],
  ["/app/settings", "Settings"],
];

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-white/10 bg-slate-900/80 p-5 lg:block">
        <Link to="/app" className="text-xl font-bold">
          Brovi Scan
        </Link>

        <nav className="mt-8 space-y-2">
          {appLinks.map(([href, label]) => (
            <Link
              key={href}
              to={href}
              className="block rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-white/10 hover:text-white"
            >
              {label}
            </Link>
          ))}
        </nav>
      </aside>

      <div className="lg:pl-64">
        <header className="border-b border-white/10 bg-slate-950/90 px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="font-semibold lg:hidden">
              Brovi Scan
            </Link>
            <Link to="/pricing" className="text-sm text-slate-300 hover:text-white">
              Upgrade
            </Link>
          </div>
        </header>

        <main className="px-6 py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
