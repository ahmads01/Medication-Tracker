import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import { motion } from "framer-motion";

export default function AddMedicationModal({ open, onClose, onSave }) {
  const [form, setForm] = useState({ name: "", dosage: "", times: "08:00", frequency: "", notes: "" });

  function handleSave() {
    const med = { id: Date.now().toString(), ...form, times: form.times.split(",").map(t => t.trim()), history: [] };
    onSave(med);
    setForm({ name: "", dosage: "", times: "08:00", frequency: "", notes: "" });
    onClose();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose}></div>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative bg-darkCard border border-darkBorder rounded-lg shadow-lg max-w-lg w-full p-6">
        <button onClick={onClose} className="absolute top-3 right-3 p-2 text-gray-400 hover:text-white">
          <FiX />
        </button>
        <h3 className="text-lg font-semibold mb-4 text-textPrimary">Add Medication</h3>
        <div className="space-y-3">
          {["name", "dosage", "times", "frequency", "notes"].map((field, i) => (
            <div key={i}>
              <label className="text-sm text-textSecondary capitalize">{field}</label>
              <input
                value={form[field]}
                onChange={e => setForm({ ...form, [field]: e.target.value })}
                className="w-full mt-1 px-3 py-2 bg-darkBg border border-darkBorder rounded text-sm text-textPrimary focus:border-primary outline-none"
              />
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded border border-darkBorder text-textSecondary">Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 bg-primary text-white rounded hover:bg-indigo-500">Save</button>
        </div>
      </motion.div>
    </div>
  );
}
