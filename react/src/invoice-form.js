import {ClientService, InvoiceService} from './service'
import GenericForm from './generic-form'

class InvoiceForm extends GenericForm {
  _form_inputs(){
    return [
      {
        name: 'desc',
        label: 'Description'
      },
      {
        name: 'client_id', 
        type: 'select', 
        source: {
          items: this.state.clients,
          text: 'name',
          value: '_id'
        },
        label: 'Client'
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

        if (this.state.invoice._id){
          InvoiceService.read(this.state.invoice._id)
            .then(json => this.setState({invoice: json}))
        }
      })
  }

  _handleSubmit(event){
    event.preventDefault()

    InvoiceService.create({invoice: this.state.invoice})
      .then(json => this.props.router.push('/invoices'))
  }

  _handleDelete(event){
    console.log(event)
  }

  _changeState(name, value){

    // Create a copy of the current state so nested props can be preserved
    var changed_state = Object.assign({}, this.state)
    changed_state.invoice[name] = value
    this.setState(changed_state)
  }
}

export default InvoiceForm

