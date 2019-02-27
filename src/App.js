import React, { Component } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Dashboard from './components/Dashboard/Dashboard';
import {Route, Switch} from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import ProtectedRoute from './helpers/ProtectedRoute';

class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Switch>
          <ProtectedRoute exact
            path='/'
            component={Dashboard}
          />
          <Route
            path='/login'
            component={Login}
          />
          <Route
            path='/register'
            component={Register}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
