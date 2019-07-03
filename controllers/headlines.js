//controller for our headlines containing CRUD functionality
var scrape = require("../scripts/scrape");
var Headline = require("../models/Headline");

module.exports = {
    collect: function(callback){
        scrape(function(data) {
            var articles = data;
            for (var i = 0; i < articles.length; i++){
                if (articles[i].summary = ""){
                    articles[i].summary = article[i].title
                };
                articles[i].saved = false;
            }
        })
        Headline.collection.insertMany(articles, function(err, docs){
            callback(err, docs);
        });
    },

    delete: function(query, callback) {
        Headline.remove(query, callback);
    },

    get: function(query, callback){
        Headline.find(query)
        .exec(function(err, doc) {
            callback(doc);
        })
    },

    update: function(query, callback) {
        Headline.update({_id: query._id}, {$set: query}, {}, callback)
    }

}