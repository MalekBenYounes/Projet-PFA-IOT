const mongoose = require('mongoose');

const grp = mongoose.Schema({
 nom:{
    type :String,
    require : true,
    unique : true,

 },
 permissions: [{
   type: mongoose.Schema.Types.ObjectId,
   ref: 'Permission'
 }]

});

module.exports =mongoose.model('Groupe',grp);