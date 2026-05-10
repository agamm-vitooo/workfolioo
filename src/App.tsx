import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { onAuthStateChanged }
from "firebase/auth";

import { useEffect, useState }
from "react";

import { auth }
from "./firebase/firebase";

import LandingPage
from "./pages/landing.page";

import LoginPage
from "./admin/pages/login.page";

import DashboardPage
from "./admin/pages/dashboard.page";

import ProjectsPage
from "./admin/pages/projects.page";

import CertificatesPage
from "./admin/pages/certificates.page";

import WorkPage
from "./admin/pages/work.page";

import "./App.css";

const App: React.FC = () => {

  const [user, setUser] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(auth, (user) => {

        setUser(user);

        setLoading(false);

      });

    return () => unsubscribe();

  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (

    <Router>

      <Routes>

        {/* PUBLIC */}
        <Route
          path="/"
          element={<LandingPage />}
        />

        {/* LOGIN */}
        <Route
          path="/login"
          element={<LoginPage />}
        />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            user
              ? <DashboardPage />
              : <Navigate to="/login" />
          }
        />

        <Route
          path="/admin/projects"
          element={
            user
              ? <ProjectsPage />
              : <Navigate to="/login" />
          }
        />

        <Route
          path="/admin/certificates"
          element={
            user
              ? <CertificatesPage />
              : <Navigate to="/login" />
          }
        />

        <Route
          path="/admin/work"
          element={
            user
              ? <WorkPage />
              : <Navigate to="/login" />
          }
        />

      </Routes>

    </Router>
  );
};

export default App;