const express = require("express");
const router = express.Router();
const Apartment = require("../models/Apartment");
const User = require("../models/User"); // ✅ Fix 1: Import User model

// GET all apartments
router.get("/", async (req, res) => {
  try {
    const apartments = await Apartment.find();
    res.json(apartments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch apartments" });
  }
});

// ADD a new apartment
router.post("/", async (req, res) => {
  try {
    const newApartment = new Apartment(req.body);
    await newApartment.save();
    res.status(201).json(newApartment);
  } catch (error) {
    res.status(400).json({ error: "Failed to create apartment" });
  }
});

// DELETE an apartment
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Find the apartment before deleting to get the user ID
    const apartment = await Apartment.findById(id);
    if (!apartment) {
      return res.status(404).json({ error: "Apartment not found" });
    }

    // Remove the apartment reference from the User model
    await User.updateOne(
      { apartments: id },
      { $pull: { apartments: id } }
    );

    // Delete the apartment from the database
    await Apartment.findByIdAndDelete(id);

    res.json({ message: "Apartment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete apartment" });
  }
});

// TOGGLE status
router.put("/:id/toggle", async (req, res) => {
  try {
    const apartment = await Apartment.findById(req.params.id);
    if (!apartment) return res.status(404).json({ error: "Apartment not found" });

    apartment.status = apartment.status === "active" ? "inactive" : "active"; // ✅ Fix 2: Ensure `status` field exists in schema
    await apartment.save();
    res.json({ message: "Status updated", status: apartment.status });
  } catch (error) {
    res.status(500).json({ error: "Failed to update status" });
  }
});

// GET apartments for a specific user (Alternative fix ✅)
router.get("/user/:userId", async (req, res) => { 
  try {
    const user = await User.findById(req.params.userId).populate("apartments");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user.apartments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
