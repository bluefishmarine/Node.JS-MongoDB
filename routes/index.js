var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");


/***********Landing Page************/
//Root Route
router.get("/",function(req,res){
    res.render("landing");
});

/*******AUTHENTICATION***************/
//Auth Routes

/**Register Form**/
router.get("/register",function(req,res){
    res.render("user/register");
})

//Register Logic
router.post("/register",function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    User.register(new User({username:username}),password,function(err,user){
        if (err){
            req.flash("error",err.message);
            return res.redirect("/register")
        }
        passport.authenticate("local")(req,res,function(){
            req.flash("success","Account registered! Welcome " + user.username);
            res.redirect("/");
        })
    })
})

/***Login***/
router.get("/login",function(req,res){
    res.render("user/login");
})

//Login Logic
router.post("/login",passport.authenticate("local",{
    successRedirect: "/",
    failureRedirect: "/login"
}),function(req,res){});

/***Logout***/
router.get("/logout",function(req,res){
    req.logout();
    req.flash("success","Logged you Out!");
    res.redirect("/campgrounds");
})

module.exports = router;
