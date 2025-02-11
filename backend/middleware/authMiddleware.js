const admin = require("firebase-admin");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from "Bearer token"
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken; // Attach user to request
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
