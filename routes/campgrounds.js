var express = require("express");
var router  = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comments");
var middleware = require("../middleware"); //auto finds index.js b/c it is a special file. 

/*******All Campgrounds**********/
router.get("/",function(req,res){
    Campground.find({},function(err,camps){
        if (err){
            console.log("Error Getting Data")
            return [{name:"No",image:"Data"}]
        }else{
            res.render("campgrounds/index",{campgrounds:camps});
        }
    })
});

/********POST Request to Campgrounds***********/
router.post("/",middleware.isLoggedIn,function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var price = req.body.price;
    var description = req.body.info;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
     Campground.create({
         name: name,
         image: image,
         description: description,
         price: price,
         author: author
     },function(err,camp){
        if (err){
            console.log(err)
        }
    })
    res.redirect("/campgrounds");
})

/********Add new Campground Form*************/
router.get("/new",middleware.isLoggedIn,function(req,res){
    res.render("campgrounds/new");
});

/***Display individual info on CampSite***/
router.get("/:id",function(req,res){
    //Find the campground by ID
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){ //Populate Campground with associated comments
        if (err){
            console.log(err)
        }else{
           res.render("campgrounds/show", {campground: foundCampground}); 
        }
    })
})

/*******EDIT/UPDATE Campground***********/

//Edit Campground
router.get("/:id/edit",middleware.checkCampgroundOwnerShip,function(req,res){
    Campground.findById(req.params.id,function(err,campground){
        if (err){
            res.redirect("back");
        }else{
            res.render("campgrounds/edit",{campground:campground});
        }
    })
})


//Update Campground
router.put("/:id",middleware.checkCampgroundOwnerShip,function(req,res){
        Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,campground){
        if (err){
            res.redirect("/")
        }else{
            res.redirect("/campgrounds/" + req.params.id)
        }
    })
})


//Delete Campground
router.delete("/:id",middleware.checkCampgroundOwnerShip,function(req,res){
        Campground.findByIdAndRemove(req.params.id,function(err,blog){
        if (err){
            res.redirect("/campgrounds/");
        }else{
            res.redirect("/campgrounds");
        }
    })
})

// Middleware
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


function checkCampgroundOwnerShip(req,res,next){
        if (req.isAuthenticated()){
            Campground.findById(req.params.id,function(err,campground){
        if (err){
            res.redirect("back");
        }else{
            //does user own campground?
            if (campground.author.id.equals(req.user._id)){
               next(); 
            }else{
                res.redirect("back");
            }
            
        }
    })
    }else{
        res.redirect("back"); //redirect to previous page
    }
}

module.exports = router;