var express = require("express");
var mongoose = require("mongoose");

var PORT = process.env.PORT || 8000;

var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect("mongodb://localhost/myappdatabase", { useNewUrlParser: true });

// Set Handlebars
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes
// require("./routes/newsRoutes")(app);
require("./routes/htmlRoutes")(app);

// Start the server
app.listen(PORT, function() {
  console.log("Server listening on port " + PORT + ".");
});

module.exports = app;