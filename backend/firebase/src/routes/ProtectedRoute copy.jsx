import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // Assuming token is stored on login

  // If the token exists, render the children (protected component)
  // Otherwise, redirect to the /auth page
  return token ? children : <Navigate to="/auth" replace />;
};

export default ProtectedRoute;

const express = require("express");
const verifyToken = require("./middleware/verifyToken");
const router = express.Router();

router.post("/apartments", verifyToken, async (req, res) => {
  try {
    const { apartment_name, unit_type, floorplan, special_request } = req.body;

    // Here, you would save to MongoDB or another database
    const newApartment = { 
      id: Date.now().toString(), 
      apartment_name, 
      unit_type, 
      floorplan, 
      special_request, 
      users: [req.user.uid] // Use Firebase user ID
    };

    res.status(201).json(newApartment);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;

