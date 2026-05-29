import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { hasSupabase, supabase } from "@/lib/supabase";

export type BroviUser = {
  email: string;
  name?: string;
  role: "user" | "admin";
  demo?: boolean;
};

type AuthContextType = {
  user: BroviUser | null;
  loading: boolean;
  demoMode: boolean;
  login: (email: string, password?: string) => Promise<{ ok: boolean; error?: string }>;
  register: (name: string, email: string, password?: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

const demoCredentials = {
  email: "demo@broviscan.app",
  password: "demo12345",
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<BroviUser | null>(() => {
    const saved = localStorage.getItem("brovi_user");
    return saved ? (JSON.parse(saved) as BroviUser) : null;
  });
  const [loading] = useState(false);
  const demoMode = !hasSupabase;

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      loading,
      demoMode,
      async login(email: string, password = "") {
        const normalizedEmail = email.trim().toLowerCase();
        if (!/.+@.+\..+/.test(normalizedEmail)) return { ok: false, error: "Enter a valid email address." };

        if (!hasSupabase || !supabase) {
          if (normalizedEmail !== demoCredentials.email || password !== demoCredentials.password) {
            return { ok: false, error: "Demo mode: use demo@broviscan.app / demo12345." };
          }
          const demoUser: BroviUser = { email: normalizedEmail, role: "user", demo: true, name: "Demo Student" };
          setUser(demoUser);
          localStorage.setItem("brovi_user", JSON.stringify(demoUser));
          return { ok: true };
        }

        const { data, error } = await supabase.auth.signInWithPassword({ email: normalizedEmail, password });
        if (error) return { ok: false, error: error.message };
        const nextUser: BroviUser = {
          email: data.user?.email ?? normalizedEmail,
          role: normalizedEmail.includes("admin") ? "admin" : "user",
          name: data.user?.user_metadata?.full_name,
        };
        setUser(nextUser);
        localStorage.setItem("brovi_user", JSON.stringify(nextUser));
        return { ok: true };
      },
      async register(name: string, email: string, password = "") {
        const normalizedEmail = email.trim().toLowerCase();
        if (name.trim().length < 2) return { ok: false, error: "Enter your full name." };
        if (!/.+@.+\..+/.test(normalizedEmail)) return { ok: false, error: "Enter a valid email address." };
        if (password.length < 8) return { ok: false, error: "Password must be at least 8 characters." };

        if (!hasSupabase || !supabase) {
          const demoUser: BroviUser = { email: normalizedEmail, role: "user", demo: true, name };
          setUser(demoUser);
          localStorage.setItem("brovi_user", JSON.stringify(demoUser));
          return { ok: true };
        }

        const { data, error } = await supabase.auth.signUp({
          email: normalizedEmail,
          password,
          options: { data: { full_name: name } },
        });
        if (error) return { ok: false, error: error.message };
        const nextUser: BroviUser = { email: data.user?.email ?? normalizedEmail, role: "user", name };
        setUser(nextUser);
        localStorage.setItem("brovi_user", JSON.stringify(nextUser));
        return { ok: true };
      },
      async logout() {
        if (hasSupabase && supabase) await supabase.auth.signOut();
        setUser(null);
        localStorage.removeItem("brovi_user");
      },
    }),
    [demoMode, loading, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
