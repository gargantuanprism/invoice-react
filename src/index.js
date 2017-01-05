import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router'

import ClientListContainer, {ClientForm} from './client'
import App from './App'

import './index.css';

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="/clients" component={ClientListContainer} />
      <Route path="/clients/new" component={ClientForm} />
      <Route path="/clients/:id" component={ClientForm} />
    </Route>
  </Router>
), document.getElementById('root'))

