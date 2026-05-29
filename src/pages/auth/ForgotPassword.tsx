import { useState } from "react";
import { hasSupabase, supabase } from "@/lib/supabase";

export default function ForgotPassword() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = String(new FormData(event.currentTarget).get("email") ?? "");
    if (!/.+@.+\..+/.test(email)) return setError("Enter a valid email address.");
    setError("");
    if (hasSupabase && supabase) await supabase.auth.resetPasswordForEmail(email).catch(() => undefined);
    setMessage("If this email exists, reset instructions have been sent.");
  }
  return <main className="container py-14"><form onSubmit={onSubmit} className="card mx-auto max-w-md space-y-4"><h1 className="text-3xl font-bold">Forgot password</h1><label className="block text-sm">Email<input name="email" className="input mt-2" type="email" required /></label>{error&&<p className="text-red-300">{error}</p>}{message&&<p className="text-cyan-200">{message}</p>}<button className="btn w-full">Send reset link</button></form></main>;
}
