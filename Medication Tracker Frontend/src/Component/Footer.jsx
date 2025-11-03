import React from "react";

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-6 mt-12 shadow-inner">
      <div className="max-w-6xl mx-auto px-4 text-center text-sm">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-white">HealthCare</span> — Powered by{" "}
        <span className="font-semibold text-blue-300">CodeCelix</span>.
      </div>
    </footer>
  );
}
