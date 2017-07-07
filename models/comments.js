var mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost/yelp_camp");
// var connectionUrl = "mongodb://Gary:werto5678@ds151242.mlab.com:51242/bluefishmarineyelpcamp?authSource=admin";
// mongoose.connect(connectionUrl);
mongoose.connect(process.env.DATABASEURL2);

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