exports.error_messages = (err) => {
  if (!err.errors){
    return []
  }

  var rv = []

  for (key in err.errors){
    rv.push(err.errors[key].message)
  }

  return rv
}

exports.create_error = (name, field, message) => {
  var err = new Error()

  err.name = name
  err.errors = {}
  err.errors[field] = {message: message}

  return err
}

