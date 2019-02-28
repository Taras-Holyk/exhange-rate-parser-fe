import React, { Component } from 'react';
import './Register.scss';
import { Redirect } from 'react-router-dom';
import UserStorage from '../../services/UserStorage';
import ApiService from '../../services/Api';
import ValidationErrorsList from '../../components/Error/ValidationErrorsList';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      success: false,
      isAuthenticated: UserStorage.getAuthStatus(),
      errors: []
    };
  };

  submit = async (event) => {
    event.preventDefault();

    const response = await ApiService.post('users', {
      name: event.target.name.value,
      email: event.target.email.value,
      password: event.target.password.value,
      password_confirmation: event.target.password_confirmation.value
    });

    if (response && response.success) {
      this.setState({
        success: true,
        isAuthenticated: UserStorage.getAuthStatus(),
        errors: []
      });

      setTimeout(() => {
        this.setState({
          success: false,
          isAuthenticated: UserStorage.getAuthStatus(),
          errors: []
        });
      }, 2000);
    }

    if (response.errors && response.errors.length) {
      this.setState({...this.state, errors: response.errors});
    }
  };

  render() {
    if (this.state.isAuthenticated) {
      return <Redirect to='/' />
    }

    return (
      <form onSubmit={this.submit}>
        { this.state.success && <h2>Success</h2> }
        { this.state.errors.length > 0 && <ValidationErrorsList errors={this.state.errors}/> }
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name"/>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email"/>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password"/>
        </div>
        <div>
          <label htmlFor="password_confirmation">Password confirmation</label>
          <input type="password" name="password_confirmation" id="password_confirmation"/>
        </div>
        <input type="submit" value="Register" />
      </form>
    );
  }
}

export default Register;
