var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose")


// mongoose.connect("mongodb://localhost/yelp_camp");
// var connectionUrl = "mongodb://Gary:werto5678@ds151242.mlab.com:51242/bluefishmarineyelpcamp?authSource=admin";
// mongoose.connect(connectionUrl);
mongoose.connect(process.env.DATABASEURL);

/****User Schema******/
var UserSchema = new mongoose.Schema({
    userName: String,
    password: String
})

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("user",UserSchema);