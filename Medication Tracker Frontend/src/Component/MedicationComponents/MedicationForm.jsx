import { useEffect, useState } from "react";

export default function MedicationForm({ initialData = null, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    dosage: "",
    time: "",
    notes: "",
  });
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        dosage: initialData.dosage || "",
        time: initialData.time || "",
        notes: initialData.notes || "",
      });
    } else {
      setFormData({ name: "", dosage: "", time: "", notes: "" });
    }
    setErrors({});
  }, [initialData]);

  const validate = () => {
    const e = {};
    if (!formData.name.trim()) e.name = "Medication name is required";
    if (!formData.dosage.trim()) e.dosage = "Dosage is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      setSaving(true);
      await onSubmit(formData);
    } catch (err) {
      console.error("Save error", err);
      alert("Failed to save medication. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center backdrop-blur-sm">
      {/* Background overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-indigo-800/50 backdrop-blur-sm"
        onClick={() => {
          if (!saving) onCancel();
        }}
      />

      <form
        onSubmit={handleSubmit}
        className="relative z-50 w-full max-w-md sm:max-w-lg bg-white rounded-2xl shadow-2xl p-6 sm:p-8 mx-4 transform transition-all scale-100 animate-fadeIn"
      >
        <div className="flex items-start justify-between border-b pb-2 mb-4">
          <div>
            <h2 className="text-2xl font-bold text-blue-700">
              {initialData ? "Edit Medication" : "Add New Medication"}
            </h2>
            <p className="text-sm text-gray-700  mt-1">
               “Consistency in care is the best medicine of all.”
            </p>
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 text-xl font-bold"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Medication Name *</span>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Paracetamol"
              className={`w-full mt-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm ${
                errors.name ? "border-red-400" : "border-gray-200"
              }`}
            />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
          </label>

          <label className="block">
            <span className="text-sm font-medium text-gray-700">Dosage *</span>
            <input
              name="dosage"
              value={formData.dosage}
              onChange={handleChange}
              placeholder="e.g., 500mg / 1 tablet"
              className={`w-full mt-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm ${
                errors.dosage ? "border-red-400" : "border-gray-200"
              }`}
            />
            {errors.dosage && <p className="text-xs text-red-500 mt-1">{errors.dosage}</p>}
          </label>

          <label className="block">
            <span className="text-sm font-medium text-gray-700">Time (optional)</span>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full mt-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm border-gray-200"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-gray-700">Notes (optional)</span>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
              placeholder="Any additional notes..."
              className="w-full mt-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm border-gray-200"
            />
          </label>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={saving}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition shadow-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition shadow-md"
          >
            {saving ? "Saving..." : initialData ? "Update Medication" : "Add Medication"}
          </button>
        </div>
      </form>
    </div>
  );
}
