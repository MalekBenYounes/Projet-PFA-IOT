const admin = require("firebase-admin");
const db = admin.firestore(); // Assurez-vous d'avoir initialisé Firebase Admin SDK

exports.createGroupe = async (req, res) => {
    try {
        // Vérifier si le groupe existe déjà avec le même nom
        const snapshot = await db.collection("Groupes").where("nom", "==", req.body.nom).get();
        if (!snapshot.empty) {
            return res.status(400).json({ message: "Le nom est déjà utilisé." });
        }

        // Création du nouveau groupe
        const groupeData = {
            nom: req.body.nom,
            permissions: req.body.permissions || [], // Par défaut, tableau vide si non fourni
        };

        // Ajouter le groupe dans Firestore
        const groupeRef = await db.collection("Groupes").add(groupeData);
        const groupe = { id: groupeRef.id, ...groupeData };
        return res.status(201).json({ groupe });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ error: error.message });
    }
};

exports.getAllGroupes = async (req, res) => {
    try {
        const snapshot = await db.collection("Groupes").get();
        const foundGroupes = [];
        snapshot.forEach(doc => {
            foundGroupes.push({ id: doc.id, ...doc.data() });
        });
        res.status(200).json(foundGroupes);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
};


exports.deleteById = async (req, res) => {
    const nom = req.params.nom;

    try {
        // Trouver le groupe avec le nom donné
        const snapshot = await db.collection("Groupes").where("nom", "==", nom).get();

        if (snapshot.empty) {
            return res.status(404).json({ message: "Groupe non trouvé." });
        }

        // Supprimer le groupe trouvé
        const batch = db.batch();
        snapshot.forEach(doc => batch.delete(doc.ref));
        await batch.commit();

        res.status(200).json({ message: "Groupe supprimé avec succès." });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ error: error.message });
    }
};

exports.updateGrp = async (req, res) => {
    const id = req.params.id;

    try {
        // Vérifier l'existence du groupe
        const groupeRef = db.collection("Groupes").doc(id);
        const groupeSnapshot = await groupeRef.get();

        if (!groupeSnapshot.exists) {
            return res.status(404).json({ message: "Groupe non trouvé." });
        }

        // Mise à jour des permissions du groupe
        await groupeRef.update({
            permissions: req.body.permissions || [],
        });

        res.status(200).json({ message: "Mise à jour avec succès !" });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
};
