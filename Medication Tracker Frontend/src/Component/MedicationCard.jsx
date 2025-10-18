export default function MedicationCard({ med, onEdit, onDelete }) {
  return (
    <div className="bg-white shadow rounded-xl p-4 flex justify-between items-center hover:shadow-lg transition">
      <div>
        <h3 className="font-semibold text-gray-800">{med.name}</h3>
        <p className="text-sm text-gray-600">Dosage: {med.dosage}</p>
        <p className="text-sm text-gray-600">Time: {med.time}</p>
        {med.notes && <p className="text-xs text-gray-500 mt-1">{med.notes}</p>}
      </div>

      <div className="flex space-x-2">
        <button onClick={() => onEdit(med)} className="text-blue-500 hover:text-blue-700">✏️</button>
        <button onClick={() => onDelete(med.id)} className="text-red-500 hover:text-red-700">🗑️</button>
      </div>
    </div>
  );
}
