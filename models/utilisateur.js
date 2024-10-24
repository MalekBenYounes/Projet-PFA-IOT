const mongoose = require("mongoose");

const user = mongoose.Schema({
  id: {
    type: String,
    require: true,
    unique: true,
  },
  mot_pass: {
    type: String,
    require: true,
  },
  nom: {
    type: String,
    require: true,
  },
  prenom: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  groupe:{ 
    type: mongoose.Schema.Types.Object,
    ref: 'nom'
  },
  
});

module.exports = mongoose.model("Utilisateur", user);
