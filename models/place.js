// model/place.js
const db = require('../firebaseConfig'); // Importer Firestore

// Modèle Place
const Place = {
    // Fonction pour créer une nouvelle place
    create: async (num, owner) => {
        try {
            const placeRef = db.collection('Places').doc(); // Crée un nouvel ID
            await placeRef.set({
                num: num,
                etat: true, // Valeur par défaut
                owner: owner // Référence à l'étage
            });
            console.log(`Place ajoutée avec l'ID: ${placeRef.id}`);
            return placeRef.id; // Retourne l'ID de la place créée
        } catch (error) {
            console.error('Erreur lors de l\'ajout de la place:', error);
            throw error; // Lancer l'erreur pour gérer en amont si nécessaire
        }
    },

    // Fonction pour obtenir une place par son ID
    getOne: async (id) => {
        const doc = await db.collection('Places').doc(id).get();
        if (!doc.exists) {
            throw new Error('Place non trouvée');
        }
        return { id: doc.id, ...doc.data() };
    },

    // Fonction pour obtenir toutes les places
    getAll: async () => {
        const snapshot = await db.collection('Places').get();
        const places = [];
        snapshot.forEach(doc => {
            places.push({ id: doc.id, ...doc.data() });
        });
        return places;
    },

    // Fonction pour mettre à jour l'état d'une place
    update: async (id) => {
        const placeRef = db.collection('Places').doc(id);
        const place = await placeRef.get();
        
        if (!place.exists) {
            throw new Error('Place non trouvée');
        }

        const newState = !place.data().etat;
        
        // Mettre à jour la place
        await placeRef.update({ etat: newState });
        
        // Créer un nouvel historique pour la place
        const now = new Date();
        const offset = now.getTimezoneOffset() * 60000; // Convertit le décalage en millisecondes
        const localDate = new Date(now.getTime() - offset);
        
        // Ajouter l'historique
        const newHist = {
            id_place: id,
            update_date: localDate,
            last_state: newState,
        };
        
        await db.collection('History').add(newHist);

        console.log('Place mise à jour avec succès !');
    },

    // Fonction pour supprimer une place par son ID
    deleteOne: async (id) => {
        await db.collection('Places').doc(id).delete();
        console.log(`Place avec l'ID ${id} supprimée.`);
    },

    // Fonction pour supprimer plusieurs places par propriétaire
    deleteByOwner: async (owner) => {
        const snapshot = await db.collection('Places').where('owner', '==', owner).get();
        const batch = db.batch();
        snapshot.forEach(doc => {
            batch.delete(doc.ref);
        });
        await batch.commit();
        console.log(`Places supprimées pour le propriétaire ${owner}.`);
    },

    // Fonction pour obtenir l'état d'une place
    getState: async (id) => {
        const doc = await db.collection('Places').doc(id).get();
        if (!doc.exists) {
            throw new Error('Place non trouvée');
        }
        return doc.data().etat; // Retourne l'état de la place (true ou false)
    },
    getPlaceCountEmty: async (req, res) => {
        try {
            const places = await Place.getAll();
            console.log("Places récupérées : ", places); // Affiche toutes les places récupérées
    
            let emptyCount = 0;
    
            places.forEach(place => {
                console.log("État de la place (empty) : ", place.etat); // Affiche l'état de chaque place
                if (place.etat === true) {  // Vérifie si l'état est "true"
                    emptyCount++;
                }
            });
    
            console.log("Nombre de places vides : ", emptyCount); // Affiche le nombre de places vides
    
            return res.status(200).json({ emptyCount });
        } catch (error) {
            console.error("Erreur dans getPlaceCountEmty : ", error); // Affiche l'erreur
            return res.status(400).json({ error: error.message });
        }
    },
    
    getPlaceCountOcup: async (req, res) => {
        try {
            const places = await Place.getAll();
            console.log("Places récupérées : ", places); // Affiche toutes les places récupérées
            
            let occupiedCount = 0;
    
            places.forEach(place => {
                console.log("État de la place (occupied) : ", place.etat); // Affiche l'état de chaque place
                if (place.etat === false) {  // Vérifie si l'état est "false"
                    occupiedCount++;
                }
            });
    
            console.log("Nombre de places occupées : ", occupiedCount); // Affiche le nombre de places occupées
    
            return res.status(200).json({ occupiedCount });
        } catch (error) {
            console.error("Erreur dans getPlaceCountOcup : ", error); // Affiche l'erreur
            return res.status(400).json({ error: error.message });
        }
    }
    
    
};

module.exports = Place;
