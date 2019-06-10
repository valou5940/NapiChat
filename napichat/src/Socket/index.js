import io from 'socket.io-client';
import { socketEvents } from './events';

export const socket = io(process.env.REACT_APP_URL);
export const initSockets = ({ setValue }) => {
  socketEvents({ setValue });
  //   joinHomeRoom(setValue);
};
