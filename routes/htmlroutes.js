var db = require("../models");
var axios = require("axios");
var cheerio = require("cheerio");

module.exports = function(app) {
    // Route to scrape the website for news articles, searching for specific info
    app.get("/scrape", function(req, res) {
        // Grab the articles to be rendered from the patch.com website
        axios.get("https://patch.com/").then(function(response) {
        var $ = cheerio.load(response.data);
        // Grab every h2 with a class "slot-title" to get article information
        $("h2.slot-title").each(function(i, element) {
            // results will be saved to the empty object
            var result = {};
            // article information that will be saved in the object
            result.title = $(element).text();
            result.summary = $("div.slot-summary").text();
            result.link = $(element).find("a").attr("href");
    
            db.News.create(result).then(function(dbNews) {
                console.log(dbNews);
                res.json(dbNews);
            }).catch(function(err) {
                res.json("An error has occurred: " + err);
            });
        });
        res.send("Scrape Complete");
        });
    });

    // Open index page, render news articles in Handlebars
    app.get("/", function(req, res) {
        db.News.find({saved: false}, function (data) {
            var hbsObject = {
                news: data
            };
            console.log(hbsObject);
            res.render("index", hbsObject);
        });
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
