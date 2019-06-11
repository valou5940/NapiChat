import React, { useEffect, useState } from 'react';
import { useLogin } from '../../Services/UsersService';
import { joinHomeRoom } from '../../Socket/emit';

export default function Connection(props) {
  const [nickname, setNickname] = useState('');
  const [query, saveUser] = useState();
  const userLogin = useLogin(query);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // console.log(userLogin);
    if (userLogin.user) {
      setError(null);
      setUser(userLogin.user);
      props.onLogin(userLogin.user);
      props.history.push('/rooms');
      joinHomeRoom(userLogin.user);
    } else if (userLogin === 'USER_ALREADY_LOGGED') {
      setError('Nickname is already taken !');
    }
  }, [userLogin, props]);

  const handleSubmit = event => {
    event.preventDefault();
    saveUser({ url: 'user', body: { nickname: nickname } });
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            placeholder="choose a nickname"
            value={nickname}
            onChange={e => {
              e.preventDefault();
              setNickname(e.target.value);
            }}
          />
        </label>
        <input type="submit" value="Connect" disabled={nickname === ''} />
      </form>
      <p>
        {user !== null && user !== undefined && <span>{Array.from(user.nickname)} logged!</span>}
      </p>
      <p>{error}</p>
    </div>
  );
}
