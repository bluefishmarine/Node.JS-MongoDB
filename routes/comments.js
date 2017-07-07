var express = require("express");
var router  = express.Router({mergeParams: true}); //mergeParams allows use of ":id" from app.js file
var Campground = require("../models/campground");
var Comment = require("../models/comments");
var middleware = require("../middleware");

/********Add new Comment*********/

//Get Route, comments New
router.get("/new", middleware.isLoggedIn,function(req,res){
    Campground.findById(req.params.id,function(err,campground){
        if (err){
            console.log(err)
        }else{
          res.render("comments/new",{campground:campground});  
        }
    })
    
})
    //Post Route comments Create
router.post("/",middleware.isLoggedIn,function(req,res){
    Campground.findById(req.params.id, function(err,campground){
        if (err){
            console.log(err)
        }else{
            Comment.create(req.body.comment,function(err,comment){
                if (err){
                    console.log(err)
                }else{
                    // add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + req.params.id);
                }
            });
        }
    })
})


/******Edit/Delete Comments*********/
//Display Edit Form
router.get("/:comment_id/edit",middleware.checkCommentOwnerShip,function(req,res){
    Comment.findById(req.params.comment_id,function(err,comment){
        if (err){
            res.redirect("back");
        }else
            res.render("comments/edit",{comment:comment, campground_id:req.params.id});  
    })
})
  //Send PUT request  
router.put("/:comment_id",middleware.checkCommentOwnerShip,function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment,function(err,comment){
        if (err){
            res.redirect("back");
        }else{
            res.redirect("/campgrounds/" + req.params.id)
        }
    })
})

//Delete Comment
router.delete("/:comment_id",middleware.checkCommentOwnerShip,function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id,function(err,comment){
        if (err){
            res.redirect("/campgrounds/" + req.params.id);
        }else{
            req.flash("success","Comment successfully deleted");
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
})

module.exports = router;