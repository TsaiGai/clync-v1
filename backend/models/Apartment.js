const mongoose = require("mongoose");

const ApartmentSchema = new mongoose.Schema({
  apartment_name: { type: String, required: true },
  bedrooms: { type: Number, required: true },
  floorplan: { type: String, required: true },
  unit_type: { type: String, required: true },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Reference to users
  status: { type: String, enum: ["active", "inactive"], default: "active" } // ✅ Fix 2: Add status field
});

module.exports = mongoose.model("Apartment", ApartmentSchema);
