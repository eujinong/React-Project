import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import PrivateRoute from './components/Routes/PrivateRoute';

import { history } from './store';
import Main from './scenes/Main';
import Login from './scenes/Login';

class App extends Component {
  render() {
    return (
      <Router history={history} onUpdate={() => { window.scrollTo(0, 0); }} onChange={() => {}}>
        <Switch>
          <Route exact path="/login" name="Login" component={Login} />
          <PrivateRoute path="/" name="Main" component={Main} />
        </Switch>
      </Router>
    );
  }
}

export default App;
