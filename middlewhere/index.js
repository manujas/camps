// all middlewhere go right here

var Campground = require("../models/campground");
var Comment    = require("../models/comment");

var middlewhereObj = {};

middlewhereObj.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    // send a flash msg
    req.flash("error", "You need login first!");
    res.redirect("/login");
}

middlewhereObj.isCommentAuthor = function(req, res, next) {
    // find the campground
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if(err) {
            console.log(err);
            req.flash("error", "Campground not found");
            res.redirect("back");
        }
        else {
            // check ownership
            if(foundComment.author.id.equals(req.user._id)) {
                return next();    
            }
            // redirect if not
            req.flash("error", "You don't have permission to do that.");
            res.redirect("back");    
        }
    });
}

middlewhereObj.isCampgroundAuthor = function(req, res, next) {
    // find the campground
    Campground.findById(req.params.id, function(err, foundCampground) {
        if(err) {
            console.log(err);
            req.flash("error", "Campground not found");
            res.redirect("back");
        }
        else {
            // check ownership
            if(foundCampground.author.id.equals(req.user._id)) {
                return next();    
            }
            // redirect if not
            req.flash("error", "You don't have permission to do that.");
            res.redirect("back");  
        }
    });
}

module.exports = middlewhereObj;