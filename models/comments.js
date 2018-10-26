var mongoose = require("mongoose");

// Create the schema for the MongoDB database
var Schema = mongoose.Schema;

// Create the schema model for the database
var CommentSchema = new Schema({
    title: String,
    body: String
});

var Comments = mongoose.model("Comments", CommentSchema);

module.exports = Comments;