const mongoose = require('mongoose');
const et = mongoose.Schema({
 nom:{
    type :String,
    require : true,
    unique : true,

 },
 places: [{
   type: mongoose.Schema.Types.ObjectId,
   ref: 'Place'
 }]

});

module.exports =mongoose.model('Etage',et);