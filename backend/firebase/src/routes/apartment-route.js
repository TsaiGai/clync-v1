const express = require('express');
const router = express.Router();
const { authenticate } = require('../auth/firebase-auth.js');  // If this is your token verification middleware
const {
  createUserApartment,
  getUserApartments,
  addApartmentToUser,
  deleteApartmentFromUser,
} = require('../controllers/apartment-controller.js');

// Apply authentication middleware globally if needed (for token validation)
router.use(authenticate);

// Create a user apartment (Step called when sign up is done)
router.post('/users', createUserApartment);

// Route to get all apartments for a user (Step called when dashboard is loaded)
router.get("/apartments", authenticate, getUserApartments);

// Route to add a new apartment to a user’s list (Step called when user clicks add it in)
router.post('/apartments', addApartmentToUser);

// Route to delete an apartment from a user’s list (aptId provided in URL) (Step called when user clicks delete)
router.delete('/apartments/:aptId', deleteApartmentFromUser);

module.exports = router;
