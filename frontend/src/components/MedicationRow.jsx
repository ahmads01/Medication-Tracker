import React, { useState } from "react";

export default function MedicationRow({ entry, onStatusChange }) {
  const [loading, setLoading] = useState(false);

  function updateStatus(status) {
    setLoading(true);
    onStatusChange({ ...entry, status });
    setTimeout(() => setLoading(false), 300); // simulate API
  }

  const getClass = (statusType) =>
    entry.status === statusType
      ? statusType === "taken"
        ? "bg-green-500 text-white shadow-md shadow-green-400/40"
        : statusType === "skipped"
        ? "bg-red-500 text-white shadow-md shadow-red-400/40"
        : "bg-yellow-500 text-white shadow-md shadow-yellow-400/40"
      : "bg-slate-700 text-gray-300 hover:bg-slate-600 transition-all";

  return (
    <div className="flex justify-between items-center p-4 rounded-xl bg-gradient-to-r from-indigo-900 via-blue-900 to-indigo-800 shadow-lg border border-indigo-700">
      {/* Medication Info */}
      <div>
        <div className="font-semibold text-lg text-blue-100">{entry.name}</div>
        <div className="text-sm text-blue-300">
          {new Date(entry.datetime).toLocaleString()}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          className={`px-4 py-1.5 rounded-full font-medium ${getClass("taken")}`}
          disabled={loading}
          onClick={() => updateStatus("taken")}
        >
          Taken
        </button>
        <button
          className={`px-4 py-1.5 rounded-full font-medium ${getClass("skipped")}`}
          disabled={loading}
          onClick={() => updateStatus("skipped")}
        >
          Skipped
        </button>
        <button
          className={`px-4 py-1.5 rounded-full font-medium ${getClass("delayed")}`}
          disabled={loading}
          onClick={() => updateStatus("delayed")}
        >
          Delay
        </button>
      </div>
    </div>
  );
}
