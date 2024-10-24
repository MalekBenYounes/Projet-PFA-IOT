const Place = require("../models/place");
const Hist = require("../models/history");

exports.getOnePlace = async (req, res) => {
  const id = req.params.id;
  await Place.findOne({ _id: id })
    .then((place) => {
      return res.status(200).json({ place });
    })
    .catch((error) => {
      return res.status(400).json({ error });
    });
};
exports.getAllPlaces = async (req, res) => {
  await Place.find()
    .then((places) => {
      return res.status(200).json({ places });
    })
    .catch((error) => {
      return res.status(400).json({ error });
    });
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const place = await Place.findById(id);
    place.etat = !place.etat;
    // Créer un nouvel historique pour la place
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000; // Convertit le décalage en millisecondes
    
    
    const localDate = new Date(now.getTime() - offset);
    const newHist = new Hist({
      id_place: place._id,
      update_date: localDate,
      last_state: place.etat,
    });
    await place.save();
    await newHist.save();

    res.send("mise a jour avec succes !");
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

exports.delete = async (req, res) => {
  const owner = req.params.owner;
  const result = await Place.deleteMany({owner:owner})
  res.send(result);
};

exports.deleteOnePlace = async(req,res)=>{
const id = req.params.id;
const result =await Place.deleteOne({_id:id})
res.send(result)
  
}