import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";

export default function Register() {
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const { register, demoMode } = useAuth();
  const navigate = useNavigate();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setBusy(true);
    setError("");
    const result = await register(String(form.get("name") ?? ""), String(form.get("email") ?? ""), String(form.get("password") ?? ""));
    setBusy(false);
    if (!result.ok) return setError(result.error ?? "Unable to create account.");
    navigate("/app", { replace: true });
  }

  return (
    <main className="container py-14">
      <section className="mx-auto max-w-md rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl">
        <p className="text-sm font-semibold text-indigo-300">Start free</p>
        <h1 className="mt-2 text-3xl font-bold">Create your Brovi Scan account</h1>
        {demoMode ? <p className="mt-3 text-sm text-slate-300">Supabase is not configured, so registration will create a local demo session.</p> : null}
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <label className="block text-sm">Full name<input name="name" className="input mt-2" required /></label>
          <label className="block text-sm">Email<input name="email" className="input mt-2" type="email" required /></label>
          <label className="block text-sm">Password<input name="password" className="input mt-2" type="password" minLength={8} required /></label>
          {error ? <p className="rounded-xl bg-red-500/10 p-3 text-sm text-red-200">{error}</p> : null}
          <button className="btn w-full" disabled={busy}>{busy ? "Creating..." : "Create account"}</button>
        </form>
        <p className="mt-5 text-sm text-slate-300">Already have an account? <Link to="/login" className="text-indigo-300">Login</Link></p>
      </section>
    </main>
  );
}
