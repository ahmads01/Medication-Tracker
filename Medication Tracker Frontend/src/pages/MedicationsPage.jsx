import { useEffect, useState } from "react";
import MedicationList from "../Component/MedicationList";
import MedicationForm from "../Component/MedicationForm";
import {
  getMedications,
  addMedication,
  updateMedication,
  deleteMedication,
} from "../api/medicationsApi";

export default function MedicationsPage() {
  const [medications, setMedications] = useState([]);
  const [search, setSearch] = useState("");
  const [editingMed, setEditingMed] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchData = async () => {
    const res = await getMedications();
    setMedications(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = async (data) => {
    if (editingMed) {
      await updateMedication(editingMed.id, data);
    } else {
      await addMedication(data);
    }
    setShowForm(false);
    setEditingMed(null);
    fetchData();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this medication?")) {
      await deleteMedication(id);
      fetchData();
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Medication List</h1>
        <button
          onClick={() => {
            setEditingMed(null);
            setShowForm(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          + Add Medication
        </button>
      </div>

      {showForm ? (
        <MedicationForm
          initialData={editingMed}
          onSubmit={handleAdd}
          onCancel={() => {
            setShowForm(false);
            setEditingMed(null);
          }}
        />
      ) : (
        <MedicationList
          medications={medications}
          search={search}
          setSearch={setSearch}
          onEdit={(med) => {
            setEditingMed(med);
            setShowForm(true);
          }}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
