import React, { Component } from 'react';
import ApiService from './../../services/Api';
import './Login.scss';

class Login extends Component {
  constructor() {
    super();
    this.submit = this.submit.bind(this);
  }

  async submit(event) {
    event.preventDefault();

    const response = await ApiService.post('users/login', {
      email: event.target.email.value,
      password: event.target.password.value
    });

    if (response) {
      if (response.token) {
        localStorage.setItem('authToken', response.token);
      }

      if (response.data) {
        localStorage.setItem('authUser', JSON.stringify(response.data));
      }
    }
  }

  render() {
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
  }
}

export default Login;
