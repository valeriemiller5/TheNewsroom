var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    Title: String,
    Summary: String, 
    Meta: {
        Link: String
    },
    created_At: Date,
    updated_At: Date
});

var Comments = mongoose.model("News", commentSchema);

module.exports = Comments;