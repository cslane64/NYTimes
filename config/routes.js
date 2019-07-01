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
        // First, we grab the body of the html with axios
        axios.get("https://www.bostonherald.com/").then(function(response) {
          // Then, we load that into cheerio and save it to $ for a shorthand selector
          var $ = cheerio.load(response.data);
          var articleArray = [];
          
          
          $(".article-info").each(function(i, element) {
            
            var title = $(element).find("span").text();
            var summary = $(element).find(".excerpt").text();
            var url = $(element).find(".article-title").attr("href");
            

            articleArray.push({
              title: title,
              summary: summary,
              url: url
            });
            console.log(articleArray);
            
          });
      
          // Send a message to the client
          res.send("Scrape Complete");
        });
      });
      
}
