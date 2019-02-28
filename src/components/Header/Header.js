import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserStorage from './../../services/UserStorage';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: UserStorage.getAuthStatus()
    };
  };

  logout = async () => {
    UserStorage.logout();

    this.setState({
      isAuthenticated: UserStorage.getAuthStatus()
    });

    this.props.setIsAuth(this.state);
  };

  render() {
    if (!UserStorage.getAuthStatus()) {
      return (
        <div>
          <Link to='/register'>Register</Link>
          <Link to='/login'>Login</Link>
        </div>
      );
    }

    return <a href='javascript:;' onClick={this.logout}>Logout</a>;
  };
}

export default Header;
