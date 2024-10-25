// models/etage.js
const admin = require("firebase-admin");

const Etage = {
    // Fonction pour créer un nouvel étage
    create: async (nom) => {
        try {
            const etageRef = admin.firestore().collection('Etages').doc(); // Crée un nouvel ID
            await etageRef.set({
                nom: nom,
                places: [] // Initialisation des places
            });
            console.log(`Etage ajouté avec l'ID: ${etageRef.id}`);
            return etageRef.id; // Retourne l'ID de l'étage créé
        } catch (error) {
            console.error('Erreur lors de l\'ajout de l\'étage:', error);
            throw error; // Lancer l'erreur pour gérer en amont si nécessaire
        }
    },

    // Fonction pour obtenir un étage par son ID
    getOne: async (id) => {
        const doc = await admin.firestore().collection('Etages').doc(id).get();
        if (!doc.exists) {
            throw new Error('Etage non trouvé');
        }
        return { id: doc.id, ...doc.data() };
    },

    // Fonction pour obtenir tous les étages
    getAll: async () => {
        const snapshot = await admin.firestore().collection('Etages').get();
        const etages = [];
        snapshot.forEach(doc => {
            etages.push({ id: doc.id, ...doc.data() });
        });
        return etages;
    },

    // Fonction pour mettre à jour un étage
    update: async (id, nom) => {
        const etageRef = admin.firestore().collection('Etages').doc(id);
        await etageRef.update({ nom });
        console.log('Etage mis à jour avec succès !');
    },

    // Fonction pour supprimer un étage par son ID
    deleteOne: async (id) => {
        await admin.firestore().collection('Etages').doc(id).delete();
        console.log(`Etage avec l'ID ${id} supprimé.`);
    }
};

module.exports = Etage;
