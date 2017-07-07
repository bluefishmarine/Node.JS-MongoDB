var mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost/yelp_camp");
var connectionUrl = "mongodb://Gary:werto5678@ds151242.mlab.com:51242/bluefishmarineyelpcamp?authSource=admin";
mongoose.connect(connectionUrl);
// mongoose.connect('mongodb://${Gary}:${werto5678}@${ds151242.mlab.com:51242/}/${bluefishmarineyelpcamp}?authMechanism=SCRAM-SHA-1');

/****Campgrounds Schema******/
var campgroundSchema = new mongoose.Schema({
    name: String,
    price: String,
    image: String,
    description: String,
    comments: [{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }],
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    } 
})

module.exports = mongoose.model("Campground",campgroundSchema);