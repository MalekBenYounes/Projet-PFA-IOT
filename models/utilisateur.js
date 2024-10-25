// models/user.js
const db = require('../firebaseConfig'); // Connexion Firestore

const User = {
    // Créer un utilisateur
    create: async (userData) => {
        try {
            const userRef = db.collection('Utilisateurs').doc(); // Génère un nouvel ID utilisateur
            await userRef.set({
                id: userRef.id,
                mot_pass: userData.mot_pass,
                nom: userData.nom,
                prenom: userData.prenom,
                email: userData.email,
                groupe: userData.groupe || null
            });
            console.log(`Utilisateur créé avec l'ID: ${userRef.id}`);
            return userRef.id; // Retourne l'ID de l'utilisateur créé
        } catch (error) {
            console.error('Erreur lors de la création de l\'utilisateur:', error);
            throw error;
        }
    },

    // Obtenir un utilisateur par ID
    getOne: async (id) => {
        const doc = await db.collection('Utilisateurs').doc(id).get();
        if (!doc.exists) {
            throw new Error('Utilisateur non trouvé');
        }
        return { id: doc.id, ...doc.data() };
    },

    // Obtenir tous les utilisateurs
    getAll: async () => {
        const snapshot = await db.collection('Utilisateurs').get();
        const users = [];
        snapshot.forEach(doc => {
            users.push({ id: doc.id, ...doc.data() });
        });
        return users;
    },

    // Mettre à jour un utilisateur
    update: async (id, updateData) => {
        await db.collection('Utilisateurs').doc(id).update(updateData);
        console.log(`Utilisateur avec l'ID ${id} mis à jour.`);
    },

    // Supprimer un utilisateur
    deleteOne: async (id) => {
        await db.collection('Utilisateurs').doc(id).delete();
        console.log(`Utilisateur avec l'ID ${id} supprimé.`);
    }
};

module.exports = User;
