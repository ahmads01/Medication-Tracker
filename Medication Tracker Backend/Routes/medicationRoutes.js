import express from "express";
import {
  getMedications,
  addMedication,
  updateMedication,
  deleteMedication,
} from "../Controllers/medicationController.js";

const router = express.Router();

router.get("/get-all-medications", getMedications);
router.post("/add-medications", addMedication);
router.put("/update-medication/:id", updateMedication);
router.delete("/delete-medication/:id", deleteMedication);

export default router;
