const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const userSchema = new Schema({
    email:{
        type: String,
        required: [true, "Please enter user Email"],
        unique: true,
        
    },
    password:{
        type:String,
        required:[true, "Please enter correct password"],
        minlength: 6
    }
})
module.exports = mongoose.model("User",userSchema);
