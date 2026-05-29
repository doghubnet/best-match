import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";

export default function Login() {
  const [email, setEmail] = useState("demo@broviscan.app");
  const [password, setPassword] = useState("demo12345");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const { login, demoMode } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const result = await login(email, password);
    setBusy(false);
    if (!result.ok) return setError(result.error ?? "Unable to sign in.");
    navigate((location.state as { from?: string } | null)?.from ?? "/app", { replace: true });
  }

  return (
    <main className="container py-14">
      <section className="mx-auto max-w-md rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl">
        <p className="text-sm font-semibold text-indigo-300">Welcome back</p>
        <h1 className="mt-2 text-3xl font-bold">Login to Brovi Scan</h1>
        {demoMode ? <p className="mt-3 rounded-xl bg-cyan-500/10 p-3 text-sm text-cyan-100">Demo mode is active because Supabase is not configured. Use demo@broviscan.app / demo12345.</p> : null}
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <label className="block text-sm">Email<input className="input mt-2" value={email} onChange={(e) => setEmail(e.target.value)} type="email" autoComplete="email" required /></label>
          <label className="block text-sm">Password<input className="input mt-2" value={password} onChange={(e) => setPassword(e.target.value)} type="password" autoComplete="current-password" required /></label>
          {error ? <p className="rounded-xl bg-red-500/10 p-3 text-sm text-red-200">{error}</p> : null}
          <button className="btn w-full" disabled={busy}>{busy ? "Signing in..." : "Login"}</button>
        </form>
        <div className="mt-5 flex justify-between text-sm text-slate-300"><Link to="/register">Create account</Link><Link to="/forgot-password">Forgot password?</Link></div>
      </section>
    </main>
  );
}
