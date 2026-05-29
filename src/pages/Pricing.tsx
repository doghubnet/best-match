import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckBoxIcon } from "@/components/icons/BroviAnimatedIcons";
import { hasSupabase, supabase } from "@/lib/supabase";

const plans = [
  { name: "Free", price: "$0/month", audience: "For first launch users", cta: "Start free scan", href: "/register", features: ["Program match scan", "Document checklist", "Financial scan", "Interview practice questions", "Final readiness report"] },
  { name: "Priority Review", price: "Coming soon", audience: "For users who want human review", cta: "Join waitlist", href: "#waitlist", features: ["Consultant review", "Improved report notes", "Priority response", "Document gap feedback"] },
  { name: "Partner / Consultant", price: "Coming soon", audience: "For consultants and institutions", cta: "Contact us", href: "/report-bug", features: ["Applicant dashboard", "Review queue", "Exportable reports", "Team access"] },
];

export default function Pricing() {
  const [mode, setMode] = useState<"personal" | "consultant">("personal");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  async function joinWaitlist(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!/.+@.+\..+/.test(email)) return setMessage("Enter a valid email to join the waitlist.");
    const payload = { email, mode, created_at: new Date().toISOString() };
    try {
      if (hasSupabase && supabase) await supabase.from("waitlist").insert(payload);
      else localStorage.setItem("brovi_waitlist", JSON.stringify([...(JSON.parse(localStorage.getItem("brovi_waitlist") || "[]") as unknown[]), payload]));
      setMessage("You're on the waitlist.");
    } catch {
      localStorage.setItem("brovi_waitlist", JSON.stringify([...(JSON.parse(localStorage.getItem("brovi_waitlist") || "[]") as unknown[]), payload]));
      setMessage("Saved locally for now.");
    }
  }

  return <main className="container py-14"><div className="mx-auto max-w-3xl text-center"><h1 className="text-4xl font-bold">Simple pricing for readiness checks</h1><p className="mt-3 text-slate-300">No payment integration yet. Start with the free workflow and join the waitlist for review tools.</p><div className="mx-auto mt-6 inline-flex rounded-full border border-white/10 bg-white/5 p-1"><button className={`rounded-full px-4 py-2 text-sm ${mode === "personal" ? "bg-white text-slate-950" : "text-slate-300"}`} onClick={() => setMode("personal")}>Personal</button><button className={`rounded-full px-4 py-2 text-sm ${mode === "consultant" ? "bg-white text-slate-950" : "text-slate-300"}`} onClick={() => setMode("consultant")}>Consultant</button></div></div><div className="mt-10 grid gap-5 lg:grid-cols-3">{plans.map((plan) => <section key={plan.name} className="card flex flex-col"><h2 className="text-2xl font-bold">{plan.name}</h2><p className="mt-2 text-3xl font-bold">{plan.price}</p><p className="mt-2 text-sm text-slate-300">{plan.audience}</p><ul className="mt-6 flex-1 space-y-3">{plan.features.map((feature) => <li key={feature} className="flex gap-2 text-sm"><CheckBoxIcon className="h-5 w-5 shrink-0" />{feature}</li>)}</ul><Link to={plan.href} className="btn mt-6 w-full">{plan.cta}</Link></section>)}</div><form id="waitlist" onSubmit={joinWaitlist} className="card mx-auto mt-8 max-w-xl"><h3 className="text-xl font-semibold">Join the priority review waitlist</h3><div className="mt-4 flex flex-col gap-3 sm:flex-row"><input className="input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" /><button className="btn">Join waitlist</button></div>{message ? <p className="mt-3 text-sm text-cyan-200">{message}</p> : null}</form><p className="mt-8 text-center text-sm text-slate-400">Brovi Scan is a readiness tool, not a visa or admission guarantee.</p></main>;
}
