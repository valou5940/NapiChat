const socketIo = require('socket.io');
const database = require('../database/database');
const UsersController = require('../controllers/UsersController');
const MessagesController = require('../controllers/MessagesController');
const ChannelsController = require('../controllers/ChannelsController');

class Sockets {
  constructor() {
    this.connectSocket();
  }

  connectSocket(server) {
    let io = socketIo(server);
    // when connecting
    io.on('connection', socket => {
      //connect to database
      database.connection;

      // create channel
      socket.on('create-channel', usersAndChannel => {
        socket.leave('home-room');
        const room = usersAndChannel.channelName;
        ChannelsController.saveChannel(room);
        socket.join(room);
        console.log(usersAndChannel);
      });

      // when user joining channels list, add this user to every clients
      socket.on('user-joining-channel', user => {
        socket.id = user.nickname;
        io.emit('user-choosing-channel', user);
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
        UsersController.deleteConnectedUser(id)
          .then(user => {
            const room = user.channel.channelName;
            io.emit('user-left', user);
            io.to(room).emit('user-disconnected', user);
            getUsersInChannel(room).then(users => {
              io.to(room).emit('users-list', users);
            });
          })
          .catch(error => {
            console.log(error);
          });
      });
    });
  }
}

module.exports = new Sockets();
