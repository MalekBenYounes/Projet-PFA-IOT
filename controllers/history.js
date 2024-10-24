const Hist = require("../models/history");
const Place = require("../models/place");

exports.gethistbyplace = async (req, res) => {
  const id_place = req.params.id_place;
  await Hist.find({ id_place: id_place })
    
    .then((hist) => {
      return res.status(200).json({ hist });
    })
    .catch((error) => {
      return res.status(400).json({ error });
    });
};

exports.gethist = async (req, res) => {
    
    await Hist.find()
      
      .then((hist) => {
        return res.status(200).json({ hist });
      })
      .catch((error) => {
        return res.status(400).json({ error });
      });
  };

  exports.gethistbydate=async(req,res)=>{
    const id_place = req.params.id_place;
    const dateD = req.params.date;
    const dates = dateD.split(',');

    const dateDebut = new Date(dates[0]); // Convertir la première date en objet de date
    dateDebut.setHours(0, 0, 0, 0); // Définir l'heure à 00:00:00
    
    const dateFin = new Date(dates[1]); // Convertir la deuxième date en objet de date
    dateFin.setHours(23, 59, 59, 999); // Définir l'heure à 23:59:59.999
   await Hist.find({
      id_place: id_place,
      update_date: {
        $gte: new Date(dateDebut).toISOString(), // Recherche les dates supérieures ou égales à la date de début
        $lte: new Date(dateFin).toISOString() // Recherche les dates inférieures ou égales à la date de fin
      }
    }) 
    .then((hist) => {
      return res.status(200).json({ hist });
    })
    .catch((error) => {
      return res.status(400).json({ error });
    });
    
  }