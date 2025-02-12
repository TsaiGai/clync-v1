const { db } = require("../firebase");

module.exports.getDocuments = async (req, res) => {
  try {
    const snapshot = await db.collection("apartments").get();
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
