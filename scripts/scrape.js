// the info that cheerio needs to scrape from the NY times web page
var cheerio = require("cheerio")

var scrape = function(cb) {
    axios.get("https://www.bostonherald.com/").then(function(response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(response.data);

    // Now, we grab every h2 within an article tag, and do the following:
    $("entry-title").each(function(i, element) {
      // Save an empty result object
      var result = {};

      // Add the text and href of every link, and save them as properties of the result object
      result.title = $(this)
        .children("a")
        .text();
      result.link = $(this)
        .children("a")
        .attr("href");

      // Create a new Article using the `result` object built from scraping
      db.headlines.create(result)
        .then(function(dbheadlines) {
          // View the added result in the console
          console.log(dbheadlines);
        })
        .catch(function(err) {
          // If an error occurred, log it
          console.log(err);
        });
    })
    res.send("Scrape Complete");
    cb(result);
});
};

module.exports = scrape;