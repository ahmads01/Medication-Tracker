import React from "react";
import { FiTrash2, FiCheckCircle, FiXCircle } from "react-icons/fi";
import { motion } from "framer-motion";

export default function MedicationCard({ med, onDelete, onLog }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="bg-darkCard border border-darkBorder rounded-lg p-5 transition-theme duration-300 hover:shadow-glow"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-textPrimary">{med.name}</h3>
          <p className="text-sm text-textSecondary">
            {med.dosage} • {med.frequency}
          </p>
          <p className="text-xs mt-1 text-textSecondary">{med.notes}</p>
        </div>
        <button
          onClick={onDelete}
          className="text-danger hover:text-red-600 transition"
        >
          <FiTrash2 />
        </button>
      </div>

      <div className="flex items-center gap-3 mt-4">
        <button
          onClick={() => onLog(med.id, new Date().toLocaleTimeString(), "taken")}
          className="flex items-center gap-1 px-3 py-1 text-xs rounded-md border border-success text-success hover:bg-success/10 transition"
        >
          <FiCheckCircle /> Taken
        </button>
        <button
          onClick={() => onLog(med.id, new Date().toLocaleTimeString(), "skipped")}
          className="flex items-center gap-1 px-3 py-1 text-xs rounded-md border border-danger text-danger hover:bg-danger/10 transition"
        >
          <FiXCircle /> Skip
        </button>
      </div>
    </motion.div>
  );
}
