var db = require("../models");
var axios = require("axios");
var cheerio = require("cheerio");

module.exports = function (app) {
    // Route to scrape the website for news articles, searching for specific info
    app.get("/scrape", function (req, res) {
        // Grab the articles to be rendered from the patch.com website
        axios.get("https://patch.com/").then(function (response) {
            var $ = cheerio.load(response.data);
            // Grab every h2 with a class "slot-title" to get article information
            $("h2.slot-title").each(function (i, element) {
                // results will be saved to the empty object
                var result = {};

                // article information that will be saved in the object
                result.title = $(this).text();
                result.summary = $(this).siblings("div").text();
                result.link = $(this).find("a").attr("href");

                db.News.create(result).then(function (dbNews) {
                    // log the news stories scrapped from patch.com
                    console.log(dbNews);
                }).catch(function (err) {
                    // if an error returns, display is in the server
                    return res.json(err);
                });
            });
            // if the scrape is successful, this message is logged
            res.send("Scrape Complete");
        });
    });

    // Open index page, render news articles in Handlebars
    app.get("/", function (req, res) {
        db.News.find({ saved: false }).then(function (data) {
            // handlebars object to collect data for the index.handlebars template
            var hbsObject = {
                news: data
            };
            // console.log("htmlroutes, line 36: " + hbsObject);
            res.render("index", hbsObject);
        }).catch(function (err) {
            res.json(err);
        })
    });

    // Route for grabbing a specific news article by id, populate it with comments
    app.get("/news/comment/:id", function (req, res) {
        // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
        db.News.findOne({ _id: req.params.id })
            // ..and populate all of the comments associated with it
            .populate("comments")
            .then(function (dbNews) {
                res.json(dbNews);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    // Route for saving/updating a news article's associated comment
    app.post("/news/:id", function (req, res) {
        // Create a new comment and pass the req.body to the entry
        db.Comments.create(req.body)
            .then(function (dbComment) {
                // If a comment was created successfully, find one news article with an `_id` equal to `req.params.id`. Update the news article to be associated with the new comment

                // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
                return db.News.findOneAndUpdate(
                    { _id: req.params.id },
                    { comment: dbComment._id },
                    // { new: true } tells the query that we want it to return the updated comment
                    { new: true });
            })
            .then(function (dbNews) {
                res.json(dbNews);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    // Route for saving an article to show in the favorites page
    app.post("/news/save/:id", function (req, res) {
        db.News.findOneAndUpdate(
            {_id: req.params.id}, 
            { saved: true })
        .then(function (dbNews) {
            res.send(dbNews);
        }).catch(function (err) {
            res.json(err);
        })
    });

    // Route for saving an article to show in the favorites page
    app.post("/news/delete/:id", function (req, res) {
        db.News.findOneAndUpdate(
            {_id: req.params.id}, 
            { saved: false })
        .then(function (dbNews) {
            res.send(dbNews);
        }).catch(function (err) {
            res.json(err);
        })
    });

    // Open page displaying favorite stories
    app.get("/favorites", function (req, res) {
        db.News.find({ saved: true }).then(function (data) {
            // handlebars object to collect data for the index.handlebars template
            var hbsObject = {
                news: data
            };
            // renders data from patch.com in Handlebars
            res.render("favorites", hbsObject);
        }).catch(function (err) {
            res.json(err);
        })
    });

    app.delete("/clear", function(req, res) {
        db.News.deleteMany({saved: false}, function(err) {
            res.send(err);
        })
    })

    // Render 404 page for any unmatched routes
    app.get("*", function (req, res) {
        res.render("404");
    });
};
