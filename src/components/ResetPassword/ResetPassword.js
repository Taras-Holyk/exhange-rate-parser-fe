import React, { Component } from 'react';
import ApiService from './../../services/Api';
import './ResetPassword.scss';

class ResetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      errorMessage: ''
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  submit = async (event) => {
    event.preventDefault();

    const response = await ApiService.post('users/reset-password', {
      email: this.state.email,
      password: this.state.password
    });

    if (response.success) {
      this.props.history.push('/login');
    } else {
      this.setState({
        errorMessage: response.message
      });
    }
  }

  render() {
    return (
      <form onSubmit={this.submit} className="form">
        { this.state.errorMessage && <div>{ this.state.errorMessage }</div> }
        <div>
          <label htmlFor="email" className="form__label">Email</label>
          <input type="email" name="email" id="email" className="form__input" value={this.state.email} onChange={this.handleChange}/>
        </div>
        <div>
          <label htmlFor="password" className="form__label">New Password</label>
          <input type="password" name="password" id="password" className="form__input" value={this.state.password} onChange={this.handleChange}/>
        </div>
        <div className="form__buttons">
          <input type="submit" value="Reset Your Password Now" className="form__submit-button" />
        </div>
      </form>
    );
  }
}

export default ResetPassword;