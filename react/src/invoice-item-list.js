import util from 'util'

import React, {Component} from 'react'
import {Link} from 'react-router'

import {InvoiceService} from './service'

class InvoiceItemList extends Component {
  constructor(props){
    super(props)

    this.state = {
      invoice: {
        invoiceItems: []
      }
    }
  }

  componentDidMount(){
    InvoiceService.read(this.props.params.invoice_id)
      .then(json => this.setState({invoice: json}))
  }

  render(){
    const currentPath = this.props.router.getCurrentLocation().pathname
    const newURL = util.format('%s/new', currentPath)

    const items = this.state.invoice.invoiceItems.map(item => (
      <li key={item._id}>
        <Link to={util.format('%s/%s', currentPath, item._id)}>
          {item.desc}
        </Link>
      </li>
    ))

    return (
      <div>
        <Link to={newURL} className="button expanded">New Invoice Item</Link>
        <ul>{items}</ul>
      </div>
    )
  }
}

export default InvoiceItemList

