//came here after being sent from the routes.js section
var mongoose = require('mongoose');

//since we have the animal model we need to set Aniaml as a variable
var Location = mongoose.model('Location');

module.exports = {
    remove_marker: function(req, res){
        Location.remove({_id: req.body._id}, function(err, result){
            if(err){console.log("there was an error")}
            else{res.json(true);}
        })
    },

    update_marker: function(req, res){
        console.log("updating the locations with this info< look at me!:", req.body)
        Location.update({_id: req.body._id},{$set: {"content":req.body.content,
                                                    "location_name":req.body.location_name,
                                                    "price": req.body.price,
                                                    "img_url":req.body.img_url,
                                                    "day_number":req.body.day_number,
                                                    "weather":req.body.weather,
                                                    "images":req.body.images}}, function(err, result){
            if(err){console.log("there was an error when updating")}
            else{res.json(result);}
        })
    },
    

}