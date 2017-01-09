const util = require('util')

import React, { Component } from 'react'
import {Link} from 'react-router'

import {ClientService, ProjectService} from './service'
import {TextInput} from './form-input'

const ErrorList = (props) => {
  const items = props.err.messages.map((msg, i) =>
    <li key={i}>{msg}</li>
  )

  return (
    <ul>{items}</ul>
  )
}

// Can't use backticks here because Chrome DevTools misinterprets them
const ClientRow = (props) => (
  <li>
    <Link to={util.format('/clients/%s', props.client._id)}>
      {props.client.name ? props.client.name: props.client._id}
    </Link>
  </li>
)

const ClientNav = (props) => (
  <Link className="button expanded" to="/clients/new">New Client</Link>
)

function ClientList(props){
  const items = props.clients.map(client =>
    <ClientRow client={client} key={client._id} />
  )

  return(
    <ul>{items}</ul>
  )
}

export class ClientForm extends Component {
  constructor(props){
    super(props)

    this.state = {
      client: {},
      error: null
    }
  }

  handle_errors(err){
    this.setState({error: err})
  }

  submit(event){
    event.preventDefault()

    var payload = {client: this.state.client}

    // Can't bind this with assignment?
    var p = this.state.client._id ? 
      ClientService.update(this.state.client._id, payload):
      ClientService.create(payload)

    p.then(() => this.props.router.push('/clients'))
      .catch(err => this.handle_errors(err))
  }

  change(event){

    // Create a copy of the current state so nested props can be preserved
    var changed_state = Object.assign({}, this.state)
    changed_state.client[event.target.name] = event.target.value

    this.setState(changed_state)
  }

  componentDidMount(){
    if (this.props.params.id){
      ClientService.read(this.props.params.id)
        .then(json => this.setState({client: json}))
    }
  }

  delete(){
    ClientService.destroy(this.state.client._id)
      .then(json => this.props.router.push('/clients'))
  }

  render(){
    const projects_url = util.format('/clients/%s/projects', 
      this.state.client._id)

    return(
      <div>
        {this.state.client._id &&
            <ul className="menu">
              <li>
                <Link to={projects_url}>Projects</Link>
              </li>
            </ul>
        }

        <form onSubmit={this.submit.bind(this)}>
          {this.state.error &&
              <ErrorList err={this.state.error} />
          }

          <TextInput name="name" value={this.state.client.name}
            onChange={this.change.bind(this)} />
          <TextInput name="address" value={this.state.client.address}
            onChange={this.change.bind(this)} />
          <TextInput name="address2" value={this.state.client.address2}
            onChange={this.change.bind(this)} />
          <TextInput name="city" value={this.state.client.city}
            onChange={this.change.bind(this)} />
          <TextInput name="state" value={this.state.client.state}
            onChange={this.change.bind(this)} />
          <TextInput name="zip" value={this.state.client.zip}
            onChange={this.change.bind(this)} />
          <TextInput name="country" value={this.state.client.country}
            onChange={this.change.bind(this)} />
          <TextInput type="tel" name="phone" value={this.state.client.phone}
            onChange={this.change.bind(this)} />
          <TextInput type="email" name="email" value={this.state.client.email}
            onChange={this.change.bind(this)} />

          <div className="row">
            <div className="button-group columns">
              <button type="submit" className="button">Save</button>
              <button type="button" className="button secondary"
                onClick={this.props.router.goBack}>Cancel</button>
              {this.state.client._id &&
                  <button type="button" className="button alert" 
                    onClick={this.delete.bind(this)}>Delete</button>
              }
            </div>
          </div>
        </form>

      </div>
    )
  }
}

export class ClientProjectsList extends Component {
  constructor(props){
    super(props)

    this.state = {
      client: {
        projects: []
      }
    }
  }

  componentDidMount(){
    ClientService.index(this.props.params.id)
      .then(json => this.setState({client: json}))
  }

  render(){
    const items = this.state.client.projects.map((p) => (
      <li key={p._id}>
        <Link to={util.format('/clients/%s/projects/%s', this.state.client._id,
          p._id)}>{p.name}</Link>
      </li>
    ))

    return(
      <div>
        <Link className="button expanded" to={util.format('/clients/%s/projects/new',
          this.state.client._id)}>New Project</Link>
        <ul>{items}</ul>
      </div>
    )
  }
}

class ClientListContainer extends Component {
  constructor(){
    super()

    this.state = {
      clients: []
    }
  }

  componentDidMount(){
    ClientService.index()
      .then(json => this.setState({clients: json}))
  }

  render(){
    return(
      <div>
        <ClientNav />
        <ClientList clients={this.state.clients} />
      </div>
    )
  }
}

export default ClientListContainer

