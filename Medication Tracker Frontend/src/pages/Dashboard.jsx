import React, { useContext } from "react";
import { AppContext } from "../context/AppContext.jsx";

export default function Dashboard() {
  const { history } = useContext(AppContext);
  const todayMeds = history.filter(
    (h) => new Date(h.datetime).toDateString() === new Date().toDateString()
  );

  return (
    <div className="p-8 space-y-6 bg-gradient-to-b from-indigo-950 via-blue-900 to-indigo-950 min-h-screen text-blue-100">
      {/* Header */}
      <h2 className="text-2xl font-extrabold tracking-wide text-blue-300 border-b border-indigo-700 pb-2">
        Today's Medications 💊
      </h2>

      {/* Conditional Rendering */}
      {todayMeds.length === 0 ? (
        <div className="text-blue-300 bg-slate-800/60 backdrop-blur-lg border border-indigo-700 rounded-xl p-6 text-center shadow-lg">
          <p className="text-lg font-medium">
            No medications scheduled for today.
          </p>
        </div>
      ) : (
        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {todayMeds.map((m) => (
            <li
              key={m.id}
              className="p-5 bg-gradient-to-br from-slate-800/70 to-blue-900/40 backdrop-blur-lg border border-indigo-700 rounded-xl shadow-md hover:shadow-blue-600/40 transition-all duration-300"
            >
              <div className="font-semibold text-lg text-blue-200 mb-1">
                {m.name}
              </div>
              <div className="text-sm text-blue-400">
                Time: {new Date(m.datetime).toLocaleTimeString()}
              </div>
              <div className="text-sm mt-1">
                Status:{" "}
                <span
                  className={`font-semibold ${
                    m.status === "taken"
                      ? "text-green-400"
                      : m.status === "skipped"
                      ? "text-red-400"
                      : "text-yellow-400"
                  }`}
                >
                  {m.status || "Pending"}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
