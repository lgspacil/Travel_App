var express = require("express");
var path = require("path");
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/main_travel_app');

var app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, './public/dist')));

var UserSchema = new mongoose.Schema({
    email: {type: String},
    username: {type: String},
    password: {type: String},
    confirm_password: {type: String},
    _trip_id: [{type: Schema.Types.ObjectId, ref:'Trip'}],
    direct_message_inbox: [{type: String}],
    direct_message_outbox: [{type: String}]
})

var TripSchema = new mongoose.Schema({
    trip_name: {type: String},
    day_count: {type: Number, default: 0},
    money_count: {type: Number, default: 0},
    _locations: [{type: Schema.Types.ObjectId, ref:'Location'}],
    _user_id: {type: Schema.Types.ObjectId, ref:'User'},
    username: {type: String},

})


var LocationSchema = new mongoose.Schema({
    _user: {type: Schema.Types.ObjectId, ref:'User'},
	location_name: {type: String},
    longitude: {type: Number},
    latitude: {type: Number},
	content: {type: String},
	img_url: [{type: String}],
    username: {type: String},
    _trip: {type: Schema.Types.ObjectId, ref:'Trip'},
    icon_url: {type: String},
    price: {type: Number},
    images: [{type: String}],
    day_number: {type: Number},
    weather: {type: Number}
}, {timestamps: true});

// var DirectMesssage = new mongoose.Schema({
//     _user: {type: Schema.Types.ObjectId, ref:"User"},
//     content: [{type: String}]
// })


mongoose.model('Location', LocationSchema);
var Location = mongoose.model('Location');

mongoose.model('User', UserSchema);
var User = mongoose.model('User');

mongoose.model('Trip', TripSchema);
var Trip = mongoose.model('Trip');

app.post('/add_user', function(req, res){
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
})

app.post('/log_in', function(req, res){
    // console.log("!!!!!!!!!!!!!!!!!!!!!!!", req.body)
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
})

app.post('/load_trips', function(req, res){
    Trip.find({_user_id: req.body.user_id}, function(err, result){
        if(err){
            console.log("there was an error retreiving the trips from the user..")
        }else{
            return res.json(result)
        }
    })
})

app.post('/adding_new_trip', function(req, res){
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
})


//creating a new marker location you must also update the users locations array
app.post('/add_newMarker', function(req, res){
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
})


app.post('/load_specific_markers', function(req, res){
    console.log("******************", req.body)

    Trip.findOne({_id: req.body.trip_id})
        .populate('_locations')
        .exec(function(err, result){
            return res.json(result);
        })
})


app.post('/update_trip_info', function(req, res){
    Trip.update({_id: req.body.trip_id}, {$set: {"day_count": req.body.day_count, "money_count": req.body.money_count}}, function(err, result){
        if(err){console.log("there was something wrong when updating the users money and day count")}
        else{res.json(true);}
    })
})

app.post('/remove_marker', function(req, res){
    //console.log("in the server.js on remove_marker info: ", req.body)

    Location.remove({_id: req.body._id}, function(err, result){

        if(err){console.log("there was an error")}
        else{res.json(true);}
    })

})

app.post('/update_trip_locations', function(req, res){
    Trip.update({_id: req.body._trip}, {$pull: {_locations: req.body._id}}, function(err, result){
        if(err){console.log("there was an error when pulling the location from the user")}
        else{res.json(result)}
    })
})

app.post("/getTripNameAndUserId", function(req, res){
    Trip.findOne({_id: req.body.trip_id}, function(err, result){
        if(err){console.log("there wan an error getting trip name")}
        else{res.json(result)}
    })
})

app.post('/update_marker', function(req, res){
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
})

app.get('/loadAllTrips', function(req, res){
    Trip.find({}, function(err, result){
        if(err){console.log("error when grabbing all the trips")}
        else{res.json(result)}
    })
})

app.get('/loadAllUsers', function(req, res){
    User.find({}, function(err, result){
        if(err){console.log("there was an error getting user data")}
        else{res.json(result)}
    })
})

app.post('/messageSent', function(req, res){
    console.log("I am sending the message: ", req.body);
    User.update({_id: req.body.yourFriendsId}, {$set: {"direct_message_inbox": req.body.inbox}}, function(err, result){
        if(err){console.log("there was an error adding the new message to the outbox")}
        else{res.json(result);}
    })
})

app.post('/load_your_inbox', function(req, res){
    User.findOne({_id: req.body.your_id}, function(err, result){
        if(err){console.log("there was an error adding the new message to the outbox")}
        else{res.json(result);}
    })
})

app.post('/load_your_friends_inbox', function(req, res){
    User.findOne({_id: req.body.your_friends_id}, function(err, result){
        if(err){console.log("there was an error adding the new message to the outbox")}
        else{res.json(result);}
    })
})

app.post('/delete_Trip', function(req, res){
    Trip.remove({_id: req.body.trip_id}, function(err, result){
        if(err){console.log("there was an error")}
        else{res.json(true);}
    })
})

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
///////////////////////////////socket stuff/////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

io.on('connection', (socket) => {
  console.log('USER CONNECTED');
  socket.on('connect', function(){})


  socket.on('disconnect', function(){
    console.log('USER DISCONNECTED');
  });

  socket.on('add-message', (message) => {
    //   console.log("*******************%%%%%%%%%%%", message)
    io.emit('message', {text: message.new_message, name: message.my_name});
  });
});

http.listen(8000, () => {
  console.log('started on port 8080');
});

