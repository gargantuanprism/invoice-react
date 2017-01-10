import util from 'util'

import React, {Component} from 'react'
import {Link} from 'react-router'

import {InvoiceService} from './service'

class InvoiceList extends Component {
  constructor(props){
    super(props)

    this.state = {
      invoices: []
    }
  }

  componentDidMount(){
    InvoiceService.index()
      .then(json => this.setState({invoices: json}))
  }

  render(){
    const rows = this.state.invoices.map((inv) => (
      <li key={inv._id}>
        <Link to={util.format('/invoices/%s', inv._id)}>
          {inv.desc}
        </Link>
      </li>
    ))
      
    return (
      <div>
        <Link to="/invoices/new" className="button expanded">
          New Invoice
        </Link>
        <ul>{rows}</ul> 
      </div>
    )
  }
}

export default InvoiceList

