import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Home from "../Component/HomeComponents/Home";
import MedicationsPage from "../pages/MedicationsPage";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import History from "../pages/History";
import Settings from "../pages/Settings";

// Simple authentication check
function ProtectedRoute({ element }) {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  return isAuthenticated ? element : <Navigate to="/login" replace />;
}

function LoginWrapper() {
  const navigate = useNavigate();
  const handleLoginSuccess = () => {
    localStorage.setItem("isAuthenticated", "true");
    navigate("/");
  };
  const handleSwitchToSignup = () => {
    navigate("/signup");
  };
  return (
    <Login
      onLoginSuccess={handleLoginSuccess}
      onSwitchToSignup={handleSwitchToSignup}
    />
  );
}

function SignupWrapper() {
  const navigate = useNavigate();
  const handleSwitchToLogin = () => {
    navigate("/login");
  };
  return <Signup onSwitchToLogin={handleSwitchToLogin} />;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginWrapper />} />
      <Route path="/signup" element={<SignupWrapper />} />

      {/*  Protected Routes */}
      <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
      <Route path="/medications" element={<ProtectedRoute element={<MedicationsPage />} />} />
      <Route path="/history" element={<ProtectedRoute element={<History />} />} />
      <Route path="/settings" element={<ProtectedRoute element={<Settings />} />} />

      {/* Redirect invalid paths */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
