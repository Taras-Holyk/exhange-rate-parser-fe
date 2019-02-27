import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import ApiService from './../../services/Api';
import UserStorage from './../../services/UserStorage';
import './Login.scss';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state ={
      isAuthenticated: UserStorage.getAuthStatus()
    };
  };

  submit = async (event) => {
    event.preventDefault();

    const response = await ApiService.post('users/login', {
      email: event.target.email.value,
      password: event.target.password.value
    });

    if (response) {
      if (response.token) {
        localStorage.setItem('authToken', response.token);
      }

      UserStorage.setAuthStatus(JSON.stringify(response.data));

      this.setState({
        isAuthenticated: UserStorage.getAuthStatus()
      });
    }
  };

  render() {
    if (this.state.isAuthenticated) {
      return <Redirect to='/' />
    }

    return (
      <form onSubmit={this.submit}>
        <div>
          <input type="email" name="email"/>
        </div>
        <div>
          <input type="password" name="password"/>
        </div>
        <input type="submit" value="Login" />
      </form>
    );
  };
}

export default Login;
