// This is where our routes will live
module.exports = function(app){
    app.get("/", function(req, res) {
        res.render("home");

    });
}
