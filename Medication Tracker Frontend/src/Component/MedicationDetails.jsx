import React from "react";
import { X, Pill, Clock, StickyNote, Syringe } from "lucide-react";

export default function MedicationDetails({ medication, onClose }) {
  if (!medication) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-indigo-800/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-50 w-full max-w-md mx-4 bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-2xl border border-blue-100 p-6 animate-fadeIn">
        <div className="flex items-start justify-between">
          <h3 className="text-xl font-bold text-blue-700 bg-clip-text">
            Medication Details
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 transition-colors duration-200"
            aria-label="Close"
          >
            <X size={22} />
          </button>
        </div>

        <div className="mt-5 space-y-4 text-sm">
          <div className="flex items-center gap-3 bg-white/70 rounded-xl p-3 shadow-sm">
            <Pill className="text-blue-600" size={20} />
            <div>
              <div className="text-xs text-gray-500">Name</div>
              <div className="font-medium text-gray-800">{medication.name || "-"}</div>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white/70 rounded-xl p-3 shadow-sm">
            <Syringe className="text-green-600" size={20} />
            <div>
              <div className="text-xs text-gray-500">Dosage</div>
              <div className="font-medium text-gray-800">{medication.dosage || "-"}</div>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white/70 rounded-xl p-3 shadow-sm">
            <Clock className="text-purple-600" size={20} />
            <div>
              <div className="text-xs text-gray-500">Time</div>
              <div className="font-medium text-gray-800">{medication.time || "-"}</div>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-white/70 rounded-xl p-3 shadow-sm">
            <StickyNote className="text-pink-600 mt-0.5" size={20} />
            <div className="flex-1">
              <div className="text-xs text-gray-500">Notes</div>
              <div className="mt-1 text-gray-700 whitespace-pre-wrap">
                {medication.notes ? medication.notes : (
                  <span className="text-gray-400">No notes</span>
                )}
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
}
