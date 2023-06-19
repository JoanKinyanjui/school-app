const mongoose = require("mongoose");

  
const appointmentSchema = new mongoose.Schema({
  admno: {
    type: String,
    required: true,
    // unique: true,
  },
  total: {
    type: Number,
    default: 4,
  },
  appointments: [
    {
      date: {
        type: Date,
        required: true,
      },
      status: {
        type: String,
        required: true,
        enum: ["scheduled", "completed", "cancelled"],
        default: "scheduled",
      },
    },
  ],
});

module.exports = mongoose.model("Appointments", appointmentSchema);