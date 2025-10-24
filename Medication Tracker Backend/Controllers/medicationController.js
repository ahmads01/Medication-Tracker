import { Medication } from "../Models/MedicationModel.js";

//  Get all medications
export const getMedications = async (req, res) => {
  try {
    const meds = await Medication.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: meds });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

//  Add a new medication
export const addMedication = async (req, res) => {
  try {
    const { name, dosage, time, notes } = req.body;

    if (!name?.trim() || !dosage?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Name and dosage are required fields.",
      });
    }

    const existing = await Medication.findOne({ name: { $regex: new RegExp(`^${name}$`, "i") } });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Medication already exists. Please use a unique name.",
      });
    }

    const med = await Medication.create({ name, dosage, time, notes });
    res.status(201).json({
      success: true,
      message: "Medication added successfully!",
      data: med,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to add medication", error: err.message });
  }
};

//  Update medication
export const updateMedication = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, dosage, time, notes } = req.body;

    if (!name?.trim() || !dosage?.trim()) {
      return res.status(400).json({ success: false, message: "Name and dosage are required." });
    }

    const existing = await Medication.findOne({ name: { $regex: new RegExp(`^${name}$`, "i") } });
    if (existing && existing._id.toString() !== id) {
      return res.status(400).json({
        success: false,
        message: "Medication name must be unique.",
      });
    }

    const med = await Medication.findByIdAndUpdate(
      id,
      { name, dosage, time, notes },
      { new: true, runValidators: true }
    );

    if (!med) {
      return res.status(404).json({ success: false, message: "Medication not found." });
    }

    res.status(200).json({ success: true, message: "Medication updated successfully!", data: med });
  } catch (err) {
    res.status(500).json({ success: false, message: "Update failed", error: err.message });
  }
};

//  Delete medication
export const deleteMedication = async (req, res) => {
  try {
    const { id } = req.params;
    const med = await Medication.findByIdAndDelete(id);

    if (!med) {
      return res.status(404).json({ success: false, message: "Medication not found." });
    }

    res.status(200).json({ success: true, message: "Medication deleted successfully!" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Delete failed", error: err.message });
  }
};
