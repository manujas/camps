var mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment");
    
    
    
var data = [
    {
        name: "campamento 1", 
        image: "https://farm6.staticflickr.com/5098/5496185186_d7d7fed22a.jpg", 
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        
    },
    {
        name: "campamento 2", 
        image: "https://farm4.staticflickr.com/3817/9354978845_669cc74c19.jpg", 
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        
    },
    {
        name: "campamento 3", 
        image: "https://farm7.staticflickr.com/6213/6211730932_46d38e3106.jpg", 
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        
    },
];
// limpiar base de datos
function seedDB() {
    Campground.remove({}, function(err) {
        if(err) {
            console.log(err);
        }
        else {
            console.log("Campgrounds deleted from DB");
            
            // creamos neuvos campgrounds
            data.forEach(function(seed) {
                Campground.create(seed, function(err, camp) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log("compground created");
                        
                        // agregamos comentarios
                        Comment.create({
                            text: "askldhasldhaslkdashdlkashdklashdl",
                            author: "yoyoyo"
                        }, function(err, comment) {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                camp.comments.push(comment);
                                camp.save();
                            }
                        })
                    }
                });
            });
        }
    });    
}

module.exports = seedDB;