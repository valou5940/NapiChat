const socketIo = require('socket.io');
const database = require('../database/database');
const UsersController = require('../controllers/UsersController');
const MessagesController = require('../controllers/MessagesController');
const ChannelsController = require('../controllers/ChannelsController');

const connectToSocket = server => {
  let io = socketIo(server);
  // when connecting
  io.on('connection', socket => {
    console.log('user connected!');
    socket.join('home-room');
    //connect to database
    database.connection;

    // create channel
    socket.on('create-channel', user => {
      // io.to('home-room').emit('user-left-channel');
      socket.leave('home-room');
      const room = user.channelName;
      ChannelsController.saveChannel(room);
      socket.join(room);
      console.log('USER CREATED CHANNEL : ', user);
    });

    // when user joining home-room
    socket.on('user-joins-home', user => {
      console.log('USER JOINS HOME', user);
      socket.id = user.nickname;
      io.to('home-room').emit('user-choosing-channel', user);
    });

    socket.on('join-channel', user => {
      socket.leave('home-room');
      const room = user.channel.channelName;
      io.to(room).emit('user-joined', user);
    });

    socket.on('send-message', message => {
      const room = message.user.channel.channelName;
      const messageToDispatch = message;
      MessagesController.saveMessage(message);
      io.to(room).emit('dispatch-message', messageToDispatch);
    });

    socket.on('disconnect', id => {
      // UsersController.deleteConnectedUser(id)
      //   .then(user => {
      //     const room = user.channel.channelName;
      //     io.emit('user-left', user);
      //     io.to(room).emit('user-disconnected', user);
      //     getUsersInChannel(room).then(users => {
      //       io.to(room).emit('users-list', users);
      //     });
      //   })
      //   .catch(error => {
      //     console.log(error);
      //   });
    });
  });
};
module.exports.connectToSocket = connectToSocket;
