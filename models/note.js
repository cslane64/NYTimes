// holds the mongoose schema for note
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var noteSchema = new Schema({
    title: String,
    
    noteText: String,

    _headlineId:{
        type: Schema.Types.ObjectId,
        ref: "Headline"
    }

});

var Note = mongoose.model("Note", noteSchema);

module.exports = Note;