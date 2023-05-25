const mongoose = require("mongoose");

const Mpesa = new mongoose.Schema({
  PhoneNumber: { type: String, required: true, unique: true },
  Message: { type: String, required: true },
});

module.exports = mongoose.model("Mpesa", Mpesa);
