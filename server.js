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

mongoose.connect("mongodb://localhost/newsdatabase", { useNewUrlParser: true });

// Set Handlebars
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes
require("./routes/htmlRoutes")(app);

// Start the server
app.listen(PORT, function() {
  console.log("Server listening on port " + PORT + ".");
});

module.exports = app;