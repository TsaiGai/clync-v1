const express = require("express");
const verifyToken = require("../middleware/verifyToken"); // Ensure the correct path
const router = express.Router();
const ApartmentModel = require("../models/Apartment"); // Ensure the model is correct

// Get user's apartments (secured with Firebase auth)
router.get("/apartments", verifyToken, async (req, res) => {
  try {
    const apartments = await ApartmentModel.find({ users: req.user.uid });
    res.json(apartments);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Delete an apartment (secured)
router.delete("/apartments/:id", verifyToken, async (req, res) => {
  try {
    const apartmentId = req.params.id;
    const apartment = await ApartmentModel.findOne({ _id: apartmentId, users: req.user.uid });

    if (!apartment) {
      return res.status(403).json({ error: "Not authorized" });
    }

    await ApartmentModel.deleteOne({ _id: apartmentId });
    res.json({ message: "Apartment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router; // ✅ Correctly export the backend router
