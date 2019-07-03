// controller for our notes attached to saved articles containing CRUD functionality

var Headline = require("../models/note");

module.exports = {
    
    delete: function(data, callback) {
        Note.remove({_id: data._id}, callback);
    },

    get: function(data, callback){
        Note.find({
            _headlineId: data._id
        }, callback);
    },
    save: function(data, callback){
        var newNote = {
            _headlineId: data,_id,
            title: data.title,
            noteText: data.text
        };

        Note.create(newNote, function (err, doc){
            if (err) {
                console.log(err)
            } else {
                console.log(dod)
                callback(doc)
            }
        });
    },

    update: function(query, callback) {
        Headline.update({_id: query._id}, {$set: query}, {}, callback)
    }

}