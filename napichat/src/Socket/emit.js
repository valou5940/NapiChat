import { socket } from './index';

// user joining default room after connection
export const joinHomeRoom = user => {
  console.log('USER JOINS', user);
  socket.emit('user-joins-home', user);
};

// user create channel with invitations
export const createChannel = user => {
  socket.emit('create-channel', user);
};
