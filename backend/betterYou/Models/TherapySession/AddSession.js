const mongoose = require("mongoose");

const statusEnum = [
  "registration complete",
  "payment complete",
  "package selection",
  "booking complete",
  "sessions complete",
];

const addSession = new mongoose.Schema({
  AdmNo: { type: String, required: true, unique: true },
  Name: { type: String, required: true },
  Status: { type: String, default: "registration complete" },
  TherapistId:{type:String},
  School:{type:String, required: true}
});

module.exports = mongoose.model("addSession", addSession);
