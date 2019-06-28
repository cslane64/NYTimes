//entry point into the application
var express = require("express");
var mongoose = reuire("mongoose");
var expressHandlebars = require("express-handlebars");
var mongojs = require("mongojs");
// Require axios and cheerio. This makes the scraping possible
var axios = require("axios");
var cheerio = require("cheerio");

// Initialize Express
var app = express();

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.engine("handlebars", expressHandlebars({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

var databaseUrl = "";
var collections = [""];

var db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
  console.log("Database Error:", error);
});



// Listen on port 3000
app.listen(3000, function() {
    console.log("App running on port 3000!");
  });