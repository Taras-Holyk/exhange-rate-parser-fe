import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom';
import UserStorage from './../services/UserStorage';

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    UserStorage.getAuthStatus()
      ? <Component {...props} />
      : <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }} />
  )} />
);

export default ProtectedRoute;
