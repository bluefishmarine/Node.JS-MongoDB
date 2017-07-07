var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/yelp_camp");

/****Campgrounds Schema******/
var commentSchema = new mongoose.Schema({
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User" //Model that we will be refering to with ObjectId
        },
        username: String
    },
    text: String
})

module.exports = mongoose.model("Comment",commentSchema);