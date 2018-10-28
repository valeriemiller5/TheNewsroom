// require in mongoose Node package
var mongoose = require("mongoose");

// Create the schema for the MongoDB database
var Schema = mongoose.Schema;

// Create the schema model for the database
var CommentSchema = new Schema({
    title: String,
    body: String
});

// creates a Comments model with Mongoose using the CommentSchema
var Comments = mongoose.model("Comments", CommentSchema);

// export the model
module.exports = Comments;