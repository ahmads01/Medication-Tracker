import mongoose from "mongoose";

const medicationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Medication name is required"],
      unique: true,
      trim: true,
    },
    dosage: {
      type: String,
      required: [true, "Dosage is required"],
    },
    time: {
      type: String,
      default: "",
    },
    notes: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

medicationSchema.post("save", function (error, doc, next) {
  if (error.code === 11000) {
    next(new Error("This medication already exists!"));
  } else {
    next(error);
  }
});

export const Medication = mongoose.model("Medication", medicationSchema);
