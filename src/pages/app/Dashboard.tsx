import { Link } from "react-router-dom";
import { useAuth } from "@/lib/auth";

const cards = [
  ["Profile", "/app/profile", "Add education, target country, and sponsor details."],
  ["Program match", "/app/program-match", "Check how your background fits your intended program."],
  ["Documents", "/app/documents", "Review required documents and quality gaps."],
  ["Finance", "/app/bank", "Estimate funding visibility and shortfalls."],
  ["Interview", "/app/interview", "Practice common questions with feedback."],
  ["Final report", "/app/report", "Review strengths, risks, and next steps."],
];

export default function Dashboard() {
  const { user, demoMode } = useAuth();
  return (
    <div className="space-y-8">
      <section className="rounded-3xl bg-gradient-to-br from-indigo-600/25 to-cyan-500/10 p-6">
        <p className="text-sm text-indigo-200">{demoMode ? "Demo workspace" : "Student workspace"}</p>
        <h1 className="mt-2 text-3xl font-bold">Hi {user?.name ?? "there"}, continue your readiness plan.</h1>
        <p className="mt-2 text-slate-300">Complete each check before you submit applications or travel documentation.</p>
      </section>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{cards.map(([title, href, text], index) => <Link key={title} to={href} className="card transition hover:-translate-y-1 hover:border-indigo-400/50"><span className="text-sm text-indigo-300">Step {index + 1}</span><h2 className="mt-2 text-xl font-semibold">{title}</h2><p className="mt-2 text-sm text-slate-300">{text}</p></Link>)}</section>
      <section className="grid gap-4 lg:grid-cols-2"><div className="card"><h2 className="text-xl font-semibold">Recent activity</h2><p className="mt-3 text-slate-300">No completed scans yet. Start with your profile or program match.</p></div><div className="card"><h2 className="text-xl font-semibold">Next tasks</h2><ul className="mt-3 list-disc space-y-2 pl-5 text-slate-300"><li>Complete your profile</li><li>Run a program match scan</li><li>Upload your first document checklist item</li></ul></div></section>
    </div>
  );
}
