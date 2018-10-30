var express = require("express");
var mongoose = require("mongoose");
var logger = require("morgan");

var PORT = process.env.PORT || 8000;

var app = express();

// Configure our app for morgan and body parsing with express.json and express.urlEncoded
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// ***********MONGOOSE SETUP FOR HEROKU DEPLOYMENT***********
// mongoose.connect("mongodb://localhost/newsdatabase", { useNewUrlParser: true });
// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/newsdatabase";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});
// ******************************************************************

// Set Handlebars
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes
require("./routes/htmlroutes")(app);

// Start the server
app.listen(PORT, function() {
  console.log("Server listening on port " + PORT + ".");
});

module.exports = app;