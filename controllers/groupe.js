const Groupe = require("../models/groupe");

exports.createGroupe = async(req,res)=>{
  const teste = await Groupe.findOne({nom:req.body.nom});
  if (teste) {
   return res.status(400).json({ message: "Le nom est déja utilisé." });
 }
    const grp = new Groupe(req.body);
    await grp
    .save()
    .then((groupe) => {
      return res.status(201).json({ groupe });
    })
    .catch((error) => {
      return res.status(400).json({ error });
    });
};

exports.getAllGroupes = async (req, res) => {
    let foundGroupe = await Groupe.find().populate("permissions");
    res.json(foundGroupe);
  };

  exports.deleteById = async (req, res) => {
    const nom = req.params.nom;
    const result = await Groupe.deleteOne({ nom: nom });
    res.json(result);
  };

exports.updateGrp= async(req,res)=>{
    try{
    const id = req.params.id;
    await Groupe.updateOne(
        {_id:id},{
           
            permissions: req.body.permissions
        });
        res.json("mise a jour avec succes !");
    }catch (err) {
        res.json(err);}
};