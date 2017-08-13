var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
    email: {type: String},
    username: {type: String},
    password: {type: String},
    confirm_password: {type: String},
    _trip_id: [{type: Schema.Types.ObjectId, ref:'Trip'}],
    country: {type: String}
})

var User = mongoose.model('User', UserSchema);
// var User = mongoose.model('User');