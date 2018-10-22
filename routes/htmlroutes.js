// var db = require("../models");

module.exports = function(app) {
    // Open index page
    app.get("/", function(req, res) {
        res.render("index");
    });

    // Open page displaying favorite stories
    app.get("/favorites", function(req, res) {
        res.render("favorites");
    });

    // Render 404 page for any unmatched routes
    app.get("*", function(req, res) {
        res.render("404");
    });
};


