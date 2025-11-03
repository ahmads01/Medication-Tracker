import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext.jsx";

export default function Settings() {
  const { settings, setSettings } = useContext(AppContext);
  const [saving, setSaving] = useState(false);

  function toggleReminders() {
    setSaving(true);
    const next = { ...settings, remindersEnabled: !settings.remindersEnabled };
    setSettings(next);
    setTimeout(() => setSaving(false), 300); // simulate API
  }

  async function testNotification() {
    if (!("Notification" in window))
      return alert("Notifications are not supported on this browser.");
    const perm = await Notification.requestPermission();
    if (perm === "granted") {
      new Notification("💊 Test Reminder", {
        body: "This is a test medication reminder.",
      });
    } else {
      alert("Notification permission not granted or blocked.");
    }
  }

  return (
    <div className="p-8 space-y-8 bg-gradient-to-b from-indigo-950 via-blue-900 to-indigo-950 min-h-screen text-blue-100">
      {/* Header */}
      <h2 className="text-2xl font-extrabold tracking-wide text-blue-300 border-b border-indigo-800 pb-2">
        Settings ⚙️
      </h2>

      {/* Reminder Toggle Card */}
      <div className="p-6 bg-gradient-to-br from-slate-900/70 to-blue-900/40 border border-indigo-800 rounded-xl shadow-md hover:shadow-blue-600/40 transition-all flex justify-between items-center backdrop-blur-lg">
        <div>
          <div className="font-semibold text-blue-200 text-lg">
            Enable Reminders
          </div>
          <div className="text-sm text-blue-400">
            Turn on/off browser notifications for medication reminders.
          </div>
        </div>
        <button
          className={`px-5 py-2 rounded-full font-semibold transition-all ${
            settings.remindersEnabled
              ? "bg-green-500 text-white shadow-lg shadow-green-400/40 hover:bg-green-600"
              : "bg-slate-700 text-blue-200 border border-indigo-700 hover:bg-slate-600"
          }`}
          onClick={toggleReminders}
          disabled={saving}
        >
          {settings.remindersEnabled ? "On" : "Off"}
        </button>
      </div>

      {/* Test Notification Card */}
      <div className="p-6 bg-gradient-to-br from-slate-900/70 to-blue-900/40 border border-indigo-800 rounded-xl shadow-md hover:shadow-blue-600/40 transition-all backdrop-blur-lg">
        <div className="font-semibold text-blue-200 text-lg">
          Test Notification
        </div>
        <p className="text-blue-400 text-sm mt-1">
          Send a test medication reminder to ensure notifications are working.
        </p>
        <button
          className="mt-4 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold shadow-md shadow-blue-500/40 transition-all"
          onClick={testNotification}
        >
          Send Test Notification
        </button>
      </div>
    </div>
  );
}
