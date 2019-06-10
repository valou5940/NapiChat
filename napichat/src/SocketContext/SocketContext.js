import React, { createContext } from 'react';
const SocketContext = createContext({
  self: null,
  user: null,
  users: null,
  messages: null,
  channel: null
});
export default SocketContext;
