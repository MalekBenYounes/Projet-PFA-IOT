const mongoose = require('mongoose');
const per = mongoose.Schema({
 nom:{
    type :String,
    require : true,
    unique : true,

 }, 

});

module.exports =mongoose.model('Permission',per);