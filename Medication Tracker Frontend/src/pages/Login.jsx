// src/pages/Login.jsx
import React, { useState } from "react";

export default function Login({ onSwitchToSignup, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // FRONTEND-ONLY: simulate a login (no backend)
    setTimeout(() => {
      setLoading(false);

      // basic local validation (you can change as needed)
      if (!email || !password) {
        setError("Please enter email and password.");
        return;
      }

      // simulate success: store dummy token and call parent callback
      localStorage.setItem("token", "dummy_token");
      onLoginSuccess(); // tells wrapper to show main app
    }, 700);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #1e3c72, #2a5298, #00c6ff, #0072ff)",
        backgroundSize: "400% 400%",
        animation: "gradientBG 10s ease infinite",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes gradientBG {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div
        style={{
          background: "rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(12px)",
          borderRadius: "16px",
          padding: "32px",
          width: "360px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
          color: "white",
          textAlign: "center",
          animation: "fadeIn 0.6s ease-in-out",
        }}
      >
        <h2 style={{ fontSize: "28px", fontWeight: "700", marginBottom: 10 }}>
          Welcome Back 👋
        </h2>
        <p style={{ marginBottom: 16, color: "#d0e1ff" }}>
          Please login to continue
        </p>

        {error && (
          <div
            style={{
              color: "#ffb4b4",
              background: "rgba(255,255,255,0.06)",
              padding: 8,
              borderRadius: 8,
              marginBottom: 12,
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: 10,
              borderRadius: 8,
              border: "none",
              marginBottom: 12,
              background: "rgba(255,255,255,0.06)",
              color: "white",
              fontSize: 14,
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: 10,
              borderRadius: 8,
              border: "none",
              marginBottom: 16,
              background: "rgba(255,255,255,0.06)",
              color: "white",
              fontSize: 14,
            }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: 10,
              borderRadius: 8,
              border: "none",
              background: loading ? "#6b6b6b" : "linear-gradient(90deg,#00c6ff,#0072ff)",
              color: "white",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p style={{ marginTop: 14, color: "#c7dfff", fontSize: 14 }}>
          Don’t have an account?{" "}
          <span
            onClick={onSwitchToSignup}
            style={{ color: "#ffd700", cursor: "pointer", textDecoration: "underline" }}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}
