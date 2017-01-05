import React, { Component } from 'react'
import {Link} from 'react-router'
const uuid = require('node-uuid')
const util = require('util')

// Can't use backticks here because Chrome DevTools misinterprets them
const ClientRow = (props) => (
  <li>
    <Link to={util.format('/clients/%s', props.client.id)}>
      {props.client.name}
    </Link>
  </li>
)

const ClientNav = (props) => (
  <nav>
    <Link to="/clients/new">New Client</Link>
  </nav>
)

function ClientList(props){
  const items = props.clients.map(client =>
    <ClientRow client={client} key={client.id} />
  )

  return(
    <ul>{items}</ul>
  )
}

class ClientService {
  static _decode = () => (
    JSON.parse(window.localStorage.clients)
  )

  static _encode = (clients) => {
    window.localStorage.clients = JSON.stringify(clients)
  }

  static get = (id) => (
    ClientService._decode().filter((c) => (c.id === id))[0]
  )

  static all = () => (
    ClientService._decode()
  )

  static save = (new_client) => {
    var clients = ClientService._decode()

    if (!new_client.id){
      new_client.id = uuid.v4()
      clients.push(new_client)
    }
    else {
      var client = clients.filter((c) => (c.id === new_client.id))[0]
      Object.assign(client, new_client)
    }

    ClientService._encode(clients)
  }
}

export class ClientForm extends Component {
  constructor(props){
    super(props)

    this.state = {
      client: {
        name: ''
      }
    }
  }

  submit(event){
    event.preventDefault()

    ClientService.save(this.state.client)
    this.props.router.push('/clients')
  }

  change(event){

    // Create a copy of the current state so nested props can be preserved
    var changed_state = Object.assign({}, this.state)
    changed_state.client[event.target.name] = event.target.value

    this.setState(changed_state)
  }

  componentDidMount(){
    if (this.props.params.id){
      var client = ClientService.get(this.props.params.id)
      this.setState({client: client})
    }
  }

  render(){
    return(
      <form onSubmit={this.submit.bind(this)}>
        <input type="text" name='name' value={this.state.client.name}
          onChange={this.change.bind(this)} />
        <input type="submit" />
      </form>
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
    if (!window.localStorage.clients.length){
      window.localStorage.clients = JSON.stringify([])
    }

    this.setState({
      clients: JSON.parse(window.localStorage.clients)
    })
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

