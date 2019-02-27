import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserStorage from './../../services/UserStorage';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: UserStorage.getAuthStatus()
    }
  };

  logout = async () => {
    UserStorage.logout();

    this.setState({
      isAuthenticated: UserStorage.getAuthStatus()
    })
  };

  render() {
    let loginButton = <a href='javascript:;' onClick={this.logout}>Logout</a>;
    if (!UserStorage.getAuthStatus()) {
      loginButton = <Link to='/login'>Login</Link>;
    }

    return (
      <div>
        {loginButton}
      </div>
    );
  };
}

export default Header;
