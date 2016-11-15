var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

server.listen(port, "0.0.0.0");

var messages = [];

var router = express.Router();
router.get('/', function (req, res) {
  res.json(messages);
});

router.post('/', function (req, res) {
  if (req.body && req.body.author && req.body.text) {
    messages.push(req.body);
  }
  res.json(req.body);
});

app.use(bodyParser.json());
app.use(function (req, res, next) {
  console.log('req');
  next();
});
app.use(router);

// Chatroom

// usernames which are currently connected to the chat
var usernames = {};
var numUsers = 0;

var rooms = ['room1','room2','room3'];

io.on('connection', function (socket) {
  console.log('connected!');
  var addedUser = false;

  // when the client emits 'new message', this listens and executes
  socket.on('CREATE_MESSAGE', function (data) {
    console.log('creating message', data);
    var evt = data.message;
    console.log(evt);
    // we tell the client to execute 'new message'
    socket.broadcast.emit('RECEIVE_MESSAGE', evt);
  });

  socket.on('adduser', function(username, room_name){
    console.log('username', username)
    console.log('room_name', room_name)
    // store the username in the socket session for this client
    socket.username = username;
    // store the room name in the socket session for this client
    socket.room = 'room1';
    // add the client's username to the global list
    usernames[username] = username;
    // send client to room 1
    socket.join('room1');
    // echo to client they've connected
    socket.emit('updatechat', 'SERVER', 'you have connected to room1');
    // echo to room 1 that a person has connected to their room
    socket.broadcast.to('room1').emit('updatechat', 'SERVER', username + ' has connected to this room');
    socket.emit('updaterooms', rooms, 'room1');
  });

  // when the client emits 'CREATE_USER', this listens and executes
  socket.on('CREATE_USER', function (event) {
    var username = event.user.name;
    console.log('adding user', username);
    // we store the username in the socket session for this client
    socket.username = username;
    // add the client's username to the global list
    usernames[username] = username;
    ++numUsers;
    addedUser = true;
    socket.emit('LOGIN_USER', event.user);
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit('user joined', {
      username: socket.username,
      numUsers: numUsers
    });
  });

  // when the client emits 'typing', we broadcast it to others
  socket.on('typing', function () {
    socket.broadcast.emit('typing', {
      username: socket.username
    });
  });

  // when the client emits 'stop typing', we broadcast it to others
  socket.on('stop typing', function () {
    socket.broadcast.emit('stop typing', {
      username: socket.username
    });
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', function () {
    // remove the username from global usernames list
    if (addedUser) {
      delete usernames[socket.username];
      --numUsers;

      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers
      });
    }
  });
});