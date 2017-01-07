class AppError extends Error {
  constructor(messages){
    super()

    this.name = 'AppError'
    this.messages = messages
  }
}

export default AppError

