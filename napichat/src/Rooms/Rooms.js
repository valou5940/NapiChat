import React, { useState, useEffect } from 'react';
import usePostFetch from '../Utils/Utils';

export default function Rooms(props) {
  const [showCreate, setShowCreate] = useState(false);
  const [channelName, setChannelName] = useState('');
  const [query, setQuery] = useState();
  const response = usePostFetch(query);

  const handleNewChannel = () => {
    setShowCreate(true);
  };

  const handleCreateChannel = e => {
    e.preventDefault();
    setQuery({ url: 'user/channel', body: { user: props.self, channel: channelName } });
  };

  const handleJoinChannel = () => {
    return null;
  };

  useEffect(() => {
    if (response !== undefined && response !== null) {
      console.log(response);
    }
  }, [response]);

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
