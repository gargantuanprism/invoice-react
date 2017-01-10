import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router'

import 'foundation-sites/dist/css/foundation.min.css'

import ClientListContainer from './client-list'
import ClientForm from './client-form'
import ProjectList from './project-list'
import ProjectForm from './project-form'
import InvoiceList from './invoice-list'
import InvoiceForm from './invoice-form'
import InvoiceItemList from './invoice-item-list'
import InvoiceItemForm from './invoice-item-form'
import App from './App'

import './index.css';

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="invoices">
        <IndexRoute component={InvoiceList} />
        <Route path="new" component={InvoiceForm} />
        <Route path=":invoice_id">
          <IndexRoute component={InvoiceForm} />
          <Route path="items">
            <IndexRoute component={InvoiceItemList} />
            <Route path=":invoice_item_id" component={InvoiceItemForm} />
          </Route>
        </Route>
      </Route>

      <Route path="clients">
        <IndexRoute component={ClientListContainer} />
        <Route path="new" component={ClientForm} />
        <Route path=":client_id">
          <IndexRoute component={ClientForm} />
          <Route path="projects">
            <IndexRoute component={ProjectList} />
            <Route path="new" component={ProjectForm} />
            <Route path=":project_id">
              <IndexRoute component={ProjectForm} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Route>
  </Router>
), document.getElementById('root'))

