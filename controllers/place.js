const Place = require("../models/place");

const PlaceController = {
    create: async (req, res) => {
        const { num, owner } = req.body;
        try {
            const newPlaceId = await Place.create(num, owner);
            return res.status(201).json({ message: "Place créée avec succès", id: newPlaceId });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    getOnePlace: async (req, res) => {
        const id = req.params.id;
        try {
            const place = await Place.getOne(id);
            return res.status(200).json({ place });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    getstatePlace: async (req, res) => {
        const id = req.params.id;
        try {
            const state = await Place.getState(id);
            return res.status(200).json({ state });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    getAllPlaces: async (req, res) => {
        try {
            const places = await Place.getAll();
            return res.status(200).json({ places });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    update: async (req, res) => {
        const id = req.params.id;
        try {
            await Place.update(id);
            res.send("Mise à jour avec succès !");
        } catch (error) {
            console.log(error);
            res.status(400).send(error.message);
        }
    },

    delete: async (req, res) => {
        const owner = req.params.owner;
        try {
            await Place.deleteByOwner(owner);
            res.send(`Places supprimées pour le propriétaire ${owner}.`);
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    deleteOnePlace: async (req, res) => {
        const id = req.params.id;
        try {
            await Place.deleteOne(id);
            res.send(`Place avec l'ID ${id} supprimée.`);
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    // Nouvelle méthode pour obtenir le nombre de places vides et occupées
    getPlaceCount: async (req, res) => {
        try {
            const places = await Place.getAll();
            let emptyCount = 0;
            let occupiedCount = 0;

            places.forEach(place => {
                if (place.state === true) { // true pour place vide
                    emptyCount++;
                } else if (place.state === false) { // false pour place occupée
                    occupiedCount++;
                }
            });

            return res.status(200).json({ emptyCount, occupiedCount });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
};

module.exports = PlaceController;
