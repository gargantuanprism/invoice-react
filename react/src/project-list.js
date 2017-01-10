const util = require('util')

import React, { Component } from 'react'
import {Link} from 'react-router'

import {ClientService} from './service'

export class ProjectList extends Component {
  constructor(props){
    super(props)

    this.state = {
      client: {
        projects: []
      }
    }
  }

  componentDidMount(){
    ClientService.read(this.props.params.client_id)
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

export default ProjectList

