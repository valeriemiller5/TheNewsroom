var mongoose = require("mongoose");

// Create the schema for the MongoDB database
var Schema = mongoose.Schema;

// Create the schema model for the database
var NewsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    }, 
    link: {
        type: String,
        required: true
    },
    comments: {
        type: Schema.Types.ObjectId,
        ref: "Comment"
    },
    created_At: Date,
    updated_At: {
        type: Date,
        default: Date.now
    }
});

var News = mongoose.model("News", NewsSchema);

module.exports = News;