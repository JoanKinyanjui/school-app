const mongoose = require("mongoose");

const School = new mongoose.Schema({
  name: { type: String, required: true },
  symbol: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  pending: { type:Number , default:0 },
  completed: { type: Number, default:0 },
});

module.exports = mongoose.model("School", School);
