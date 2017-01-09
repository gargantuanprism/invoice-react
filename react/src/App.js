import React, { Component } from 'react';
import {Link} from 'react-router'

import './App.css';

const Nav = (props) => (
  <div className="top-bar">
    <div className="top-bar-left">
      <ul className="dropdown menu" data-dropdown-menu>
        <li className="menu-text">Invoicer</li>
        <li><Link to="/invoices">Invoices</Link></li>
        <li><Link to="/clients">Clients</Link></li>
      </ul>
    </div>
  </div>
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

