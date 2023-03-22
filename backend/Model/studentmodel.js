const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        index:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    role:{
        type:String,
        required:true,
       default:"user"
    },
    course:[{
        type:String,
    }],
    intrest:[{
        type:String,
    }],
});

//Export the model
module.exports = mongoose.model('User', studentSchema);