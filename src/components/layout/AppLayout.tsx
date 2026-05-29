import { NavLink, Outlet, Link } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { useTheme } from "@/lib/theme";

const appLinks = [
  ["/app", "Dashboard"], ["/app/profile", "Profile"], ["/app/program-match", "Program match"],
  ["/app/documents", "Documents"], ["/app/bank", "Bank"], ["/app/interview", "Interview"],
  ["/app/report", "Report"], ["/app/consultant", "Consultant"], ["/app/tasks", "Tasks"], ["/app/settings", "Settings"],
];

export default function AppLayout() {
  const { logout, user } = useAuth();
  const { toggleTheme, resolvedTheme } = useTheme();
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-white/10 bg-slate-900/90 p-5 lg:block">
        <Link to="/app" className="text-xl font-bold">Brovi Scan</Link>
        <p className="mt-2 text-xs text-slate-400">{user?.email ?? "Demo preview"}</p>
        <nav className="mt-8 space-y-1">
          {appLinks.map(([href, label]) => (
            <NavLink key={href} to={href} end={href === "/app"} className={({ isActive }) => `block rounded-xl px-3 py-2 text-sm ${isActive ? "bg-indigo-500 text-white" : "text-slate-300 hover:bg-white/10 hover:text-white"}`}>{label}</NavLink>
          ))}
        </nav>
        <button className="mt-6 w-full rounded-xl border border-white/10 px-3 py-2 text-sm text-slate-300 hover:bg-white/10" onClick={() => void logout()}>Logout</button>
      </aside>
      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/90 px-4 py-4 backdrop-blur sm:px-6">
          <div className="flex items-center justify-between gap-3">
            <Link to="/app" className="font-semibold lg:hidden">Brovi Scan</Link>
            <div className="hidden gap-2 overflow-x-auto lg:flex">{appLinks.slice(0, 6).map(([href, label]) => <NavLink key={href} to={href} className="rounded-full px-3 py-1.5 text-xs text-slate-300 hover:bg-white/10">{label}</NavLink>)}</div>
            <div className="flex items-center gap-2"><button className="rounded-full border border-white/10 px-3 py-2 text-xs" onClick={toggleTheme}>{resolvedTheme === "dark" ? "Light" : "Dark"}</button><Link to="/pricing" className="btn px-4 py-2">Upgrade</Link></div>
          </div>
        </header>
        <main className="px-4 py-8 sm:px-6"><Outlet /></main>
      </div>
    </div>
  );
}
