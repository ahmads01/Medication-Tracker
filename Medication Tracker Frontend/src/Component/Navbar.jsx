import React, { useState } from "react";
import {
  FiHome,
  FiList,
  FiPlusCircle,
  FiClock,
  FiSettings,
  FiUser,
  FiBell,
  FiEdit3,
} from "react-icons/fi";

export default function Navbar({ onAdd }) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <nav className="bg-darkCard border-b border-darkBorder sticky top-0 z-50 backdrop-blur-md shadow-md transition-theme duration-500">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between relative">
        {/* Brand / Logo */}
        <h1 className="text-primary text-2xl font-semibold tracking-wide">
          HealthCare
        </h1>

        {/* Navigation Links */}
        <div className="flex items-center gap-6 text-textSecondary text-sm font-medium">
          <a
            href="/"
            className="flex items-center gap-2 hover:text-primary transition-colors duration-300"
          >
            <FiHome className="text-lg" /> Home
          </a>

          <a
            href="/medications"
            className="flex items-center gap-2 hover:text-primary transition-colors duration-300"
          >
            <FiList className="text-lg" /> Medication List
          </a>

          <button
            onClick={onAdd}
            className="flex items-center gap-2 hover:text-primary transition-colors duration-300"
          >
            <FiPlusCircle className="text-lg" /> Add Medication
          </button>

          <a
            href="/history"
            className="flex items-center gap-2 hover:text-primary transition-colors duration-300"
          >
            <FiClock className="text-lg" /> History
          </a>

          {/* Settings Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsSettingsOpen(true)}
            onMouseLeave={() => setIsSettingsOpen(false)}
          >
            <button
              className="flex items-center gap-2 hover:text-primary transition-colors duration-300"
            >
              <FiSettings className="text-lg" /> Settings
            </button>

            {isSettingsOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-darkBg border border-darkBorder rounded-md shadow-lg py-2 z-50">
                <a
                  href="/settings/reminders"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-textSecondary hover:bg-darkBorder hover:text-primary transition-colors duration-300"
                >
                  <FiBell className="text-lg" /> Enable / Disable Reminders
                </a>
                <a
                  href="/settings/profile"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-textSecondary hover:bg-darkBorder hover:text-primary transition-colors duration-300"
                >
                  <FiEdit3 className="text-lg" /> Edit Profile & Notifications
                </a>
              </div>
            )}
          </div>

          <a
            href="/profile"
            className="flex items-center gap-2 hover:text-primary transition-colors duration-300"
          >
            <FiUser className="text-lg" /> Profile
          </a>
        </div>
      </div>
    </nav>
  );
}
