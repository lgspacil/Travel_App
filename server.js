var express = require("express");
var path = require("path");
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;


var app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, './public/dist')));


//setting up mongoose configs
require('./server/config/mongoose.js');

// define routes and controllers
//this is where all the logic is done.....
var routes = require('./server/config/routes.js')(app)


////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
///////////////////////////////socket stuff/////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

io.on('connection', (socket) => {

  socket.on("TESTING", function(data){
    io.emit("TESTING_BACK", data)
  })

  console.log('USER CONNECTED');
  socket.on('connect', function(){})


  socket.on('disconnect', function(){
    console.log('USER DISCONNECTED');
  });

  socket.on('add-message', (message) => {
      console.log("*******************%%%%%%%%%%%", message)
    io.emit('message', {
        text: message.new_message, 
        name: message.my_name, 
        country: message.my_country, 
        longitude: message.longitude, 
        latitude: message.latitude});
  });
});

const port = process.env.PORT || 8080

http.listen(port, () => {
  console.log('started on port 8080');
});

