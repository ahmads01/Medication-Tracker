import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "History", path: "/history" },
    { name: "Settings", path: "/settings" },
  ];

  return (
    <aside className="w-56 min-h-screen bg-gradient-to-b from-indigo-950 via-blue-900 to-indigo-900 text-blue-100 flex flex-col shadow-xl">
      {/* Navigation */}
      <nav className="flex-1 p-5 space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                isActive
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/40"
                  : "text-blue-200 hover:bg-blue-800 hover:text-white"
              }`}
            >
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
