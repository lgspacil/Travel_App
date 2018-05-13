//we need to require the controllers because thats where we will send info after we recieved it in the routes section. 
//creating users locations and trips variables that will handel the logic that is sent to them from the routes

var users = require('../controllers/users.js')
var locations = require('../controllers/locations.js')
var trips = require('../controllers/trips.js')

module.exports = function (app){
    app.post('/add_user', function(req, res){
        users.add_user(req, res);
    })
    
    app.post('/log_in', function(req, res){
        users.log_in(req, res);
    })
    
    app.post('/load_trips', function(req, res){
        trips.load_trips(req, res);
    })
    
    app.post('/adding_new_trip', function(req, res){
        trips.adding_trip(req, res);
    })
    
    //creating a new marker location you must also update the users locations array
    app.post('/add_newMarker', function(req, res){
        trips.add_new_marker(req, res);
    })
    
    
    app.post('/load_specific_markers', function(req, res){
        trips.load_specific_markers(req, res);
    })
    
    
    app.post('/update_trip_info', function(req, res){
        trips.update_trip_info(req, res);
    })
    
    app.post('/remove_marker', function(req, res){
        locations.remove_marker(req, res);
    
    })
    
    app.post('/update_trip_locations', function(req, res){
        trips.update_trip_locations(req, res);
    })
    
    app.post("/getTripNameAndUserId", function(req, res){
        trips.get_name_and_user_id(req, res);
    })
    
    app.post('/update_marker', function(req, res){
        locations.update_marker(req, res);
    })
    
    app.get('/loadAllTrips', function(req, res){
        trips.load_all_trips(req, res);
    })
    
    app.get('/loadAllUsers', function(req, res){
        users.load_all_users(req, res);
    })
    
    
    app.post('/delete_Trip', function(req, res){
        trips.delete_trip(req, res);
    })
    
    app.post('/filter_trips', function(req, res){
        trips.filter_trips(req, res);
    })

}