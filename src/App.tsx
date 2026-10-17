
import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { onAuthStateChanged, type User } from "firebase/auth";

import { auth } from "./firebase/firebase";

import LandingPage from "./pages/landing.page";
import ProjectsPage from "./pages/project.page";
import CertificatePage from "./pages/certificate.page";

import LoginPage from "./admin/pages/login.page";
import DashboardPage from "./admin/pages/dashboard.page";
import AdminProjectsPage from "./admin/pages/projects.page";
import AdminCertificatesPage from "./admin/pages/certificates.page";
import WorkPage from "./admin/pages/work.page";

import { ThemeProvider } from "./context/theme.context";

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
        setAuthLoading(false);
      },
      (error) => {
        console.error("Firebase auth error:", error);
        setAuthLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-slate-500">
          Memeriksa autentikasi...
        </p>
      </div>
    );
  }

  const protectedPage = (page: React.ReactNode) =>
    user ? page : <Navigate to="/login" replace />;

  return (
    <ThemeProvider>
      <Routes>
        {/* Public pages */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/certificates" element={<CertificatePage />} />

        {/* Login */}
        <Route
          path="/login"
          element={
            user ? <Navigate to="/admin" replace /> : <LoginPage />
          }
        />

        {/* Protected admin pages */}
        <Route
          path="/admin"
          element={protectedPage(<DashboardPage />)}
        />
        <Route
          path="/admin/projects"
          element={protectedPage(<AdminProjectsPage />)}
        />
        <Route
          path="/admin/certificates"
          element={protectedPage(<AdminCertificatesPage />)}
        />
        <Route
          path="/admin/work"
          element={protectedPage(<WorkPage />)}
        />

        {/* Unknown route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ThemeProvider>
  );
}
