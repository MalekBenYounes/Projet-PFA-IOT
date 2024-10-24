const Utilisateur = require("../models/utilisateur");
const bycrypt = require("bcryptjs");
exports.createUser = async (req, res) => {
  const teste = Utilisateur.findOne({id:req.body.id})
//   if (teste) {
//    return res.status(404).json({ message: "nom" });
//  }
//  const testemail = await Utilisateur.findOne({email:req.body.email})
//   if (testemail) {
//    return res.status(404).json({ message: "email" });
//  }
  const salt = await bycrypt.genSalt(10);
  req.body.mot_pass = await bycrypt.hash(req.body.mot_pass, salt);
  const user = new Utilisateur({
    id: req.body.id,
    mot_pass: req.body.mot_pass,
    nom: req.body.nom,
    prenom: req.body.prenom,
    email: req.body.email,
    groupe: req.body.groupe,
  });

  await user
    .save()
    .then((utilisateur) => {
      return res.status(201).json({ utilisateur });
    })
    .catch((error) => {
      console.error(err);
      return res.status(400).json({ error });
    });
};
exports.getAllUser = async (req, res) => {
  let foundUser = await Utilisateur.find();
  res.json(foundUser);
};

exports.deleteById = async (req, res) => {
  const id = req.params.id;
  const result = await Utilisateur.deleteOne({ _id: id });
  res.json(result);
};



exports.updateGroupe = async (req, res) => {
  try {
    const id = req.params.id;
    await Utilisateur.updateOne(
      { _id: id },
      {
        groupe: req.body.groupe,
      }
    );
    res.json("mise a jour avec succes !");
  } catch (err) {
    res.json(err);
  }
};






