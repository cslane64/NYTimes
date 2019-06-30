//entry point into the application
var express = require("express");
var mongoose = require("mongoose");
var expressHandlebars = require("express-handlebars");
var mongojs = require("mongojs");
// Require axios and cheerio. This makes the scraping possible
var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./models");
// Initialize Express
var app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine("handlebars", expressHandlebars({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

require("./config/routes")(app);

//var databaseUrl = "times_db";
//var collections = ["articles"];

//var db = process.env.MONGODB_URI || "mongodb://localhost/times_db";
mongoose.connect("mongodb://localhost/times_db", { useNewUrlParser: true }, function(error){
  if (error) {
    console.log("database connection error" + error)
  } else {
    console.log("The database IS connected")
  }
});


// Listen on port 3000
app.listen(3000, function() {
    console.log("App running on port 3000!");
  });