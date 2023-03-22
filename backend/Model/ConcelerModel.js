const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var consularSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
       default:"conceler"
    }
});

//Export the model
module.exports = mongoose.model('consular', consularSchema);