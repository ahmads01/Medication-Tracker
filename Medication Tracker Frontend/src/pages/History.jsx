import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext.jsx";
import MedicationRow from "../Component/MedicationRow/MedicationRow.jsx"

export default function History() {
  const { history, setHistory } = useContext(AppContext);
  const [view, setView] = useState("list");
  const [monthOffset, setMonthOffset] = useState(0);

  function handleStatusChange(updated) {
    setHistory((h) =>
      h.map((item) => (item.id === updated.id ? updated : item))
    );
  }

  const now = new Date();
  const shown = new Date(now.getFullYear(), now.getMonth() + monthOffset, 1);
  const startDay = new Date(shown.getFullYear(), shown.getMonth(), 1).getDay();
  const daysInMonth = new Date(shown.getFullYear(), shown.getMonth() + 1, 0).getDate();

  const dayCells = [];
  for (let i = 0; i < startDay; i++) dayCells.push(null);
  for (let d = 1; d <= daysInMonth; d++)
    dayCells.push(new Date(shown.getFullYear(), shown.getMonth(), d));

  const historyByDate = history.reduce((acc, cur) => {
    const dk = new Date(cur.datetime).toDateString();
    acc[dk] = acc[dk] || [];
    acc[dk].push(cur);
    return acc;
  }, {});

  return (
    <div className="p-8 space-y-8 bg-gradient-to-b from-indigo-950 via-blue-900 to-indigo-950 min-h-screen text-blue-100">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-indigo-800 pb-3">
        <h2 className="text-2xl font-extrabold tracking-wide text-blue-300">
          Medication History 📅
        </h2>

        <button
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md shadow-blue-500/40 transition-all duration-300"
          onClick={() => setView(view === "list" ? "calendar" : "list")}
        >
          Switch to {view === "list" ? "Calendar" : "List"} View
        </button>
      </div>

      {/* List View */}
      {view === "list" ? (
        <div className="space-y-4">
          {history.length === 0 ? (
            <div className="bg-slate-800/60 border border-indigo-800 rounded-xl p-6 text-center text-blue-300 backdrop-blur-lg shadow-md">
              No medication history found.
            </div>
          ) : (
            history
              .slice()
              .sort((a, b) => new Date(b.datetime) - new Date(a.datetime))
              .map((entry) => (
                <MedicationRow
                  key={entry.id}
                  entry={entry}
                  onStatusChange={handleStatusChange}
                />
              ))
          )}
        </div>
      ) : (
        /* Calendar View */
        <div>
          <div className="flex justify-between mb-4 items-center">
            <div className="text-lg font-semibold text-blue-300">
              {shown.toLocaleString("default", { month: "long", year: "numeric" })}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setMonthOffset((o) => o - 1)}
                className="px-3 py-1.5 bg-slate-800 border border-indigo-700 text-blue-200 rounded-lg hover:bg-slate-700 transition-all"
              >
                Prev
              </button>
              <button
                onClick={() => setMonthOffset((o) => o + 1)}
                className="px-3 py-1.5 bg-slate-800 border border-indigo-700 text-blue-200 rounded-lg hover:bg-slate-700 transition-all"
              >
                Next
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2 text-center">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div
                key={d}
                className="font-semibold text-blue-400 text-sm tracking-wide"
              >
                {d}
              </div>
            ))}

            {dayCells.map((dt, idx) => {
              if (!dt)
                return (
                  <div
                    key={idx}
                    className="h-24 rounded-xl bg-slate-800/60 border border-indigo-800"
                  ></div>
                );

              const items = historyByDate[dt.toDateString()] || [];
              return (
                <div
                  key={idx}
                  className="h-24 p-2 rounded-xl bg-gradient-to-br from-slate-900/70 to-blue-900/40 border border-indigo-800 shadow-md hover:shadow-blue-600/40 transition-all flex flex-col justify-between"
                >
                  <div className="text-sm font-semibold text-blue-200">
                    {dt.getDate()}
                  </div>
                  <div className="text-xs space-y-0.5 text-blue-300 overflow-hidden">
                    {items.slice(0, 3).map((it) => (
                      <div key={it.id} className="truncate">
                        • {it.name} —{" "}
                        <span
                          className={
                            it.status === "taken"
                              ? "text-green-400"
                              : it.status === "skipped"
                              ? "text-red-400"
                              : "text-yellow-400"
                          }
                        >
                          {it.status || "pending"}
                        </span>
                      </div>
                    ))}
                    {items.length > 3 && (
                      <div className="text-blue-400 text-xs">
                        +{items.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
