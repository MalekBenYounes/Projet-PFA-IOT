const Permission = require("../models/permission");

exports.createPer = async (req, res) => {
  const per = new Permission(req.body);
  await per 
    .save()
    .then((permission) => {
      return res.status(201).json({ permission });
    })
    .catch((error) => {
      console.error(err);
      return res.status(400).json({ error });
    });
};



exports.getAllPer = async (req, res) => {
  Permission.find()
    .then((permissions) => {
      return res.status(200).json({ permissions });
    })
    .catch((error) => {
      console.error(err);
      return res.status(400).json({ error });
    });
};