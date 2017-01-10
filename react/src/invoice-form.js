import util from 'util'

import React from 'react'
import {Link} from 'react-router'

import {ClientService, InvoiceService} from './service'
import GenericForm from './generic-form'

class InvoiceForm extends GenericForm {
  constructor(props){
    super(props)

    this.state = {
      invoice: {},
      clients: []
    }
  }

  componentDidMount(){
    ClientService.index()
      .then(json => {
        this.setState({clients: json})

        if (this.props.params.invoice_id){
          InvoiceService.read(this.props.params.invoice_id)
            .then(json => this.setState({invoice: json}))
        }
      })
  }

  _formInputs(){
    return [
      {
        name: 'desc',
        label: 'Description'
      },
      {
        name: 'client', 
        type: 'select', 
        source: {
          items: this.state.clients,
          text: 'name',
          value: '_id'
        },
        label: 'Client',
        value_path: 'client._id'
      },
      {
        name: 'slug'
      },
      {
        name: 'paid', 
        type: 'checkbox'
      }
    ]
  }

  _formData(){
    return this.state.invoice
  }

  _handleSubmit(event){
    event.preventDefault()

    const payload = {invoice: this.state.invoice}
    var id = this.state.invoice._id
    var p;

    if (id){
      p = InvoiceService.update(id, payload)
    }
    else {
      p = InvoiceService.create(payload)
    }

    p.then(json => this.props.router.push('/invoices'))
      .catch(err => console.error(err))
  }

  _handleDelete(){
    InvoiceService.destroy(this.state.invoice._id)
      .then(() => this.props.router.push('/invoices'))
      .catch(err => this._handleError(err))
  }

  _showDelete(){
    return this.state.invoice.hasOwnProperty('_id')
  }

  _changeState(name, value){

    // Create a copy of the current state so nested props can be preserved
    var changed_state = Object.assign({}, this.state)
    changed_state.invoice[name] = value
    this.setState(changed_state)
  }

  _optionalHeader(){
    if (this.state.invoice._id){
      const itemsURL = util.format('/invoices/%s/items', 
        this.state.invoice._id)

      return (
        <ul className="menu">
          <li>
            <Link to={itemsURL}>Invoice Items</Link>
          </li>
        </ul>
      )
    }

    return null
  }
}

export default InvoiceForm

