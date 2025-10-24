const API_BASE = "http://localhost:5000/api/medications";

export async function getMedications() {
  const res = await fetch(`${API_BASE}/get-all-medications`);
  if (!res.ok) throw new Error("Failed to fetch medications");
  return res.json();
}

export async function addMedication(data) {
  const res = await fetch(`${API_BASE}/add-medications`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "Failed to add medication");
  }
  return res.json();
}

export async function updateMedication(id, data) {
  const res = await fetch(`${API_BASE}/update-medication/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update medication");
  return res.json();
}

export async function deleteMedication(id) {
  const res = await fetch(`${API_BASE}/delete-medication/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete medication");
  return res.json();
}
