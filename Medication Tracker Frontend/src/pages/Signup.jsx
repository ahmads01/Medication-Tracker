// src/pages/Signup.jsx
import React, { useState } from "react";

export default function Signup({ onSwitchToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // FRONTEND-ONLY: simulate registration
    setTimeout(() => {
      setLoading(false);

      if (!name || !email || !password) {
        setMessage("Please complete all fields.");
        return;
      }

      // simulate success
      setMessage("🎉 Registration successful! Redirecting to login...");
      setTimeout(() => {
        setMessage("");
        onSwitchToLogin(); // go to login page
      }, 1200);
    }, 800);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #00c6ff, #0072ff, #1e3c72, #2a5298)",
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
      `}</style>

      <div
        style={{
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(12px)",
          borderRadius: "16px",
          padding: "30px",
          width: "360px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
          color: "white",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 8 }}>Create Account ✨</h2>
        <p style={{ marginBottom: 12, color: "#d0e1ff" }}>Join us and start your journey</p>

        {message && (
          <div
            style={{
              background: "rgba(255,255,255,0.06)",
              padding: 10,
              borderRadius: 8,
              marginBottom: 12,
              color: message.includes("successful") ? "#bfffc7" : "#ffb4b4",
            }}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: "100%",
              padding: 10,
              marginBottom: 10,
              borderRadius: 8,
              border: "none",
              background: "rgba(255,255,255,0.06)",
              color: "white",
            }}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: 10,
              marginBottom: 10,
              borderRadius: 8,
              border: "none",
              background: "rgba(255,255,255,0.06)",
              color: "white",
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
              marginBottom: 12,
              borderRadius: 8,
              border: "none",
              background: "rgba(255,255,255,0.06)",
              color: "white",
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
              background: loading ? "#6b6b6b" : "linear-gradient(90deg,#00ffb3,#00d4ff)",
              color: "white",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {loading ? "Creating..." : "Sign Up"}
          </button>
        </form>

        <p style={{ marginTop: 12, color: "#c7dfff" }}>
          Already have an account?{" "}
          <span
            onClick={onSwitchToLogin}
            style={{ color: "#ffd700", cursor: "pointer", textDecoration: "underline" }}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
