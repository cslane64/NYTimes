// This is where our routes will live
//var scrape = require("../scripts/scrape");
var headlinesController = require("../controllers/headlines");
var notesController = require("../controllers/saved");
var cheerio = require("cheerio");
var axios = require("axios");
var mongojs = require("mongojs");
var mongoose = require("mongoose");
//var exphbs = require("express-handlebars");
var databaseUrl = "times_db";
//var collections = ["headlines"];
var db = mongojs(databaseUrl);
//var db = require("./models");

module.exports = function(app){

//****************html routes ******************************************** */
    app.get("/", function(req, res){
        
        res.render("index", {});
    }) 
    
    app.get("/headlines", function(req, res) {
        db.headlines.find({saved: false}, function(error, head){
            //console.log(head)
            if (error) {
                console.log(error);
            } else {
                res.render("index", {head: head});
            }
        });
        // var query = {};
        // if (req.query.saved) {
        //     query = req.query;
        // }

        // headlinesController.get(query, function(head){
            
        //     //console.log("This is the head array" + head)
        //     res.render("index", {head: head});
        //     //res.json(head);
        // });        
    });

    app.get("/saved", function(req, res) {
        // Find all results from the scrapedData collection in the db
    db.headlines.find({saved: true}, function(error, found) {
        // Throw any errors to the console
        if (error) {
        console.log(error);
        }
        // If there are no errors, send the data to the browser as json
        else {
        res.render("saved", {found: found});
        }
    });
                
    });
    
    app.get("/scrape", function(req, res) {
        axios.get("https://www.bostonherald.com/").then(function(response) {
        // Then, we load that into cheerio and save it to $ for a shorthand selector
        var $ = cheerio.load(response.data);
        
            $(".article-info").each(function(i, element) {
          
            var title = $(element).find("span").text();
            var summary = $(element).find(".excerpt").text();
            var url = $(element).find(".article-title").attr("href");
            
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
        });                
        res.redirect("/headlines");               
      });
    });
    
//*************API ROUTES********************* */

    
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

    app.post("/update/:id", function(req, res) {
        // When searching by an id, the id needs to be passed in
        // as (mongojs.ObjectId(IdYouWantToFind))
      
        // Update the note that matches the object id
        db.headlines.update(
          {
            _id: mongojs.ObjectId(req.params.id)
          },
          {
            // Set the title, note and modified parameters
            // sent in the req body.
            $set: {
              saved: true
            }
          },
          function(error, edited) {
            // Log any errors from mongojs
            if (error) {
              console.log(error);
              res.send(error);
            }
            else {
              // Otherwise, send the mongojs response to the browser
              // This will fire off the success function of the ajax request
              console.log(edited);
              res.send(edited);
            }
          }
        );
    });

    // app.patch("/api/headlines", function (req,res){
    //     headlinesController.update(req.body, function(err, data){
    //         res.json(data);
    //     });
    // });
    // Add a note to the notes
    app.get("/api/notes/:headline_id?", function(req,res){
        db.notes.create(req.body)
        .then(function(dbNote) {
            return db.headlines.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id}, { new: true});

        })
        .then(function(dbHeadline) {
            res.json(dbHeadline);
        })
        .catch(function(err) {
            res.json(err);
        });
        // var query = {};
        // if (req.params.headline_id) {
        //     query._id = req.params.headline_id;
        // }

        // notesController.get(query, function(err, data){
        //     res.json(data);
        // });
    }); 

    app.delete("/api/notes/:id", function(req, res){
        
        // var query = {};
        // query._id = req.params.id;
        // notesController.delete(query, function(err, data){
        //     res.json(data);
        // });
    });

    app.post("/api/notes", function(req, res){
        db.notes.create(req.body) 
        .then(function(dbNote) {
            return db.headlines.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id}, { new: true});

        })
        .then(function(dbHeadline) {
            res.json(dbHeadline);
        })
        .catch(function(err) {
            res.json(err);
        });
        // notesController.save(req.body, function(data){
        //     res.json(data);
        // })
    });
}
