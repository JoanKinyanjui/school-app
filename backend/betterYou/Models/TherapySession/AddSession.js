const mongoose = require("mongoose");

const statusEnum = [
  "initial status",
  "therapist selection",
  "package selection",
  "payment",
  "completed",
];

const addSession = new mongoose.Schema({
  AdmNo: { type: String, required: true, unique: true },
  Name: { type: String, required: true },
  Status: { type: String, enum: statusEnum, default: "initial status" },
  TherapistId:{type:String}
});

module.exports = mongoose.model("addSession", addSession);
