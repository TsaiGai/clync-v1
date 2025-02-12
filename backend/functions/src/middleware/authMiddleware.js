const admin = require("firebase-admin");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from "Bearer token"
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    // Verify the token with Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken; // Attach user information to request

    next();
  } catch (error) {
    console.error("Error verifying token:", error); // Log error for debugging purposes
    return res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
