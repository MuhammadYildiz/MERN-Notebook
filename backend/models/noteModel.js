const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const notesSchema = new Schema({
    title: { 
        type: String,
        required: [true,"Please enter a title!"]
    },
    desc: {
        type:String,
        required: [true, "Please enter a description!"]
    },
},{
    timestamps:true
}
)
const Notes = mongoose.model('Notes', notesSchema)
module.exports = Notes;