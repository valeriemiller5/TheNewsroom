var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var newsSchema = new Schema({
    Title: String,
    Summary: String, 
    Meta: {
        Link: String
    },
    created_At: Date,
    updated_At: Date
});

var News = mongoose.model("News", newsSchema);

module.exports = News;