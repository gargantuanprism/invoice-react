const util = require('util')

import React, {Component} from 'react'
import {Link} from 'react-router'

import {ClientService} from './service'

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

