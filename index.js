const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const path = require('path');
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const UsersController = require('./controllers/UsersController');
const ChannelsController = require('./controllers/ChannelsController');
const MessagesController = require('./controllers/MessagesController');
const socket = require('./sockets/sockets');

//CORS middleware
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Use middleware to set the default Content-Type
// app.use(function(req, res, next) {
//   res.header('Content-Type', 'application/json');
//   next();
// });
app.use(allowCrossDomain);
// app.use(express.static(__dirname + '/public'));

// app.get('/', (req, res) => {
//   res.sendFile(`${__dirname}/chat/public/index.html`);
// });

// app.use(express.static(path.join(__dirname, 'chat/build')));
// app.use(express.static(path.join(__dirname, 'chat/build')));
// app.use(express.static(path.join(__dirname, 'chat/build/static')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/chat/public/index.html'));
});

// get full userlists
app.get('/api/users', (req, res) => {
  UsersController.getFullUsersList()
    .then(users => {
      console.log('Full users list', users);
      res.json({ users: users });
    })
    .catch(error => {
      res.json(error);
    });
});

// save user into db
app.post('/api/user', (req, res) => {
  UsersController.setNicknameOnLogin(req.body.nickname)
    .then(user => {
      res.json({ user: user });
    })
    .catch(error => {
      res.json(error);
    });
});

//change user channel
app.post('/api/user/channel', (req, res) => {
  const user = req.body.user;
  const channel = req.body.channel;
  UsersController.changeUserChannel(user, channel)
    .then(user => {
      res.json({ user: user });
    })
    .catch(error => {
      res.json(error);
    });
});

//get users in channel
app.get('/api/users/:channel', (req, res) => {
  const room = req.params.channel;
  UsersController.getUsersInChannel(room)
    .then(users => {
      res.json({ users: users });
    })
    .catch(error => {
      res.json(error);
    });
});

app.get('/api/messages/:channel', (req, res) => {
  const room = req.params.channel;
  MessagesController.getMessagesInChannel(room)
    .then(messages => {
      res.json({ messages: messages });
    })
    .catch(error => {
      res.json(error);
    });
});

// send channels list to client
app.get('/api/rooms', (req, res) => {
  ChannelsController.getChannels()
    .then(channels => {
      res.json({ channels: channels });
    })
    .catch(error => {
      res.json(error);
    });
});

server.listen(port, () => {
  console.log(`server listening to port ${port}`);
});

//sockets
socket.connectToSocket(server);
