import { useState, useEffect } from "react";

export default function MedicationForm({ onSubmit, onCancel, initialData }) {
  const [formData, setFormData] = useState({
    name: "",
    dosage: "",
    time: "",
    notes: "",
  });

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.dosage || !formData.time) {
      alert("Please fill all required fields");
      return;
    }
    onSubmit(formData);
    setFormData({ name: "", dosage: "", time: "", notes: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-md space-y-4 max-w-md mx-auto">
      <h2 className="text-xl font-semibold text-gray-800">
        {initialData ? "Edit Medication" : "Add Medication"}
      </h2>

      <input
        type="text"
        name="name"
        placeholder="Medication Name *"
        value={formData.name}
        onChange={handleChange}
        className="w-full border p-2 rounded-md"
      />

      <input
        type="text"
        name="dosage"
        placeholder="Dosage (e.g., 1 tablet)"
        value={formData.dosage}
        onChange={handleChange}
        className="w-full border p-2 rounded-md"
      />

      <input
        type="time"
        name="time"
        value={formData.time}
        onChange={handleChange}
        className="w-full border p-2 rounded-md"
      />

      <textarea
        name="notes"
        placeholder="Additional notes"
        value={formData.notes}
        onChange={handleChange}
        className="w-full border p-2 rounded-md"
      />

      <div className="flex justify-end space-x-2">
        <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-200 rounded-md">
          Cancel
        </button>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          {initialData ? "Update" : "Add"}
        </button>
      </div>
    </form>
  );
}
