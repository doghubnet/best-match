import { Link } from "react-router-dom";
import { freePlanFeatures } from "@/lib/pricing";

const steps = ["Create your profile", "Run the free checks", "Review your readiness report", "Improve weak areas"];

export default function Home() {
  return (
    <div className="overflow-hidden">
      <section className="container py-16 sm:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-300">Brovi Scan</p>
          <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-6xl">Check your travel readiness before you submit.</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">Review your program fit, documents, finances, interview answers, and final readiness in one simple workflow.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><Link to="/register" className="btn">Start free scan</Link><Link to="/pricing" className="btn bg-white/10 hover:bg-white/15">View pricing</Link></div>
        </div>
      </section>
      <section className="container pb-16"><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">{freePlanFeatures.map((feature) => <article key={feature.title} className="card"><feature.icon title={feature.title} /><h3 className="mt-4 font-semibold">{feature.title}</h3><p className="mt-2 text-sm text-slate-300">{feature.description}</p></article>)}</div></section>
      <section className="container pb-16"><div className="card bg-gradient-to-br from-indigo-950/50 to-slate-900"><h2 className="text-3xl font-bold">How it works</h2><div className="mt-6 grid gap-4 md:grid-cols-4">{steps.map((step, index) => <div key={step} className="rounded-2xl bg-white/5 p-4"><span className="text-sm text-indigo-300">0{index + 1}</span><p className="mt-2 font-semibold">{step}</p></div>)}</div></div></section>
      <section className="container pb-16"><div className="rounded-3xl border border-cyan-300/20 bg-cyan-400/10 p-6 text-cyan-50">Built for students who want clearer preparation, fewer missing documents, and better decision making. Brovi Scan is a readiness tool, not a visa or admission guarantee.</div></section>
    </div>
  );
}
