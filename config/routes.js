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
      
          
          // Now, we grab every h2 within an article tag, and do the following:
          $(".article-info span").each(function(i, element) {
            // Save an empty result object
            //var result = {};
            var title = $(element).text();
            console.log(title);
            // Add the text and href of every link, and save them as properties of the result object
            // result.title = $(this)
            //   .children("a")
            //   .text();
            //   console.log(result.title);
            // result.link = $(this)
            //   .children("a") 
            //   .attr("href");
            //   console.log(result.link);

       
            // // Create a new Article using the `result` object built from scraping
            // db.Headline.create(result)
            //   .then(function(dbHeadline) {
            //     // View the added result in the console
            //     console.log(dbHeadline);
            //   })
            //   .catch(function(err) {
            //     // If an error occurred, log it
            //     console.log(err);
            //   });
          });
      
          // Send a message to the client
          res.send("Scrape Complete");
        });
      });
      
}
