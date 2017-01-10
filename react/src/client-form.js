const util = require('util')

import React, {Component} from 'react'
import {Link} from 'react-router'

import {ClientService} from './service'
import {ErrorList} from './error'
import {TextInput} from './form-input'

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
    if (this.props.params.client_id){
      ClientService.read(this.props.params.client_id)
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

export default ClientForm

