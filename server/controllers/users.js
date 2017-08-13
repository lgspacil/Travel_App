//came here after being sent from the routes.js section
var mongoose = require('mongoose');

//since we have the animal model we need to set Aniaml as a variable
var User = mongoose.model('User');


module.exports = {
    add_user: function(req, res){
        console.log("in the server.js attempting to register the user: ", req.body)
        User.findOne({email: req.body.email}, function(err, result){
            if (result == null){
                var user = new User(req.body)
                user.save(function(err){
                    if(err){
                        console.log("error when registering a new user")
                    } else{
                        return res.json(user);
                    }
                })
            }
            else{
                return res.json(false)
            }
        })
    },

    log_in: function(req, res){
        User.findOne({email: req.body.email}, function(err, result){
            if(err){
                console.log(" there was an error when logging in....", err)
            }else{
                if (result == null){
                    //console.log("there was a NULL when logging in, that means that there was never an account in the DB .....", result)
                    return res.json(result);
                }
                else{
                    // console.log("there was not a null, you have registered before!, returning object: ", result)
                    return res.json(result);
                }
            }
        })
    },

    load_all_users: function(req, res){
        User.find({}, function(err, result){
            if(err){console.log("there was an error getting user data")}
            else{res.json(result)}
        })
    },





}





