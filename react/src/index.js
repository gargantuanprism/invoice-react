import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router'

import 'foundation-sites/dist/css/foundation.min.css'
//import 'foundation-sites/dist/js/foundation.min.js'

import ClientListContainer, {ClientForm, ClientProjectsList} from './client'
import App from './App'

import './index.css';

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="clients">
        <IndexRoute component={ClientListContainer} />
        <Route path="new" component={ClientForm} />
        <Route path=":id">
          <IndexRoute component={ClientForm} />
          <Route path="projects">
            <IndexRoute component={ClientProjectsList} />
            <Route path="new" />
            <Route path=":id" />
          </Route>
        </Route>
      </Route>
    </Route>
  </Router>
), document.getElementById('root'))

