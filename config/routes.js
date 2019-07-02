// This is where our routes will live
var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../models");


module.exports = function(app){
    app.get("/", function(req, res) {
        res.render("home");

    });

    app.get("/saved", function(req, res) {
        res.render("saved");

    });

    app.get("/scrape", function(req, res) {
   
      });
      
}
