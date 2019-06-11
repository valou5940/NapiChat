import React, { useContext, useState, useEffect } from 'react';
import { useChangeChannel, useGetUsersList } from '../../Services/UsersService';
import SocketContext from '../../SocketContext/SocketContext';
import { createChannel } from '../../Socket/emit';

export default function Rooms(props) {
  const [showCreate, setShowCreate] = useState(false);
  const [channelName, setChannelName] = useState('');
  const [userChannel, setUserChannel] = useState();
  const [fetchUsersList, setFetchUsersList] = useState();
  const [self, setSelf] = useState(props.self);
  const [usersList, setUsersList] = useState([]);
  const selfResponse = useChangeChannel(userChannel);
  const usersListResponse = useGetUsersList(fetchUsersList);
  const userIsLoging = useContext(SocketContext);

  const handleNewChannel = () => {
    setFetchUsersList({ url: 'users/home-room' });
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

  // effect hook for creating channel and getting self from response
  useEffect(() => {
    if (selfResponse.user) {
      console.log(selfResponse);
      // emit event to server to create channel
      setSelf(selfResponse.user);
      createChannel(selfResponse.user);
    }
  }, [selfResponse]);

  // effect hook to retrieve user list from response
  useEffect(() => {
    if (usersListResponse.users) {
      const usersWithoutSelf = usersListResponse.users.filter(
        user => user.nickname !== self.nickname
      );
      setUsersList(usersWithoutSelf);
    }
  }, [usersListResponse.users, self.nickname]);

  // effect hook to add user connecting to user list
  useEffect(() => {
    if (userIsLoging.user) {
      console.log(userIsLoging.user);
      setUsersList(prevUsersList => [...prevUsersList, userIsLoging.user]);
    }
  }, [userIsLoging.user]);

  return (
    <div>
      <h5>Channels</h5>
      <div className="row">
        <div className="full-users-list col-6">
          <button onClick={handleNewChannel}>New Channel</button>
          {showCreate && (
            <div>
              <form onSubmit={handleCreateChannel}>
                <input
                  type="text"
                  placeholder="Channel name"
                  value={channelName}
                  onChange={e => setChannelName(e.target.value)}
                />
                <input type="submit" value="Create" />
              </form>
              <ul>
                {usersList.length > 0 &&
                  Array.from(usersList).map((user, index) => {
                    return <li key={index}>{user.nickname}</li>;
                  })}
              </ul>
            </div>
          )}
        </div>
        <div className="full-rooms-list col-6">
          <button onClick={handleJoinChannel}>Join Channel</button>
        </div>
      </div>
    </div>
  );
}
