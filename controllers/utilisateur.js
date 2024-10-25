const db = require('../firebaseConfig');
const bcrypt = require("bcryptjs");

exports.createUser = async (req, res) => {
    try {
        // Vérifie si l'ID ou l'email existent déjà
        const idExists = await db.collection('Utilisateurs').where("id", "==", req.body.id).get();
        if (!idExists.empty) {
            return res.status(400).json({ message: "L'ID est déjà utilisé." });
        }
        
        const emailExists = await db.collection('Utilisateurs').where("email", "==", req.body.email).get();
        if (!emailExists.empty) {
            return res.status(400).json({ message: "L'email est déjà utilisé." });
        }

        // Hashage du mot de passe
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.mot_pass, salt);

        // Création de l'utilisateur
        const userRef = db.collection('Utilisateurs').doc();
        const userData = {
            id: userRef.id,
            mot_pass: hashedPassword,
            nom: req.body.nom,
            prenom: req.body.prenom,
            email: req.body.email,
            groupe: req.body.groupe || null,
        };

        await userRef.set(userData);
        res.status(201).json({ message: "Utilisateur créé avec succès", utilisateur: { ...userData, id: userRef.id } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

exports.getAllUser = async (req, res) => {
    try {
        const snapshot = await db.collection('Utilisateurs').get();
        const users = [];
        snapshot.forEach(doc => {
            users.push({ id: doc.id, ...doc.data() });
        });
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

exports.deleteById = async (req, res) => {
    const id = req.params.id;
    try {
        await db.collection('Utilisateurs').doc(id).delete();
        res.status(200).json({ message: `Utilisateur avec l'ID ${id} supprimé.` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

exports.updateGroupe = async (req, res) => {
    const id = req.params.id;
    try {
        const userRef = db.collection('Utilisateurs').doc(id);
        await userRef.update({ groupe: req.body.groupe });
        res.status(200).json({ message: "Groupe mis à jour avec succès." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};