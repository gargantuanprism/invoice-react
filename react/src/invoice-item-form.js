import util from 'util'

import GenericForm from './generic-form'
import {InvoiceService, InvoiceItemService} from './service'

class InvoiceItemForm extends GenericForm {
  constructor(props){
    super(props)

    this.state = {
      invoice: {
        client: {
          projects: []
        }
      },
      item: {}
    }
  }

  componentDidMount(){
    InvoiceService.read(this.props.params.invoice_id)
      .then(json => this.setState({invoice: json}))
  }

  _formInputs(){
    return [
      {name: 'desc'},
      {name: 'hours', type: 'number'},
      {name: 'rate', type: 'number'},
      {name: 'amount', type: 'number'},
      {
        name: 'type', 
        type: 'select',
        source: {
          items: ['Hourly Work', 'Fee', 'Deposit', 'Expense']
        }
      },
      {
        name: 'project',
        type: 'select',
        source: {
          items: this.state.invoice.client.projects,
          text: 'name',
          value: '_id'
        }
      }
    ]
  }

  _formData(){
    return this.state.item
  }

  _showDelete(){
    return this.state.item.hasOwnProperty('_id')
  }

  _changeState(name, value){

    // Create a copy of the current state so nested props can be preserved
    var changed_state = Object.assign({}, this.state)
    changed_state.item[name] = value
    this.setState(changed_state)
  }

  _handleSubmit(event){
    event.preventDefault()

    var p
    if (this.state.item._id){
      p = InvoiceItemService.update(this.state.invoice._id,
        this.state.item._id, {item: this.state.item})
    }
    else {
      p = InvoiceItemService.create(this.state.invoice._id,
        {item: this.state.item})
    }

    const url = util.format('/invoices/%s/items', this.state.invoice._id)
    p.then(json => this.props.router.push(url))
  }
}

export default InvoiceItemForm

