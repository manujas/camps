//=====================
// COMMENTS ROUTES
//=====================

var express = require("express");
var router  = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middlewhere  = require("../middlewhere");

// NEW
router.get("/new", middlewhere.isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if(err) {
            console.log(err);
        }
        else {
            res.render("comments/new", {campground: foundCampground});
        }
    });
});


//CREATE
router.post("/", middlewhere.isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if(err) {
            console.log(err);
            res.redirect("/campgrounds");
        }
        else {
            Comment.create(req.body.comment, function(err, comment) {
                if(err) {
                    console.log(err);
                }
                else {
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    // save comment
                    comment.save();
                    //push into the campground
                    foundCampground.comments.push(comment);
                    foundCampground.save();
                    res.redirect("/campgrounds/" + foundCampground._id);
                }
            });
        }
    });
});

// EDIT
router.get("/:comment_id/edit", middlewhere.isLoggedIn, middlewhere.isCommentAuthor, function(req, res) {
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if(err) {
            console.log(err);
            res.redirect("back");
        }
        else {
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
        }
    });
    
});

// UPDATE
router.put("/:comment_id", middlewhere.isLoggedIn, middlewhere.isCommentAuthor, function(req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
        if(err) {
            console.log(err);
            res.redirect("back");
        }
        else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// DESTROY
router.delete("/:comment_id", middlewhere.isLoggedIn, middlewhere.isCommentAuthor, function(req, res) {
   Comment.findByIdAndRemove(req.params.comment_id, function(err) {
      if(err) {
          console.log(err);
          res.redirect("back");
      } 
      else {
          req.flash("success", "Comment removed");
          res.redirect("/campgrounds/" + req.params.id);
      }
   });
});

module.exports = router;