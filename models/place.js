const mongoose = require('mongoose');

const pl = mongoose.Schema({
   num:{
    type:Number,
    require:true,
    

   },
    etat :{
        type:Boolean,
        default:true
        
       
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Etage"
    }
});
module.exports =mongoose.model('Place',pl);