import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router";
import "./index.css";
import { AuthProvider } from "./lib/auth";
import ErrorBoundary from "./components/ErrorBoundary";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Missing #root element in index.html");

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <AuthProvider>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
