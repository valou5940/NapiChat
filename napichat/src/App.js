import React, { useState, Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Connection from './Connection/Connection';
import Rooms from './Rooms/Rooms';
import useRouter from './Utils/Router';

function App() {
  const [self, setSelf] = useState({});
  const [socket, setSocket] = useState(null);

  const onUserLogIn = event => {
    setSelf(event.user);
    setSocket(process.env.REACT_APP_URL);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>NapiChat</h1>
      </header>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={props => <Connection {...props} onLogin={onUserLogIn} />} />
          <Route
            exact
            path="/rooms"
            render={props => <Rooms {...props} self={self} socket={socket} />}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
