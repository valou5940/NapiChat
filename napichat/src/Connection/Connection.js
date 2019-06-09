import React, { useState, useEffect } from 'react';
// import useLogin from './ConnectionService';
import usePostFetch from '../Utils/Utils';
import useRouter from '../Utils/Router';

export default function Connection(props) {
  const [nickname, setNickname] = useState('');
  const [query, setQuery] = useState();
  const response = usePostFetch(query);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  //   const [currentRoute, setCurrentRoute] = useState({ props: null, newRoute: null });
  //   const route = useRouter(currentRoute);

  useEffect(() => {
    console.log(response);
    if (response !== undefined && response.user) {
      if (response === 'USER_ALREADY_LOGGED') {
        setError('Nickname is already taken !');
      } else {
        setError(null);
        setUser(response.user);
        props.onLogin({ user: user });
        props.history.push('/rooms');
      }
    }
  }, [props, response, user]);

  const handleSubmit = event => {
    event.preventDefault();
    setQuery({ url: 'user', body: { nickname: nickname } });
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
