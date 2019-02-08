import React, { Component } from 'react';
import './App.css';
import routes from './routes';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: {}
    }
  }

  render() {
    return (
      routes
    );
  }
}

export default App;
