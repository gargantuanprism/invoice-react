import util from 'util'
import 'datejs'

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
      <div key={inv._id}>
        <div className="row">
          <div className="small-6 columns">
            <Link to={util.format('/invoices/%s', inv._id)}>
              {inv.desc}
            </Link>
          </div>
          <div className="small-6 columns">
            {Date.parse(inv.createdAt).toString('yyyy-MM-dd')}
          </div>
        </div>
        <div className="row">
          <div className="small-6 columns">{inv.client.name}</div>
          <div className="small-6 columns">{inv.slug}</div>
        </div>
      </div>
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

