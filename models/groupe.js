// models/groupe.js
const admin = require("firebase-admin");
const db = admin.firestore(); // Assurez-vous que l'initialisation de Firebase Admin SDK est déjà faite

class Groupe {
    constructor(nom, permissions) {
        this.nom = nom; // Nom du groupe
        this.permissions = permissions || []; // Tableau d'IDs de permissions
    }

    // Méthode pour sauvegarder le groupe dans Firestore
    async save() {
        const groupeRef = db.collection('Groupes').doc(); // Crée un nouveau document avec un ID généré automatiquement
        await groupeRef.set(this); // Sauvegarde l'objet dans Firestore
        return groupeRef.id; // Retourne l'ID du document créé
    }
}

// Fonction pour créer un groupe
const createGroupe = async (req, res) => {
    const { nom, permissions } = req.body;

    const existingGroup = await db.collection('Groupes').where('nom', '==', nom).get();
    if (!existingGroup.empty) {
        return res.status(400).json({ message: "Le nom est déjà utilisé." });
    }

    const newGroup = new Groupe(nom, permissions);
    try {
        const id = await newGroup.save();
        res.status(201).json({ id, ...newGroup });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error });
    }
};

// Fonction pour récupérer tous les groupes
const getAllGroupes = async (req, res) => {
    try {
        const snapshot = await db.collection('Groupes').get();
        const groupes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(groupes);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error });
    }
};

// Fonction pour supprimer un groupe par nom
const deleteById = async (req, res) => {
    const nom = req.params.nom;
    const groupRef = await db.collection('Groupes').where('nom', '==', nom).get();

    if (groupRef.empty) {
        return res.status(404).json({ message: "Groupe non trouvé." });
    }

    await groupRef.docs[0].ref.delete(); // Supprime le groupe trouvé
    res.status(200).json({ message: "Groupe supprimé avec succès." });
};

// Fonction pour mettre à jour un groupe
const updateGrp = async (req, res) => {
    const id = req.params.id;
    const { permissions } = req.body;

    try {
        const groupRef = db.collection('Groupes').doc(id);
        await groupRef.update({ permissions });
        res.json({ message: "Mise à jour réussie !" });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error });
    }
};

module.exports = {
    createGroupe,
    getAllGroupes,
    deleteById,
    updateGrp,
    Groupe // Exporter la classe si besoin d'une instance
};
