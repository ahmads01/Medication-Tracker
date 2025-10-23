import React from "react";

export default function Topbar() {
  return (
    <header className="bg-gradient-to-r from-indigo-950 via-blue-900 to-indigo-800 shadow-md px-8 py-4 flex justify-between items-center border-b border-indigo-700">
      {/* Left: App Name */}
      <h1 className="text-2xl font-extrabold tracking-wide text-blue-200">
        <span className="text-blue-400">Medication</span> Tracker
      </h1>

      {/* Right: User Info / Placeholder */}
      <div className="flex items-center gap-4">
        <span className="text-blue-300 text-sm hidden sm:block">
          Welcome back 👋
        </span>
        <img
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          alt="User Avatar"
          className="w-9 h-9 rounded-full border-2 border-blue-500 shadow-md"
        />
      </div>
    </header>
  );
}
