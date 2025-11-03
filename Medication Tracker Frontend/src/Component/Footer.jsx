import React from "react";

export default function Footer() {
  return (
    <footer className="border-t border-darkBorder bg-darkCard/90 backdrop-blur-md py-6 mt-12">
      <div className="max-w-6xl mx-auto px-4 text-center text-textSecondary text-sm">
        © {new Date().getFullYear()} <span className="font-semibold text-white">HealthCare</span> — Powered by <span className="font-semibold text-primary">CodeCelix</span>.
      </div>
    </footer>
  );
}
