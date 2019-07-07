// holds the mongoose schema for Headline
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var headlineSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
     summary: {
        type: String,
        required: true
    },
    url:{
        type: String,
        required: true
    },

    saved:{
        type: Boolean,
        default: false
    },
    note: [{
        type: Schema.Types.ObjectId,
        ref: "Note"
    }]    
});

var Headline = mongoose.model("Headline", headlineSchema);

module.exports = Headline; 

