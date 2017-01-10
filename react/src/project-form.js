import util from 'util'

import {ProjectService} from './service'
import GenericForm from './generic-form'

class ProjectForm extends GenericForm {
  constructor(props){
    super(props)

    this.state = {
      client_id: props.router.params.client_id,
      project: {},
      error: null
    }
  }

  componentDidMount(){
    var params = this.props.params

    if (params.project_id){
      ProjectService.read(params.client_id, params.project_id)
        .then(json => this.setState({project: json}))
    }
  }

  _formInputs(){
    return [
      {name: 'name'}
    ]
  }

  _formData(){
    return this.state.project
  }

  _handleSubmit(event){
    event.preventDefault()

    var payload = {project: this.state.project}

    var p = this.state.project._id ? 
      ProjectService.update(this.state.client_id, this.state.project._id, 
        payload): ProjectService.create(this.state.client_id, payload)

    // TODO: named routes
    p.then(() => this.props.router.push(util.format('/clients/%s/projects',
      this.state.client_id)))
      .catch(err => this.handle_errors(err))
   }

  _changeState(name, value){
    var changed_state = Object.assign({}, this.state)
    changed_state.project[name] = value
    this.setState(changed_state)
  }

  _handleDelete(event){
    ProjectService.destroy(this.state.client_id, this.state.project._id)
      .then(() => this.props.router.push(util.format('/clients/%s/projects',
        this.state.client_id)))
  }

  _showDelete(){
    return this.state.project.hasOwnProperty('_id')
  }
}  

export default ProjectForm

