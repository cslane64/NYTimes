// This is where our routes will live
//var scrape = require("../scripts/scrape");
//var headlinesController = require("../controllers/headlines");
//var notesController = require("../controllers/saved");
var cheerio = require("cheerio");
var axios = require("axios");
var mongojs = require("mongojs");
//var mongoose = require("mongoose");
//var exphbs = require("express-handlebars");
//var databaseUrl = "times_db";
//var collections = ["headlines"];
//var db = mongojs(databaseUrl);
var db = require("../models");

module.exports = function(app){

//**************** html routes ******************************************** */
    app.get("/", function(req, res){
        
        res.render("index", {});
    }) 
    
    app.get("/headlines", function(req, res) {
        db.Headline.find({saved: false}, function(error, head){
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
    db.Headline.find({saved: true}, function(error, found) {
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
                db.Headline.create({
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
    
    app.post("/saved/:id", function(req,res){
        db.Headline.update(
            {
              _id: mongojs.ObjectId(req.params.id)
            },
            {
              // Set the title, note and modified parameters
              // sent in the req body.
              $set: {
                saved: false
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
        
        // var query = {};
        // query._id = req.params.id;
        // headlinesController.delete(query, function(err, data){
        //     res.json(data);
        // });
    });
    // ******** Saves an article ************
    app.post("/update/:id", function(req, res) {
        // When searching by an id, the id needs to be passed in
        // as (mongojs.ObjectId(IdYouWantToFind))
      
        // Update the note that matches the object id
        db.Headline.update(
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

    
    // Add a note to the notes
    app.post("/api/notes/:id", function(req,res){
        db.Note.create(req.body)
        .then(function(dbNote) {
            return db.Headline.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id}, { new: true});

        })
        .then(function(dbHeadline) {
            res.json(dbHeadline);
        })
        .catch(function(err) {
            res.json(err);
        });
        //res.redirect("/saved");
        
    }); 

    app.delete("/api/notes/:id", function(req, res){
        
        
    });

    app.get("/notes/:id", function(req, res) {
        // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
        console.log(req.params.id);
        db.Note.findOne({ _id: req.params.id })
        
        //   // ..and populate all of the notes associated with it
          .populate("note")
          .then(function(dbData) {
            // If we were able to successfully find an Article with the given id, send it back to the client
            res.json(dbData);
            console.log("----------route-------------------------");
            console.log(res);
            console.log("-----------------------------------");
          })
          .catch(function(err) {
            // If an error occurred, send it to the client
            res.json(err);
          });
      });

    
}
