import MedicationCard from "./MedicationCard";

export default function MedicationList({ medications, onEdit, onDelete, search, setSearch }) {
  const filtered = medications.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Search medication..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border w-full p-2 rounded-md"
      />

      {filtered.length === 0 ? (
        <p className="text-gray-500 text-center">No medications found</p>
      ) : (
        <div className="grid gap-3">
          {filtered.map((med) => (
            <MedicationCard key={med.id} med={med} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
