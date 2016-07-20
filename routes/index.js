var express  = require("express");
var router   = express.Router();
var passport = require("passport");
var User     = require("../models/user");


// HOME
router.get("/", function(req, res) {
    res.render("landing");
});


//=====================
// AUTH ROUTES
//=====================

// show register form
router.get("/register", function(req, res) {
   res.render("register"); 
});

// handle sign up logic
router.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user) {
        if(err) {
            console.log(err);
            req.flash("error", err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function() {
            req.flash("success", "Welcome to YelpCamp " + user.username);
            res.redirect("/campgrounds");
        });
    });
});


// show the login form
router.get("/login", function(req, res) {
    res.render("login");
});

// handling login logic
// app.method("route", midlewhere, callback);
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res) {
});


// LOGOUT ROUTES
router.get("/logout", function(req, res) {
   req.logout();
   res.redirect("/campgrounds");
});

module.exports = router;