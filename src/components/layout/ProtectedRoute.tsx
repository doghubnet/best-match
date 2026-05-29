import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/lib/auth";

type ProtectedRouteProps = { children: ReactNode };

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, demoMode, loading } = useAuth();
  const location = useLocation();
  if (loading) return <div className="min-h-screen bg-slate-950 p-8 text-white">Loading Brovi Scan...</div>;
  if (!user && !demoMode) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  return <>{children}</>;
}
