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
            result.title = $(this).text();
            result.summary = $("div.slot-summary").text();
            result.link = $(this).find("a").attr("href");
    
            db.News.create(result).then(function(dbNews) {
                // log the news stories scrapped from patch.com
                console.log(dbNews);
            }).catch(function(err) {
                // if an error returns, display is in the server
                return res.json(err);
            });
        });
            // if the scrape is successful, this message is logged
            res.send("Scrape Complete");
        });
    });

    // Open index page, render news articles in Handlebars
    app.get("/", function(req, res) {
        db.News.find({}).then(function (data) {
            // handlebars object to collect data for the index.handlebars template
            var hbsObject = {
                news: data
            };
            // console.log("htmlroutes, line 36: " + hbsObject);
            res.render("index", hbsObject);
        }).catch(function(err) {
            res.json(err);
        })
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
