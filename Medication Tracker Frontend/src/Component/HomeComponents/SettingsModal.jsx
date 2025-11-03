import React from "react";
import { FiX, FiBell, FiRefreshCcw } from "react-icons/fi";
import { motion } from "framer-motion";

export default function SettingsModal({ open, onClose }) {
  if (!open) return null;

  const resetData = () => {
    localStorage.removeItem("meds_dark");
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose}></div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative bg-darkCard border border-darkBorder rounded-lg shadow-lg max-w-md w-full p-6 transition-theme duration-300"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 text-gray-400 hover:text-white"
        >
          <FiX />
        </button>

        <h3 className="text-lg font-semibold mb-4 text-textPrimary">Settings</h3>

        <div className="space-y-5">
          {/*  Notifications */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <FiBell className="text-secondary" />
              <span className="text-textSecondary">Notifications</span>
            </div>
            <button
              onClick={() => Notification.requestPermission()}
              className="px-3 py-1 rounded-md border border-darkBorder text-sm bg-darkBg text-textSecondary hover:bg-darkBorder transition"
            >
              Enable
            </button>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md border border-darkBorder text-textSecondary hover:bg-darkBorder transition"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
}
