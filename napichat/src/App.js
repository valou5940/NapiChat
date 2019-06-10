import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Connection from './Components/Connection/Connection';
import Rooms from './Components/Rooms/Rooms';

function App() {
  const [self, setSelf] = useState({});

  const onUserLogIn = user => {
    console.log(user);
    setSelf(user);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>NapiChat</h1>
      </header>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={props => <Connection {...props} onLogin={onUserLogIn} />} />
          <Route exact path="/rooms" render={props => <Rooms {...props} self={self} />} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
