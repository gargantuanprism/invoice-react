import util from 'util'

import _ from 'lodash'
import React, {Component} from 'react'

const FormFooter = (props) => (
  <div className="row">
    <div className="button-group columns">
      <button type="submit" className="button">Save</button>
      <button type="button" className="button secondary"
        onClick={props.router.goBack}>Cancel</button>

      {props.showDelete &&
          <button type="button" className="button alert"
            onClick={props.onDelete}>Delete</button>
      }
    </div>
  </div>
)

const SelectElement = (props) => {
  const source = props.input.source
  const items = source.items.map((item, i) => {
    if (typeof item === 'string'){
      return (
        <option key={i} value={item}>
          {item}
        </option>
      )
    }
    else {
      return (
        <option key={i} value={item[source.value]}>
          {item[source.text]}
        </option>
      )
    }
  })

  return (
    <select name={props.input.name} onChange={props.onChange}
      value={props.value}>
      <option>---</option>
      {items}
    </select>
  )
}

const FormInputs = (props) => {
  const items = props.inputs.map((input, i) => {
    var type = input.type || 'text'
    var element;

    switch(type){
      case 'text':
      case 'email':
      case 'tel':
      case 'number':
        element = (
          <input type={type} name={input.name} onChange={props.onChange}
            value={props.formData[input.name]} />
        )
        break;

      case 'select':
        const value = input.value_path ? 
          _.at(props.formData, input.value_path)[0]: props.formData[input.name]

        element = (
          <SelectElement input={input} onChange={props.onChange}
            value={value} />
        )
        break;

      case 'checkbox':
        element = (
          <div className="switch">
            <input className="switch-input" type="checkbox" id={input.name}
              name={input.name} onChange={props.onChange}
              checked={props.formData[input.name]} />
            <label className="switch-paddle" htmlFor={input.name}>
            </label>
          </div>
        )
        break;

      default:
        element = ''
    }

    return (
      <div className="row" key={i}>
        <div className="columns">
          <label>
            {_.capitalize(input.label || input.name)}
            {element}
          </label>
        </div>
      </div>
    )
  })

  return (
    <div>{items}</div>
  )
}

class GenericForm extends Component {
  componentDidMount(){
    this._virtualError('componentDidMount')
  }

  render(){
    return (
      <div>
        {this._optionalHeader()}

        <form onSubmit={this._handleSubmit.bind(this)}>
          <FormInputs inputs={this._formInputs()}
            onChange={this._handleChange.bind(this)}
            formData={this._formData()} />
          <FormFooter router={this.props.router} 
            showDelete={this._showDelete()}
            onDelete={this._handleDelete.bind(this)} />
        </form>
      </div>
    )
  }

  _optionalHeader(){
    return ''
  }

  _handleDelete(){
    this._virtualError('_handleDelete')
  }

  _handleSubmit(){
    this._virtualError('_handleSubmit')
  }

  _changeState(){
    this._virtualError('_changeState')
  }

  _showDelete(){
    this._virtualError('_showDelete')
  }

  _formInputs(){
    this._virtualError('_formInputs')
  }

  _formData(){
    this._virtualError('_formData')
  }
  
  _handleChange(event){
    var value;

    switch (event.target.type){
      case 'checkbox':
        value = event.target.checked
        break

      default:
        value = event.target.value
    }

    this._changeState(event.target.name, value)
  }

  _handleError(err){
    console.error(err)
  }

  _virtualError(name){
    throw new Error(util.format('%s must be implemented by %s',
      name, this.constructor.name))
  }
}

export default GenericForm

