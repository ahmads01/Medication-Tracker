import { useEffect, useState } from "react";
import MedicationList from "../Component/MedicationList";
import MedicationForm from "../Component/MedicationForm";
import MedicationDetails from "../Component/MedicationDetails";
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
  const [viewMed, setViewMed] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getMedications();
      setMedications(res.data || []);
    } catch (err) {
      console.error("Failed to fetch meds", err);
      setMedications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = async (data) => {
    if (editingMed) {
      await updateMedication(editingMed.id || editingMed._id, data);
    } else {
      await addMedication(data);
    }
    setShowForm(false);
    setEditingMed(null);
    await fetchData();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this medication?")) {
      await deleteMedication(id);
      await fetchData();
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-100 py-10 px-4 sm:px-6 lg:px-10">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-3xl md:text-4xl font-bold text-blue-800">
               My Medications
            </h1>
            <p className="text-sm md:text-base text-gray-600 mt-1">
              Manage your medication schedule and dosages easily.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                setEditingMed(null);
                setShowForm(true);
              }}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2 rounded-md font-medium hover:from-blue-700 hover:to-indigo-700 transition shadow"
            >
              + Add Medication
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="text-center py-10 text-gray-500">
              Loading medications...
            </div>
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
              onView={(med) => setViewMed(med)}
            />
          )}
        </div>
      </div>

      {showForm && (
        <MedicationForm
          initialData={editingMed}
          onSubmit={async (data) => {
            await handleAdd(data);
          }}
          onCancel={() => {
            setShowForm(false);
            setEditingMed(null);
          }}
        />
      )}

      {viewMed && (
        <MedicationDetails
          medication={viewMed}
          onClose={() => {
            setViewMed(null);
          }}
        />
      )}
    </div>
  );
}
