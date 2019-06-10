import { socket } from './index';

export const socketEvents = ({ setValue }) => {
  socket.on('user-choosing-channel', user => {
    setValue(state => {
      return { ...state, user };
    });
  });
};
