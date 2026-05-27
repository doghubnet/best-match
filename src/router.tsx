import { Navigate, Route, Routes } from "react-router-dom";

import PublicLayout from "@/components/layout/PublicLayout";
import AppLayout from "@/components/layout/AppLayout";
import ProtectedRoute from "@/components/layout/ProtectedRoute";

import Home from "@/pages/Home";
import Pricing from "@/pages/Pricing";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import ResetPassword from "@/pages/auth/ResetPassword";
import Privacy from "@/pages/legal/Privacy";
import Terms from "@/pages/legal/Terms";
import Dashboard from "@/pages/app/Dashboard";
import Profile from "@/pages/app/Profile";
import ProgramMatch from "@/pages/app/ProgramMatch";
import DocumentScan from "@/pages/app/DocumentScan";
import Bank from "@/pages/app/Bank";
import Interview from "@/pages/app/Interview";
import Report from "@/pages/app/Report";
import Consultant from "@/pages/app/Consultant";
import Tasks from "@/pages/app/Tasks";
import Settings from "@/pages/app/Settings";
import Admin from "@/pages/app/Admin";
import NotFound from "@/pages/NotFound";
import ReportBug from "@/pages/report-bug";

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="terms" element={<Terms />} />
        <Route path="report-bug" element={<ReportBug />} />
      </Route>

      <Route
        path="app"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="program-match" element={<ProgramMatch />} />
        <Route path="documents" element={<DocumentScan />} />
        <Route path="bank" element={<Bank />} />
        <Route path="interview" element={<Interview />} />
        <Route path="report" element={<Report />} />
        <Route path="consultant" element={<Consultant />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="settings" element={<Settings />} />
        <Route path="admin" element={<Admin />} />
      </Route>

      <Route path="dashboard" element={<Navigate to="/app" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
