import util from 'util'

import React from 'react'
import {Link} from 'react-router'

import {ClientService} from './service'
import GenericForm from './generic-form'

class ClientForm extends GenericForm {
  constructor(props){
    super(props)

    this.state = {
      client: {}
    }
  }

  componentDidMount(){
    if (this.props.params.client_id){
      ClientService.read(this.props.params.client_id)
        .then(json => this.setState({client: json}))
    }
  }

  _formInputs(){
    return [
      {name: 'name'},
      {name: 'address'},
      {name: 'address2'},
      {name: 'city'},
      {name: 'state'},
      {name: 'zip'},
      {name: 'country'},
      {name: 'phone', type: 'tel'},
      {name: 'email', type: 'email'}
    ]
  }

  _formData(){
    return this.state.client
  }

  _handleSubmit(event){
    event.preventDefault()

    var payload = {client: this.state.client}

    // Can't bind this with assignment?
    var p = this.state.client._id ? 
      ClientService.update(this.state.client._id, payload):
      ClientService.create(payload)

    p.then(() => this.props.router.push('/clients'))
      .catch(err => this.handle_errors(err))
  }

  _changeState(name, value){

    // Create a copy of the current state so nested props can be preserved
    var changed_state = Object.assign({}, this.state)
    changed_state.client[name] = value
    this.setState(changed_state)
  }

  _handleDelete(){
    ClientService.destroy(this.state.client._id)
      .then(json => this.props.router.push('/clients'))
  }

  _showDelete(){
    return this.state.client.hasOwnProperty('_id')
  }

  _optionalHeader(){
    const projectsURL = util.format('/clients/%s/projects', 
      this.state.client._id)

    return (
      <ul className="menu">
        <li>
          <Link to={projectsURL}>Projects</Link>
        </li>
      </ul>
    )
  }
}

export default ClientForm

