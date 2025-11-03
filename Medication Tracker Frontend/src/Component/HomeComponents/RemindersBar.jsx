import React from "react";
import { FiBell } from "react-icons/fi";

export default function RemindersBar({ meds }) {
  const upcoming = meds.flatMap(m => m.times.map(t => ({ name: m.name, time: t }))).slice(0, 3);

  return (
    <div className="bg-darkCard border border-darkBorder rounded-lg p-4 flex flex-wrap items-center gap-3 shadow-lg">
      <FiBell className="text-primary text-lg animate-pulse" />
      <div className="flex flex-wrap gap-2">
        {upcoming.length === 0 ? (
          <span className="text-textSecondary text-sm">No upcoming reminders</span>
        ) : (
          upcoming.map((u, i) => (
            <span key={i} className="px-3 py-1 bg-primary/30 text-textPrimary text-xs rounded-full border border-primary/40">
              {u.name} • {u.time}
            </span>
          ))
        )}
      </div>
    </div>
  );
}
