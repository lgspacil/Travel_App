var mongoose = require('mongoose');

var Trip = mongoose.model('Trip');
var Location = mongoose.model('Location');


module.exports = {
    load_trips: function(req, res){
        Trip.find({_user_id: req.body.user_id}, function(err, result){
            if(err){
                console.log("there was an error retreiving the trips from the user..")
            }else{
                return res.json(result)
            }
        })
    },

    adding_trip: function(req, res){
        console.log("adding a new trip in the server.js with this info: ", req.body)
        Trip.findOne({ $and: [{trip_name: req.body.trip_name}, {_user_id: req.body._user_id}]}, function(err, result){
            if(err){
                console.log("there was an error when adding a new trip")
            } else {
                if(result == null){
                    var trip = new Trip(req.body)
    
                    trip.save(function(err){
                        if(err){
                            console.log("error when adding a new trip to DB")
                        } else{
                            return res.json(trip)
                        }
                    })
                }else{
                    console.log("there was not a null, you have already named a trip this name")
                    return res.json(false);
                }
            }
        })
    },

    add_new_marker: function(req, res){
        console.log("****************** ", req.body)
        Trip.findOne({_id: req.body._trip}, function(err, trip){
            var location = new Location(req.body);
            trip._locations.push(location);
            location.save(function(err){
                trip.save(function(err){
                    if(err){console.log("sadly this did not work")}
                    else{res.json(location)}
                })
            })
        })
    },

    load_specific_markers: function(req, res){
        Trip.findOne({_id: req.body.trip_id})
        .populate('_locations')
        .exec(function(err, result){
            return res.json(result);
        })
    },

    update_trip_info: function(req, res){
        Trip.update({_id: req.body.trip_id}, {$set: {"day_count": req.body.day_count, "money_count": req.body.money_count}}, function(err, result){
            if(err){console.log("there was something wrong when updating the users money and day count")}
            else{res.json(true);}
        })
    },

    update_trip_locations: function(req, res){
        Trip.update({_id: req.body._trip}, {$pull: {_locations: req.body._id}}, function(err, result){
            if(err){console.log("there was an error when pulling the location from the user")}
            else{res.json(result)}
        })
    },

    get_name_and_user_id: function(req, res){
        Trip.findOne({_id: req.body.trip_id}, function(err, result){
            if(err){console.log("there wan an error getting trip name")}
            else{res.json(result)}
        })
    },

    load_all_trips: function(req, res){
        Trip.find({}, function(err, result){
            if(err){console.log("error when grabbing all the trips")}
            else{res.json(result)}
        })
    },

    delete_trip: function(req, res){
        Trip.remove({_id: req.body.trip_id}, function(err, result){
            if(err){console.log("there was an error")}
            else{res.json(true);}
        })
    },

    filter_trips: function(req, res){
        Trip.find({$and:[{day_count:{$lte:req.body.trip_length}}, {money_count:{$lte:req.body.trip_price}}]}, function(err, result){
            if(err){console.log("there was an error")}
            else{res.json(result);}  
          })
    }


}
