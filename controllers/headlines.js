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
    }

}