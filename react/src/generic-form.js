import _ from 'lodash'
import React, {Component} from 'react'

const FormFooter = (props) => (
  <div className="row">
    <div className="button-group columns">
      <button type="submit" className="button">Save</button>
      <button type="button" className="button secondary"
        onClick={props.router.goBack}>Cancel</button>
    </div>
  </div>
)

const SelectElement = (props) => {
  const source = props.input.source
  const items = source.items.map((item, i) => (
    <option key={i} value={item[source.value]}>
      {item[source.text]}
    </option>
  ))

  return (
    <select name={props.input.name} onChange={props.onChange}>
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
      case  'text':
        element = (
          <input type="text" name={input.name} onChange={props.onChange} />
        )
        break;

      case 'select':
        element = (
          <SelectElement input={input} onChange={props.onChange} />
        )
        break;

      case 'checkbox':
        element = (
          <div className="switch">
            <input className="switch-input" type="checkbox" id={input.name}
              name={input.name} onChange={props.onChange} />
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

  render(){
    return (
      <form onSubmit={this._handleSubmit.bind(this)}>
        <FormInputs inputs={this._form_inputs()} 
          onChange={this._handleChange.bind(this)} />
        <FormFooter router={this.props.router} />
      </form>
    )
  }
}

export default GenericForm

