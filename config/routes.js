// This is where our routes will live
//var scrape = require("../scripts/scrape");
var headlinesController = require("../controllers/headlines");
var notesController = require("../controllers/saved");
var cheerio = require("cheerio");
var axios = require("axios");
var mongojs = require("mongojs");
var exphbs = require("express-handlebars");
var databaseUrl = "times_db";
var collections = ["headlines"];
var db = mongojs(databaseUrl, collections);



module.exports = function(app){
    app.get("/", function(req, res){
        
        res.render("index", {});
    }) 
    app.get("/headlines", function(req, res) {
        var query = {};
        if (req.query.saved) {
            query = req.query;
        }

        headlinesController.get(query, function(head){
            
            console.log("This is the head array" + head)
            res.render("index", {head: head});
            //res.json(head);
        });

        
    });
        

     

    app.get("/scrape", function(req, res) {
        axios.get("https://www.bostonherald.com/").then(function(response) {
        // Then, we load that into cheerio and save it to $ for a shorthand selector
        var $ = cheerio.load(response.data);
        var articleArray = [];
                
        $(".article-info").each(function(i, element) {
          
            var title = $(element).find("span").text();
            var summary = $(element).find(".excerpt").text();
            var url = $(element).find(".article-title").attr("href");
          
            var scrapedArticleData = {
                title: title,
                summary: summary,
                url: url
            };

            if (title && url) {
                db.headlines.insert({
                    title: title,
                    summary: summary,
                    url: url,
                    saved: false
                },
                function(err, inserted ){
                    if(err) {
                        console.log(err);
                    } else {
                        console.log(inserted);
                    }
                })

            }
          
          
          //console.log(articleArray);
          
        });
        
        // Send a message to the client
        //res.redirect("/");
      });

    });

    

    app.get("/saved", function(req, res) {
        
      });

    
    app.get("/api/headlines", function(req, res) {
        var query = {};
        if (req.query.saved) {
            query = req.query;
        }

        headlinesController.get(query, function(data){
            //res.render("index", {data: data});
            res.json(data);
        });
    });

    app.delete("/api/headlines/:id", function(req,res){
        var query = {};
        query._id = req.params.id;
        headlinesController.delete(query, function(err, data){
            res.json(data);
        });
    });

    app.get("/api/headlines", function (req,res){
        headlinesController.update(req.body, function(err, data){
            res.json(data);
        });
    });
    
    app.get("/api/notes/:headline_id?", function(req,res){
        var query = {};
        if (req.params.headline_id) {
            query._id = req.params.headline_id;
        }

        notesController.get(query, function(err, data){
            res.json(data);
        });
    });

    app.delete("/api/notes/:id", function(req, res){
        var query = {};
        query._id = req.params.id;
        notesController.delete(query, function(err, data){
            res.json(data);
        });
    });

    app.post("/api/notes", function(req, res){
        notesController.save(req.body, function(data){
            res.json(data);
        })
    })
}
