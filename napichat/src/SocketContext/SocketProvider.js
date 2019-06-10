import React, { useState, useEffect } from 'react';
import SocketContext from './SocketContext';
import { initSockets } from '../Socket/index';

const SocketProvider = props => {
  const [value, setValue] = useState({
    self: null,
    user: null,
    users: null,
    messages: null,
    channel: null
  });
  useEffect(() => initSockets({ setValue }), []);
  return <SocketContext.Provider value={value}>{props.children}</SocketContext.Provider>;
};
export default SocketProvider;
