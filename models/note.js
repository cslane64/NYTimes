// holds the mongoose schema for note
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var noteSchema = new Schema({
    title: String,
    
    noteText: String

});

var Note = mongoose.model("Note", noteSchema);

module.exports = Note;