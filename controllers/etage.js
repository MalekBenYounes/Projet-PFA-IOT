// controllers/etageController.js
const admin = require("firebase-admin");
const Place = require("../models/place");
const Hist = require("../models/history");

// Fonction pour créer un étage
exports.createEtage = async (req, res) => {
    const { nom, np } = req.body;

    // Vérifier si l'étage existe déjà
    const existingEtageSnapshot = await admin.firestore().collection("Etages").where("nom", "==", nom).get();
    if (!existingEtageSnapshot.empty) {
        return res.status(400).json({ message: "Le nom est déjà utilisé." });
    }

    const et = {
        nom: nom,
        places: [], // Initialisation des places
    };

    // Ajouter un certain nombre de places à l'étage
    for (let i = 1; i <= np; i++) {
        const newPlace = {
            num: i,
            owner: et.nom // Référence à l'étage par son nom
        };

        // Créer un nouvel historique pour la place
        const now = new Date();
        const offset = now.getTimezoneOffset() * 60000; // Convertit le décalage en millisecondes
        const localDate = new Date(now.getTime() - offset);
        
        const newHist = {
            id_place: newPlace.num, // Utiliser num ou un identifiant unique pour la place
            update_date: localDate,
            last_state: true,
        };

        // Enregistrer la place et l'historique dans Firestore
        const placeRef = await admin.firestore().collection('Places').add(newPlace);
        await admin.firestore().collection('History').add(newHist);
        et.places.push(placeRef.id); // Ajoute l'ID de la place créée
    }

    // Enregistrer l'étage dans Firestore
    try {
        const etageRef = await admin.firestore().collection("Etages").add(et);
        return res.status(201).json({ etage: { id: etageRef.id, ...et } });
    } catch (error) {
        return res.status(400).json({ error });
    }
};

// Fonction pour obtenir tous les étages
exports.getAllEtages = async (req, res) => {
    const snapshot = await admin.firestore().collection("Etages").get();
    const foundEtages = [];
    snapshot.forEach(doc => {
        foundEtages.push({ id: doc.id, ...doc.data() });
    });
    res.json(foundEtages);
};

// Fonction pour obtenir un étage par nom
exports.getOneEtage = async (req, res) => {
    const nom = req.params.nom;
    const snapshot = await admin.firestore().collection("Etages").where("nom", "==", nom).get();
    
    if (snapshot.empty) {
        return res.status(404).json({ error: "Étage non trouvé." });
    }

    const etage = snapshot.docs[0].data();
    res.status(200).json({ id: snapshot.docs[0].id, ...etage });
};

// Fonction pour supprimer un étage par nom
exports.deleteById = async (req, res) => {
    const nom = req.params.nom;
    const snapshot = await admin.firestore().collection("Etages").where("nom", "==", nom).get();

    if (snapshot.empty) {
        return res.status(404).json({ message: "L'étage n'a pas été trouvé." });
    }

    const deletedEtageRef = snapshot.docs[0].ref;
    const deletedEtage = snapshot.docs[0].data();

    // Supprimer tous les emplacements associés à l'étage supprimé
    const deletedPlaces = await Promise.all(
        deletedEtage.places.map(async (placeId) => {
            return await admin.firestore().collection("Places").doc(placeId).delete();
        })
    );

    await deletedEtageRef.delete();
    res.json({ etage: deletedEtage, places: deletedPlaces });
};

// Fonction pour mettre à jour un étage
exports.update = async (req, res) => {
    const { id, np } = req.body;
    const etageSnapshot = await admin.firestore().collection("Etages").doc(id).get();

    if (!etageSnapshot.exists) {
        return res.status(404).json({ error: "Étage non trouvé." });
    }

    const etage = etageSnapshot.data();
    let places = etage.places;

    if (places.length < np) {
        // Ajouter de nouvelles places
        for (let i = places.length + 1; i <= np; i++) {
            const newPlace = {
                num: i,
                owner: etage.nom // Référence à l'étage par son nom
            };
            const now = new Date();
            const offset = now.getTimezoneOffset() * 60000; // Convertit le décalage en millisecondes
            const localDate = new Date(now.getTime() - offset);

            const newHist = {
                id_place: newPlace.num, // Utiliser num ou un identifiant unique pour la place
                update_date: localDate,
                last_state: true,
            };

            const placeRef = await admin.firestore().collection('Places').add(newPlace);
            await admin.firestore().collection('History').add(newHist);
            places.push(placeRef.id); // Ajoute l'ID de la place créée
        }
    } else if (places.length > np) {
        // Supprimer les places jusqu'au nouveau nombre
        const placesToDelete = places.slice(np);
        await Promise.all(placesToDelete.map(placeId => {
            return admin.firestore().collection("Places").doc(placeId).delete();
        }));
        places = places.slice(0, np); // Garde seulement le nombre souhaité de places
    }

    await admin.firestore().collection("Etages").doc(id).update({ places: places });
    res.json({ message: "Mise à jour réussie" });
};
