var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose")



mongoose.connect("mongodb://localhost/yelp_camp");

/****User Schema******/
var UserSchema = new mongoose.Schema({
    userName: String,
    password: String
})

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("user",UserSchema);