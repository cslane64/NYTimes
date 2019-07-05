// holds the mongoose schema for note
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var NoteSchema = new Schema({
    title: String,
    
    noteText: String

   
});

var Note = mongoose.model("Note", NoteSchema);

module.exports = Note; 