var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TripSchema = new mongoose.Schema({
    trip_name: {type: String},
    day_count: {type: Number, default: 0},
    money_count: {type: Number, default: 0},
    _locations: [{type: Schema.Types.ObjectId, ref:'Location'}],
    _user_id: {type: Schema.Types.ObjectId, ref:'User'},
    username: {type: String},

})

var Trip = mongoose.model('Trip', TripSchema);
// var Trip = mongoose.model('Trip');