const admin = require("firebase-admin");
const db = admin.firestore(); // Assurez-vous d'initialiser Firebase Admin SDK

// Structure de document pour une permission (pas de schéma explicite comme avec Mongoose)
const permissionStructure = {
  nom: String, // Type de données, juste pour référence
};

exports.createPer = async (req, res) => {
  try {
    const per = {
      nom: req.body.nom,
    };

    // Ajoutez la permission à Firestore
    const permissionRef = await db.collection("Permissions").add(per);
    const permission = { id: permissionRef.id, ...per }; // Inclure l'ID du document
    return res.status(201).json({ permission });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: error.message });
  }
};

exports.getAllPer = async (req, res) => {
  try {
    const snapshot = await db.collection("Permissions").get();
    const permissions = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    return res.status(200).json({ permissions });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: error.message });
  }
};