const mongoose = require("mongoose");

const hist = mongoose.Schema({
  id_place: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"Place"
  },
  update_date: {

    type: Date,
    require: true,
  },
  last_state:{
    type: Boolean,
    require: true,
  }
});

module.exports =mongoose.model('Hist',hist)
