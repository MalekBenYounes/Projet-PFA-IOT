const mongoose = require("mongoose");

const file = mongoose.Schema({
    nom :{
        type:String,
        require:true
    },
    path:{
        type:String,
        require:true
    },
    date:{
        type :Date,
        require:true
    }
});
module.exports =mongoose.model('File',file);
