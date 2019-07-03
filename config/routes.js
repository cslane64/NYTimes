// This is where our routes will live
var scrape = require("../scripts/scrape");
var headlinesController = require("../controllers/headlines");
var notesController = require("../controllers/saved");

module.exports = function(app){
    app.get("/", function(req, res) {
        res.render("home");

    });

    app.get("/saved", function(req, res) {
        res.render("saved");

    });

    app.get("/scrape", function(req, res) {
   
      });

    app.get("/api/collect", function(req, res) {
        headlinesController.collect(function(err, docs){
            if(!docs || docs.insertedCount === 0) {
                res.json({
                    message: "No new articles were saved"
                });
            } else {
                res.json({
                    message: "Added " + docs.insertedCount + " new articles"
                });
            }
        });

    });

    app.get("/api/headlines", function(req, res) {
        var query = {};
        if (req.query.saved) {
            query = req.query;
        }

        headlinesController.get(query, function(data){
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
