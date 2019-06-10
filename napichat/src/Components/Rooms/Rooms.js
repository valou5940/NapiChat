import React, { useContext, useState, useEffect } from 'react';
import { useChangeChannel } from '../../Services/UsersService';
import SocketContext from '../../SocketContext/SocketContext';
import { createChannel } from '../../Socket/emit';

export default function Rooms(props) {
  const [showCreate, setShowCreate] = useState(false);
  const [channelName, setChannelName] = useState('');
  const [query, setUserChannel] = useState();
  const self = useChangeChannel(query);
  const users = useContext(SocketContext);

  const handleNewChannel = () => {
    setShowCreate(true);
  };

  // change user channel when creating new one
  const handleCreateChannel = e => {
    e.preventDefault();
    console.log(props.self);
    setUserChannel({ url: 'user/channel', body: { user: props.self, channel: channelName } });
  };

  //
  const handleJoinChannel = () => {
    return null;
  };

  useEffect(() => {
    console.log(users);
    if (self.user) {
      console.log(self);
      // emit event to server to create channel
      createChannel(self.user);
    }
  }, [self, users]);

  return (
    <div>
      <h5>Channels</h5>
      <div className="row">
        <div className="full-users-list col-6">
          <button onClick={handleNewChannel}>New Channel</button>
          {showCreate && (
            <form onSubmit={handleCreateChannel}>
              <input
                type="text"
                placeholder="Channel name"
                value={channelName}
                onChange={e => setChannelName(e.target.value)}
              />
              <input type="submit" value="Create" />
            </form>
          )}
        </div>
        <div className="full-rooms-list col-6">
          <button onClick={handleJoinChannel}>Join Channel</button>
        </div>
      </div>
    </div>
  );
}
