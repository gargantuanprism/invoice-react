import React from 'react'

export const TextInput = (props) => {
  var type = props.type || 'text'

  return (
    <div className="row">
      <div className="small-12 columns">
        <label>
          {props.name}
          <input type={type} name={props.name} value={props.value}
            onChange={props.onChange} />
        </label>
      </div>
    </div>
  )
}

