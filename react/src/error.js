import React from 'react'

export const ErrorList = (props) => {
  const items = props.err.messages.map((msg, i) =>
    <li key={i}>{msg}</li>
  )

  return (
    <ul>{items}</ul>
  )
}

export class AppError extends Error {
  constructor(messages){
    super()

    this.name = 'AppError'
    this.messages = messages
  }
}

