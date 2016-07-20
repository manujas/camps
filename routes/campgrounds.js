var express      = require("express");
var router       = express.Router();
var Campground   = require("../models/campground");
var middlewhere  = require("../middlewhere");

// INDEX
router.get("/", function(req, res) {
    // get all campgrounds
    Campground.find({}, function(err, allCampgrounds){
       if(err) {
           console.log("error geting data from db");
       }
       else {
           // render the file
           res.render("campgrounds/index", {campgrounds: allCampgrounds});
       }
    });
    
});

// CREATE
router.post("/", middlewhere.isLoggedIn, function(req, res) {
    var name          = req.body.name;
    var image         = req.body.image;
    var desc          = req.body.description;
    var author = {
        id:       req.user._id, 
        username: req.user.username
    }
    var newCampground = {name: name,  image: image, description: desc, 
        author: author};
    
    // create a new campground
    Campground.create(newCampground, function(err, newlyCreated) {
        if(err) {
            console.log("error creating the campground");
        }
        else {
            // redirect to campgrounds view
            res.redirect("/campgrounds");
        }
    });
});

// NEW
router.get("/new", middlewhere.isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});

// SHOW
router.get("/:id", function(req, res) {
    // find the campground info whit the provided id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if (err) {
            console.log("no camp whit that id");
        }
        else {
            // render the template
            res.render("campgrounds/show", {campground: foundCampground}); 
        }
    });
    
});

// EDIT
router.get("/:id/edit", middlewhere.isLoggedIn, middlewhere.isCampgroundAuthor, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        }
        else {
                res.render("campgrounds/edit", {campground: foundCampground});            
        }
    });
});

// UPDATE
router.put("/:id", middlewhere.isLoggedIn, middlewhere.isCampgroundAuthor, function(req, res) {
    // find and update the campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
        if(err) {
            console.log(err);
            res.redirect("/campgrounds");
        }
        else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// DESTROY
router.delete("/:id", middlewhere.isLoggedIn, middlewhere.isCampgroundAuthor, function(req, res) {
   Campground.findByIdAndRemove(req.params.id, function(err) {
       if(err){
           res.redirect("/campgrounds");
       }
       else {
           res.redirect("/campgrounds");
       }
   });
});

module.exports = router;
