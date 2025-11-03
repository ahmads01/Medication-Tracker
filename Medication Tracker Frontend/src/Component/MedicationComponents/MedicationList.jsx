import React, { useMemo } from "react";

export default function MedicationList({ medications = [], search, setSearch, onEdit, onDelete, onView }) {
  const filtered = useMemo(() => {
    const q = (search || "").toLowerCase();
    if (!q) return medications;
    return medications.filter(
      (m) =>
        (m.name || "").toLowerCase().includes(q) ||
        (m.dosage || "").toLowerCase().includes(q) ||
        (m.notes || "").toLowerCase().includes(q)
    );
  }, [medications, search]);

  return (
    <div>
      <div className="mb-4 flex gap-3">
        <input
          type="text"
          placeholder="Search medications..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dosage</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Notes</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-100">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-sm text-gray-500">
                  No medications found
                </td>
              </tr>
            ) : (
              filtered.map((med) => (
                <tr key={med.id || med._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                    {med.name}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{med.dosage}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{med.time || "--:--"}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">{med.notes || "-"}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-right text-sm">
                    <div className="inline-flex items-center gap-2">
                      <button
                        onClick={() => onView(med)}
                        className="px-2 py-1 text-sm rounded-md bg-gray-100 hover:bg-gray-200"
                        title="View details"
                      >
                        View
                      </button>
                      <button
                        onClick={() => onEdit(med)}
                        className="px-2 py-1 text-sm rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100"
                        title="Edit"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          if (confirm("Delete this medication?")) onDelete(med.id || med._id);
                        }}
                        className="px-2 py-1 text-sm rounded-md bg-red-50 text-red-600 hover:bg-red-100"
                        title="Delete"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
