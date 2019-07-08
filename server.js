//entry point into the application
var express = require("express");
var mongoose = require("mongoose");
var expressHandlebars = require("express-handlebars");
var mongojs = require("mongojs");
var exphbs  = require('express-handlebars');
// Require axios and cheerio. This makes the scraping possible
var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./models");
// Initialize Express
var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.set("view engine", "handlebars");

require("./config/routes")(app);

//var databaseUrl = "times_db";
//var collections = ["articles"];

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/times_db";
mongoose.connect( MONGODB_URI,  { useNewUrlParser: true }, function(error){
  if (error) {
    console.log("database connection error" + error)
  } else {
    console.log("The database IS connected")
  }
});


// Listen on port 3000
app.listen(PORT, function() {
    console.log("App running on port 3000!");
  });

//});