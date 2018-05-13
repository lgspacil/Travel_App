var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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

var Location = mongoose.model('Location', LocationSchema);
// var Location = mongoose.model('Location');