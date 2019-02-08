import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './../components/Login/Login';
import Register from './../components/Register/Register';

const routes = (
  <Switch>
    {/*<Route exact path='/' component={Home} />*/}
    <Route
      path='/login'
      component={Login}
    />
    <Route
      path='/register'
      component={Register}
    />
    {/*<Route render={(props) => 1 === 2 ? <Component {...props}/> : <Redirect to={{pathname: '/login'}} />}/>*/}
  </Switch>
);

export default routes;
