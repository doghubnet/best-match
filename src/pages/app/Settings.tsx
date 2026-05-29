import { Link } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { useTheme } from "@/lib/theme";

export default function Settings() {
  const { logout, user, demoMode } = useAuth();
  const { theme, setTheme } = useTheme();
  return <div className="mx-auto max-w-3xl space-y-5"><h1 className="text-3xl font-bold">Settings</h1><section className="card"><h2 className="text-xl font-semibold">Appearance preference</h2><select className="input mt-3" value={theme} onChange={(e) => setTheme(e.target.value as "light" | "dark" | "system")}><option value="light">Light</option><option value="dark">Dark</option><option value="system">System</option></select></section><section className="card"><h2 className="text-xl font-semibold">Account</h2><p className="mt-2 text-slate-300">Signed in as {user?.email ?? (demoMode ? "demo preview" : "guest")}</p><button className="btn mt-4 bg-slate-700" onClick={() => void logout()}>Sign out</button></section><section className="card"><h2 className="text-xl font-semibold">Data</h2><p className="mt-2 text-slate-300">Demo data is stored locally in your browser when Supabase is not configured.</p></section><section className="card"><h2 className="text-xl font-semibold">Support</h2><p className="mt-2 text-slate-300">Found an issue or missing requirement?</p><Link to="/report-bug" className="btn mt-4">Report bug</Link></section></div>;
}
