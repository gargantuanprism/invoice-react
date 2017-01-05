import React, { Component } from 'react';
import {Link} from 'react-router'
import './App.css';

const Nav = (props) => (
  <nav>
    <Link to="/clients">Clients</Link>
  </nav>
)

class App extends Component {
  render() {
    return (
      <div>
        <Nav />
        {this.props.children}
      </div>
    );
  }
}

export default App;

