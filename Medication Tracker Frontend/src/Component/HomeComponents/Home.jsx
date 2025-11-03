import React, { useEffect, useState, useRef } from "react";
import MedicationCard from "./MedicationCard";
import AddMedicationModal from "./AddMedicationModal";
import RemindersBar from "./RemindersBar";
import SearchBar from "./SearchBar";
import { todayKey, sendNotification } from "../../utils/timeUtils";
import { motion, AnimatePresence } from "framer-motion";

const DUMMY = [
  {
    id: "1",
    name: "Aspirin",
    dosage: "75 mg",
    times: ["09:00", "21:00"],
    frequency: "Twice a day",
    notes: "After food",
    history: [],
  },
  {
    id: "2",
    name: "Vitamin D",
    dosage: "1000 IU",
    times: ["08:30"],
    frequency: "Once a day",
    notes: "With breakfast",
    history: [],
  },
];

export default function Home() {
  const [meds, setMeds] = useState(
    () => JSON.parse(localStorage.getItem("meds_dark")) || DUMMY
  );
  const [showAdd, setShowAdd] = useState(false);
  const [query, setQuery] = useState("");
  const timer = useRef(null);

  useEffect(() => localStorage.setItem("meds_dark", JSON.stringify(meds)), [meds]);

  //  Notification Reminder Logic
  useEffect(() => {
    function checkReminders() {
      const now = new Date();
      const hhmm = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      meds.forEach((m) => {
        if (m.times.includes(hhmm)) {
          sendNotification(`Time to take ${m.name}`, `${m.dosage} at ${hhmm}`);
        }
      });
    }
    timer.current = setInterval(checkReminders, 20000);
    return () => clearInterval(timer.current);
  }, [meds]);

  //  Add,  Delete,  Log
  const addMedication = (med) => setMeds((prev) => [med, ...prev]);
  const deleteMedication = (id) => setMeds((prev) => prev.filter((m) => m.id !== id));

  const logAction = (id, time, status) => {
    setMeds((prev) =>
      prev.map((m) =>
        m.id === id
          ? { ...m, history: [{ date: todayKey(), time, status }, ...m.history] }
          : m
      )
    );
  };

  //  Filter out taken/skipped meds for today
  const visibleMeds = meds.filter((m) => {
    const todayHistory = m.history.find((h) => h.date === todayKey());
    return !todayHistory || (todayHistory.status !== "taken" && todayHistory.status !== "skipped");
  });

  //  Search
  const filtered = visibleMeds.filter((m) =>
    m.name.toLowerCase().includes(query.toLowerCase())
  );

  //  Live Summary Stats (remaining + progress)
  const totalMeds = visibleMeds.length;
  const totalDoses = visibleMeds.reduce((sum, m) => sum + m.times.length, 0);
  const takenToday = meds.reduce(
    (sum, m) =>
      sum + (m.history.filter((h) => h.date === todayKey() && h.status === "taken").length || 0),
    0
  );
  const percentTaken = meds.length
    ? Math.min(Math.round((takenToday / meds.length) * 100), 100)
    : 0;

  //  Next Reminder Finder
  const getNextReminder = () => {
    const now = new Date();
    const allTimes = meds.flatMap((m) =>
      m.times.map((t) => {
        const [h, min] = t.split(":");
        const time = new Date();
        time.setHours(h, min, 0, 0);
        return { name: m.name, time, dosage: m.dosage };
      })
    );
    const next = allTimes.find((t) => t.time > now);
    return next
      ? `${next.name} at ${next.time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
      : "All meds taken for today";
  };

  return (
    <div>
      <RemindersBar meds={meds} />

      {/*  Summary Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mt-6 grid grid-cols-1 sm:grid-cols-4 gap-4"
      >
        {/* Total Medications */}
        <div className="bg-darkCard border border-darkBorder p-5 rounded-lg text-center shadow-lg hover:shadow-glow transition-all">
          <h4 className="text-textSecondary text-sm">Remaining Medications</h4>
          <p className="text-2xl font-semibold text-primary mt-1">{totalMeds}</p>
        </div>

        {/* Total Doses */}
        <div className="bg-darkCard border border-darkBorder p-5 rounded-lg text-center shadow-lg hover:shadow-glow transition-all">
          <h4 className="text-textSecondary text-sm">Remaining Doses</h4>
          <p className="text-2xl font-semibold text-secondary mt-1">{totalDoses}</p>
        </div>

        {/* Next Reminder */}
        <div className="bg-darkCard border border-darkBorder p-5 rounded-lg text-center shadow-lg hover:shadow-glow transition-all">
          <h4 className="text-textSecondary text-sm">Next Reminder</h4>
          <p className="text-lg font-medium text-textPrimary mt-1">{getNextReminder()}</p>
        </div>

        {/* Progress Circle */}
        <div className="bg-darkCard border border-darkBorder p-5 rounded-lg text-center flex flex-col items-center justify-center shadow-lg hover:shadow-glow transition-all">
          <h4 className="text-textSecondary text-sm mb-2">Today's Progress</h4>
          <motion.svg
            key={percentTaken} //  Forces re-animation each update
            initial={{ strokeDashoffset: 100 }}
            animate={{ strokeDashoffset: 100 - percentTaken }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            viewBox="0 0 36 36"
            className="w-20 h-20"
          >
            <path
              className="text-darkBorder"
              strokeWidth="3.5"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845
                 a 15.9155 15.9155 0 0 1 0 31.831
                 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <motion.path
              className="text-primary"
              strokeWidth="3.5"
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
              strokeDasharray="100"
              strokeDashoffset={100 - percentTaken}
              d="M18 2.0845
                 a 15.9155 15.9155 0 0 1 0 31.831
                 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <text
              x="18"
              y="20.35"
              className="fill-textPrimary text-[9px]"
              textAnchor="middle"
            >
              {percentTaken}%
            </text>
          </motion.svg>
        </div>
      </motion.div>

      {/*  Header + Search */}
      <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-textPrimary">Today's Medications</h1>
          <p className="text-textSecondary text-gray-300">Your daily schedule</p>
        </div>
        <div className="flex items-center gap-3">
          <SearchBar value={query} onChange={setQuery} />
          <button
            onClick={() => setShowAdd(true)}
            className="px-4 py-2 bg-blue-950 text-white rounded-md hover:bg-blue-700 transition"
          >
            + Add
          </button>
        </div>
      </div>

      {/*  Medication Cards */}
      <AnimatePresence>
        <motion.div layout className="mt-6 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.length === 0 ? (
            <div className="p-6 bg-darkCard border border-darkBorder rounded-md text-center text-textSecondary">
              No medications for today.
            </div>
          ) : (
            filtered.map((med) => (
              <MedicationCard
                key={med.id}
                med={med}
                onDelete={() => deleteMedication(med.id)}
                onLog={logAction}
              />
            ))
          )}
        </motion.div>
      </AnimatePresence>

      {/*  Add Modal */}
      <AddMedicationModal
        open={showAdd}
        onClose={() => setShowAdd(false)}
        onSave={addMedication}
      />
    </div>
  );
}
