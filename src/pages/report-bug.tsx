import { useState } from "react";
import { hasSupabase, supabase } from "@/lib/supabase";

export default function ReportBug() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    if (!/.+@.+\..+/.test(String(data.email ?? ""))) return setError("Valid email required.");
    setError("");
    try {
      if (hasSupabase && supabase) {
        await supabase.from("bug_reports").insert(data);
        setMessage("Bug report submitted.");
      } else {
        const previous = JSON.parse(localStorage.getItem("bug_reports") || "[]") as unknown[];
        localStorage.setItem("bug_reports", JSON.stringify([...previous, { ...data, created_at: new Date().toISOString() }]));
        setMessage("Bug report saved locally for now.");
      }
    } catch {
      const previous = JSON.parse(localStorage.getItem("bug_reports") || "[]") as unknown[];
      localStorage.setItem("bug_reports", JSON.stringify([...previous, { ...data, created_at: new Date().toISOString() }]));
      setMessage("Bug report saved locally for now.");
    }
  }

  return <main className="container py-14"><form onSubmit={submit} className="card mx-auto grid max-w-2xl gap-4 md:grid-cols-2"><h1 className="text-3xl font-bold md:col-span-2">Report a bug</h1><label className="text-sm">Name<input name="name" required className="input mt-2" /></label><label className="text-sm">Email<input name="email" type="email" required className="input mt-2" /></label><label className="text-sm md:col-span-2">Page or feature<input name="feature" required className="input mt-2" /></label><label className="text-sm">Severity<select name="severity" className="input mt-2"><option>Low</option><option>Medium</option><option>High</option></select></label><label className="text-sm">Screenshot link optional<input name="screenshot" className="input mt-2" /></label><label className="text-sm md:col-span-2">Bug description<textarea name="description" required className="input mt-2 min-h-32" /></label><button className="btn md:col-span-2">Submit bug report</button>{error ? <p className="text-red-300 md:col-span-2">{error}</p> : null}{message ? <p className="text-cyan-200 md:col-span-2">{message}</p> : null}</form></main>;
}
