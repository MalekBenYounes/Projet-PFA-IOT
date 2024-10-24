//yalooor
const Etage = require("../models/etage");
const Place = require("../models/place");
const Hist = require("../models/history");


exports.createEtage = async (req, res) => {
 const teste = await Etage.findOne({nom:req.body.nom});
 if (teste) {
  return res.status(400).json({ message: "Le nom est déja utilisé." });
}

   const et = new Etage({
    nom: req.body.nom,
    places: [],
  });
  // Ajouter un certain nombre de places à l'étage
  for (let i = 1; i < req.body.np + 1; i++) {
    const newPlace = new Place({
      num: i,
      owner: et._id,
    });
    // Créer un nouvel historique pour la place
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000; // Convertit le décalage en millisecondes
    
    
    const localDate = new Date(now.getTime() - offset);
    const newHist = new Hist({
      id_place: newPlace._id,
      update_date: localDate,
      last_state: true,
    });
    await newPlace.save();
    await newHist.save();
    et.places.push(newPlace._id);
  }

  await et
    .save()
    .then((etage) => {
      return res.status(201).json({ etage });
    })
    .catch((error) => {
      return res.status(400).json({ error });
    });
};
exports.getAllEtages = async (req, res) => {
  let foundEtage = await Etage.find().populate("places");
  res.json(foundEtage);
};
exports.getOneEtage = async (req, res) => {
  const nom = req.params.nom;
  await Etage.findOne({ nom: nom })
    .populate("places")
    .then((etage) => {
      return res.status(200).json({ etage });
    })
    .catch((error) => {
      return res.status(400).json({ error });
    });
};
exports.deleteById = async (req, res) => {
  const nom = req.params.nom;
  const deletedEtage = await Etage.findOneAndDelete({ nom: nom });

  if (!deletedEtage) {
    return res.status(404).json({ message: "L'étage n'a pas été trouvé." });
  }

  // Supprimer tous les emplacements associés à l'étage supprimé
  const deletedPlaces = await Place.deleteMany({
    _id: { $in: deletedEtage.places },
  });

  res.json({ etage: deletedEtage, places: deletedPlaces });
};

exports.update = async (req, res) => {
  try {
    const id = req.body.id;
    const np = req.body.np;
    const etage = await Etage.findById(id).populate("places");
    let places = etage.places;
    if (places.length < np) {
      // ajouter les nouvelles places
      for (let i = places.length + 1; i < np + 1; i++) {
        const newPlace = new Place({
          num: i,
          owner: etage._id,
        });
        const now = new Date();
        const offset = now.getTimezoneOffset() * 60000; // Convertit le décalage en millisecondes
        
        
        const localDate = new Date(now.getTime() - offset);
        const newHist = new Hist({
          id_place: newPlace._id,
          update_date: localDate,
          last_state: true,
        });
        await newPlace.save();
        places.push(newPlace._id);
        await newHist.save();
      }
    } else if (places.length > np) {
      // supprimer les places jusq'au nouveau nombre
      const p = places.slice(0, np);
      places = p;
    }

    await Etage.updateOne(
      { _id: id },
      {
        places: places,
      }
    );

    res.json({ message: "Mise à jour réussie" });
  } catch (err) {
    res.send(err);
  }
};
