// the info that cheerio needs to scrape from the NY times web page
var cheerio = require("cheerio")
var axios = require("axios");

var scrape = function(callback) {
    // First, we grab the body of the html with axios
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
          articleArray.push(scrapedArticleData);
          
          console.log(articleArray);
          
        });
        callback(articleArray);
        // Send a message to the client
        // res.send("Scrape Complete");
      });
};

module.exports = scrape;
     
