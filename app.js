var express               = require("express"),
    flash                 = require("connect-flash"),
    app                   = express(),
    bodyParser            = require("body-parser"), /****Parse Form Data into JSON Object*****/
    mongoose              = require("mongoose"),
    Campground            = require("./models/campground"),
    Comment               = require("./models/comments"),
    seedDB                = require("./seeds"),
    passport              = require("passport"),
    localStrategy         = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    User                  = require("./models/user"),
    methodOverride        = require("method-override")
    
    
//Requiring Routes    
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index");

// seedDB();
// var connectionUrl = "mongodb://Gary:werto5678@ds151242.mlab.com:51242/bluefishmarineyelpcamp?authSource=admin";
mongoose.connect('mongodb://${Gary}:${werto5678}@${ds151242.mlab.com:51242/}/${bluefishmarineyelpcamp}?authMechanism=SCRAM-SHA-1');
// mongoose.connect("mongodb://bluefishmarine:werto%5678@ds151242.mlab.com:51242/bluefishmarineyelpcamp");

// mongoose.connect("mongodb://localhost/yelp_camp");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(flash());


app.use(require("express-session")({
    secret: "I love big ol boobies bebe",
    resave: false,
    saveUninitialized: false
}));

//PASSPORT CONFIGURATION//
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req,res,next){ //Pass middleware to check if user is logged in and show login/register buttons
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
}) 

app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/campgrounds",campgroundRoutes); //appends "/campgrounds" to all routes inside of campgrounds to dry up code.
app.use(indexRoutes);



app.listen(process.env.PORT,process.env.IP, function(){
    console.log("Server has Started!");
});


